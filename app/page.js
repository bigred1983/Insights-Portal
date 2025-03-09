import { createClient } from 'contentful';
import HeroSection from '@/components/HeroSection';
import FeatureItem from '@/components/FeatureItem';
import TeamMember from '@/components/TeamMember';
import Button from '@/components/Button';
import ContentItem from '@/components/ContentItem'; // ✅ Added ContentItem
import SideMenu from '@/components/SideMenu'; // ✅ Added SideMenu

// ✅ Ensure environment variables exist
if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
  throw new Error("❌ Missing Contentful environment variables");
}

// ✅ Set up Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// ✅ Function to Fetch Page Data (Ensuring Slugs Stay with Underscores)
async function fetchPageData() {
  try {
    const res = await client.getEntries({
      content_type: "page",
      "fields.slug": "insights_portal", // ✅ Ensures underscores remain
      include: 2,
    });

    if (!res.items.length) {
      console.error("❌ No content found for Insights Portal.");
      return null;
    }

    console.log("✅ Page Data:", res.items[0].fields); // ✅ Debug log

    return res.items[0].fields; // ✅ Return fields object
  } catch (error) {
    console.error("❌ Error fetching content:", error);
    return null;
  }
}

// ✅ Home Page Component
export default async function Home() {
  const page = await fetchPageData(); // ✅ Fetch content outside render

  if (!page) {
    return <p className="text-red-500 text-center">Error loading content.</p>;
  }

  const contentBlocks = Array.isArray(page.contentBlocks) ? page.contentBlocks : [];

  return (
    <div className="relative flex">
      {/* ✅ Side Menu */}
      <SideMenu />

      {/* ✅ Main Content */}
      <div className="text-center p-12 w-full">
        <h1 className="text-4xl font-bold mb-6">{page.title || "Untitled Page"}</h1>

        {/* ✅ Render Content Blocks */}
        {contentBlocks.map((block) => {
          if (!block || !block.sys?.contentType) {
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
            case "contentItem": // ✅ Added ContentItem case
              return <ContentItem key={block.sys.id} item={block} />;
            default:
              console.warn("⚠ Unknown content type:", block.sys.contentType.sys.id);
              return <p key={block.sys.id} className="text-yellow-500">Unsupported content type: {block.sys.contentType.sys.id}</p>;
          }
        })}
      </div>
    </div>
  );
}
