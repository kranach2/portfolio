// PROTOTYPE data for the Work page variants. Inline on purpose: the real site
// will move this into schema-validated content files.
// ADR 0002: the Client is never named. Placeholder projects are not expanded.

export const person = {
  name: "Kishor Rana Chhetri",
  headline: "Software Engineer",
  pitch:
    "I design, build and deploy full-stack web applications, REST APIs and cloud integrations with C#/.NET, TypeScript and Microsoft Azure.",
  location: "Perth, WA",
  email: "kishor.ranac@gmail.com",
  linkedin: "https://www.linkedin.com/in/kishor-ranachhetri",
  github: "https://github.com/kranach2",
  resume: "/resume.pdf",
};

export const about =
  "5+ years building end to end, from data model and API to front end, infrastructure and CI/CD in Azure DevOps. Security-first on identity: Azure AD B2C, OAuth 2.0 and OpenID Connect.";

export type Project = {
  slug: string;
  order: number;
  draft?: boolean;
  title: string;
  kind: "Client work" | "Personal work";
  summary: string;
  period: string;
  stack: string[];
  // Nodes for the placeholder architecture sketch in hover previews.
  flow: string[];
};

const allProjects: Project[] = [
  {
    slug: "supplies-ordering",
    order: 1,
    title: "Supplies ordering app",
    kind: "Client work",
    summary:
      "An ordering application for fishing trip supplies for a WA fisheries industry body, with API-key-secured REST endpoints and email notifications.",
    period: "2023 – now",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "AWS"],
    flow: ["Next.js", "REST API", "PostgreSQL"],
  },
  {
    slug: "financial-sync",
    order: 2,
    title: "Xero → Dataverse financial sync",
    kind: "Client work",
    summary:
      "An integration syncing journals and spend and receive money transactions from Xero into Dynamics 365 Project Operations.",
    period: "2023 – now",
    stack: ["Logic Apps", "Azure Functions", "Dataverse", "Xero API"],
    flow: ["Xero", "Logic Apps", "Dataverse"],
  },
  {
    slug: "moodle-on-azure",
    order: 3,
    title: "Highly available Moodle on Azure",
    kind: "Client work",
    summary:
      "A highly available Moodle LMS on Azure with single sign-on through Azure AD B2C and OpenID Connect.",
    period: "2023 – now",
    stack: ["Load Balancer", "VM Scale Sets", "Nginx", "Azure AD B2C", "OIDC"],
    flow: ["Load Balancer", "VM Scale Set", "B2C SSO"],
  },
  {
    slug: "member-portal",
    order: 4,
    title: "Power Pages member portal",
    kind: "Client work",
    summary:
      "A member portal with Azure AD B2C sign-in, a Content Security Policy, custom forms and Power Automate flows.",
    period: "2023 – now",
    stack: ["Power Pages", "Azure AD B2C", "Power Automate", "Dataverse"],
    flow: ["Power Pages", "Power Automate", "Dataverse"],
  },
  {
    slug: "draft-check",
    order: 5,
    draft: true,
    title: "DRAFT: this must never render",
    kind: "Personal work",
    summary: "If you can see this, the draft filter is broken.",
    period: "—",
    stack: [],
    flow: [],
  },
];

export const projects = allProjects
  .filter((p) => !p.draft)
  .sort((a, b) => a.order - b.order);

export const featuredCertifications = [
  { name: "Dynamics 365 + Power Platform Solution Architect Expert", issuer: "Microsoft", year: 2023 },
  { name: "Azure Developer Associate", issuer: "Microsoft", year: 2024 },
  { name: "Azure Administrator Associate", issuer: "Microsoft", year: 2025 },
  { name: "Azure AI Engineer Associate", issuer: "Microsoft", year: 2026 },
];
