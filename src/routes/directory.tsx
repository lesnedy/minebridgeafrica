import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/SimplePage";

export const Route = createFileRoute("/directory")({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: "Mining Professional Directory Examples — MineBridge Africa" },
    { name: "description", content: "Browse illustrative profiles of geologists, engineers, laboratories, suppliers and consultants in Tanzania, or enquire about listing your mining services." },
    { property: "og:title", content: "Mining Professional Directory Examples — MineBridge Africa" },
    { property: "og:description", content: "Browse illustrative profiles of geologists, engineers, laboratories, suppliers and consultants in Tanzania, or enquire about listing your mining services." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { property: "og:url", content: "https://minebridgeafrica.lovable.app/directory" },
  ], links: [{ rel: "canonical", href: "https://minebridgeafrica.lovable.app/directory" }] }),
  component: () => <SimplePage page="directory" />,
});
