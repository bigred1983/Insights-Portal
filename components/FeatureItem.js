import Image from "next/image";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function FeatureItem({ feature }) {
  const { title, description, image, buttons } = feature.fields;

  const imageUrl = image?.fields?.file?.url
    ? `https:${image.fields.file.url}`
    : null;

  const isRichText = description?.nodeType === "document";

  return (
    <div className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-2xl shadow-lg p-8 my-8">
      {/* Image (Left on desktop) */}
      {imageUrl && (
        <div className="md:w-1/2 mb-6 md:mb-0 md:mr-6 flex justify-center items-start">
          <Image
            src={imageUrl}
            alt={image?.fields?.title || "Feature Image"}
            width={400}
            height={300}
            className="rounded-xl object-contain max-h-[300px] w-full"
            unoptimized
          />
        </div>
      )}

      {/* Content (Right on desktop) */}
      <div className="md:w-1/2 flex flex-col justify-start">
        <h2 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
          {title || "No Title"}
        </h2>

        <div className="text-base text-gray-700 mb-4 leading-relaxed">
          {isRichText ? documentToReactComponents(description) : description}
        </div>

        {buttons?.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {buttons.map((button) =>
              button?.fields?.destinationUrl ? (
                <Link key={button.sys.id} href={button.fields.destinationUrl}>
                  <span className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition">
                    {button.fields.label}
                  </span>
                </Link>
              ) : null
            )}
          </div>
        )}
      </div>
    </div>
  );
}
