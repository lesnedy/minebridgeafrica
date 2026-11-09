import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/SimplePage";

export const Route = createFileRoute("/legal")({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: "Mining Disclaimers, Privacy & Terms — MineBridge Africa" },
    { name: "description", content: "Read MineBridge Africa privacy terms, verification policy, mining investment risk disclosure and data-protection information before making an enquiry." },
    { property: "og:title", content: "Mining Disclaimers, Privacy & Terms — MineBridge Africa" },
    { property: "og:description", content: "Read MineBridge Africa privacy terms, verification policy, mining investment risk disclosure and data-protection information before making an enquiry." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { property: "og:url", content: "https://minebridgeafrica.lovable.app/legal" },
  ], links: [{ rel: "canonical", href: "https://minebridgeafrica.lovable.app/legal" }] }),
  component: () => <SimplePage page="legal" />,
});
