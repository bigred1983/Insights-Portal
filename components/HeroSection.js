import Button from "./Button";
import Image from "next/image"; // ✅ Add Image import
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

  // ✅ Find first button image (for "Dashboard of the Month" special layout)
  let firstButtonImageUrl = null;
  if (
    Array.isArray(buttons) &&
    buttons[0]?.fields?.iconOrImage?.fields?.file?.url
  ) {
    firstButtonImageUrl = `https:${buttons[0].fields.iconOrImage.fields.file.url}`;
  }

  // ✅ Check if this Hero is "Dashboard Of The Month"
  const isDashboardOfMonth = title && (
    (typeof title === "string" && title === "Dashboard Of The Month") ||
    (typeof title !== "string" && title?.content?.[0]?.content?.[0]?.value === "Dashboard Of The Month")
  );

  return (
    <section className="bg-white text-black p-10 mt-16 mb-16 rounded-lg shadow-md border">
      {isDashboardOfMonth ? (
        // ✅ Special layout for "Dashboard Of The Month"
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Text block on left */}
          <div className="flex-1 text-center md:text-left">
            {title && (
              <h2 className="text-3xl font-bold mb-4">
                {isTitleRichText
                  ? documentToReactComponents(title)
                  : title}
              </h2>
            )}
            {subtitle && (
              <div className="text-lg leading-relaxed mb-8">
                {isSubtitleRichText
                  ? documentToReactComponents(subtitle)
                  : subtitle}
              </div>
            )}
            {/* Buttons */}
            {Array.isArray(buttons) && buttons.length > 0 && (
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                {buttons.map((button) =>
                  button?.fields ? (
                    <Button key={button.sys.id} button={button} />
                  ) : null
                )}
              </div>
            )}
          </div>

          {/* Image block on right */}
          {firstButtonImageUrl && (
            <div className="flex-1 flex justify-center">
              <Image
                src={firstButtonImageUrl}
                alt="Dashboard Preview"
                width={400}
                height={400}
                className="rounded shadow-md object-contain"
                unoptimized
              />
            </div>
          )}
        </div>
      ) : (
        // ✅ Normal layout for other sections
        <>
          {title && (
            <h2 className="text-3xl font-bold mb-4 text-center">
              {isTitleRichText
                ? documentToReactComponents(title)
                : title}
            </h2>
          )}
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
        </>
      )}
    </section>
  );
}
