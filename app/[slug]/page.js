import { createClient } from "contentful";
import SectionBlock from "@/components/SectionBlock";
import FeatureItem from "@/components/FeatureItem";
import TeamMember from "@/components/TeamMember";
import Button from "@/components/Button";
import HeroSection from "@/components/HeroSection";
import SearchBarWrapper from "@/components/SearchBarWrapper";
import { notFound } from "next/navigation";

// Setup Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  environment: "master",
});

// Dynamic page component
export default async function Page({ params }) {
  const slug = params?.slug;

  if (!slug) {
    return notFound();
  }

  const res = await client.getEntries({
    content_type: "page",
    "fields.slug": slug,
    include: 2,
  });

  if (!res.items.length) {
    return notFound();
  }

  const page = res.items[0].fields;
  const contentBlocks = Array.isArray(page.contentBlocks) ? page.contentBlocks : [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 🔹 Page Title */}
      <h1 className="text-4xl font-bold text-center mb-4">
        {page.title || "Untitled Page"}
      </h1>

      {/* 🔍 Search Bar (safe) */}
      <div className="max-w-xl mx-auto mb-10">
        <SearchBarWrapper />
      </div>

      {contentBlocks.length === 0 ? (
        <p className="text-center text-gray-400">No content blocks found.</p>
      ) : (
        (() => {
          let missionStatement = null;
          const teamMembers = [];
          const otherBlocks = [];

          contentBlocks.forEach((block) => {
            const typeId = block?.sys?.contentType?.sys?.id;

            if (
              typeId === "heroSection" &&
              block.fields.title?.toLowerCase().includes("mission statement") &&
              !missionStatement
            ) {
              missionStatement = block;
            } else if (typeId === "teamMember") {
              teamMembers.push(block);
            } else {
              otherBlocks.push(block);
            }
          });

          return (
            <>
              {/* 🔹 1. Mission Statement Hero */}
              {missionStatement && (
                <HeroSection key={missionStatement.sys.id} hero={missionStatement} />
              )}

              {/* 🔹 2. Team Members */}
              {teamMembers.length > 0 && (
                <div className="mt-12 mb-16">
                  <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
                    Meet the Team
                  </h2>
                  <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-fit">
                        {teamMembers.map((member) => (
                          <div key={member.sys.id} className="flex">
                            <TeamMember member={member} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 🔹 3. Remaining Content */}
              {otherBlocks.map((block, index) => {
                const typeId = block?.sys?.contentType?.sys?.id;

                switch (typeId) {
                  case "section":
                    return <SectionBlock key={block.sys.id} block={block} />;
                  case "heroSection":
                    return <HeroSection key={block.sys.id} hero={block} />;
                  case "featureItem":
                    return <FeatureItem key={block.sys.id} feature={block} />;
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
              })}
            </>
          );
        })()
      )}
    </div>
  );
}

// Generate static paths from Contentful slugs
export async function generateStaticParams() {
  const res = await client.getEntries({ content_type: "page" });

  return res.items.map((item) => ({
    slug: item.fields.slug,
  }));
}
