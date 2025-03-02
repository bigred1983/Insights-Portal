import { createClient } from 'contentful';
import Image from 'next/image';

export default async function Home() {
  // Set up Contentful client
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  // Fetch content for multiple content types
  const heroSections = await client.getEntries({ content_type: "heroSection" });
  const pages = await client.getEntries({ content_type: "page" });
  const teamMembers = await client.getEntries({ content_type: "teamMember" });

  return (
    <div className="text-center p-12">
      <h1 className="text-4xl font-bold mb-4">Welcome to My Contentful Website!</h1>
      <p className="text-lg mb-8">Below is the content from Contentful:</p>

      {/* ✅ Hero Sections */}
      <section>
        <h2 className="text-2xl font-semibold">Hero Sections</h2>
        {heroSections.items.length === 0 ? <p>No Hero Sections available.</p> : null}
        {heroSections.items.map((hero) => (
          <div key={hero.sys.id} className="my-6">
            <h3 className="text-xl font-bold">{hero.fields.title || "No title available"}</h3>
            <p>{hero.fields.subtitle || "No subtitle available"}</p>
            {hero.fields.backgroundImage && (
              <Image
                src={`https:${hero.fields.backgroundImage.fields.file.url}`}
                alt={hero.fields.title || "Hero Image"}
                width={800}
                height={400}
                priority
              />
            )}
          </div>
        ))}
      </section>

      {/* ✅ Pages */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Pages</h2>
        {pages.items.length === 0 ? <p>No Pages available.</p> : null}
        <ul>
          {pages.items.map((page) => (
            <li key={page.sys.id} className="text-lg">
              {page.fields.title || "No title available"}
            </li>
          ))}
        </ul>
      </section>

      {/* ✅ Team Members */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Team Members</h2>
        {teamMembers.items.length === 0 ? <p>No Team Members available.</p> : null}
        <div className="flex flex-wrap justify-center">
          {teamMembers.items.map((member) => (
            <div key={member.sys.id} className="m-4 p-4 border rounded-lg w-64">
              <h3 className="text-lg font-bold">{member.fields.name || "No name available"}</h3>
              <p>{member.fields.role || "No role available"}</p>
              {member.fields.profileImage && (
                <Image
                  src={`https:${member.fields.profileImage.fields.file.url}`}
                  alt={member.fields.name || "Profile Image"}
                  width={150}
                  height={150}
                  className="rounded-full"
                />
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

