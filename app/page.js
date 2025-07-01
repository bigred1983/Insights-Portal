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

// Minor formatting update for clean GitHub commit.

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

  const teamMembers = [];
  const otherBlocks = [];

  contentBlocks.forEach((block) => {
    const typeId = block?.sys?.contentType?.sys?.id;
    if (typeId === "teamMember") {
      teamMembers.push(block);
    } else {
      otherBlocks.push(block);
    }
  });

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

      {/* All non-team blocks */}
      {otherBlocks.map((block) => {
        const typeId = block?.sys?.contentType?.sys?.id;
        const key = block.sys.id;

        if (typeId === "section") {
          return <SectionBlock key={key} block={block} />;
        }

        if (typeId === "heroSection") {
          return <HeroSection key={key} hero={block} />;
        }

        if (typeId === "featureItem") {
          return <FeatureItem key={key} feature={block} />;
        }

        if (typeId === "button") {
          return <Button key={key} button={block} />;
        }

        // fallback block for unsupported types
        return (
          <div
            key={key}
            className="p-4 my-4 bg-yellow-100 text-yellow-800 rounded"
          >
            ⚠ Unsupported content type: {typeId}
          </div>
        );
      })}

      {/* Team members rendered in flex row */}
      {teamMembers.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Meet the Team
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {teamMembers.map((block) =>
              block?.fields ? (
                <TeamMember key={block.sys.id} member={block} />
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
}
