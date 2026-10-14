import Image, { getImageProps, type StaticImageData } from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Download,
  KeyRound,
  Languages,
  Layers,
  MapPin,
  PanelsTopLeft,
  Plus,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { getContent } from "@/content";
import type { Content } from "@/content/types";
import portrait from "@/public/images/background/me.png";
import anteluScreenshot from "@/public/images/projects/antelu.webp";
import styles from "./HomePage.module.scss";
import { formatMonth, localePath, type Locale } from "@/i18n/config";

const impactIcons: Record<string, LucideIcon | undefined> = {
  modernization: Layers,
  architecture: KeyRound,
  antelu: PanelsTopLeft,
};
const projectImages: Record<string, StaticImageData | undefined> = {
  antelu: anteluScreenshot,
};
const blankImage =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

function SectionLabel({ number, children }: { number: string; children: string }) {
  return (
    <p className={styles.sectionLabel}>
      <span aria-hidden="true">{number} /</span> {children}
    </p>
  );
}

function Portrait({ description }: { description: string }) {
  const {
    props: { alt, ...image },
  } = getImageProps({
    alt: description,
    src: portrait,
    sizes: "(max-width: 1100px) 360px, (min-width: 1600px) 455px, 405px",
    fetchPriority: "high",
    loading: "eager",
  });

  return (
    <picture>
      {/* The portrait is hidden on phones; a blank pixel spares them the download. */}
      <source media="(max-width: 760px)" srcSet={blankImage} />
      <img {...image} alt={alt} />
    </picture>
  );
}

