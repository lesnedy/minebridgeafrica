import { z } from "zod";

export const postSchema = z.object({
  id: z.string().uuid().optional(),
  title_en: z.string().trim().min(1).max(200),
  title_sw: z.string().trim().min(1).max(200),
  body_en: z.string().trim().min(1).max(20000),
  body_sw: z.string().trim().min(1).max(20000),
  image_path: z.string().max(300).nullable(),
  video_path: z.string().max(300).nullable(),
  published: z.boolean(),
});
export type PostInput = z.infer<typeof postSchema>;
export function canPublish(role: string | null) { return role === "admin"; }
export function validMedia(file: { type: string; size: number }, kind: "image" | "video") {
  return file.size > 0 && file.size <= 50 * 1024 * 1024 && (kind === "image" ? ["image/jpeg", "image/png", "image/webp"] : ["video/mp4", "video/webm"]).includes(file.type);
}