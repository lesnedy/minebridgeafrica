import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/SimplePage";

export const Route = createFileRoute("/services")({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: "Mining Connection & Project Support Services — MineBridge Africa" },
    { name: "description", content: "Explore mining opportunity showcases, investor introductions, project profiling and professional connections offered by MineBridge Africa in Tanzania." },
    { property: "og:title", content: "Mining Connection & Project Support Services — MineBridge Africa" },
    { property: "og:description", content: "Explore mining opportunity showcases, investor introductions, project profiling and professional connections offered by MineBridge Africa in Tanzania." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { property: "og:url", content: "https://minebridgeafrica.lovable.app/services" },
  ], links: [{ rel: "canonical", href: "https://minebridgeafrica.lovable.app/services" }] }),
  component: () => <SimplePage page="services" />,
});
