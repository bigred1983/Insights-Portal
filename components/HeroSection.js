import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function HeroSection({ hero }) {
  const backgroundImageUrl = hero.fields.backgroundImage?.fields?.file?.url
    ? `https:${hero.fields.backgroundImage.fields.file.url}`
    : null;

  const { title, subtitle } = hero.fields;

  const isTitleRichText = title?.nodeType === "document";
  const isSubtitleRichText = subtitle?.nodeType === "document";

  return (
    <div className="bg-blue-500 text-white p-10 rounded-md">
      {/* Background Image */}
      {backgroundImageUrl && (
        <Image
          src={backgroundImageUrl}
          alt="Hero Background"
          width={1200}
          height={400}
          className="w-full mb-6 rounded"
          unoptimized={true}
        />
      )}

      {/* Title */}
      {title && (
        <h2 className="text-3xl font-bold mb-2">
          {isTitleRichText
            ? documentToReactComponents(title)
            : title}
        </h2>
      )}

      {/* Subtitle */}
      {subtitle && (
        <div className="text-lg leading-relaxed">
          {isSubtitleRichText
            ? documentToReactComponents(subtitle)
            : subtitle}
        </div>
      )}
    </div>
  );
}