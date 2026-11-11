import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";
import { isAdminOverrideEmail } from "@/lib/admin-access";
import { postSchema } from "./news-schema";

type DbClient = ReturnType<typeof createClient<Database>>;
type AuthContext = { supabase: DbClient; userId: string; claims?: Record<string, unknown> };

const MEDIA_EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "video/mp4": "mp4",
  "video/webm": "webm",
};

function callerEmail(claims: Record<string, unknown> | undefined) {
  return typeof claims?.["email"] === "string" ? (claims["email"] as string) : undefined;
}

function hasServiceRole() {
  return Boolean(process.env["SUPABASE_SERVICE_ROLE_KEY"]);
}

async function serviceClient() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin as DbClient;
}

/**
 * The configured administrator email acts as an owner account. When the server
 * has a service-role key, that account writes through it so the news desk works
 * even before a row exists in `user_roles`; otherwise we fall back to the
 * caller-scoped client and the normal row-level policies apply.
 */
async function deskClient(context: AuthContext): Promise<DbClient> {
  if (isAdminOverrideEmail(callerEmail(context.claims)) && hasServiceRole()) {
    try {
      return await serviceClient();
    } catch {
      return context.supabase;
    }
  }
  return context.supabase;
}

async function assertAdmin(context: AuthContext) {
  const override = isAdminOverrideEmail(callerEmail(context.claims));
  if (override) return true;
  const { data: allowed } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
  if (!allowed) throw new Error("Forbidden");
  return false;
}

async function removeMediaPaths(client: DbClient, paths: Array<string | null | undefined>) {
  const media = [...new Set(paths.filter((value): value is string => !!value))];
  if (media.length === 0) return;
  const { error } = await client.storage.from("news-media").remove(media);
  if (error) throw new Error("Media update failed");
}

async function ensureProfile(client: DbClient, userId: string, displayName: string) {
  try {
    const { data } = await client.from("profiles").select("id").eq("id", userId).maybeSingle();
    if (data) return;
    await client.from("profiles").insert({ id: userId, display_name: displayName.slice(0, 100), avatar_url: "" });
  } catch {
    // Older accounts may predate the profile trigger; the news desk still loads.
  }
}

export const listPublishedNews = createServerFn({ method: "GET" }).handler(async () => {
  const url = process.env['SUPABASE_URL'];
  const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
  if (!url || !key) throw new Error("News unavailable");
  const client = createClient<Database>(url, key, { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: (input, init) => {
    const headers = new Headers(init?.headers);
    if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
    headers.set("apikey", key);
    return fetch(input, { ...init, headers });
  } } });
  const { data, error } = await client.from("news_posts").select("id,title_en,title_sw,body_en,body_sw,image_path,video_path,created_at").eq("published", true).order("created_at", { ascending: false }).limit(100);
  if (error) throw new Error("News unavailable");
  return data ?? [];
});

export const getNewsDesk = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
  const userEmail = callerEmail(context.claims);
  const { data: allowed, error } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
  if (error) throw new Error("Access unavailable");
  const isAdminOverride = isAdminOverrideEmail(userEmail);
  const db = await deskClient(context);

  // Bootstrap the owner account once so ordinary row-level policies also pass.
  let roleGranted = Boolean(allowed);
  if (!roleGranted && isAdminOverride && hasServiceRole()) {
    try {
      const admin = await deskClient(context);
      const { error: grantError } = await admin.from("user_roles").insert({ user_id: context.userId, role: "admin" });
      if (!grantError || grantError.code === "23505") roleGranted = true;
    } catch {
      // The signed-upload path still works for this request; ignore the grant.
    }
  }

  if (isAdminOverride && hasServiceRole()) {
    const displayName = typeof context.claims?.["name"] === "string" ? (context.claims["name"] as string) : "";
    await ensureProfile(await deskClient(context), context.userId, displayName);
  }

  const { data: profile } = await db.from("profiles").select("display_name,avatar_url").eq("id", context.userId).single();
  if (!allowed && !isAdminOverride) return { allowed: false, canWrite: false, profile, posts: [], userId: context.userId, email: userEmail ?? null };
  const { data: posts, error: readError } = await db.from("news_posts").select("*").order("created_at", { ascending: false }).limit(100);
  if (readError) throw new Error("News unavailable");
  return { allowed: true, canWrite: roleGranted || (isAdminOverride && hasServiceRole()), profile, posts: posts ?? [], userId: context.userId, email: userEmail ?? null };
});

