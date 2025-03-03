import { createClient } from 'contentful';
import { notFound } from 'next/navigation';
import HeroSection from '@/components/HeroSection';
import FeatureItem from '@/components/FeatureItem';
import TeamMember from '@/components/TeamMember';
import Button from '@/components/Button';

// ✅ Set up Contentful client with environment check
if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
  throw new Error("❌ Missing Contentful environment variables");
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export default async function Home() {
  try {
    // Fetch Insights Portal page
    const res = await client.getEntries({
      content_type: "page",
      "fields.slug": "Insights-Portal",
      include: 2,
    });

    if (!res.items.length) {
      console.error("❌ No content found for Insights Portal.");
      return <p className="text-red-500 text-center">No content available.</p>;
    }

    const page = res.items.length ? res.items[0].fields : {};
    const contentBlocks = Array.isArray(page.contentBlocks) ? page.contentBlocks : [];

    return (
      <div className="text-center p-12">
        <h1 className="text-4xl font-bold mb-6">{page.title || "Untitled Page"}</h1>

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
              return null;
          }
        })}
      </div>
    );
  } catch (error) {
    console.error("❌ Error fetching content:", error);
    return <p className="text-red-500 text-center">Error loading content: {error.message}</p>;
  }
}
