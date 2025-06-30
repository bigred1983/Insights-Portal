import { createClient } from "contentful";
import SectionBlock from "@/components/SectionBlock";
import FeatureItem from "@/components/FeatureItem";
import TeamMember from "@/components/TeamMember";
import Button from "@/components/Button";
import SideMenu from "@/components/SideMenu";
import HeroSection from "@/components/HeroSection";
import { notFound } from "next/navigation";

// 🧠 Set up Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  environment: "master",
});

// 🧭 Dynamic page for [slug]
export default async function Page({ params }) {
  const slug = params?.slug;

  console.log("🛰️ Incoming slug from URL:", slug);

  if (!slug) {
    console.error("❌ No slug found");
    return notFound();
  }

  // 🔍 Query Contentful for the page with this slug
  const res = await client.getEntries({
    content_type: "page",
    "fields.slug": slug,
    include: 2,
  });

  console.log("🔍 Found entries:", res.items.length);

  if (!res.items.length) {
    console.error("❌ No page found for slug:", slug);
    return notFound();
  }

  const page = res.items[0].fields;
  const contentBlocks = Array.isArray(page.contentBlocks) ? page.contentBlocks : [];

  return (
    <div className="relative flex">
      <SideMenu />
      <div className="text-center p-12 w-full">
        <h1 className="text-4xl font-bold mb-6">{page.title || "Untitled Page"}</h1>

        {contentBlocks.length === 0 ? (
          <p className="text-gray-400">No content blocks found.</p>
        ) : (
          contentBlocks.map((block, index) => {
            const typeId = block?.sys?.contentType?.sys?.id;

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

// 🏗️ Tell Next.js what pages to pre-build at build time
export async function generateStaticParams() {
  const res = await client.getEntries({ content_type: "page" });

  return res.items.map((item) => ({
    slug: item.fields.slug,
  }));
}
