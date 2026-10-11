import { notFound } from "next/navigation";
import { HomePage } from "@/components/pages/HomePage/HomePage";
import { getContent } from "@/content";
import { identity } from "@/data/portfolio";
import { isLocale, localeUrl } from "@/i18n/config";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const content = getContent(lang);
  const { profile, skillGroups } = content;
  const url = localeUrl(lang);
  const profilePage = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${url}#profile`,
    url,
    name: `${profile.name} | ${profile.role}`,
    inLanguage: lang,
    mainEntity: {
      "@type": "Person",
      "@id": `${identity.url}/#person`,
      name: identity.name,
      givenName: identity.firstName,
      familyName: identity.lastName,
      url: identity.url,
      jobTitle: profile.role,
      description: profile.description,
      email: identity.email,
      telephone: identity.phone,
      image: `${identity.url}/images/background/me.png`,
      homeLocation: { "@type": "Place", name: profile.location },
      worksFor: { "@type": "Organization", name: identity.employer },
      alumniOf: [{ "@type": "CollegeOrUniversity", name: identity.university }],
      knowsLanguage: identity.languageCodes,
      knowsAbout: skillGroups.flatMap((group) => [...group.skills]),
      sameAs: [identity.linkedin, identity.github],
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profilePage).replace(/</g, "\\u003c"),
        }}
      />
      <HomePage content={content} locale={lang} />
    </>
  );
}
