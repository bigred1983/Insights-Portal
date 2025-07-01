import Image from "next/image";
import Button from "./Button";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function SectionBlock({ block }) {
  const { title, description, buttons, image } = block.fields;

  const imageUrl = image?.fields?.file?.url
    ? `https:${image.fields.file.url}`
    : null;

  const isRichText = description?.nodeType === "document";

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-8 my-8">
      {/* Title */}
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
          {title}
        </h2>
      )}

      {/* Description */}
      {description && (
        <div className="text-base text-gray-700 leading-relaxed mb-6">
          {isRichText
            ? documentToReactComponents(description)
            : description}
        </div>
      )}

      {/* Image */}
      {imageUrl && (
        <div className="flex justify-center mb-6">
          <Image
            src={imageUrl}
            alt={title || "Section Image"}
            width={800}
            height={400}
            className="rounded-xl object-contain"
            unoptimized
          />
        </div>
      )}

      {/* Buttons */}
      {Array.isArray(buttons) && buttons.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4">
          {buttons.map((button) =>
            button?.fields ? (
              <Button key={button.sys.id} button={button} />
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
