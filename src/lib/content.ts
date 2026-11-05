// The one place pages read content from, so the Draft rule lives here only.
import { getCollection, getEntry, type CollectionEntry } from "astro:content";
import { issuers } from "../content.config";

export type Project = CollectionEntry<"projects">;

// Published Projects: Drafts removed, in ascending `order`.
export async function getPublishedProjects(): Promise<Project[]> {
  const projects = await getCollection("projects", (p) => !p.data.draft);
  return projects.sort((a, b) => a.data.order - b.data.order);
}

// The address of a Project's page.
export const projectPath = (project: Project) => `/work/${project.id}`;

// A data file holding one entry keyed by the collection's own name.
async function getSingle<C extends "profile" | "experience" | "skills">(name: C) {
  const entry = await getEntry(name, name);
  if (!entry) throw new Error(`src/content/${name}.yaml has no \`${name}\` entry`);
  return entry.data as CollectionEntry<C>["data"];
}

export const getProfile = () => getSingle("profile");
export const getExperience = () => getSingle("experience");

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
export const getSkills = async () => (await getSingle("skills")).categories;
