import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { routeTree } from "@/routeTree.gen";
import { sitemapStaticPaths, sitemapXML } from "./sitemap";

describe("Public sitemap", () => {
  it("includes the ten public content pages but not the sitemap itself", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(sitemapStaticPaths(router)).toEqual(["/", "/about", "/contact", "/directory", "/investors", "/legal", "/miners", "/news", "/opportunities", "/services"]);
  });
  it("uses the published origin and omits invented modification dates", () => {
    const xml = sitemapXML("https://minebridgeafrica.lovable.app", [{ path: "/news" }]);
    expect(xml).toContain("<loc>https://minebridgeafrica.lovable.app/news</loc>");
    expect(xml).not.toContain("<lastmod>");
  });
});