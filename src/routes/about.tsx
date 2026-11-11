import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/SimplePage";

export const Route = createFileRoute("/about")({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: "About MineBridge Africa — Chunya, Tanzania" },
    { name: "description", content: "Meet MineBridge Africa, a mining-sector connection platform based in Chunya, Mbeya, connecting miners, investors and professionals across Africa — led by founder and CEO Clinton Msety." },
    { property: "og:title", content: "About MineBridge Africa — Chunya, Tanzania" },
    { property: "og:description", content: "Meet MineBridge Africa, a mining-sector connection platform based in Chunya, Mbeya, connecting miners, investors and professionals across Africa — led by founder and CEO Clinton Msety." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { property: "og:url", content: "https://minebridgeafrica.lovable.app/about" },
  ], links: [{ rel: "canonical", href: "https://minebridgeafrica.lovable.app/about" }] }),
  component: () => <SimplePage page="about" />,
});
