import { engagements, identity, measurements } from "@/data/portfolio";

export const profile = {
  ...identity,
  role: "Senior Full-Stack Engineer",
  specialties: ["AI-assisted engineering", "React & TypeScript", "C# & .NET"],
  location: "Galicia, Spain",
  cv: "/andrian-kars-cv.pdf",
  cvFileName: "Andrian-Karsanashvili-CV.pdf",
  summary:
    "I build React/TypeScript interfaces and C#/.NET services, and set up AI-agent workflows for analysis, delivery and review, with people making the final call.",
  description:
    "Senior full-stack engineer in Galicia, Spain, with 7+ years of React, TypeScript and C#/.NET and hands-on AI-agent workflows. Open to roles across Europe.",
} as const;

export const aiWorkflow = {
  category: "AI-assisted engineering",
  title: "AI agents with clear handoffs. People make the calls.",
  description:
    "On the Sagitta modernization, I configured GitHub Copilot agents and reusable repository instructions that carry work from legacy analysis to review, with explicit handoffs and build and test checks.",
  steps: [
    {
      id: "analysis",
      title: "Legacy analysis",
      description: "Legacy and React behavior analysed in parallel.",
    },
    {
      id: "design",
      title: "Full-stack design",
      description: "Changes planned across React and C#/ASP.NET Core.",
    },
    {
      id: "implementation",
      title: "Implementation",
      description: "Built with reusable prompts and repository instructions.",
    },
    {
      id: "review",
      title: "Review",
      description: "Build and test checks before human review.",
    },
  ],
  gate: "Human review gates",
  outcome:
    "plus separate product-owner and developer reports covering requirement gaps and UX changes.",
} as const;

type Impact = {
  id: "delivery" | "architecture" | "team";
  category: string;
  title: string;
  description: string;
  evidence: string[];
};

export const impact: readonly Impact[] = [
  {
    id: "delivery",
    category: "Full-stack delivery",
    title: "From legacy data to modern UI.",
    description:
      "I work across React, TypeScript and C#/ASP.NET Core, so fixes land where the problem actually is.",
    evidence: [
      "Modernized legacy ASP administration workflows into React and TypeScript forms, drawers and grids, preserving business rules.",
      "Corrected C#/ASP.NET Core API behavior, repository logic and data mappings behind save failures and inconsistent values.",
      "Built masked credential flows and integrated claims-based permissions and multi-factor authentication configuration.",
      "Owned certificate generation, download, import and in-app PDF previews end to end.",
    ],
  },
  {
    id: "architecture",
    category: "Performance & architecture",
    title: "Less friction. More forward motion.",
    description:
      "I make existing software easier to change, faster to build and safer to release.",
    evidence: [
      "Modernized a legacy UI stack, removing blockers that had stalled feature delivery across multiple product teams.",
      "Built a reusable component library shared across products, improving UI consistency.",
      "Migrated VBScript to cross-browser JavaScript and stabilized IE quirks-mode CSS without breaking the existing experience.",
      "Improved CI/CD pipeline speed by over 200% for faster, more reliable releases.",
    ],
  },
  {
    id: "team",
    category: "Team & delivery",
    title: "Stronger teams. Steadier releases.",
    description: "Good delivery is a team habit. I help build it beyond my own tickets.",
    evidence: [
      "Mentored engineers from junior to senior levels, improving onboarding and code quality.",
      "Coached other teams on development practices and improved Agile workflows to stabilize delivery.",
      "Built tooling that fetches recorded hours from the management tool and submits team time reports automatically, replacing manual entry.",
      "Coordinated AI-assisted Playwright test improvements and code reviews across teams.",
    ],
  },
];

type Metric = {
  id: keyof typeof measurements;
  label: string;
  value: string;
  before?: string;
  note: string;
};

