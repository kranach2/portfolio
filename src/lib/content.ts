// The one place pages read content from, so the Draft rule lives here only.
import { getCollection, getEntry, type CollectionEntry } from "astro:content";

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
