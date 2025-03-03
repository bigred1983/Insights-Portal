import Image from "next/image";

export default function Button({ button }) {
  // ✅ Log the image field to check what Contentful returns
  console.log("Button Image Data:", button.fields.image);

  // ✅ Ensure the image field exists before rendering
  const hasImage = button.fields.image && button.fields.image.fields?.file?.url;
  const imageUrl = hasImage ? `https:${button.fields.image.fields.file.url}` : null;

  return (
    <div className="mt-6 flex items-center space-x-4">
      {/* ✅ If an image exists, display it */}
      {hasImage && (
        <Image 
          src={imageUrl} 
          alt={button.fields.label || "Button Image"} 
          width={40} 
          height={40} 
        />
      )}
      
      {/* ✅ The button itself */}
      <a
        href={button.fields.url}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
        target="_blank"
        rel="noopener noreferrer"
      >
        {button.fields.label}
      </a>
    </div>
  );
}