import Image from "next/image";
import Link from "next/link";

export default function HeroSection({ hero }) {
  // ✅ Ensure the background image exists before rendering
  const hasBackgroundImage =
    hero.fields.backgroundImage && hero.fields.backgroundImage.fields?.file?.url;
  const backgroundImageUrl = hasBackgroundImage
    ? `https:${hero.fields.backgroundImage.fields.file.url}`
    : null;

  return (
    <div className="relative w-full h-96 flex flex-col items-center justify-center text-white bg-blue-500 my-6 p-6 overflow-hidden">
      {/* ✅ Background Image */}
      {hasBackgroundImage && (
        <Image
          src={backgroundImageUrl}
          alt={hero.fields.title || "Hero Image"}
          layout="fill"
          objectFit="cover"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
        />
      )}

      {/* ✅ Hero Content Container */}
      <div className="relative z-10 text-center px-6">
        <h2 className="text-3xl font-bold">{hero.fields.title || "No title available"}</h2>
        <p className="text-lg mt-2">{hero.fields.subtitle || "No subtitle available"}</p>

        {/* ✅ Render Buttons (if available) */}
        {hero.fields.buttons && hero.fields.buttons.length > 0 && (
          <div className="mt-6 flex gap-4 justify-center">
            {hero.fields.buttons.map((button) => {
              const buttonUrl = button.fields.url || "#"; // ✅ Ensure URL is always defined
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
    </div>
  );
}
