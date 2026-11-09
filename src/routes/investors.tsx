import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/SimplePage";

export const Route = createFileRoute("/investors")({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: "Mining Investor Enquiries — Tanzania | MineBridge Africa" },
    { name: "description", content: "Explore the investor journey, request mining project information and send your investment interests to MineBridge Africa by WhatsApp or email." },
    { property: "og:title", content: "Mining Investor Enquiries — Tanzania | MineBridge Africa" },
    { property: "og:description", content: "Explore the investor journey, request mining project information and send your investment interests to MineBridge Africa by WhatsApp or email." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { property: "og:url", content: "https://minebridgeafrica.lovable.app/investors" },
  ], links: [{ rel: "canonical", href: "https://minebridgeafrica.lovable.app/investors" }] }),
  component: () => <SimplePage page="investors" />,
});
