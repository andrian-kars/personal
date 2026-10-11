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

export const engagements = {
  recent: { organization: identity.employer },
  certificates: { organization: identity.employer, dates: { start: "2025-09" } },
  import: {
    organization: identity.employer,
    dates: { start: "2025-08", end: "2025-09" },
  },
  agency: {
    organization: identity.employer,
    dates: { start: "2024-06", end: "2025-08" },
  },
  sagitta: {
    organization: identity.employer,
    dates: { start: "2021-02", end: "2024-06" },
  },
  independent: { dates: { start: "2019-03", end: "2021-02" } },
} as const;

export const measurements = {
  savings: { value: "$200K+" },
  builds: { before: "~40s", value: "15–18s" },
  renders: { before: "9", value: "1" },
} as const;
