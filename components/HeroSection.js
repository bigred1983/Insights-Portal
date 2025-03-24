export default function HeroSection({ hero }) {
  const backgroundImageUrl = hero.fields.backgroundImage?.fields?.file?.url
    ? `https:${hero.fields.backgroundImage.fields.file.url}`
    : null;

  return (
    <div className="bg-blue-500 text-white p-10 rounded-md">
      {/* Background Image */}
      {backgroundImageUrl && (
        <img
          src={backgroundImageUrl}
          alt={hero.fields.title}
          className="w-full mb-6 rounded"
        />
      )}

      {/* Title */}
      <h2 className="text-3xl font-bold">{hero.fields.title}</h2>
    </div>
  );
}

