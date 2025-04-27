import Button from "./Button";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function HeroSection({ hero }) {
  console.log("🔎 Hero data:", hero);

  if (!hero || !hero.fields) {
    console.warn("⚠️ Missing Hero fields:", hero);
    return null;
  }

  const { title, subtitle, buttons } = hero.fields;

  const isTitleRichText = title?.nodeType === "document";
  const isSubtitleRichText = subtitle?.nodeType === "document";

  return (
    <section className="bg-white text-black p-10 mt-16 mb-16 rounded-lg shadow-md border">
      {/* Title */}
      {title && (
        <h2 className="text-3xl font-bold mb-4 text-center">
          {isTitleRichText
            ? documentToReactComponents(title)
            : title}
        </h2>
      )}

      {/* Subtitle */}
      {subtitle && (
        <div className="text-lg leading-relaxed mb-8 text-center">
          {isSubtitleRichText
            ? documentToReactComponents(subtitle)
            : subtitle}
        </div>
      )}

      {/* Buttons */}
      {Array.isArray(buttons) && buttons.length > 0 && (
        <div className="flex flex-wrap justify-center gap-6">
          {buttons.map((button) =>
            button?.fields ? (
              <Button key={button.sys.id} button={button} />
            ) : null
          )}
        </div>
      )}
    </section>
  );
}