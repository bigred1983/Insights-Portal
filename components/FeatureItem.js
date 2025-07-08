import Image from "next/image";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

export default function FeatureItem({ feature }) {
  const { title, description, image, buttons, destinationUrl } = feature.fields;

  const imageUrl = image?.fields?.file?.url
    ? `https:${image.fields.file.url}`
    : null;

  const isRichText = description?.nodeType === "document";

  const renderOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className="text-xl font-semibold text-gray-900 mb-3">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className="text-lg font-medium text-gray-900 mb-2">{children}</h3>
      ),
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className="list-disc pl-6 mb-4">{children}</ul>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li className="mb-1 text-gray-700">{children}</li>
      ),
    },
  };

  return (
    <div className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-2xl shadow-lg p-8 my-8">
      {/* Image (Left on desktop) */}
      {imageUrl && (
        <div className="md:w-1/2 mb-6 md:mb-0 md:mr-6 flex justify-center items-start">
          <div className="relative w-full bg-blue-50 border-4 border-blue-600 rounded-xl overflow-hidden shadow-xl group">
            {destinationUrl ? (
              <a
                href={destinationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Image
                  src={imageUrl}
                  alt={image?.fields?.title || "Feature Image"}
                  width={400}
                  height={300}
                  className="object-contain w-full h-auto transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110"
                  unoptimized
                />
              </a>
            ) : (
              <Image
                src={imageUrl}
                alt={image?.fields?.title || "Feature Image"}
                width={400}
                height={300}
                className="object-contain w-full h-auto transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110"
                unoptimized
              />
            )}

            {/* 🏆 Badge */}
            <div className="absolute top-2 left-2 bg-yellow-400 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
              🏆 Dashboard of the Month
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className={`${imageUrl ? "md:w-1/2" : "w-full"} flex flex-col justify-start`}>
        <h2 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
          {title || "No Title"}
        </h2>

        <div className="text-base text-gray-700 mb-4 leading-relaxed">
          {isRichText
            ? documentToReactComponents(description, renderOptions)
            : description}
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
