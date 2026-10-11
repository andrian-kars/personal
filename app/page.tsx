import { HomePage } from "@/components/pages/HomePage/HomePage";
import { education, experience, languages, profile, skillGroups } from "@/data/portfolio";

const employer = experience.find(({ dates }) => dates && !dates.end)?.organization;

const profilePage = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${profile.url}/#profile`,
  url: profile.url,
  name: `${profile.name} | ${profile.role}`,
  inLanguage: "en",
  mainEntity: {
    "@type": "Person",
    "@id": `${profile.url}/#person`,
    name: profile.name,
    givenName: profile.firstName,
    familyName: profile.lastName,
    url: profile.url,
    jobTitle: profile.role,
    description: profile.description,
    email: profile.email,
    telephone: profile.phone,
    image: `${profile.url}/images/background/me.png`,
    homeLocation: { "@type": "Place", name: profile.location },
    worksFor: employer ? { "@type": "Organization", name: employer } : undefined,
    alumniOf: education
      .filter(({ institution }) => institution !== employer)
      .map(({ institution }) => ({ "@type": "CollegeOrUniversity", name: institution })),
    knowsLanguage: languages.map(({ name }) => name),
    knowsAbout: skillGroups.flatMap((group) => [...group.skills]),
    sameAs: [profile.linkedin, profile.github],
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profilePage).replace(/</g, "\\u003c"),
        }}
      />
      <HomePage />
    </>
  );
}
