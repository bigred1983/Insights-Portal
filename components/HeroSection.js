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

  const isDashboardOfMonth =
    (typeof title === "string" && title === "Dashboard Of The Month") ||
    (typeof title !== "string" &&
      title?.content?.[0]?.content?.[0]?.value === "Dashboard Of The Month");

  return (
    <section className="bg-white p-8 md:p-10 rounded-2xl shadow-lg mb-10 border border-gray-200">
      {isDashboardOfMonth ? (
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Text block */}
          <div className="flex-1 text-center md:text-left">
            {title && (
              <h2 className="text-3xl font-extrabold mb-4 tracking-tight text-gray-900">
                {isTitleRichText ? documentToReactComponents(title) : title}
              </h2>
            )}
            {subtitle && (
              <div className="text-base leading-relaxed text-gray-600 mb-6">
                {isSubtitleRichText
                  ? documentToReactComponents(subtitle)
                  : subtitle}
              </div>
            )}
            {buttons?.length > 0 && (
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                {buttons.map((button) =>
                  button?.fields ? (
                    <Button key={button.sys.id} button={button} />
                  ) : null
                )}
              </div>
            )}
          </div>

          {/* Image */}
          {imageUrl && (
            <div className="flex-1 flex justify-center">
              <div className="w-[375px] max-w-full">
                <Image
                  src={imageUrl}
                  alt="Dashboard preview"
                  width={375}
                  height={375}
                  className="rounded-xl shadow object-contain w-full h-auto"
                  unoptimized
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          {title && (
            <h2 className="text-3xl font-extrabold text-center mb-4 tracking-tight text-gray-900">
              {isTitleRichText ? documentToReactComponents(title) : title}
            </h2>
          )}
          {subtitle && (
            <div className="text-base text-gray-600 text-center mb-6">
              {isSubtitleRichText
                ? documentToReactComponents(subtitle)
                : subtitle}
            </div>
          )}
          {buttons?.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4">
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
