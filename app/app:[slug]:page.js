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
  environment: "master",
});

export async function generateStaticParams() {
  try {
    const res = await client.getEntries({ content_type: "page" });
    return res.items.map((item) => ({ slug: item.fields.slug }));
  } catch (error) {
    console.error("❌ Error fetching slugs:", error);
    return [];
  }
}

export default async function Page({ params }) {
  const { slug } = params || {};

  if (!slug) {
    console.error("❌ No slug provided for dynamic page.");
    return notFound();
  }

  try {
    const res = await client.getEntries({
      content_type: "page",
      "fields.slug": slug,
      include: 2,
    });

    if (!res.items.length) {
      console.error(`❌ No content found for slug: ${slug}`);
      return notFound();
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
              return <p key={block.sys.id} className="text-yellow-500">Unsupported content type: {block.sys.contentType.sys.id}</p>;
          }
        })}
      </div>
    );
  } catch (error) {
    console.error(`❌ Error fetching content for slug: ${slug}`, error);
    return <p className="text-red-500 text-center">Error loading content: {error.message}</p>;
  }
}