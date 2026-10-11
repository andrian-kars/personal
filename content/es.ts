import { engagements, identity, measurements, publicProjects } from "@/data/portfolio";
import { en } from "./en";
import type { Content, Ids } from "./types";

type Item<List extends readonly unknown[]> = List[number];

const steps: Record<
  Ids<typeof en.aiWorkflow.steps>,
  Omit<Item<Content["aiWorkflow"]["steps"]>, "id">
> = {
  analysis: {
    title: "Análisis del sistema heredado",
    description: "Análisis en paralelo del comportamiento heredado y de React.",
  },
  design: {
    title: "Diseño full-stack",
    description: "Planificación de cambios en React y C#/ASP.NET Core.",
  },
  implementation: {
    title: "Implementación",
    description: "Desarrollo con prompts e instrucciones de repositorio reutilizables.",
  },
  review: {
    title: "Revisión",
    description: "Comprobaciones de compilación y pruebas antes de la revisión humana.",
  },
};

const impact: Record<Ids<typeof en.impact>, Omit<Item<Content["impact"]>, "id">> = {
  modernization: {
    category: "Sagitta / Modernización para navegadores",
    title: "Un futuro más allá de Internet Explorer.",
    description:
      "Un producto empresarial de 30 años con más de 1000 páginas solo funcionaba en Internet Explorer. La retirada del navegador ponía en riesgo el acceso al producto.",
    evidence: [
      "Adapté los flujos heredados a navegadores modernos, sustituyendo VBScript por JavaScript compatible con varios navegadores y resolviendo comportamientos de CSS específicos de IE.",
      "Actualicé el diseño visual y después migré flujos a React y TypeScript, conservando las reglas de negocio existentes.",
    ],
    result:
      "Mantuve el producto operativo más allá de IE y modernicé sus flujos con React.",
  },
  architecture: {
    category: "Sagitta / Arquitectura",
    title: "Cuestionar una decisión ya tomada.",
    description:
      "Un producto empresarial desarrollado por siete equipos de cinco profesionales en Ucrania, India y Estados Unidos. El enfoque acordado guardaba los tokens en la capa de negocio de ASP y se estimaba que implementarlo llevaría 18 meses.",
    evidence: [
      "Detecté que cualquier navegación que no pasara por el código personalizado, incluida la recarga de la página y los botones de atrás y adelante, perdería el token.",
      "Cuestioné la decisión cuando ya estaba acordada y propuse la gestión de tokens estándar que utiliza la mayoría de las aplicaciones web. El enfoque se modificó.",
    ],
    result:
      "Se completó en seis meses en lugar de los 18 estimados, lo que ahorró un año de trabajo a siete equipos. La recarga de páginas y la navegación del navegador funcionaban correctamente.",
  },
  antelu: {
    category: "Antelu / Web pública y CMS",
    title: "Un catálogo que el negocio puede mantener.",
    description:
      "Un negocio de alquiler de vehículos infantiles necesitaba un catálogo multilingüe con vías de consulta claras y una forma de gestionar vehículos y fotos sin editar archivos de código.",
    evidence: [
      "Desarrollé la web con Next.js y TypeScript en español, gallego, inglés y ucraniano, con filtros de catálogo, páginas de vehículos y consultas directas por teléfono y WhatsApp.",
      "Integré Sveltia CMS para gestionar vehículos y fotos de la galería, con optimización de imágenes al subirlas y validación del contenido antes de publicar.",
    ],
    result:
      "Los vehículos y las fotos se pueden gestionar desde un editor en el navegador. Los cambios se versionan en Git y se publican mediante compilaciones validadas, sin una base de datos de contenido independiente.",
    link: { href: publicProjects.antelu.url, label: "Visitar Antelu" },
    imageAlt: "Web de Antelu con su catálogo de vehículos de alquiler",
  },
};

const metrics: Record<
  Ids<typeof en.metrics>,
  Pick<Item<Content["metrics"]>, "label" | "note">
> = {
  delivery: {
    label: "Tiempo de implementación (meses)",
    note: "Estimación inicial frente a la entrega tras cuestionar el enfoque de gestión de tokens.",
  },
  pipeline: {
    label: "Proceso de CI/CD más rápido",
    note: "Mejoré el proceso de Sagitta para lograr entregas más rápidas y fiables.",
  },
  builds: {
    label: "Tiempo de compilación de Webpack",
    note: "Reorganicé la configuración de Webpack y las herramientas de compilación de Sagitta.",
  },
};

// Official job titles and project names stay in English, matching the Spanish CV.
const experience: Record<
  Ids<typeof en.experience>,
  Omit<Item<Content["experience"]>, "id" | "dates">
