import Button from "./Button"; // ✅ Import your existing Button component
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function HeroSection({ hero }) {
  console.log("🔎 Hero data:", hero); // ✅ Log full Hero data for debugging

  if (!hero || !hero.fields) {
    console.warn("⚠️ Missing Hero fields:", hero);
    return null;
  }

  const { title, subtitle, buttons } = hero.fields;

  const isTitleRichText = title?.nodeType === "document";
  const isSubtitleRichText = subtitle?.nodeType === "document";

  return (
    <div className="bg-blue-500 text-white p-10 rounded-md">
      {/* ✅ Title */}
      {title && (
        <h2 className="text-3xl font-bold mb-2">
          {isTitleRichText
            ? documentToReactComponents(title)
            : title}
        </h2>
      )}

      {/* ✅ Subtitle */}
      {subtitle && (
        <div className="text-lg leading-relaxed mb-6">
          {isSubtitleRichText
            ? documentToReactComponents(subtitle)
            : subtitle}
        </div>
      )}

      {/* ✅ Buttons */}
      {Array.isArray(buttons) && buttons.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4 mt-6">
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
