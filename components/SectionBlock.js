import Image from "next/image";
import Button from "./Button";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function SectionBlock({ block }) {
  const { title, description, buttons, image } = block.fields;

  const imageUrl = image?.fields?.file?.url
    ? `https:${image.fields.file.url}`
    : null;

  const isDescriptionRichText = description?.nodeType === "document";

  return (
    <div className="bg-blue-500 text-white p-10 my-6 rounded-xl shadow-md">
      {/* Title */}
      {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}

      {/* Description (Rich Text Safe) */}
      {description && (
        <div className="mb-6 text-lg leading-relaxed">
          {isDescriptionRichText
            ? documentToReactComponents(description)
            : description}
        </div>
      )}

      {/* Optional Image */}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title || "Section Image"}
          width={800}
          height={400}
          className="rounded mb-6 mx-auto"
          unoptimized={true}
        />
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