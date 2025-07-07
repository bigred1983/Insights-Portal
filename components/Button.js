export default function Button({ button }) {
  if (!button?.fields) return null;

  const label = button.fields.label || "Click Here";
  const url = button.fields.destinationUrl || "#";

  const imageUrl = button.fields.iconOrImage?.fields?.file?.url
    ? `https:${button.fields.iconOrImage.fields.file.url}`
    : null;

  return (
    <div className="text-center">
      {/* Optional Image */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={label}
          className="mx-auto mb-4 w-40 h-40 max-w-full object-contain"
        />
      )}

      {/* Button */}
      <a
        href={url}
        className="inline-block border-2 border-black px-8 py-4 text-lg font-semibold text-black bg-white rounded-lg shadow hover:bg-gray-100 transition"
      >
        {label}
      </a>
    </div>
  );
}
