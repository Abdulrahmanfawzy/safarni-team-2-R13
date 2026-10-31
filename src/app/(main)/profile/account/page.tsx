"use client";
import { useState } from "react";

import ProfileCard from "../_components/ProfileCard";
import { ChevronRight } from "lucide-react";

export default function AccountSecurityPage() {
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [faceIdEnabled, setFaceIdEnabled] = useState(true);

  return (
    <ProfileCard title="Account & Security">
      <div className="space-y-6 max-w-2xl mx-auto">
        {/* Biometric ID Toggle */}
        <div
          onClick={() => setBiometricEnabled(!biometricEnabled)}
          className="flex items-center justify-between py-2 cursor-pointer select-none"
        >
          <span className="text-sm font-medium text-gray-800">
            Biometric ID
          </span>
          <div
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              biometricEnabled ? "bg-blue-600" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                biometricEnabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </div>
        </div>

        {/* Face ID Toggle */}
        <div
          onClick={() => setFaceIdEnabled(!faceIdEnabled)}
          className="flex items-center justify-between py-2 border-t border-gray-100 pt-4 cursor-pointer select-none"
        >
          <span className="text-sm font-medium text-gray-800">Face ID</span>
          <div
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              faceIdEnabled ? "bg-blue-600" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                faceIdEnabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </div>
        </div>

        {/* Device Management */}
        <div className="border-t border-gray-100 pt-4">
          <button
            type="button"
            className="w-full flex items-center justify-between py-3 rounded-xl px-2 text-left hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div>
              <h3 className="text-sm font-medium text-gray-800">
                Device Management
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Manage your account on the various devices you own.
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Deactivate Account */}
        <div className="border-t border-gray-100 pt-4">
          <button
            type="button"
            className="w-full flex items-center justify-between py-3 rounded-xl px-2 text-left hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div>
              <h3 className="text-sm font-medium text-gray-800">
                Deactivate Account
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Temporarily deactivate your account. Easily reactivate when
                {"you're"} ready.
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Delete Account */}
        <div className="border-t border-gray-100 pt-4">
          <button
            type="button"
            className="w-full flex items-center justify-between py-3 rounded-xl px-2 text-left hover:bg-red-50/50 transition-colors cursor-pointer"
          >
            <div>
              <h3 className="text-sm font-medium text-red-500">
                Delete Account
              </h3>
              <p className="text-xs text-red-400/80 mt-0.5">
                Permanently remove your account and data. More info inside.
                Proceed with caution.
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-red-400" />
          </button>
        </div>
      </div>
    </ProfileCard>
  );
}
