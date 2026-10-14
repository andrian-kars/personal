export const identity = {
  name: "Andrian Karsanashvili",
  firstName: "Andrian",
  lastName: "Karsanashvili",
  experience: "7+",
  email: "andrian.karsanashvili@gmail.com",
  phone: "+380688254664",
  phoneDisplay: "+380 68 825 46 64",
  url: "https://andrian-kars.com",
  linkedin: "https://www.linkedin.com/in/andrian-kars/",
  github: "https://github.com/andrian-kars",
  employer: "EPAM Systems",
  university: "Ivan Franko National University of Lviv",
  languageCodes: ["en", "de", "ja"],
} as const;

export const employment = {
  organization: identity.employer,
  client: "Vertafore",
  start: "2021-02",
} as const;

export const engagements = {
  recent: { organization: identity.employer, dates: { start: "2026-07" } },
  certificates: {
    organization: identity.employer,
    dates: { start: "2025-05", end: "2026-07" },
  },
  agency: {
    organization: identity.employer,
    dates: { start: "2024-01", end: "2025-05" },
  },
  sagitta: {
    organization: identity.employer,
    dates: { start: "2021-02", end: "2024-01" },
  },
  independent: { dates: { start: "2019-03", end: "2021-02" } },
} as const;

export const measurements = {
  delivery: { before: "18", value: "6" },
  pipeline: { value: "200%+" },
  builds: { before: "~40s", value: "15–18s" },
} as const;

export const publicProjects = {
  antelu: { url: "https://antelu.es" },
} as const;
