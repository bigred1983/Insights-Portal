import Link from 'next/link';

export default function FeatureItem({ feature }) {
  return (
    <div className="border p-6 my-6 shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold">{feature.fields.title || "No feature title"}</h2>
      <p className="text-gray-600">{feature.fields.description || "No description available"}</p>

      {/* ✅ Render Buttons if available */}
      {feature.fields.buttons && feature.fields.buttons.length > 0 && (
        <div className="mt-4 flex gap-2">
          {feature.fields.buttons.map((button) => (
            <Link key={button.sys.id} href={button.fields.url}>
              <span className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                {button.fields.label}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}