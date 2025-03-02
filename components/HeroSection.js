import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection({ hero }) {
  return (
    <div className="relative w-full h-96 flex flex-col items-center justify-center text-white bg-black my-6 p-6">
      {/* ✅ Background Image */}
      {hero.fields.backgroundImage && (
        <Image
          src={`https:${hero.fields.backgroundImage.fields.file.url}`}
          alt={hero.fields.title || "Hero Image"}
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        />
      )}

      {/* ✅ Hero Title & Subtitle */}
      <h2 className="text-3xl font-bold absolute">{hero.fields.title || "No title available"}</h2>
      <p className="text-lg absolute mt-12">{hero.fields.subtitle || "No subtitle available"}</p>

      {/* ✅ Render Buttons (if available) */}
      {hero.fields.buttons && hero.fields.buttons.length > 0 && (
        <div className="absolute bottom-10 flex gap-4">
          {hero.fields.buttons.map((button) => (
            <Link key={button.sys.id} href={button.fields.url}>
              <span className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {button.fields.label}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
