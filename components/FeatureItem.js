import Image from "next/image";
import Link from "next/link";

export default function FeatureItem({ feature }) {
  // ✅ Ensure the image field exists before rendering
  const hasImage = feature.fields.image && feature.fields.image.fields?.file?.url;
  const imageUrl = hasImage ? `https:${feature.fields.image.fields.file.url}` : null;

  return (
    <div className="border p-6 my-6 shadow-lg rounded-md bg-white">
      {/* ✅ Display the image if available */}
      {hasImage && (
        <div className="mb-4">
          <Image
            src={imageUrl}
            alt={feature.fields.title || "Feature Image"}
            width={600} 
            height={400} 
            className="rounded-md"
            unoptimized={true} // ✅ Fixes Contentful image loading issues
          />
        </div>
      )}

      {/* ✅ Feature Title & Description */}
      <h2 className="text-2xl font-semibold">{feature.fields.title || "No feature title"}</h2>
      <p className="text-gray-600">{feature.fields.description || "No description available"}</p>

      {/* ✅ Render Buttons if available */}
      {feature.fields.buttons && feature.fields.buttons.length > 0 && (
        <div className="mt-4 flex gap-4 flex-wrap">
          {feature.fields.buttons.map((button) => {
            const buttonUrl = `/${button.fields.url || "#"}`; // ✅ Ensure URL keeps underscores
            const buttonLabel = button.fields.label || "Click Here"; // ✅ Default label

            return (
              <Link key={button.sys.id} href={buttonUrl}>
                <span className="bg-red-600 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-lg shadow-md border border-red-700 inline-block">
                  {buttonLabel}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
