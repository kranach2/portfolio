// Content collections. Every file is validated against its schema at build
// time; a schema failure fails the build.
import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ pattern: "*.md", base: "src/content/projects" }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().min(1),
        kind: z.enum(["Client work", "Personal work"]),
        // One line: the Work page hover preview and the meta description.
        summary: z.string().min(1),
        // Ascending on the Work page.
        order: z.number().int(),
        // Drafts are excluded everywhere; see src/lib/content.ts.
        draft: z.boolean().default(false),
        // Shown only when present. Leave unset when the sources give no dates.
        period: z.string().min(1).optional(),
        // All on the Project page, the first 3 on the Work page.
        stack: z.array(z.string().min(1)).min(1),
        // Nodes of the hover preview's architecture sketch.
        previewFlow: z.array(z.string().min(1)).min(2).optional(),
        diagram: z.object({ src: image(), alt: z.string().min(1) }).optional(),
        links: z.object({ code: z.url().optional(), demo: z.url().optional() }).optional(),
      })
      .refine((p) => !p.links || p.kind === "Personal work", {
        message: "links are for Personal work only",
        path: ["links"],
      }),
});

const profile = defineCollection({
  loader: file("src/content/profile.yaml"),
  schema: z.object({
    name: z.string().min(1),
    headline: z.string().min(1),
    pitch: z.string().min(1),
    location: z.string().min(1),
    email: z.email(),
    linkedin: z.url(),
    github: z.url(),
    // The Info page intro paragraph.
    intro: z.string().min(1),
  }),
});

export const collections = { projects, profile };
