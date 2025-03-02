import Image from 'next/image';

export default function HeroSection({ hero }) {
  return (
    <div className="relative w-full h-96 flex flex-col items-center justify-center text-white bg-black my-6">
      {hero.fields.backgroundImage && (
        <Image
          src={`https:${hero.fields.backgroundImage.fields.file.url}`}
          alt={hero.fields.title}
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        />
      )}
      <h2 className="text-3xl font-bold absolute">{hero.fields.title || "No title available"}</h2>
      <p className="text-lg absolute mt-12">{hero.fields.subtitle || "No subtitle available"}</p>
    </div>
  );
}