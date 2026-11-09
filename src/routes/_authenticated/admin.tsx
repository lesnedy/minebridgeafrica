import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";
import { getNewsDesk, saveNewsPost, deleteNewsPost, saveAdminProfile } from "@/lib/news.functions";
import { validMedia, type PostInput } from "@/lib/news-schema";
import { NewsMedia } from "@/components/site/PublishedNews";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/_authenticated/admin")({
  staticData: { sitemap: false },
  head: () => ({ meta: [
    { title: "News Desk — MineBridge Africa" },
    { name: "description", content: "Publish MineBridge Africa news, images and video." },
    { property: "og:title", content: "News Desk — MineBridge Africa" },
    { property: "og:description", content: "Publish MineBridge Africa news, images and video." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex" },
  ] }),
  component: AdminPage,
});

const empty: PostInput = { title_en: "", title_sw: "", body_en: "", body_sw: "", image_path: null, video_path: null, published: true };

function AdminPage() {
  const { t } = useI18n();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const fetchDesk = useServerFn(getNewsDesk);
  const save = useServerFn(saveNewsPost);
  const del = useServerFn(deleteNewsPost);
  const saveProfile = useServerFn(saveAdminProfile);
  const { data, isLoading, error } = useQuery({ queryKey: ["news-desk"], queryFn: () => fetchDesk() });
  const [form, setForm] = useState<PostInput>(empty);
  const [busy, setBusy] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  async function signOut() {
    await qc.cancelQueries(); qc.clear();
    await supabase.auth.signOut();
    void navigate({ to: "/auth", replace: true });
  }
  async function upload(file: File | undefined, kind: "image" | "video") {
    if (!file || !data) return;
    if (!validMedia(file, kind)) { toast.error(t.admin.mediaLimit); return; }
    setBusy(t.admin.uploading);
    const ext = ({ "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "video/mp4": "mp4", "video/webm": "webm" } as Record<string, string>)[file.type];
    const path = `${data.userId}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("news-media").upload(path, file, { contentType: file.type });
    setBusy(null);
    if (error) { toast.error(t.admin.error); return; }
    setForm(f => ({ ...f, [kind === "image" ? "image_path" : "video_path"]: path }));
  }

  async function removeMedia(kind: "image" | "video") {
    const path = kind === "image" ? form.image_path : form.video_path;
    if (!path) return;
    const { error } = await supabase.storage.from("news-media").remove([path]);
    if (error) { toast.error(t.admin.error); return; }
    setForm(f => ({ ...f, [kind === "image" ? "image_path" : "video_path"]: null }));
  }
  async function submit(e: FormEvent, published: boolean) {
    e.preventDefault(); setBusy(t.admin.busy);
    try {
      await save({ data: { ...form, published } });
      toast.success(t.admin.saved); setForm(empty);
      await qc.invalidateQueries();
    } catch { toast.error(t.admin.error); } finally { setBusy(null); }
  }
  async function remove(id: string) {
    if (!confirm(t.admin.confirmDelete)) return;
    try { await del({ data: { id } }); await qc.invalidateQueries(); } catch { toast.error(t.admin.error); }
  }

  if (isLoading) return <p className="container-site py-16">{t.admin.loading}</p>;
  if (error || !data) return <p className="container-site py-16">{t.admin.error}</p>;
  const header = <div className="flex flex-wrap items-center justify-between gap-3"><h1 className="text-3xl font-bold text-navy">{t.admin.dashboard}</h1><Button variant="outline" onClick={signOut}>{t.admin.signOut}</Button></div>;
  if (!data.allowed) return <div className="container-site py-16">{header}<p className="mt-6 rounded-lg border bg-card p-6 text-muted-foreground">{t.admin.denied}</p></div>;

  const set = (k: keyof PostInput) => (e: { target: { value: string } }) => setForm(f => ({ ...f, [k]: e.target.value }));
  return (
    <div className="container-site space-y-10 py-12">
      {header}
      <section className="rounded-xl border bg-card p-6">
        <h2 className="text-xl font-semibold">{t.admin.profile}</h2>
        <form className="mt-4 flex flex-wrap items-end gap-3" onSubmit={async e => { e.preventDefault(); try { await saveProfile({ data: { display_name: name ?? data.profile?.display_name ?? "", avatar_url: data.profile?.avatar_url ?? "" } }); toast.success(t.admin.saved); } catch { toast.error(t.admin.error); } }}>
          <div className="grid gap-2"><Label htmlFor="dn">{t.admin.displayName}</Label><Input id="dn" value={name ?? data.profile?.display_name ?? ""} onChange={e => setName(e.target.value)} /></div>
          <Button type="submit" variant="outline">{t.admin.saveProfile}</Button>
        </form>
      </section>

      <section className="rounded-xl border bg-card p-6">
        <div className="flex items-center justify-between"><h2 className="text-xl font-semibold">{form.id ? t.admin.edit : t.admin.newPost}</h2>{form.id && <Button variant="ghost" onClick={() => setForm(empty)}>{t.admin.cancel}</Button>}</div>
        <form className="mt-4 grid gap-4 md:grid-cols-2" onSubmit={e => submit(e, true)}>
          <div className="grid gap-2"><Label htmlFor="ten">{t.admin.title} (English)</Label><Input id="ten" required maxLength={200} value={form.title_en} onChange={set("title_en")} /></div>
          <div className="grid gap-2"><Label htmlFor="tsw">{t.admin.title} (Kiswahili)</Label><Input id="tsw" required maxLength={200} value={form.title_sw} onChange={set("title_sw")} /></div>
          <div className="grid gap-2"><Label htmlFor="ben">{t.admin.body} (English)</Label><Textarea id="ben" required rows={7} value={form.body_en} onChange={set("body_en")} /></div>
          <div className="grid gap-2"><Label htmlFor="bsw">{t.admin.body} (Kiswahili)</Label><Textarea id="bsw" required rows={7} value={form.body_sw} onChange={set("body_sw")} /></div>
          <div className="grid gap-2"><Label htmlFor="img">{t.admin.image}</Label><Input id="img" type="file" accept="image/jpeg,image/png,image/webp" onChange={async e => { const file = e.target.files?.[0]; await upload(file, "image"); e.target.value = ""; }} />
            {form.image_path && <div className="space-y-2"><NewsMedia path={form.image_path} kind="image" title="" /><Button type="button" size="sm" variant="ghost" onClick={() => void removeMedia("image")}>{t.admin.removeImage}</Button></div>}</div>
          <div className="grid gap-2"><Label htmlFor="vid">{t.admin.video}</Label><Input id="vid" type="file" accept="video/mp4,video/webm" onChange={async e => { const file = e.target.files?.[0]; await upload(file, "video"); e.target.value = ""; }} />
            {form.video_path && <div className="space-y-2"><NewsMedia path={form.video_path} kind="video" title="" /><Button type="button" size="sm" variant="ghost" onClick={() => void removeMedia("video")}>{t.admin.removeVideo}</Button></div>}</div>
          <p className="text-xs text-muted-foreground md:col-span-2">{t.admin.mediaLimit}</p>
          <div className="flex flex-wrap gap-3 md:col-span-2">
            <Button type="submit" variant="gold" disabled={!!busy}>{busy ?? t.admin.publish}</Button>
            <Button type="button" variant="outline" disabled={!!busy} onClick={e => { const f = (e.currentTarget as HTMLButtonElement).form; if (f?.reportValidity()) void submit(e as unknown as FormEvent, false); }}>{t.admin.draft}</Button>
          </div>
        </form>
      </section>

      <section className="space-y-3">
        {data.posts.length === 0 && <p className="text-muted-foreground">{t.admin.empty}</p>}
        {data.posts.map(p => (
          <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-card p-4">
            <div className="min-w-0"><p className="truncate font-semibold">{p.title_en}</p><p className="text-xs text-muted-foreground">{p.published ? t.admin.published : t.admin.drafts} · {new Date(p.created_at).toLocaleDateString()}</p></div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => { setForm({ id: p.id, title_en: p.title_en, title_sw: p.title_sw, body_en: p.body_en, body_sw: p.body_sw, image_path: p.image_path, video_path: p.video_path, published: p.published }); window.scrollTo({ top: 0, behavior: "smooth" }); }}>{t.admin.edit}</Button>
              <Button size="sm" variant="destructive" onClick={() => remove(p.id)}>{t.admin.remove}</Button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