> = {
  recent: {
    title: "Modernización de Sagitta y desarrollo asistido por IA",
    organization: identity.employer,
    context: "Trabajo reciente destacado",
    label: "Trabajo reciente",
    summary:
      "Desarrollo flujos administrativos con React, TypeScript y C#/ASP.NET Core, desde formularios y permisos hasta el comportamiento de las API y las pruebas de regresión.",
    highlights: [
      "Modernicé flujos administrativos de ASP heredado con React y TypeScript: formularios con validación, paneles editables y tablas con búsqueda que conservan las reglas de negocio.",
      "Desarrollé y corregí API de C#/ASP.NET Core, lógica de repositorios y mapeos de datos para resolver errores de guardado, conversiones de fechas y valores incoherentes.",
      "Implementé formularios basados en esquemas y tablas paginadas; extraje hooks de eliminación masiva y utilidades de API compartidos entre páginas de configuración.",
      "Implementé la visualización y sustitución de credenciales enmascaradas, con bloqueo tras el guardado, y corregí la API para conservar los valores almacenados cuando no cambian.",
      "Integré permisos de interfaz basados en claims y la configuración de autenticación multifactor con los patrones de control de acceso existentes.",
      "Mejoré la caché de React Query y las preferencias de tablas persistidas en el servidor, corrigiendo valores obsoletos, estados de selección y configuraciones incoherentes.",
      "Configuré agentes de GitHub Copilot e instrucciones reutilizables para el análisis, el diseño, la implementación y la revisión, con traspasos explícitos entre etapas y comprobaciones de compilación y pruebas.",
      "Configuré la comparación de requisitos asistida por IA, con validación humana e informes separados para responsables de producto y desarrolladores.",
      "Añadí pruebas de regresión con Jest y React Testing Library para validación, campos sensibles, comportamiento de tablas y acciones masivas.",
    ],
  },
  certificates: {
    title: "Senior Full-Stack Developer",
    organization: identity.employer,
    context: "Certificates Platform",
    summary:
      "Fui responsable del flujo completo de certificados: generación de documentos mediante blobs, descarga, importación y previsualización de PDF en la aplicación. Coordiné mejoras de pruebas con Playwright y revisiones de código asistidas por IA entre equipos.",
  },
  import: {
    title: "Front-End Architecture Consultant",
    organization: identity.employer,
    context: "Import Tool",
    summary:
      "Evalué la arquitectura del frontend, implementé mejoras concretas y entregué una hoja de ruta priorizada para lograr versiones más robustas.",
  },
  agency: {
    title: "Senior Front-End Developer",
    organization: identity.employer,
    context: "Agency One",
    summary:
      "Desarrollé una biblioteca de componentes compartida entre productos para mejorar la coherencia visual y reducir trabajo duplicado. Evalué e integré bibliotecas de terceros según los requisitos del producto, la mantenibilidad y las necesidades del equipo.",
  },
  sagitta: {
    title: "Full-Stack Engineer",
    organization: identity.employer,
    context: "Sagitta",
    summary:
      "Reduje la compilación de unos 40 s a 15–18 s, aceleré el proceso de CI/CD en más de un 200% y reduje los renderizados redundantes de nueve a uno. Implementé endpoints y correcciones para la integración con bases de datos heredadas y migré VBScript a JavaScript compatible con varios navegadores.",
  },
  independent: {
    title: "Independent Software Engineer",
    organization: "Proyectos para clientes",
    context: "Desarrollo full-stack",
    summary:
      "Entregué aplicaciones React y Node.js de principio a fin, incluidas integraciones de API, autenticación y despliegue. Convertí diseños estáticos en temas WordPress para sitios comerciales y de comercio electrónico, y trabajé directamente con clientes en requisitos, planificación, SEO y mejoras posteriores al lanzamiento.",
  },
};

const skillGroups: Record<
  Ids<typeof en.skillGroups>,
  Omit<Item<Content["skillGroups"]>, "id">
> = {
  ai: {
    name: "Ingeniería asistida por IA",
    description: "Agentes con traspasos explícitos y validación humana.",
    skills: [
      "GitHub Copilot",
      "Agentes personalizados",
      "Flujos multiagente",
      "Prompts reutilizables",
      "Instrucciones del repositorio",
      "Validación humana",
    ],
  },
  frontend: {
    name: "Frontend",
    description: "Flujos complejos, del estado a la interfaz.",
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "Next.js",
      "Redux Toolkit",
      "TanStack Query",
      "Formik y Yup",
      "React Router",
      "SCSS / CSS Modules",
    ],
  },
  backend: {
    name: "Backend",
    description: "Servicios, API y datos heredados.",
    skills: [
      "C#",
      ".NET",
      "ASP.NET Core",
      "API REST",
      "Node.js",
      "NestJS",
      "Express",
      "Integración con bases de datos heredadas",
    ],
  },
  quality: {
    name: "Calidad y entrega",
    description: "Código probado, revisable y listo para publicar.",
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
};

const education: Record<
  Ids<typeof en.education>,
  Pick<Item<Content["education"]>, "title" | "institution">
> = {
  growth: { title: "Senior Engineer Growth Program", institution: identity.employer },
  degree: { title: "Ingeniería de Software", institution: identity.university },
};

const languages: Record<
  Item<typeof en.languages>["code"],
  Pick<Item<Content["languages"]>, "name" | "level">
> = {
  en: { name: "Inglés", level: "Fluido" },
  de: { name: "Alemán", level: "Avanzado" },
  ja: { name: "Japonés", level: "Principiante" },
};

