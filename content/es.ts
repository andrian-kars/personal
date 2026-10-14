import {
  employment,
  engagements,
  identity,
  measurements,
  publicProjects,
} from "@/data/portfolio";
import { en } from "./en";
import type { Content, Ids } from "./types";

type Item<List extends readonly unknown[]> = List[number];

const steps: Record<
  Ids<typeof en.aiWorkflow.steps>,
  Omit<Item<Content["aiWorkflow"]["steps"]>, "id">
> = {
  analysis: {
    title: "Análisis del sistema heredado",
    description: "Análisis en paralelo del sistema heredado y su versión en React.",
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
      "Sagitta, un producto de Vertafore para el sector asegurador con 30 años de antigüedad y más de 1000 páginas, solo funcionaba en Internet Explorer. La retirada del navegador ponía en riesgo el acceso al producto.",
    evidence: [
      "Definí el enfoque de conversión de VBScript a JavaScript, implementé las primeras páginas y resolví incompatibilidades de CSS de IE para que otros equipos pudieran continuar la migración.",
      "Reorganicé la arquitectura, actualicé el diseño visual e inicié la migración a React: creé las primeras páginas y establecí las pautas para que otros equipos continuaran el trabajo.",
    ],
    result:
      "Mantuve el producto operativo más allá de IE y establecí un enfoque de migración a React que otros equipos podían aplicar de forma consistente.",
  },
  architecture: {
    category: "Sagitta / Arquitectura",
    title: "Cuestionar una decisión ya tomada.",
    description:
      "Un producto empresarial desarrollado por siete equipos de cinco profesionales en Ucrania, India y Estados Unidos. El enfoque acordado guardaba los tokens en la capa de negocio de ASP y se estimaba que implementarlo llevaría 18 meses.",
    evidence: [
      "Detecté que navegar sin pasar por el código personalizado provocaría la pérdida del token, incluso al recargar la página o usar los botones Atrás y Adelante.",
      "Cuestioné la decisión cuando ya estaba acordada y propuse la gestión de tokens estándar que utiliza la mayoría de las aplicaciones web. El enfoque se modificó.",
    ],
    result:
      "La implementación se completó en seis meses frente a los 18 estimados, lo que ahorró un año de trabajo a siete equipos. La recarga de páginas y los botones Atrás y Adelante funcionaban correctamente.",
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
    title: "Senior Full-Stack Developer",
    organization: identity.employer,
    context: "Sagitta / Modernización asistida por IA",
    summary:
      "Volví a Sagitta para explorar el desarrollo asistido por IA: completar la migración a React de un producto con más de 1000 páginas habría llevado años con el enfoque existente. Mejoré la base compartida y las páginas existentes antes de introducir agentes para acelerar el desarrollo y la revisión.",
    highlights: [
      "Generalicé con el equipo los componentes de Agency One ya adaptados a Sagitta, encapsulando comportamientos comunes para reutilizar tanto la lógica de aplicación como la interfaz y evitar soluciones específicas para cada página.",
      "Mejoré formularios basados en esquemas, paneles editables y tablas paginadas; extraje hooks y utilidades de API reutilizables para operaciones masivas, conservando las reglas de negocio.",
      "Corregí API en C# y ASP.NET Core, lógica de repositorios y mapeos de datos que provocaban errores de guardado, conversión de fechas y valores incoherentes.",
      "Implementé la visualización y sustitución de credenciales ocultas, permisos basados en claims y configuración de autenticación multifactor; corregí la caché de React Query y las preferencias de tablas guardadas en el servidor.",
      "Configuré agentes de GitHub Copilot e instrucciones de repositorio para análisis, diseño, desarrollo y revisión, con responsabilidades explícitas, comprobaciones de compilación y pruebas, y validación humana.",
      "Comparé el comportamiento del sistema heredado y su versión en React con ayuda de IA y generé informes separados para los equipos de producto y desarrollo; añadí pruebas de regresión con Jest y React Testing Library.",
    ],
  },
  certificates: {
    title: "Senior Full-Stack Developer",
    organization: identity.employer,
    context: "Import Tool y Certificates Platform",
    summary:
      "Comencé como consultor de arquitectura frontend en Import Tool: evalué el diseño, implementé mejoras, elaboré una hoja de ruta priorizada y colaboré con otros ingenieros para integrarlo con Certificates Platform. Desarrollé las funciones de generación, descarga e importación de documentos y visualización de PDF, corrigiendo fallos en todo el proceso. Coordiné mejoras de pruebas con Playwright y revisiones de código asistidas por IA entre equipos, y delegué en el equipo la continuidad del desarrollo antes de volver a Sagitta.",
  },
  agency: {
    title: "Senior Front-End Developer",
    organization: identity.employer,
    context: "Agency One",
    summary:
      "Creé una biblioteca reutilizable y una barra de navegación compartida que cada producto integraba con su token de autenticación. Permitía cambiar de producto sin iniciar sesión de nuevo y conservar el contexto del cliente y sus pólizas. Pasé a otro proyecto cuando el producto se estabilizó.",
  },
  sagitta: {
    title: "Full-Stack Engineer",
    organization: identity.employer,
    context: "Sagitta",
    summary:
      "Reorganicé la arquitectura e inicié la migración a React. Definí los enfoques de conversión de VBScript y migración a React y creé las primeras páginas para que otros equipos continuaran el trabajo. Aumenté la velocidad de CI/CD en más del 200 %, reduje el tiempo de compilación de unos 40 s a 15–18 s y los renderizados redundantes de nueve a uno. Implementé endpoints y correcciones para la integración con bases de datos heredadas y cuestioné la gestión de tokens que ponía en riesgo la navegación.",
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
  employment,
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
      "Volví a Sagitta en julio de 2026: completar la migración a React de un producto con más de 1000 páginas habría llevado años con el enfoque existente. Generalizamos los componentes de Agency One y la lógica de aplicación compartida; después configuré agentes de GitHub Copilot para análisis, desarrollo y revisión.",
    result:
      "Al combinar una base compartida más sólida con el desarrollo asistido por IA, la entrega de una página, incluidas las pruebas y la revisión, pasó a requerir entre unos días y tres semanas, según su complejidad, frente a alrededor de un mes antes.",
    steps: en.aiWorkflow.steps.map(({ id }) => ({ id, ...steps[id] })),
    gate: "Validación humana",
    outcome:
      "con informes separados para responsables de producto y desarrolladores sobre requisitos sin cubrir y cambios en la experiencia de usuario.",
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
        "En EPAM desde febrero de 2021, siempre en productos de seguros de Vertafore. Pasé a cada nueva asignación cuando el producto era estable y el equipo podía continuar el trabajo.",
      client: "Cliente",
      assignments: "Asignaciones para el mismo cliente",
      domain: "Software para el sector asegurador",
      crossProject: {
        label: "Contribución transversal",
        items: [
          "Fui mentor de profesionales de nivel júnior a sénior, facilitando su incorporación y mejorando la calidad del código.",
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