export const metrics: readonly Metric[] = [
  {
    id: "savings",
    ...measurements.savings,
    label: "Engineering effort saved",
    note: "Identified and stopped a risky architectural direction; the release shipped defect-free.",
  },
  {
    id: "builds",
    ...measurements.builds,
    label: "Webpack build time",
    note: "Reworked Webpack configuration and build tooling on Sagitta.",
  },
  {
    id: "renders",
    ...measurements.renders,
    label: "Redundant UI renders",
    note: "Standardized Redux state flows and reorganized the frontend on Sagitta.",
  },
];

type Experience = {
  id: keyof typeof engagements;
  title: string;
  organization: string;
  context: string;
  dates?: { start: string; end?: string };
  label?: string;
  summary: string;
  highlights?: readonly string[];
};

export const experience: readonly Experience[] = [
  {
    id: "recent",
    ...engagements.recent,
    title: "Sagitta modernization & AI-assisted delivery",
    context: "Selected recent work",
    label: "Recent work",
    summary:
      "Modernized legacy ASP administration workflows with React, TypeScript and C#/ASP.NET Core, using GitHub Copilot agents for analysis, implementation and review behind human review gates.",
    highlights: [
      "Modernized legacy ASP administration workflows with React and TypeScript: validated forms, editable drawers and searchable grids that preserve business rules.",
      "Developed and corrected C#/ASP.NET Core API behavior, repository logic and data mappings, fixing save failures, date conversion and inconsistent field values.",
      "Built schema-driven forms and paginated grids; extracted shared bulk-delete hooks and API helpers reused across settings pages.",
      "Implemented masked credential reveal and replacement with re-locking after save, and fixed the API to preserve stored values when unchanged.",
      "Integrated claims-based UI permissions and multi-factor authentication configuration with existing access-control patterns.",
      "Improved React Query caching and server-persisted table preferences, fixing stale values, selection state and grid settings.",
      "Configured GitHub Copilot agents and reusable instructions for analysis, design, implementation and review, with explicit handoffs and build/test checks.",
      "Set up AI-assisted requirements comparison with human review gates and separate product-owner and developer reports.",
      "Added Jest and React Testing Library regression tests for validation, secure fields, grid behavior and bulk actions.",
    ],
  },
  {
    id: "certificates",
    ...engagements.certificates,
    title: "Senior Full-Stack Developer",
    context: "Certificates Platform",
    summary:
      "Owned certificate delivery end to end: blob-based document generation, download and import handling, and in-app PDF previews. Coordinated AI-assisted Playwright test improvements and code reviews across teams.",
  },
  {
    id: "import",
    ...engagements.import,
    title: "Front-End Architecture Consultant",
    context: "Import Tool",
    summary:
      "Assessed the frontend architecture, delivered targeted improvements and provided a prioritized roadmap for a more resilient release.",
  },
  {
    id: "agency",
    ...engagements.agency,
    title: "Senior Front-End Developer",
    context: "Agency One",
    summary:
      "Built a reusable component library shared across products, improving UI consistency and reducing duplicated work. Evaluated and integrated third-party libraries against product, maintainability and team needs.",
  },
  {
    id: "sagitta",
    ...engagements.sagitta,
    title: "Full-Stack Engineer",
    context: "Sagitta",
    summary:
      "Cut build times from ~40s to 15–18s and redundant renders from nine to one. Shipped API endpoints and hotfixes for legacy database integration, and migrated VBScript to cross-browser JavaScript.",
  },
  {
    id: "independent",
    ...engagements.independent,
    title: "Independent Software Engineer",
    organization: "Project-based client work",
    context: "Full-stack development",
    summary:
      "Delivered React and Node.js applications end to end, including API integrations, authentication and deployment. Turned static designs into custom WordPress themes for marketing and e-commerce sites, and worked directly with clients on requirements, roadmaps, SEO and post-launch improvements.",
  },
];