const links: Record<Ids<typeof en.navigation.links>, string> = {
  impact: "Impacto",
  experience: "Experiencia",
  expertise: "Competencias",
  contact: "Contacto",
};

export const es: Content = {
  profile: {
    ...identity,
    role: "Ingeniero full-stack sénior",
    specialties: ["Ingeniería asistida por IA", "React y TypeScript", "C# y .NET"],
    location: "Galicia, España",
    cv: "/andrian-kars-cv-es.pdf",
    cvFileName: "Andrian-Karsanashvili-CV-ES.pdf",
    summary:
      "Modernizo software complejo con React, TypeScript y .NET, desde las reglas de negocio heredadas hasta flujos fiables en producción.",
    description:
      "Ingeniero full-stack sénior en Galicia, España: más de 7 años con React, TypeScript y C#/.NET y flujos de agentes de IA. Abierto a oportunidades en Europa.",
  },
  aiWorkflow: {
    category: "Ingeniería asistida por IA",
    title: "Agentes de IA con traspasos claros. Las personas deciden.",
    description:
      "En Sagitta, configuré agentes de GitHub Copilot e instrucciones del repositorio para cada etapa de desarrollo, con comprobaciones de compilación y pruebas antes de la revisión humana.",
    steps: en.aiWorkflow.steps.map(({ id }) => ({ id, ...steps[id] })),
    gate: "Validación humana",
    outcome:
      "con informes separados para responsables de producto y desarrolladores sobre carencias de requisitos y cambios de experiencia de usuario.",
  },
  impact: en.impact.map(({ id }) => ({ id, ...impact[id] })),
  metrics: en.metrics.map(({ id }) => ({ id, ...measurements[id], ...metrics[id] })),
  experience: en.experience.map(({ id }) => ({
    id,
    ...engagements[id],
    ...experience[id],
  })),
  skillGroups: en.skillGroups.map(({ id }) => ({ id, ...skillGroups[id] })),
  education: en.education.map(({ id, year }) => ({ id, year, ...education[id] })),
  languages: en.languages.map(({ code }) => ({ code, ...languages[code] })),
  navigation: {
    label: "Navegación principal",
    home: "inicio",
    download: "Descargar CV",
    links: en.navigation.links.map(({ id }) => ({ id, label: links[id] })),
  },
  ui: {
    skip: "Saltar al contenido",
    backTop: "Volver arriba",
    language: "Idioma",
    eyebrow: "Ingeniería full-stack",
    portrait: "Andrian Karsanashvili con la barbilla apoyada en la mano",
    explore: "Ver mi trabajo",
    contact: "Contactar",
    newTab: "(se abre en una pestaña nueva)",
    years: "años",
    engineering: "en ingeniería de software",
    since: "Desde 2021",
    availability:
      "Resido en Galicia, España. Abierto a oportunidades en España y en toda Europa.",
    communication:
      "Idioma de trabajo: inglés. Comunicación escrita en español por chat o correo electrónico mediante traducción asistida por IA.",
    translationNote: "Versión en español traducida con ayuda de IA.",
    impact: {
      label: "Impacto destacado",
      title: ["Problemas reales.", "Decisiones que marcaron la diferencia."],
      summary:
        "Modernización para navegadores, criterio arquitectónico y una web pública cuyo contenido gestiona el negocio.",
    },
    caseStudy: {
      challenge: "El reto",
      contribution: "Mi contribución",
      result: "El resultado",
    },
    experience: {
      label: "Experiencia",
      title: ["Experiencia acumulada.", "En todo el stack."],
      summary:
        "Desde aplicaciones para clientes hasta software empresarial de seguros. Desarrollo con React, .NET y Node.js, decisiones de arquitectura y responsabilidad compartida sobre la calidad.",
      crossProject: {
        label: "Contribución transversal",
        items: [
          "Fui mentor de profesionales desde nivel júnior hasta sénior, mejorando la incorporación y la calidad del código.",
          "Asesoré a equipos sobre prácticas de desarrollo y procesos ágiles para estabilizar las entregas.",
          "Creé herramientas que recuperan las horas registradas y envían automáticamente los partes de horas del equipo.",
        ],
      },
    },
    expertise: {
      label: "Competencias",
      title: ["Las herramientas adecuadas.", "Y el criterio para usarlas."],
      summary:
        "Desarrollo full-stack con React y .NET y un enfoque práctico y verificable de la ingeniería asistida por IA.",
    },
    contactLabel: "Contacto",
    contactTitle: ["Hablemos de", "lo que viene después"],
    contactSummary: "La buena ingeniería empieza con una conversación.",
    cvStory: "Toda mi trayectoria en el CV",
    otherCv: "CV en inglés",
    present: "Actualidad",
    months: [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sept",
      "oct",
      "nov",
      "dic",
    ],
    highlights: "Aspectos destacados",
    education: "Formación y desarrollo",
    languages: "Idiomas",
    to: "a",
    notFound: {
      label: "404 / Página no encontrada",
      title: "Esta página no existe.",
      text: "Es posible que el enlace haya cambiado. Mi experiencia y mis datos de contacto están en la página de inicio.",
      home: "Volver al inicio",
    },
  },
};
