import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";
import { isAdminOverrideEmail } from "@/lib/admin-access";
import { postSchema } from "./news-schema";

async function removeMediaPaths(client: ReturnType<typeof createClient<Database>>, paths: Array<string | null | undefined>) {
  const media = [...new Set(paths.filter((value): value is string => !!value))];
  if (media.length === 0) return;
  const { error } = await client.storage.from("news-media").remove(media);
  if (error) throw new Error("Media update failed");
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
  const userEmail = typeof context.claims?.email === "string" ? context.claims.email : undefined;
  const { data: allowed, error } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
  if (error) throw new Error("Access unavailable");
  const isAdminOverride = isAdminOverrideEmail(userEmail);
  const { data: profile } = await context.supabase.from("profiles").select("display_name,avatar_url").eq("id", context.userId).single();
  if (!allowed && !isAdminOverride) return { allowed: false, profile, posts: [], userId: context.userId };
  const { data: posts, error: readError } = await context.supabase.from("news_posts").select("*").order("created_at", { ascending: false }).limit(100);
  if (readError) throw new Error("News unavailable");
  return { allowed: true, profile, posts: posts ?? [], userId: context.userId };
});

export const saveNewsPost = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator(input => postSchema.parse(input)).handler(async ({ context, data }) => {
  const userEmail = typeof context.claims?.email === "string" ? context.claims.email : undefined;
  const { data: allowed } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
  if (!allowed && !isAdminOverrideEmail(userEmail)) throw new Error("Forbidden");

  for (const path of [data.image_path, data.video_path]) {
    if (!path) continue;
    if (!/^[a-f0-9-]{36}\/[a-f0-9-]{36}\.(jpg|png|webp|mp4|webm)$/.test(path)) throw new Error("Invalid media");
    const [folder, filename] = path.split("/");
    if (!folder || !filename) throw new Error("Invalid media");
    const { data: files, error } = await context.supabase.storage.from("news-media").list(folder, { search: filename });
    if (error || !files?.some(file => file.name === filename)) throw new Error("Media unavailable");
  }

  const previous = data.id ? await context.supabase.from("news_posts").select("image_path,video_path").eq("id", data.id).single() : null;
  const previousPaths = previous?.data ? [previous.data.image_path, previous.data.video_path] : [];
  const nextPaths = [data.image_path, data.video_path];
  const stalePaths = previousPaths.filter(path => path && !nextPaths.includes(path));
  if (stalePaths.length > 0) {
    await removeMediaPaths(context.supabase, stalePaths);
  }

  const { id, ...values } = data;
  const query = id ? context.supabase.from("news_posts").update(values).eq("id", id) : context.supabase.from("news_posts").insert({ ...values, author_id: context.userId });
  const { data: row, error } = await query.select("id").single();
  if (error) throw new Error("Save failed");
  return row;
});

export const deleteNewsPost = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator(input => z.object({ id: z.string().uuid() }).parse(input)).handler(async ({ context, data }) => {
  const userEmail = typeof context.claims?.email === "string" ? context.claims.email : undefined;
  const { data: allowed } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
  if (!allowed && !isAdminOverrideEmail(userEmail)) throw new Error("Forbidden");

  const { data: existing } = await context.supabase.from("news_posts").select("image_path,video_path").eq("id", data.id).single();
  const { error } = await context.supabase.from("news_posts").delete().eq("id", data.id);
  if (error) throw new Error("Delete failed");

  if (existing?.image_path || existing?.video_path) {
    await removeMediaPaths(context.supabase, [existing.image_path, existing.video_path]);
  }

  return { ok: true };
});

export const saveAdminProfile = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator(input => z.object({ display_name: z.string().trim().max(100), avatar_url: z.union([z.literal(""), z.string().url().startsWith("https://").max(2000)]) }).parse(input)).handler(async ({ context, data }) => {
  const { error } = await context.supabase.from("profiles").update(data).eq("id", context.userId);
  if (error) throw new Error("Profile save failed");
  return { ok: true };
});