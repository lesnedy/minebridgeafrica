import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/SimplePage";

export const Route = createFileRoute("/opportunities")({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: "Tanzania Mining Opportunity Examples — MineBridge Africa" },
    { name: "description", content: "Explore illustrative gold, gemstone, copper and coal project listings in Tanzania, with sample partnership types and independent due-diligence guidance." },
    { property: "og:title", content: "Tanzania Mining Opportunity Examples — MineBridge Africa" },
    { property: "og:description", content: "Explore illustrative gold, gemstone, copper and coal project listings in Tanzania, with sample partnership types and independent due-diligence guidance." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { property: "og:url", content: "https://minebridgeafrica.lovable.app/opportunities" },
  ], links: [{ rel: "canonical", href: "https://minebridgeafrica.lovable.app/opportunities" }] }),
  component: () => <SimplePage page="opportunities" />,
});
