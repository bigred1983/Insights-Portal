export default function Button({ button }) {
  console.log("🔎 Button data:", button);

  if (!button || !button.fields) {
    console.warn("⚠️ Button missing fields:", button);
    return null;
  }

  // Extract image URL
  let imageUrl = null;
  if (button.fields.iconOrImage && button.fields.iconOrImage.fields?.file?.url) {
    imageUrl = `https:${button.fields.iconOrImage.fields.file.url}`;
  }

  return (
    <div className="inline-block text-center p-4">
      {/* Image */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={button.fields.label || "Button Image"}
          className="mx-auto mb-4 w-48 h-48 object-contain" // ✅ Bigger image: ~4x bigger (was 12w x 12h before)
        />
      )}

      {/* Button */}
      <a
        href={button.fields.destinationUrl || "#"}
        className="border-2 border-black text-black bg-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-gray-100 transition"
      >
        {button.fields.label || "Click Here"}
      </a>
    </div>
  );
}
