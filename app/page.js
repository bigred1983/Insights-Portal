import { createClient } from "contentful";
import SectionBlock from "@/components/SectionBlock";
import FeatureItem from "@/components/FeatureItem";
import TeamMember from "@/components/TeamMember";
import Button from "@/components/Button";
import HeroSection from "@/components/HeroSection";

// Setup Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Fetch homepage data
async function fetchPageData() {
  try {
    const res = await client.getEntries({
      content_type: "page",
      "fields.slug": "Insights_Portal",
      include: 2,
    });

    return res.items[0]?.fields || null;
  } catch (err) {
    console.error("❌ Failed to fetch homepage data:", err);
    return null;
  }
}

// Home page component
export default async function Home() {
  const page = await fetchPageData();

  if (!page) {
    return (
      <div className="text-center p-12">
        <h1 className="text-red-500 text-xl">⚠ Homepage content failed to load.</h1>
      </div>
    );
  }

  const contentBlocks = Array.isArray(page.contentBlocks) ? page.contentBlocks : [];

  // Separate team members from other blocks
  const teamMembers = contentBlocks.filter(
    (block) => block?.sys?.contentType?.sys?.id === "teamMember"
  );

  const otherBlocks = contentBlocks.filter(
    (block) => block?.sys?.contentType?.sys?.id !== "teamMember"
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-extrabold tracking-tight text-center text-gray-900 mb-6">
        {page.title || "Untitled Page"}
      </h1>

      {/* 📌 Welcome Message */}
      <div className="bg-blue-50 text-blue-900 border border-blue-200 rounded-2xl px-6 py-4 mb-10 shadow-sm text-center text-base">
        <div className="flex justify-center items-center gap-2 mb-1 text-xl font-semibold">
          <span role="img" aria-label="pin">📌</span>
          Welcome to the Contentful Insights Portal!
        </div>
        <p>
          Set this site as your homepage so you have the latest information on what data is telling us about Contentful &amp; our customers.
        </p>
      </div>

      {/* Render all blocks except team members */}
      {otherBlocks.map((block) => {
        const typeId = block?.sys?.contentType?.sys?.id;

        switch (typeId) {
          case "section":
            return <SectionBlock key={block.sys.id} block={block} />;
          case "heroSection":
            return <HeroSection key={block.sys.id} hero={block} />;
          case "featureItem":
            return <FeatureItem key={block.sys.id} feature={block} />;
          case "button":
            return <Button key={block.sys.id} button={block} />;
          default: {
            return (
              <div
                key={block.sys.id}
                className="p-4 my-4 bg-yellow-100 text-yellow-800 rounded"
              >
                ⚠ Unsupported content type: {typeId}
              </div>
            );
          }
        }
      })}

      {/* ✅ Wrap all TeamMember cards together in a flex row */}
      {teamMembers.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Meet the Team
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {teamMembers.map((block) => (
              <TeamMember key={block.sys.id} member={block} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
