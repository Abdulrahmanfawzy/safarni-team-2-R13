import Image from "next/image";
import compareImage from "@/assets/images/compare.png";
const CompareCard = () => {
  return (
    <div className="p-4 rounded-4xl shadow-app-card-shadow">
      <div className="flex items-center gap-4">
        {/* Image */}
        <div className="relative  w-38 h-25 md:size-25">
          <Image fill src={compareImage} alt="compare image" />
        </div>
        {/* content */}
        <div className="flex flex-col">
          <h3 className="text-xl font-medium text-black">
            Paris Evening Cruise
          </h3>
          <p className="text-gray-500 text-base">6:00 PM - 9:00 PM | $75</p>
          <p className="text-gray-500 text-base">
            Enjoy a romantic evening cruise in Paris.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompareCard;
