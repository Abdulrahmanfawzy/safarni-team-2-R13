"use client";
import { ProfileResponse } from "@/types/profile.type";
import { useForm } from "react-hook-form";

export default function ProfileInfoForm({
  userInfo,
}: {
  userInfo: ProfileResponse;
}) {
  const { handleSubmit } = useForm({ defaultValues: {} });
  return (
    <form>
      <div className="space-y-5">
        {/* Name Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="name"
            className="text-xs font-medium text-gray-500 block"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={userInfo.name}
            readOnly
            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none transition-all cursor-default"
          />
        </div>

        {/* Email Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="text-xs font-medium text-gray-500 block"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userInfo.email}
            readOnly
            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none transition-all cursor-default"
          />
        </div>

        {/* Location Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="location"
            className="text-xs font-medium text-gray-500 block"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={userInfo.location || "not found"}
            readOnly
            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none transition-all cursor-default"
          />
        </div>

        {/* Phone Number Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="phone"
            className="text-xs font-medium text-gray-500 block"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={userInfo.phone}
            readOnly
            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none transition-all cursor-default"
          />
        </div>
      </div>
    </form>
  );
}
