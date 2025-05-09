import Image from "next/image";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function FeatureItem({ feature }) {
  const image = feature.fields.image;
  const buttons = feature.fields.buttons;
  const title = feature.fields.title;
  const description = feature.fields.description;

  const imageUrl = image?.fields?.file?.url
    ? `https:${image.fields.file.url}`
    : null;

  const isRichText = description?.nodeType === "document";

  return (
    <div className="border p-6 my-6 shadow-lg rounded-md bg-white">
      {/* Image */}
      {imageUrl && (
        <div className="mb-4">
          <Image
            src={imageUrl}
            alt={image?.fields?.title || "Feature Image"}
            width={600}
            height={400}
            className="rounded-md"
            unoptimized
          />
        </div>
      )}

      {/* Title & Description */}
      <h2 className="text-2xl font-semibold">{title || "No title"}</h2>
      <div className="text-gray-600 mb-4">
        {isRichText ? documentToReactComponents(description) : description}
      </div>

      {/* Buttons */}
      {Array.isArray(buttons) && buttons.length > 0 && (
        <div className="mt-4 flex gap-4 flex-wrap">
          {buttons.map((button) =>
            button?.fields?.destinationUrl ? (
              <Link key={button.sys.id} href={button.fields.destinationUrl}>
                <span className="bg-red-600 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-lg shadow-md inline-block">
                  {button.fields.label}
                </span>
              </Link>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