function ExperienceTimeline({
  entries,
  ui,
  heading: Heading,
}: {
  entries: Content["experience"];
  ui: Content["ui"];
  heading: "h3" | "h4";
}) {
  return (
    <ol className={styles.timeline}>
      {entries.map((entry) => (
        <li
          key={entry.id}
          data-experience-id={entry.id}
          className={entry.dates.end ? undefined : styles.ongoing}
        >
          <p className={styles.period}>
            <time dateTime={entry.dates.start}>
              {formatMonth(entry.dates.start, ui.months)}
            </time>{" "}
            &ndash;{" "}
            {entry.dates.end ? (
              <time dateTime={entry.dates.end}>
                {formatMonth(entry.dates.end, ui.months)}
              </time>
            ) : (
              <span className={styles.current}>{ui.present}</span>
            )}
          </p>
          <Heading>{entry.title}</Heading>
          <p className={styles.organization}>
            {entry.organization} <span aria-hidden="true">&middot;</span>{" "}
            <span className={styles.context}>{entry.context}</span>
          </p>
          <p className={styles.summary}>{entry.summary}</p>
          {entry.highlights && (
            <details className={styles.highlights}>
              <summary>
                {ui.highlights}{" "}
                <span className={styles.count}>({entry.highlights.length})</span>
                <Plus size={16} aria-hidden="true" />
              </summary>
              <ul>
                {entry.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </details>
          )}
        </li>
      ))}
    </ol>
  );
}

export function HomePage({ content, locale }: { content: Content; locale: Locale }) {
  const {
    profile,
    employment,
    aiWorkflow,
    education,
    experience,
    impact,
    languages,
    metrics,
    skillGroups,
    ui,
  } = content;
  const otherLocale = locale === "en" ? "es" : "en";
  const otherProfile = getContent(otherLocale).profile;
  return (
    <>
      <section id="about" className={styles.hero} aria-labelledby="name">
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroHeading}>
            <p className={styles.eyebrow}>
              {ui.eyebrow}{" "}
              <span className={styles.divider} aria-hidden="true">
                /
              </span>{" "}
              <span className={styles.location}>
                <MapPin size={13} aria-hidden="true" />
                {profile.location}
              </span>
            </p>
            <h1 id="name">
              <span>{profile.firstName}</span> <span>{profile.lastName}</span>
            </h1>
          </div>
          <div className={styles.heroPosition}>
            <p className={styles.role}>{profile.role}</p>
            <ul className={styles.specialties}>
              {profile.specialties.map((specialty) => (
                <li key={specialty}>{specialty}</li>
              ))}
            </ul>
          </div>
          <p className={styles.heroSummary}>{profile.summary}</p>
          <div className={styles.heroActions}>
            <Link href={localePath(locale, "#impact")} className={styles.primaryLink}>
              {ui.explore} <ArrowDown size={17} aria-hidden="true" />
            </Link>
            <Link href={localePath(locale, "#contact")} className={styles.textLink}>
              {ui.contact} <ArrowDown size={17} aria-hidden="true" />
            </Link>
          </div>
          <figure className={styles.portrait}>
            <Portrait description={ui.portrait} />
          </figure>
        </div>
        <div className={styles.heroFoot}>
          <div className={`container ${styles.heroFootInner}`}>
            <p>
              <strong>
                {profile.experience} {ui.years}
              </strong>{" "}
              {ui.engineering}
            </p>
            <p>
              <span className={styles.dot} aria-hidden="true" />
              <strong>{profile.employer}</strong>
              <span className={styles.since}>{ui.since}</span>
            </p>
            <a href={`mailto:${profile.email}`}>
              {profile.email} <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section id="impact" className={styles.section} aria-labelledby="impact-heading">
        <div className="container">
          <div className={styles.sectionIntro}>
            <div>
              <SectionLabel number="01">{ui.impact.label}</SectionLabel>
              <h2 id="impact-heading">
                {ui.impact.title[0]}
                <br />
                {ui.impact.title[1]}
              </h2>
            </div>
            <p>{ui.impact.summary}</p>
          </div>
          <dl className={styles.metrics}>
            {metrics.map((metric) => (
              <div className={styles.metric} key={metric.id}>
                <dt>{metric.label}</dt>
                <dd className={styles.metricValue}>
                  {metric.before && (
                    <>
                      <span className={styles.before}>{metric.before}</span>
                      <ArrowRight aria-hidden="true" />
                      <span className="sr-only">{ui.to}</span>
                    </>
                  )}
                  <span>{metric.value}</span>
                </dd>
                <dd className={styles.metricNote}>{metric.note}</dd>
              </div>
            ))}
          </dl>
          <div className={styles.caseStudies}>
            {impact.map((item) => {
              const Icon = impactIcons[item.id];
              const screenshot = projectImages[item.id];
              return (
                <article
                  className={styles.caseStudy}
                  key={item.id}
                  id={`case-${item.id}`}
                  aria-labelledby={`case-${item.id}-heading`}
                >
                  <div className={styles.caseIntro}>
                    <p className={styles.impactCategory}>
                      {Icon && <Icon size={21} strokeWidth={1.5} aria-hidden="true" />}
                      <span>{item.category}</span>
                    </p>
                    <h3 id={`case-${item.id}-heading`}>{item.title}</h3>
                    {screenshot && item.imageAlt && (
                      <Image
                        className={styles.projectImage}
                        src={screenshot}
                        alt={item.imageAlt}
                        sizes="(max-width: 850px) 100vw, (max-width: 1100px) 40vw, 500px"
                      />
                    )}
                    {item.link && (
                      <a
                        href={item.link.href}
                        className={styles.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.link.label} <ArrowUpRight size={16} aria-hidden="true" />
                        <span className="sr-only"> {ui.newTab}</span>
                      </a>
                    )}
                  </div>
                  <div className={styles.caseBody}>
                    <div>
                      <h4>{ui.caseStudy.challenge}</h4>
                      <p>{item.description}</p>
                    </div>
                    <div>
                      <h4>{ui.caseStudy.contribution}</h4>
                      <ul>
                        {item.evidence.map((evidence) => (
                          <li key={evidence}>{evidence}</li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.caseResult}>
                      <h4>{ui.caseStudy.result}</h4>
                      <p>{item.result}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <article className={styles.aiFeature} aria-labelledby="ai-heading">
            <div className={styles.aiHeader}>
              <div>
                <p className={styles.aiCategory}>
                  <Bot size={21} strokeWidth={1.5} aria-hidden="true" />
                  <span>{aiWorkflow.category}</span>
                </p>
                <h3 id="ai-heading">{aiWorkflow.title}</h3>
              </div>
              <p>{aiWorkflow.description}</p>
            </div>
            <ol className={styles.aiSteps}>
              {aiWorkflow.steps.map((step, index) => (
                <li key={step.id}>
                  <span className={styles.stepNumber} aria-hidden="true">
                    0{index + 1}
                  </span>
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
            <p className={styles.aiGate}>
              <ShieldCheck size={20} aria-hidden="true" />
              <span>
                <strong>{aiWorkflow.gate}</strong>, {aiWorkflow.outcome}
              </span>
            </p>
            <p className={styles.aiResult}>{aiWorkflow.result}</p>
          </article>
        </div>
      </section>

      <section
        id="experience"
        className={`${styles.section} ${styles.experienceSection}`}
        aria-labelledby="experience-heading"
      >
        <div className={`container ${styles.experienceLayout}`}>
          <div className={styles.experienceIntro}>
            <SectionLabel number="02">{ui.experience.label}</SectionLabel>
            <h2 id="experience-heading">
              {ui.experience.title[0]}
              <br />
              {ui.experience.title[1]}
            </h2>
            <p>{ui.experience.summary}</p>
            <a
              href={profile.cv}
              download={profile.cvFileName}
              className={styles.inlineLink}
            >
              {ui.cvStory} <Download size={16} aria-hidden="true" />
            </a>
          </div>
          <div>
            <section id="epam-experience" aria-labelledby="epam-heading">
              <div className={styles.employmentHeader}>
                <p className={styles.period}>
                  <time dateTime={employment.start}>
                    {formatMonth(employment.start, ui.months)}
                  </time>{" "}
                  &ndash; <span className={styles.current}>{ui.present}</span>
                </p>
                <h3 id="epam-heading">{employment.organization}</h3>
                <p className={styles.organization}>
                  {ui.experience.client}: <strong>{employment.client}</strong> &middot;{" "}
                  {ui.experience.domain}
                </p>
                <p className={styles.assignmentLabel}>{ui.experience.assignments}</p>
              </div>
              <ExperienceTimeline
                entries={experience.filter(
                  (entry) => entry.organization === employment.organization,
                )}
                ui={ui}
                heading="h4"
              />
              <div className={styles.crossProject}>
                <h4>{ui.experience.crossProject.label}</h4>
                <ul>
                  {ui.experience.crossProject.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>
            <div className={styles.independentExperience}>
              <ExperienceTimeline
                entries={experience.filter(
                  (entry) => entry.organization !== employment.organization,
                )}
                ui={ui}
                heading="h3"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="expertise"
        className={styles.section}
        aria-labelledby="expertise-heading"
      >
        <div className="container">
          <div className={styles.sectionIntro}>
            <div>
              <SectionLabel number="03">{ui.expertise.label}</SectionLabel>
              <h2 id="expertise-heading">
                {ui.expertise.title[0]}
                <br />
                {ui.expertise.title[1]}
              </h2>
            </div>
            <p>{ui.expertise.summary}</p>
          </div>
          <div className={styles.skillsGrid}>
            {skillGroups.map((group) => (
              <article key={group.id} className={styles.block}>
                <h3>{group.name}</h3>
                <p className={styles.blockDescription}>{group.description}</p>
                <ul className={styles.tags}>
                  {group.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </article>
            ))}
            <article className={styles.block}>
              <h3>{ui.education}</h3>
              <ul className={styles.entries}>
                {education.map((item) => (
                  <li key={item.id}>
                    <p className={styles.period}>
                      <time dateTime={item.year}>{item.year}</time>
                    </p>
                    <h4>{item.title}</h4>
                    <p className={styles.organization}>{item.institution}</p>
                  </li>
                ))}
              </ul>
            </article>
            <article className={styles.block}>
              <h3>{ui.languages}</h3>
              <dl className={styles.languages}>
                {languages.map((language) => (
                  <div key={language.code}>
                    <dt>{language.name}</dt>
                    <dd>{language.level}</dd>
                  </div>
                ))}
              </dl>
            </article>
          </div>
        </div>
      </section>

      <section id="contact" className={styles.contact} aria-labelledby="contact-heading">
        <div className={`container ${styles.contactInner}`}>
          <div>
            <SectionLabel number="04">{ui.contactLabel}</SectionLabel>
            <h2 id="contact-heading">
              {ui.contactTitle[0]}
              <br />
              {ui.contactTitle[1]}
              <span>.</span>
            </h2>
            <p>{ui.contactSummary}</p>
            <ul className={styles.contactFacts}>
              <li>
                <MapPin size={16} aria-hidden="true" />
                <span>{ui.availability}</span>
              </li>
              <li>
                <Languages size={16} aria-hidden="true" />
                <span>{ui.communication}</span>
              </li>
            </ul>
            {ui.translationNote && (
              <p className={styles.translationNote}>{ui.translationNote}</p>
            )}
          </div>
          <div className={styles.contactLinks}>
            <a className={styles.email} href={`mailto:${profile.email}`}>
              <span>{profile.email}</span>
              <ArrowUpRight size={23} aria-hidden="true" />
            </a>
            <div className={styles.socialLinks}>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn <ArrowUpRight size={16} aria-hidden="true" />
                <span className="sr-only"> {ui.newTab}</span>
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                GitHub <ArrowUpRight size={16} aria-hidden="true" />
                <span className="sr-only"> {ui.newTab}</span>
              </a>
              <a href={profile.cv} download={profile.cvFileName}>
                CV <Download size={16} aria-hidden="true" />
                <span className="sr-only"> (PDF)</span>
              </a>
              <a
                href={otherProfile.cv}
                download={otherProfile.cvFileName}
                hrefLang={otherLocale}
              >
                {ui.otherCv} <Download size={16} aria-hidden="true" />
                <span className="sr-only"> (PDF)</span>
              </a>
            </div>
            <a className={styles.phone} href={`tel:${profile.phone}`}>
              {profile.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
