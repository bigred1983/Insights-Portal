import { createClient } from "contentful";
import SectionBlock from "@/components/SectionBlock";
import FeatureItem from "@/components/FeatureItem";
import TeamMember from "@/components/TeamMember";
import Button from "@/components/Button";
import SideMenu from "@/components/SideMenu";
import HeroSection from "@/components/HeroSection"; // ✅ Ensure this is imported

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

    if (!res.items.length) {
      console.warn("⚠ No homepage content found.");
      return null;
    }

    return res.items[0].fields;
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

  const contentBlocks = Array.isArray(page.contentBlocks)
    ? page.contentBlocks
    : [];

  return (
    <div className="relative flex">
      <SideMenu />

      <div className="text-center p-12 w-full">
        <h1 className="text-4xl font-bold mb-6">
          {page.title || "Untitled Page"}
        </h1>

        {contentBlocks.length === 0 ? (
          <p className="text-gray-400">No content blocks found.</p>
        ) : (
          contentBlocks.map((block, index) => {
            const typeId = block?.sys?.contentType?.sys?.id;

            // ✅ DEBUG LOGS (will show in Netlify build logs)
            console.log("🔍 Block index:", index);
            console.log("🧪 Block type:", typeId);
            console.log("📦 Block fields:", block?.fields);

            switch (typeId) {
              case "section":
                return <SectionBlock key={block.sys.id} block={block} />;
              case "heroSection":
                return <HeroSection key={block.sys.id} hero={block} />;
              case "featureItem":
                return <FeatureItem key={block.sys.id} feature={block} />;
              case "teamMember":
                return <TeamMember key={block.sys.id} member={block} />;
              case "button":
                return <Button key={block.sys.id} button={block} />;
              default:
                return (
                  <div
                    key={index}
                    className="p-4 my-4 bg-yellow-100 text-yellow-800 rounded"
                  >
                    ⚠ Unsupported content type: {typeId}
                  </div>
                );
            }
          })
        )}
      </div>
    </div>
  );
}
