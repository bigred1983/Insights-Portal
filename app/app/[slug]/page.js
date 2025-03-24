import { createClient } from "contentful";
import SectionBlock from "@/components/SectionBlock";
import FeatureItem from "@/components/FeatureItem";
import TeamMember from "@/components/TeamMember";
import Button from "@/components/Button";
import SideMenu from "@/components/SideMenu";
import { notFound } from "next/navigation";

// Contentful client setup
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  environment: "master",
});

// ✅ Let Next.js know this route supports dynamic params
export const dynamicParams = true;
export const revalidate = 60;

// ✅ Generate static paths at build time
export async function generateStaticParams() {
  try {
    const res = await client.getEntries({ content_type: "page" });

    const slugs = res.items.map((item) => item.fields.slug);

    // ✅ DEBUG: Log generated slugs for Netlify build logs
    console.log("✅ Generating static paths for slugs:", slugs);

    return slugs.map((slug) => ({ slug }));
  } catch (error) {
    console.error("❌ Error generating static params:", error);
    return [];
  }
}

// ✅ Page Component for dynamic slug
export default async function Page({ params }) {
  const slug = params?.slug;
  if (!slug) return notFound();

  const res = await client.getEntries({
    content_type: "page",
    "fields.slug": slug,
    include: 2,
  });

  if (!res.items.length) return notFound();

  const page = res.items[0].fields;
  const contentBlocks = Array.isArray(page.contentBlocks) ? page.contentBlocks : [];

  return (
    <div className="relative flex">
      <SideMenu />
      <div className="text-center p-12 w-full">
        <h1 className="text-4xl font-bold mb-6">{page.title || "Untitled Page"}</h1>
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
                  ⚠ Unsupported content type: {typeId}
                </div>
              );
          }
        })}
      </div>
    </div>
  );
}
