import { createClient } from 'contentful';
import { notFound } from 'next/navigation';
import HeroSection from '@/components/HeroSection';
import FeatureItem from '@/components/FeatureItem';
import TeamMember from '@/components/TeamMember';
import Button from '@/components/Button';
import SideMenu from '@/components/SideMenu'; // ✅ Added SideMenu

// ✅ Ensure environment variables exist
if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
  throw new Error("❌ Missing Contentful environment variables");
}

// ✅ Set up Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  environment: "master",
});

// ✅ Ensure Next.js pre-generates all pages with the correct slugs
export async function generateStaticParams() {
  try {
    console.log("📢 Fetching all page slugs from Contentful...");

    const res = await client.getEntries({ content_type: "page" });

    if (!res.items.length) {
      console.warn("⚠ No pages found in Contentful.");
      return [];
    }

    // ✅ Extract slugs and log them
    const slugs = res.items.map((item) => item.fields.slug);
    console.log("✅ Found slugs:", slugs);

    return slugs.map((slug) => ({ slug }));
  } catch (error) {
    console.error("❌ Error fetching slugs:", error);
    return [];
  }
}

// ✅ Page Component
export default async function Page({ params }) {
  const { slug } = params || {};
  console.log(`📢 Attempting to render page for slug: ${slug}`); // ✅ Debugging

  if (!slug) {
    console.error("❌ No slug provided for dynamic page.");
    return notFound();
  }

  try {
    // ✅ Fetch page data from Contentful (ensures underscores are used)
    const res = await client.getEntries({
      content_type: "page",
      "fields.slug": slug.replace(/-/g, "_"), // ✅ Ensures underscores are used
      include: 2,
    });

    if (!res.items.length) {
      console.error(`❌ No content found for slug: ${slug}`);
      return notFound();
    }

    const page = res.items[0].fields;
    const contentBlocks = Array.isArray(page.contentBlocks) ? page.contentBlocks : [];

    console.log("✅ Loaded page data:", page); // ✅ Debugging the returned content

    return (
      <div className="relative flex">
        {/* ✅ Side Menu */}
        <SideMenu />

        {/* ✅ Main Content */}
        <div className="text-center p-12 w-full">
          <h1 className="text-4xl font-bold mb-6">{page.title || "Untitled Page"}</h1>

          {/* ✅ Render Content Blocks */}
          {contentBlocks.map((block) => {
            if (!block || !block.sys || !block.sys.contentType) {
              console.warn("⚠ Skipping undefined content block.");
              return null;
            }

            switch (block.sys.contentType.sys.id) {
              case "heroSection":
                return <HeroSection key={block.sys.id} hero={block} />;
              case "featureItem":
                return <FeatureItem key={block.sys.id} feature={block} />;
              case "teamMember":
                return <TeamMember key={block.sys.id} member={block} />;
              case "button":
                return <Button key={block.sys.id} button={block} />;
              default:
                console.warn("⚠ Unknown content type:", block.sys.contentType.sys.id);
                return <p key={block.sys.id} className="text-yellow-500">Unsupported content type: {block.sys.contentType.sys.id}</p>;
            }
          })}
        </div>
      </div>
    );
  } catch (error) {
    console.error(`❌ Error fetching content for slug: ${slug}`, error);
    return <p className="text-red-500 text-center">Error loading content: {error.message}</p>;
  }
}