export const skillGroups = [
  {
    id: "ai",
    name: "AI-assisted engineering",
    description: "Agents with explicit handoffs and review gates.",
    skills: [
      "GitHub Copilot",
      "Custom agents",
      "Multi-agent workflows",
      "Reusable prompts",
      "Repository instructions",
      "Human review gates",
    ],
  },
  {
    id: "frontend",
    name: "Front end",
    description: "Complex workflows, from state to screen.",
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "Next.js",
      "Redux Toolkit",
      "TanStack Query",
      "Formik & Yup",
      "React Router",
      "SCSS / CSS Modules",
    ],
  },
  {
    id: "backend",
    name: "Back end",
    description: "Services, APIs and legacy data.",
    skills: [
      "C#",
      ".NET",
      "ASP.NET Core",
      "REST APIs",
      "Node.js",
      "NestJS",
      "Express",
      "Legacy database integration",
    ],
  },
  {
    id: "quality",
    name: "Quality & delivery",
    description: "Tested, reviewable, releasable.",
    skills: [
      "Jest",
      "React Testing Library",
      "Playwright",
      "Git / GitLab",
      "CI/CD",
      "Vite",
      "Webpack",
    ],
  },
] as const;

export const education = [
  {
    id: "growth",
    title: "Senior Engineer Growth Program",
    institution: identity.employer,
    year: "2022",
  },
  {
    id: "degree",
    title: "Software Engineering",
    institution: identity.university,
    year: "2020",
  },
] as const;

export const languages = [
  { code: "en", name: "English", level: "Fluent" },
  { code: "de", name: "German", level: "Proficient" },
  { code: "ja", name: "Japanese", level: "Beginner" },
] as const;

export const navigation = {
  label: "Main navigation",
  home: "home",
  download: "Download CV",
  links: [
    { id: "impact", label: "Impact" },
    { id: "experience", label: "Experience" },
    { id: "expertise", label: "Expertise" },
    { id: "contact", label: "Contact" },
  ] as const,
};

export const ui = {
  skip: "Skip to content",
  backTop: "Back to top",
  language: "Language",
  eyebrow: "Full-stack engineering",
  portrait: "Andrian Karsanashvili resting his chin on his hand",
  explore: "Explore my work",
  contact: "Get in touch",
  onLinkedIn: "on LinkedIn",
  newTab: "(opens in a new tab)",
  years: "years",
  engineering: "of software engineering",
  since: "Since 2021",
  availability: "Based in Galicia, Spain. Open to roles in Spain and across Europe.",
  communication:
    "Working language: English. Written communication in Spanish via chat or email with AI-assisted translation.",
  translationNote: null as string | null,
  impact: {
    label: "Selected impact",
    title: ["Good software.", "Better ways to build it."],
    summary:
      "Enterprise products, practical automation, and the work that makes a whole team more effective.",
  },
  experience: {
    label: "Experience",
    title: ["Built over time.", "Across the stack."],
    summary:
      "From client applications to enterprise insurance software. Hands-on delivery across React, .NET and Node.js, architecture decisions and shared responsibility for quality.",
  },
  expertise: {
    label: "Expertise",
    title: ["The right tools.", "And the judgment to use them."],
    summary:
      "Full-stack range across React and .NET, with a practical, reviewable approach to AI-assisted engineering.",
  },
  contactLabel: "Get in touch",
  contactTitle: ["Let's talk about", "what comes next"],
  contactSummary: "Good engineering starts with a conversation.",
  cvStory: "The full story in my CV",
  otherCv: "CV in Spanish",
  present: "Present",
  months: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ] as const,
  highlights: "Highlights",
  education: "Education & development",
  languages: "Languages",
  to: "to",
  notFound: {
    label: "404 / Page not found",
    title: "This page isn't here.",
    text: "The link may have changed. My experience and contact details are on the homepage.",
    home: "Back to the homepage",
  },
};

export const en = {
  profile,
  aiWorkflow,
  impact,
  metrics,
  experience,
  skillGroups,
  education,
  languages,
  navigation,
  ui,
};
