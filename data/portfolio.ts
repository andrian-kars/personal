export const profile = {
  name: "Andrian Karsanashvili",
  firstName: "Andrian",
  lastName: "Karsanashvili",
  role: "Senior Full-Stack Engineer",
  specialties: ["AI-assisted engineering", "React & TypeScript", "C# & .NET"],
  location: "Europe",
  experience: "7+",
  email: "andrian.karsanashvili@gmail.com",
  phone: "+380688254664",
  phoneDisplay: "+380 68 825 46 64",
  url: "https://andrian-kars.com",
  linkedin: "https://www.linkedin.com/in/andrian-kars/",
  github: "https://github.com/andrian-kars",
  cv: "/andrian-kars-cv.pdf",
  cvFileName: "Andrian-Karsanashvili-CV.pdf",
  summary:
    "I build React/TypeScript interfaces and C#/.NET services, and set up AI-agent workflows for analysis, delivery and review, with people making the final call.",
  description:
    "Senior full-stack engineer: React, TypeScript and C#/.NET, with hands-on AI-agent workflows. 7+ years modernizing enterprise software and helping teams deliver.",
} as const;

export const aiWorkflow = {
  category: "AI-assisted engineering",
  title: "AI agents with clear handoffs. People make the calls.",
  description:
    "On the Sagitta modernization, I configured GitHub Copilot agents and reusable repository instructions that carry work from legacy analysis to review, with explicit handoffs and build and test checks.",
  steps: [
    {
      title: "Legacy analysis",
      description: "Legacy and React behavior analysed in parallel.",
    },
    {
      title: "Full-stack design",
      description: "Changes planned across React and C#/ASP.NET Core.",
    },
    {
      title: "Implementation",
      description: "Built with reusable prompts and repository instructions.",
    },
    { title: "Review", description: "Build and test checks before human review." },
  ],
  gate: "Human review gates",
  outcome:
    "plus separate product-owner and developer reports covering requirement gaps and UX changes.",
} as const;

type Impact = {
  category: string;
  title: string;
  description: string;
  evidence: string[];
};

export const impact: readonly Impact[] = [
  {
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
  label: string;
  value: string;
  before?: string;
  note: string;
};

export const metrics: readonly Metric[] = [
  {
    label: "Engineering effort saved",
    value: "$200K+",
    note: "Identified and stopped a risky architectural direction; the release shipped defect-free.",
  },
  {
    label: "Webpack build time",
    before: "~40s",
    value: "15–18s",
    note: "Reworked Webpack configuration and build tooling on Sagitta.",
  },
  {
    label: "Redundant UI renders",
    before: "9",
    value: "1",
    note: "Standardized Redux state flows and reorganized the frontend on Sagitta.",
  },
];

type Experience = {
  title: string;
  organization: string;
  context: string;
  dates?: { start: string; startLabel: string; end?: string; endLabel?: string };
  label?: string;
  summary: string;
  highlights?: readonly string[];
};

export const experience: readonly Experience[] = [
  {
    title: "Sagitta modernization & AI-assisted delivery",
    organization: "EPAM Systems",
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
    title: "Senior Full-Stack Developer",
    organization: "EPAM Systems",
    context: "Certificates Platform",
    dates: { start: "2025-09", startLabel: "Sep 2025" },
    summary:
      "Owned certificate delivery end to end: blob-based document generation, download and import handling, and in-app PDF previews. Coordinated AI-assisted Playwright test improvements and code reviews across teams.",
  },
  {
    title: "Front-End Architecture Consultant",
    organization: "EPAM Systems",
    context: "Import Tool",
    dates: {
      start: "2025-08",
      startLabel: "Aug 2025",
      end: "2025-09",
      endLabel: "Sep 2025",
    },
    summary:
      "Assessed the frontend architecture, delivered targeted improvements and provided a prioritized roadmap for a more resilient release.",
  },
  {
    title: "Senior Front-End Developer",
    organization: "EPAM Systems",
    context: "Agency One",
    dates: {
      start: "2024-06",
      startLabel: "Jun 2024",
      end: "2025-08",
      endLabel: "Aug 2025",
    },
    summary:
      "Built a reusable component library shared across products, improving UI consistency and reducing duplicated work. Evaluated and integrated third-party libraries against product, maintainability and team needs.",
  },
  {
    title: "Full-Stack Engineer",
    organization: "EPAM Systems",
    context: "Sagitta",
    dates: {
      start: "2021-02",
      startLabel: "Feb 2021",
      end: "2024-06",
      endLabel: "Jun 2024",
    },
    summary:
      "Cut build times from ~40s to 15–18s and redundant renders from nine to one. Shipped API endpoints and hotfixes for legacy database integration, and migrated VBScript to cross-browser JavaScript.",
  },
  {
    title: "Independent Software Engineer",
    organization: "Project-based client work",
    context: "Full-stack development",
    dates: {
      start: "2019-03",
      startLabel: "Mar 2019",
      end: "2021-02",
      endLabel: "Feb 2021",
    },
    summary:
      "Delivered React and Node.js applications end to end, including API integrations, authentication and deployment. Turned static designs into custom WordPress themes for marketing and e-commerce sites, and worked directly with clients on requirements, roadmaps, SEO and post-launch improvements.",
  },
];

export const skillGroups = [
  {
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
  { title: "Senior Engineer Growth Program", institution: "EPAM Systems", year: "2022" },
  {
    title: "Software Engineering",
    institution: "Ivan Franko National University of Lviv",
    year: "2020",
  },
] as const;

export const languages = [
  { name: "English", level: "Fluent" },
  { name: "German", level: "Proficient" },
  { name: "Japanese", level: "Beginner" },
] as const;
