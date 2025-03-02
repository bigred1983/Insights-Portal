import Image from 'next/image';

export default function ContentItem({ item }) {
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-bold">{item.fields.title || "No title available"}</h3>
      {item.fields.image && (
        <Image
          src={`https:${item.fields.image.fields.file.url}`}
          alt={item.fields.title || "Content Image"}
          width={500}
          height={300}
        />
      )}
    </div>
  );
}