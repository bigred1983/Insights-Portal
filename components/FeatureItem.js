export default function FeatureItem({ feature }) {
  return (
    <div className="border p-6 my-6 shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold">{feature.fields.title || "No feature title"}</h2>
      <p className="text-gray-600">{feature.fields.description || "No description available"}</p>
    </div>
  );
}