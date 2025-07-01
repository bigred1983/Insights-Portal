import Button from "./Button";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function HeroSection({ hero }) {
  if (!hero?.fields) return null;

  const { title, subtitle, buttons } = hero.fields;

  const isTitleRichText = title?.nodeType === "document";
  const isSubtitleRichText = subtitle?.nodeType === "document";

  const imageUrl = buttons?.[0]?.fields?.iconOrImage?.fields?.file?.url
    ? `https:${buttons[0].fields.iconOrImage.fields.file.url}`
    : null;

  const isDashboardOfMonth = title &&
    ((typeof title === "string" && title === "Dashboard Of The Month") ||
    (typeof title !== "string" && title?.content?.[0]?.content?.[0]?.value === "Dashboard Of The Month"));

  return (
    <section className="bg-white p-10 rounded-xl shadow mb-10 border border-gray-200">
      {isDashboardOfMonth ? (
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            {title && (
              <h2 className="text-3xl font-bold mb-4">
                {isTitleRichText ? documentToReactComponents(title) : title}
              </h2>
            )}
            {subtitle && (
              <div className="text-gray-700 text-lg mb-6">
                {isSubtitleRichText
                  ? documentToReactComponents(subtitle)
                  : subtitle}
              </div>
            )}
            {buttons?.length > 0 && (
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                {buttons.map((button) =>
                  button?.fields ? <Button key={button.sys.id} button={button} /> : null
                )}
              </div>
            )}
          </div>

          {imageUrl && (
            <div className="flex-1 flex justify-center">
              <Image
                src={imageUrl}
                alt="Dashboard preview"
                width={250}
                height={250}
                className="rounded-lg shadow"
                unoptimized
              />
            </div>
          )}
        </div>
      ) : (
        <>
          {title && (
            <h2 className="text-3xl font-bold mb-4 text-center">
              {isTitleRichText ? documentToReactComponents(title) : title}
            </h2>
          )}
          {subtitle && (
            <div className="text-lg text-gray-700 text-center mb-6">
              {isSubtitleRichText ? documentToReactComponents(subtitle) : subtitle}
            </div>
          )}
          {buttons?.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4">
              {buttons.map((button) =>
                button?.fields ? <Button key={button.sys.id} button={button} /> : null
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}
