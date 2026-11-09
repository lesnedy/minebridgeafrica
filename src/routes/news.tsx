import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/SimplePage";
import { publishedNewsOptions } from "@/lib/news-query";

export const Route = createFileRoute("/news")({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: "Tanzania Mining News & Insights — MineBridge Africa" },
    { name: "description", content: "View mining-site photos and video alongside illustrative mining news and education topics on gold prices, responsible mining and investor due diligence." },
    { property: "og:title", content: "Tanzania Mining News & Insights — MineBridge Africa" },
    { property: "og:description", content: "View mining-site photos and video alongside illustrative mining news and education topics on gold prices, responsible mining and investor due diligence." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { property: "og:url", content: "https://minebridgeafrica.lovable.app/news" },
  ], links: [{ rel: "canonical", href: "https://minebridgeafrica.lovable.app/news" }] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(publishedNewsOptions).catch(() => []),
  component: () => <SimplePage page="news" />,
});
