import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/SimplePage";

export const Route = createFileRoute("/contact")({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: "Contact MineBridge Africa — Chunya, Mbeya, Tanzania" },
    { name: "description", content: "Contact MineBridge Africa at P.O. Box 73, Chunya, Mbeya, Tanzania. WhatsApp +255750603945 or email clintonmsety@gmail.com in English or Kiswahili." },
    { property: "og:title", content: "Contact MineBridge Africa — Chunya, Mbeya, Tanzania" },
    { property: "og:description", content: "Contact MineBridge Africa at P.O. Box 73, Chunya, Mbeya, Tanzania. WhatsApp +255750603945 or email clintonmsety@gmail.com in English or Kiswahili." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { property: "og:url", content: "https://minebridgeafrica.lovable.app/contact" },
  ], links: [{ rel: "canonical", href: "https://minebridgeafrica.lovable.app/contact" }] }),
  component: () => <SimplePage page="contact" />,
});
