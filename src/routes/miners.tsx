import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/SimplePage";

export const Route = createFileRoute("/miners")({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: "Submit a Mining Project — Tanzania | MineBridge Africa" },
    { name: "description", content: "Share your mining project with MineBridge Africa, based in Chunya, Mbeya. Enquire about potential partners and professional connections by email or WhatsApp." },
    { property: "og:title", content: "Submit a Mining Project — Tanzania | MineBridge Africa" },
    { property: "og:description", content: "Share your mining project with MineBridge Africa, based in Chunya, Mbeya. Enquire about potential partners and professional connections by email or WhatsApp." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { property: "og:url", content: "https://minebridgeafrica.lovable.app/miners" },
  ], links: [{ rel: "canonical", href: "https://minebridgeafrica.lovable.app/miners" }] }),
  component: () => <SimplePage page="miners" />,
});
