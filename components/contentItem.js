import Image from "next/image";

export default function ContentItem({ item }) {
  // ✅ Ensure the image field exists before rendering
  if (!item.fields.image || !item.fields.image.fields?.file?.url) {
    console.warn(`⚠️ Missing image for: ${item.fields.title || "Untitled Item"}`);
    return null; // Avoid rendering broken images
  }

  const imageUrl = `https:${item.fields.image.fields.file.url}`;

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-bold">{item.fields.title || "No title available"}</h3>
      <Image
        src={imageUrl}
        alt={item.fields.title || "Content Image"}
        width={500}
        height={300}
        priority
        unoptimized={true} // ✅ Ensures Contentful images load properly
      />
    </div>
  );
}
