import { Check } from "lucide-react";

const ComparePriceCard = () => {
  const features = [
    "Duration: 3 hours",
    "Highlights: Evening cruise",
    "Availability: Available",
    "Guide: Local guide",
    "Transportation: Boat",
  ];

  return (
    <div className="flex flex-col gap-4 w-full  rounded-lg border border-gray-300 bg-gray-50 p-6">
      {/* Title and Price */}
      <div className="space-y-2">
        <h2 className="text-xl font-medium">Paris Evening Cruise</h2>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-semibold">$75</span>
          <span className="text-xl text-gray-500">/person</span>
        </div>
      </div>
      {/* Features */}
      <ul className="space-y-2">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-center text-gray-900 gap-3 text-xl"
          >
            <Check size={20} />
            <span className="block text-base">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComparePriceCard;
