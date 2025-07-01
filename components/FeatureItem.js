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
    <div className="flex flex-col md:flex-row bg-white p-6 rounded-xl shadow-md border mb-8">
      {/* Image on the left */}
      {imageUrl && (
        <div className="md:w-1/2 mb-4 md:mb-0 md:mr-6 flex justify-center items-start">
          <Image
            src={imageUrl}
            alt={image?.fields?.title || "Feature Image"}
            width={400}
            height={300}
            className="rounded-lg object-contain max-h-[300px]"
            unoptimized
          />
        </div>
      )}

      {/* Text + Button on the right */}
      <div className="md:w-1/2 flex flex-col justify-start">
        <h2 className="text-2xl font-semibold mb-2">{title || "No Title"}</h2>

        <div className="text-gray-700 mb-4">
          {isRichText ? documentToReactComponents(description) : description}
        </div>

        {buttons?.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-2">
            {buttons.map((button) =>
              button?.fields?.destinationUrl ? (
                <Link key={button.sys.id} href={button.fields.destinationUrl}>
                  <span className="inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition">
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
