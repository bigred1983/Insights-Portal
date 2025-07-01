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
    <div className="bg-blue-600 text-white p-8 rounded-2xl shadow-md my-8">
      {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}

      {description && (
        <div className="text-base leading-relaxed mb-6">
          {isRichText ? documentToReactComponents(description) : description}
        </div>
      )}

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
