import { useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { publishedNewsOptions } from "@/lib/news-query";
import { useI18n } from "@/lib/i18n";
import { Section, SectionTitle } from "./Layout";

export function NewsMedia({ path, kind, title }: { path: string; kind: "image" | "video"; title: string }) {
  const { data } = useQuery({ queryKey: ["news-media", path], queryFn: async () => {
    const { data, error } = await supabase.storage.from("news-media").createSignedUrl(path, 3600);
    if (error) throw error;
    return data.signedUrl;
  }, staleTime: 3000000, refetchInterval: 3000000 });
  if (!data) return null;
  return kind === "image" ? <img src={data} alt={title} loading="lazy" className="aspect-video w-full object-cover" /> : <video src={data} controls preload="metadata" aria-label={title} className="aspect-video w-full bg-navy-deep" />;
}
export function PublishedNews() {
  const { data: posts } = useSuspenseQuery(publishedNewsOptions);
  const { lang, t } = useI18n();
  if (!posts.length) return null;
  return <Section><SectionTitle title={t.admin.latest} /><div className="grid items-start gap-8 md:grid-cols-2">{posts.map(post => {
    const title = lang === "en" ? post.title_en : post.title_sw;
    return <article key={post.id} className="overflow-hidden rounded-lg border bg-card">
      {post.image_path && <NewsMedia path={post.image_path} kind="image" title={title} />}
      {post.video_path && <NewsMedia path={post.video_path} kind="video" title={title} />}
      <div className="p-6"><p className="text-xs text-muted-foreground">{new Date(post.created_at).toLocaleDateString(lang === "en" ? "en-GB" : "sw-TZ")}</p><h2 className="mt-3 break-words text-2xl font-bold text-navy">{title}</h2><p className="mt-4 whitespace-pre-wrap break-words leading-relaxed text-muted-foreground">{lang === "en" ? post.body_en : post.body_sw}</p></div>
    </article>;
  })}</div></Section>;
}