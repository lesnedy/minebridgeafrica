import { queryOptions } from "@tanstack/react-query";
import { listPublishedNews } from "./news.functions";
export const publishedNewsOptions = queryOptions({ queryKey: ["published-news"], queryFn: () => listPublishedNews(), staleTime: 30000 });