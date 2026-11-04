import { publishedProjects } from "./published-projects";

// Every page a Visitor can reach, including the not-found page.
export const everyPage = ["/", "/info", ...publishedProjects.map((p) => p.path), "/no-such-page"];
