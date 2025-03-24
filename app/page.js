import { createClient } from "contentful";
import SectionBlock from "@/components/SectionBlock";
import FeatureItem from "@/components/FeatureItem";
import TeamMember from "@/components/TeamMember";
import Button from "@/components/Button";
import SideMenu from "@/components/SideMenu";

// ✅ Setup Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// ✅ Fetch Insights_Portal page data
async function fetchPageData() {
  try {
    const res = await client.getEntries({
      content_type: "page",
      "fields.slug": "Insights_Portal",
      include: 2,
    });

    if (!res.items.length) {
      console.error("❌ No content found for Insights_Portal");
      return null;
    }

    return res.items[0].fields;
  } catch (error) {
    console.error("❌ Error fetching homepage content:", error);
    return null;
  }
}

// ✅ Main Home Component
export default async function Home() {
  const page = await fetchPageData();

  if (!page) {
    return <p className="text-red-500 text-center mt-10">❌ Could not load page content.</p>;
  }

  const contentBlocks = Array.isArray(page.contentBlocks) ? page.contentBlocks : [];

  return (
    <div className="relative flex">
      <SideMenu />

      <div className="text-center p-12 w-full">
        <h1 className="text-4xl font-bold mb-6">{page.title || "Untitled Page"}</h1>

        {contentBlocks.length > 0 ? (
          contentBlocks.map((block, index) => {
            const typeId = block?.sys?.contentType?.sys?.id;

            if (!typeId) {
              return (
                <div key={`unknown-${index}`} className="p-4 my-4 bg-yellow-100 text-yellow-800 rounded">
                  ⚠ Unknown block at index {index}
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
                    ⚠ Unsupported block type: {typeId}
                  </div>
                );
            }
          })
        ) : (
          <p className="text-gray-500">No content blocks found.</p>
        )}
      </div>
    </div>
  );
}