export const saveNewsPost = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator(input => postSchema.parse(input)).handler(async ({ context, data }) => {
  const override = await assertAdmin(context);
  const db = override ? await deskClient(context) : context.supabase;
  if (override && hasServiceRole()) {
    const displayName = typeof context.claims?.["name"] === "string" ? (context.claims["name"] as string) : "";
    await ensureProfile(db, context.userId, displayName);
  }

  for (const path of [data.image_path, data.video_path]) {
    if (!path) continue;
    if (!/^[a-f0-9-]{36}\/[a-f0-9-]{36}\.(jpg|png|webp|mp4|webm)$/.test(path)) throw new Error("Invalid media");
    const [folder, filename] = path.split("/");
    if (!folder || !filename) throw new Error("Invalid media");
    const { data: files, error } = await db.storage.from("news-media").list(folder, { search: filename });
    if (error || !files?.some(file => file.name === filename)) throw new Error("Media unavailable");
  }

  const previous = data.id ? await db.from("news_posts").select("image_path,video_path").eq("id", data.id).single() : null;
  const previousPaths = previous?.data ? [previous.data.image_path, previous.data.video_path] : [];
  const nextPaths = [data.image_path, data.video_path];
  const stalePaths = previousPaths.filter(path => path && !nextPaths.includes(path));
  if (stalePaths.length > 0) {
    await removeMediaPaths(db, stalePaths);
  }

  const { id, ...values } = data;
  const query = id ? db.from("news_posts").update(values).eq("id", id) : db.from("news_posts").insert({ ...values, author_id: context.userId });
  const { data: row, error } = await query.select("id").single();
  if (error) throw new Error("Save failed");
  return row;
});

export const deleteNewsPost = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator(input => z.object({ id: z.string().uuid() }).parse(input)).handler(async ({ context, data }) => {
  const override = await assertAdmin(context);
  const db = override ? await deskClient(context) : context.supabase;

  const { data: existing } = await db.from("news_posts").select("image_path,video_path").eq("id", data.id).single();
  const { error } = await db.from("news_posts").delete().eq("id", data.id);
  if (error) throw new Error("Delete failed");

  if (existing?.image_path || existing?.video_path) {
    await removeMediaPaths(db, [existing.image_path, existing.video_path]);
  }

  return { ok: true };
});

export const saveAdminProfile = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator(input => z.object({ display_name: z.string().trim().max(100), avatar_url: z.union([z.literal(""), z.string().url().startsWith("https://").max(2000)]) }).parse(input)).handler(async ({ context, data }) => {
  const db = await deskClient(context);
  const { error } = await db.from("profiles").update(data).eq("id", context.userId);
  if (error) throw new Error("Profile save failed");
  return { ok: true };
});

const uploadRequestSchema = z.object({ kind: z.enum(["image", "video"]), contentType: z.string().max(100) });

/**
 * Mints an upload target for the news desk. Owner accounts receive a signed
 * upload token so the browser can send the file straight to storage without
 * depending on role-row policies; role-based admins keep the direct upload.
 */
export const createNewsUpload = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator(input => uploadRequestSchema.parse(input)).handler(async ({ context, data }) => {
  const override = await assertAdmin(context);
  const extension = MEDIA_EXTENSIONS[data.contentType];
  if (!extension) throw new Error("Invalid media");
  const path = `${context.userId}/${crypto.randomUUID()}.${extension}`;

  if (override && hasServiceRole()) {
    const admin = await deskClient(context);
    const { data: signed, error } = await admin.storage.from("news-media").createSignedUploadUrl(path);
    if (error || !signed?.token) throw new Error("Upload unavailable");
    return { path, token: signed.token, signed: true };
  }

  return { path, token: null, signed: false };
});

export const deleteNewsMedia = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator(input => z.object({ path: z.string().max(300) }).parse(input)).handler(async ({ context, data }) => {
  const override = await assertAdmin(context);
  if (!override && !data.path.startsWith(`${context.userId}/`)) throw new Error("Forbidden");
  const db = await deskClient(context);
  const { error } = await db.storage.from("news-media").remove([data.path]);
  if (error) throw new Error("Media delete failed");
  return { ok: true };
});

export const signNewsMedia = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator(input => z.object({ path: z.string().max(300) }).parse(input)).handler(async ({ context, data }) => {
  await assertAdmin(context);
  const db = await deskClient(context);
  const { data: signed, error } = await db.storage.from("news-media").createSignedUrl(data.path, 3600);
  if (error || !signed?.signedUrl) throw new Error("Media unavailable");
  return { url: signed.signedUrl };
});
