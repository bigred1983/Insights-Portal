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
            unoptimized={true}
          />
        </div>
      )}

      {/* Title */}
      <h2 className="text-2xl font-semibold">{title || "No feature title"}</h2>

      {/* Description */}
      <div className="text-gray-600 mb-4">
        {description
          ? isRichText
            ? documentToReactComponents(description)
            : description
          : "No description available"}
      </div>

      {/* Buttons */}
      {Array.isArray(buttons) && buttons.length > 0 && (
        <div className="mt-4 flex gap-4 flex-wrap">
          {buttons.map((button) =>
            button?.fields?.destinationUrl ? (
              <Link key={button.sys.id} href={button.fields.destinationUrl}>
                <span className="bg-red-600 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-lg shadow-md border border-red-700 inline-block">
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
