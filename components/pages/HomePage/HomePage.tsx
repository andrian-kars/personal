import { getImageProps } from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Download,
  Gauge,
  Languages,
  Layers,
  MapPin,
  Plus,
  ShieldCheck,
  Users,
} from "lucide-react";
import { getContent } from "@/content";
import type { Content } from "@/content/types";
import portrait from "@/public/images/background/me.png";
import styles from "./HomePage.module.scss";
import { formatMonth, localePath, type Locale } from "@/i18n/config";

const impactIcons = [Layers, Gauge, Users];
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
    sizes: "(max-width: 1100px) 365px, 490px",
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

export function HomePage({ content, locale }: { content: Content; locale: Locale }) {
  const {
    profile,
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
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.textLink}
            >
              {ui.contact} <ArrowUpRight size={17} aria-hidden="true" />
              <span className="sr-only">
                {" "}
                {ui.onLinkedIn} {ui.newTab}
              </span>
            </a>
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
          </article>
          <div className={styles.impactGrid}>
            {impact.map((item, index) => {
              const Icon = impactIcons[index];
              return (
                <article className={styles.block} key={item.id}>
                  <div className={styles.impactCategory}>
                    {Icon && <Icon size={21} strokeWidth={1.5} aria-hidden="true" />}
                    <span>{item.category}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <ul>
                    {item.evidence.map((evidence) => (
                      <li key={evidence}>{evidence}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
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
          <ol className={styles.timeline}>
            {experience.map((entry) => (
              <li
                key={entry.id}
                className={entry.dates?.end ? undefined : styles.ongoing}
              >
                <p className={styles.period}>
                  {entry.dates ? (
                    <>
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
                    </>
                  ) : (
                    <span className={styles.current}>{entry.label}</span>
                  )}
                </p>
                <h3>{entry.title}</h3>
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
