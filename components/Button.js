export default function Button({ button }) {
  if (!button?.fields) return null;

  // Extract image URL if present
  const imageUrl = button.fields.iconOrImage?.fields?.file?.url
    ? `https:${button.fields.iconOrImage.fields.file.url}`
    : null;

  return (
    <div className="text-center">
      {/* Optional Image */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={button.fields.label || "Button Icon"}
          className="mx-auto mb-3 w-28 h-28 object-contain"
        />
      )}

      {/* Clickable Button */}
      <a
        href={button.fields.destinationUrl || "#"}
        className="inline-block border-2 border-black px-6 py-3 font-semibold text-black bg-white rounded-lg shadow hover:bg-gray-100 transition"
      >
        {button.fields.label || "Click Here"}
      </a>
    </div>
  );
}

