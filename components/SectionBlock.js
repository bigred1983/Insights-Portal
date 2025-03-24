import Button from "./Button";

export default function SectionBlock({ block }) {
  const { title, subtitle, buttons } = block.fields;

  return (
    <div className="bg-blue-500 text-white p-10 my-6 rounded-xl shadow-md">
      {/* Title */}
      {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}

      {/* Subtitle */}
      {subtitle && <p className="mb-6 text-lg whitespace-pre-line">{subtitle}</p>}

      {/* Buttons */}
      {Array.isArray(buttons) && buttons.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4">
          {buttons.map((button) => (
            <Button key={button.sys.id} button={button} />
          ))}
        </div>
      )}
    </div>
  );
}
