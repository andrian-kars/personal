import { engagements, identity, measurements, publicProjects } from "@/data/portfolio";

export const profile = {
  ...identity,
  role: "Senior Full-Stack Engineer",
  specialties: ["AI-assisted engineering", "React & TypeScript", "C# & .NET"],
  location: "Galicia, Spain",
  cv: "/andrian-kars-cv.pdf",
  cvFileName: "Andrian-Karsanashvili-CV.pdf",
  summary:
    "I modernize complex software across React, TypeScript and .NET, from legacy business rules to reliable production workflows.",
  description:
    "Senior full-stack engineer in Galicia, Spain, with 7+ years of React, TypeScript and C#/.NET and hands-on AI-agent workflows. Open to roles across Europe.",
} as const;

export const aiWorkflow = {
  category: "AI-assisted engineering",
  title: "AI agents with clear handoffs. People make the calls.",
  description:
    "On Sagitta, I configured GitHub Copilot agents and repository instructions for each delivery stage, with build and test checks before human review.",
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
  id: "modernization" | "architecture" | "antelu";
  category: string;
  title: string;
  description: string;
  evidence: string[];
  result: string;
  link?: { href: string; label: string };
  imageAlt?: string;
};

export const impact: readonly Impact[] = [
  {
    id: "modernization",
    category: "Sagitta / Browser modernization",
    title: "A future beyond Internet Explorer.",
    description:
      "A 30-year-old enterprise product with more than 1,000 pages only worked in Internet Explorer. Its retirement put continued access to the product at risk.",
    evidence: [
      "Made legacy workflows work in modern browsers, replacing VBScript with cross-browser JavaScript and resolving IE-specific CSS behavior.",
      "Updated the visual design, then migrated workflows to React and TypeScript while preserving existing business rules.",
    ],
    result: "Kept the product usable beyond IE and modernized its workflows in React.",
  },
  {
    id: "architecture",
    category: "Sagitta / Architecture",
    title: "Challenging an agreed decision.",
    description:
      "An enterprise product built by seven teams of five engineers across Ukraine, India and the US. The agreed approach kept tokens in the ASP business layer and was estimated at 18 months to implement.",
    evidence: [
      "Identified that any navigation bypassing the custom code, including page refresh and browser back/forward, would lose the token.",
      "Challenged the decision after it had been agreed and proposed the standard token management most web applications use. The approach was changed.",
    ],
    result:
      "Delivered in six months instead of the estimated 18, saving a year of work for seven teams. Page refresh and browser navigation worked correctly.",
  },
  {
    id: "antelu",
    category: "Antelu / Public website & CMS",
    title: "A catalogue the business can maintain.",
    description:
      "A children's vehicle-rental business needed a multilingual catalogue with clear enquiry routes and a way to manage vehicles and photos without editing source files.",
    evidence: [
      "Built the Next.js and TypeScript site in Spanish, Galician, English and Ukrainian, with catalogue filters, vehicle pages and direct phone/WhatsApp enquiries.",
      "Integrated Sveltia CMS for vehicles and gallery photos, with image optimization on upload and content validation before publishing.",
    ],
    result:
      "Vehicles and photos can be maintained in a browser-based editor. Changes are versioned in Git and deployed through validated builds, without a separate content database.",
    link: { href: publicProjects.antelu.url, label: "Visit Antelu" },
    imageAlt: "Antelu website showing its vehicle-rental catalogue",
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
    id: "delivery",
    ...measurements.delivery,
    label: "Implementation time (months)",
    note: "Original estimate vs. delivery after I challenged the token-management approach.",
  },
  {
    id: "pipeline",
    ...measurements.pipeline,
    label: "Faster CI/CD pipeline",
    note: "Improved the Sagitta pipeline for faster, more reliable releases.",
  },
  {
    id: "builds",
    ...measurements.builds,
    label: "Webpack build time",
    note: "Reworked Webpack configuration and build tooling on Sagitta.",
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
      "Delivering administration workflows across React, TypeScript and C#/ASP.NET Core, from forms and permissions to API behavior and regression coverage.",
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
      "Cut build times from ~40s to 15–18s, sped up the CI/CD pipeline by over 200% and reduced redundant renders from nine to one. Shipped API endpoints and hotfixes for legacy database integration, and migrated VBScript to cross-browser JavaScript.",
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
    title: ["Real problems.", "Decisions that made a difference."],
    summary:
      "Browser modernization, architectural judgment and a public website with owner-managed content.",
  },
  caseStudy: {
    challenge: "The challenge",
    contribution: "My contribution",
    result: "The result",
  },
  experience: {
    label: "Experience",
    title: ["Built over time.", "Across the stack."],
    summary:
      "From client applications to enterprise insurance software. Hands-on delivery across React, .NET and Node.js, architecture decisions and shared responsibility for quality.",
    crossProject: {
      label: "Across projects",
      items: [
        "Mentored engineers from junior to senior levels, improving onboarding and code quality.",
        "Coached teams on development practices and Agile workflows to stabilize delivery.",
        "Built tooling that fetches recorded hours and submits team time reports automatically.",
      ],
    },
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
