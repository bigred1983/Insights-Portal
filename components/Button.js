export default function Button({ button }) {
  // ✅ Log the full button object to the console
  console.log("🔎 Button data:", button);

  // ✅ If no button or no fields, don't render anything
  if (!button || !button.fields) {
    console.warn("⚠️ Button missing fields:", button);
    return null;
  }

  // ✅ Safely extract image URL
  let imageUrl = null;
  if (button.fields.iconOrImage && button.fields.iconOrImage.fields?.file?.url) {
    imageUrl = `https:${button.fields.iconOrImage.fields.file.url}`;
  }

  return (
    <div className="inline-block text-center p-4">
      {/* ✅ Render Image if it exists */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={button.fields.label || "Button Image"}
          className="mx-auto mb-2 w-12 h-12 object-contain"
        />
      )}

      {/* ✅ Render Button Link */}
      <a
        href={button.fields.destinationUrl || "#"}
        className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-lg shadow-md"
      >
        {button.fields.label || "Click Here"}
      </a>
    </div>
  );
}