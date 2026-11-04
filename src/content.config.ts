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

// e.g. "Mar 2023".
const monthYear = z.string().regex(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}$/);

const experience = defineCollection({
  loader: file("src/content/experience.yaml"),
  schema: z.object({
    // The software Roles, shown in full in this order.
    roles: z
      .array(
        z.object({
          title: z.string().min(1),
          employer: z.string().min(1),
          location: z.string().min(1),
          start: monthYear,
          end: z.union([monthYear, z.literal("Present")]),
          did: z.array(z.string().min(1)).min(1),
        }),
      )
      .min(1),
    // Earlier roles, condensed to a single line.
    earlier: z.string().min(1),
  }),
});

const education = defineCollection({
  loader: file("src/content/education.yaml"),
  schema: z
    .object({
      qualification: z.string().min(1),
      institution: z.string().min(1),
      location: z.string().min(1),
      start: z.number().int(),
      end: z.number().int(),
    })
    .refine((e) => e.end >= e.start, { message: "end is before start", path: ["end"] }),
});

// Issuers in the order the Info page groups them.
export const issuers = ["Microsoft", "AWS", "CompTIA"] as const;

const certifications = defineCollection({
  loader: file("src/content/certifications.yaml"),
  schema: z
    .object({
      issuer: z.enum(issuers),
      name: z.string().min(1),
      year: z.number().int().optional(),
      // CompTIA's in place of a year, e.g. "Jan 2027".
      validUntil: z.string().min(1).optional(),
      // Optional: without one the Certification renders as plain text.
      verify: z.url().optional(),
      featured: z.boolean().default(false),
    })
    .refine((c) => (c.year === undefined) !== (c.validUntil === undefined), {
      message: "give exactly one of year or validUntil",
      path: ["year"],
    })
    .refine((c) => c.validUntil === undefined || c.issuer === "CompTIA", {
      message: "validUntil is for CompTIA only",
      path: ["validUntil"],
    }),
});

// The résumé's Skills categories, all of them, in this order.
const skillCategories = [
  "Languages",
  "Frameworks & Libraries",
  "Cloud",
  "DevOps",
  "Data",
  "Microsoft Business Apps",
  "Identity & Security",
  "Practices",
];

const skills = defineCollection({
  loader: file("src/content/skills.yaml"),
  schema: z.object({
    categories: z
      .array(z.object({ name: z.string().min(1), items: z.array(z.string().min(1)).min(1) }))
      .refine((cs) => cs.map((c) => c.name).join("|") === skillCategories.join("|"), {
        message: `categories must be exactly, in order: ${skillCategories.join("; ")}`,
      }),
  }),
});

export const collections = { projects, profile, experience, education, certifications, skills };
