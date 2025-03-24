export default function Button({ button }) {
  const imageUrl = button.fields.iconOrImage?.fields?.file?.url
    ? `https:${button.fields.iconOrImage.fields.file.url}`
    : null;

  return (
    <div className="inline-block text-center p-4">
      {/* Image */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={button.fields.label}
          className="mx-auto mb-2 w-12 h-12 object-contain"
        />
      )}

      {/* Button Link */}
      <a
        href={button.fields.destinationUrl}
        className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-lg shadow-md"
      >
        {button.fields.label}
      </a>
    </div>
  );
}