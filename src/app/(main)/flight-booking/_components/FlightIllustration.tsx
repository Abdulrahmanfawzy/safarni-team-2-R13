import Image from "next/image";
import Rectangle from "@/assets/images/Rectangle 20@2x.png";

export function FlightIllustration() {
  return (
    <div
      className="flex aspect-square w-full items-center justify-center overflow-hidden 
    rounded-2xl bg-[#f4f4f5] p-8 sm:p-12"
    >
      <div className="flex lg:h-[405px] lg:w-[450px] items-center justify-center">

        <Image
          src={Rectangle}
          alt="Airplane illustration"
          // width={176}
          // height={176}
          priority
          className=" size-44 lg:size-full"
        />
      </div>
    </div>
  );
}
