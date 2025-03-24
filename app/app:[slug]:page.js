import { createClient } from "contentful";
import SectionBlock from "@/components/SectionBlock";
import FeatureItem from "@/components/FeatureItem";
import TeamMember from "@/components/TeamMember";
import Button from "@/components/Button";
import SideMenu from "@/components/SideMenu";
import { notFound } from "next/navigation";

// ✅ Contentful client setup
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  environment: "master",
});

// ✅ Generate static paths for all slugs
export async function generateStaticParams() {
  try {
    const res = await client.getEntries({ content_type: "page" });

    return res.items.map((item) => ({
      slug: item.fields.slug, // Use slug exactly as stored in Contentful
    }));
  } catch (error) {
    console.error("❌ Error fetching slugs:", error);
    return [];
  }
}

// ✅ Dynamic Page Component
export default async function Page({ params }) {
  const slug = params?.slug;

  if (!slug) return notFound();

  try {
    const res = await client.getEntries({
      content_type: "page",
      "fields.slug": slug, // ✅ Use slug exactly as it is
      include: 2,
    });

    if (!res.items.length) return notFound();

    const page = res.items[0].fields;
    const contentBlocks = page.contentBlocks || [];

    return (
      <div className="relative flex">
        <SideMenu />
        <div className="text-center p-12 w-full">
          <h1 className="text-4xl font-bold mb-6">{page.title || "Untitled Page"}</h1>

          {/* Render Content Blocks */}
          {contentBlocks.map((block, index) => {
            const typeId = block?.sys?.contentType?.sys?.id;

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
                  <div key={index} className="p-4 my-4 bg-yellow-100 text-yellow-800 rounded">
                    ⚠ Unsupported block type: {typeId}
                  </div>
                );
            }
          })}
        </div>
      </div>
    );
  } catch (error) {
    console.error(`❌ Error loading page for slug: ${slug}`, error);
    return <p className="text-red-500 text-center">Something went wrong loading this page.</p>;
  }
}
