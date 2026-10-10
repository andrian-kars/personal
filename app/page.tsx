import { HomePage } from "@/components/pages/HomePage/HomePage";
import { profile, skillGroups } from "@/data/portfolio";

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${profile.url}/#person`,
  name: profile.name,
  url: profile.url,
  jobTitle: profile.role,
  description: profile.description,
  email: profile.email,
  telephone: profile.phone,
  image: `${profile.url}/images/background/me.png`,
  sameAs: [profile.linkedin, profile.github],
  knowsAbout: skillGroups.flatMap((group) => [...group.skills]),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(person).replace(/</g, "\\u003c"),
        }}
      />
      <HomePage />
    </>
  );
}
