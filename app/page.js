import { createClient } from "contentful";
import SectionBlock from "@/components/SectionBlock";
import FeatureItem from "@/components/FeatureItem";
import TeamMember from "@/components/TeamMember";
import Button from "@/components/Button";
import SideMenu from "@/components/SideMenu";

// ✅ Check environment variables
if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
  throw new Error("❌ Missing Contentful environment variables");
}

// ✅ Set up Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// ✅ Fetch page data
async function fetchPageData() {
  try {
    const res = await client.getEntries({
      content_type: "page",
      "fields.slug": "Insights_Portal",
      include: 2,
    });

    if (!res.items.length) {
      console.error("❌ No content found for Insights Portal.");
      return null;
    }

    console.log("✅ Page Data:", res.items[0].fields);
    return res.items[0].fields;
  } catch (error) {
    console.error("❌ Error fetching content:", error);
    return null;
  }
}

// ✅ Main Page Component
export default async function Home() {
  const page = await fetchPageData();

  if (!page) {
    return <p className="text-red-500 text-center">Error loading content.</p>;
  }

  const contentBlocks = Array.isArray(page.contentBlocks) ? page.contentBlocks : [];

  return (
    <div className="relative flex">
      {/* Side Menu */}
      <SideMenu />

      {/* Main Content */}
      <div className="text-center p-12 w-full">
        <h1 className="text-4xl font-bold mb-6">{page.title || "Untitled Page"}</h1>

        {/* Render Each Content Block */}
        {contentBlocks.length > 0 ? (
          contentBlocks.map((block, index) => {
            const typeId = block?.sys?.contentType?.sys?.id;
            console.log("🔍 Block Data:", block);
            console.log("🧪 Block Type ID:", typeId);

            if (!typeId) {
              return (
                <div key={`unknown-${index}`} className="p-4 my-4 bg-yellow-100 text-yellow-800 rounded">
                  ⚠ Unknown content block at index {index}
                </div>
              );
            }

            switch (typeId) {
              case "heroSection":
                return <SectionBlock key={block.sys.id} block={block} />;
              case "featureItem":
                return <FeatureItem key={block.sys.id} feature={block} />;
              case "teamMember":
                return <TeamMember key={block.sys.id} member={block} />;
              case "button":
                return <Button key={block.sys.id} button={block} />;
              default:
                return (
                  <div key={block.sys.id} className="p-4 my-4 bg-yellow-100 text-yellow-800 rounded">
                    ⚠ Unsupported content block type: <strong>{typeId}</strong>
                  </div>
                );
            }
          })
        ) : (
          <p className="text-gray-500">No content blocks found for this page.</p>
        )}
      </div>
    </div>
  );
}
