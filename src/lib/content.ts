// The one place pages read content from, so the Draft rule lives here only.
import { getCollection, getEntry, type CollectionEntry } from "astro:content";
import { issuers } from "../content.config";

export type Project = CollectionEntry<"projects">;

// Published Projects: Drafts removed, in ascending `order`.
export async function getPublishedProjects(): Promise<Project[]> {
  const projects = await getCollection("projects", (p) => !p.data.draft);
  return projects.sort((a, b) => a.data.order - b.data.order);
}

export async function getProfile() {
  const entry = await getEntry("profile", "profile");
  if (!entry) throw new Error("src/content/profile.yaml has no `profile` entry");
  return entry.data;
}

export async function getExperience() {
  const entry = await getEntry("experience", "experience");
  if (!entry) throw new Error("src/content/experience.yaml has no `experience` entry");
  return entry.data;
}

// Qualifications, earliest first.
export async function getEducation() {
  const entries = await getCollection("education");
  return entries.map((e) => e.data).sort((a, b) => a.start - b.start);
}

// Certifications grouped by issuer (Microsoft, AWS, CompTIA); within a group,
// Featured first, then newest first.
export async function getCertifications() {
  const all = (await getCollection("certifications")).map((c) => c.data);
  return issuers.map((issuer) => ({
    issuer,
    certifications: all
      .filter((c) => c.issuer === issuer)
      .sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) ||
          (b.year ?? 0) - (a.year ?? 0) ||
          a.name.localeCompare(b.name),
      ),
  }));
}

// Skills categories, each a plain list of items.
export async function getSkills() {
  const entry = await getEntry("skills", "skills");
  if (!entry) throw new Error("src/content/skills.yaml has no `skills` entry");
  return entry.data.categories;
}
