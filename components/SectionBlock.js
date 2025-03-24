import Button from "./Button";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function SectionBlock({ block }) {
  const { title, subtitle, buttons } = block.fields;

  return (
    <div className="bg-blue-500 text-white p-10 my-6 rounded-xl shadow-md">
      {/* Title */}
      {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}

      {/* Rich Text Subtitle */}
      {subtitle && (
        <div className="mb-6 text-lg leading-relaxed">
          {documentToReactComponents(subtitle)}
        </div>
      )}

      {/* Buttons — safely map */}
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
