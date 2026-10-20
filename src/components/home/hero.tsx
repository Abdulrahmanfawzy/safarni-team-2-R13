import Image, { type StaticImageData } from "next/image";
import { HERO_IMAGES } from "@/constants/home";

function HeroImage({
  src,
  className,
  priority = false,
}: {
  src: StaticImageData;
  className: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        sizes="(max-width: 1024px) 33vw, 160px"
        className="object-cover"
      />
    </div>
  );
}

export default function Hero() {
  return (
    <section className="grid items-center gap-10 py-6 lg:grid-cols-2">
      <div className="max-w-md space-y-4">
        <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
          Visit The Most <br />
          <span className="text-app-primary">Beautiful Places In</span> <br />
          The World
        </h1>
        <p className="text-xs leading-relaxed text-gray-500">
          Explore stunning destinations around the globe. Find travel
          inspiration, top attractions, and plan your next adventure—all from
          one platform.
        </p>
      </div>

      {/* collage */}
      <div className="flex justify-center gap-3 lg:justify-end">
        <div className="flex w-[150px] flex-col gap-3">
          <HeroImage src={HERO_IMAGES.colA[0]} className="h-[150px]" priority />
          <HeroImage src={HERO_IMAGES.colA[1]} className="h-[190px]" />
        </div>

        <div className="flex w-[150px] flex-col gap-3 pt-10">
          <HeroImage src={HERO_IMAGES.colB[0]} className="h-[110px]" />
          <HeroImage src={HERO_IMAGES.colB[1]} className="h-[200px]" />
        </div>

        <div className="w-[100px] pt-14">
          <HeroImage src={HERO_IMAGES.colC[0]} className="h-[210px]" />
        </div>
      </div>
    </section>
  );
}