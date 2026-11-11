import { createFileRoute } from "@tanstack/react-router";
import { AuthCard } from "@/components/site/AuthCard";

export const Route = createFileRoute("/auth")({
  staticData: { sitemap: false },
  head: () => ({ meta: [
    { title: "Admin Login — MineBridge Africa" },
    { name: "description", content: "Sign in to the MineBridge Africa news desk to publish mining news, photos and video." },
    { property: "og:title", content: "Admin Login — MineBridge Africa" },
    { property: "og:description", content: "Sign in to the MineBridge Africa news desk." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex" },
  ] }),
  component: AuthCard,
});
