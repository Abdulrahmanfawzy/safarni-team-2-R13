import Link from 'next/link';
import { ArrowLeft, ChevronRight } from 'lucide-react';

export default function AccountSecurityPage() {
  // قيم ثابتة للعرض (UI-only) بدون حاجة لـ useState
  const biometricEnabled = false;
  const faceIdEnabled = true;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-6">
      {/* Back Button */}
      <div>
        <Link
          href="/profile/info"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>
      </div>

      <h1 className="text-xl font-semibold text-center text-gray-800 mb-8">
        Account & Security
      </h1>

      <div className="space-y-6 max-w-2xl mx-auto">
        {/* Biometric ID Toggle (Static UI) */}
        <div className="flex items-center justify-between py-2">
          <span className="text-sm font-medium text-gray-800">Biometric ID</span>
          <div
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              biometricEnabled ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                biometricEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </div>
        </div>

        {/* Face ID Toggle (Static UI) */}
        <div className="flex items-center justify-between py-2 border-t border-gray-100 pt-4">
          <span className="text-sm font-medium text-gray-800">Face ID</span>
          <div
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              faceIdEnabled ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                faceIdEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </div>
        </div>

        {/* Device Management */}
        <div className="border-t border-gray-100 pt-4">
          <div className="w-full flex items-center justify-between py-3 rounded-xl px-2 text-left">
            <div>
              <h3 className="text-sm font-medium text-gray-800">Device Management</h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Manage your account on the various devices you own.
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Deactivate Account */}
        <div className="border-t border-gray-100 pt-4">
          <div className="w-full flex items-center justify-between py-3 rounded-xl px-2 text-left">
            <div>
              <h3 className="text-sm font-medium text-gray-800">Deactivate Account</h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Temporarily deactivate your account. Easily reactivate when you're ready.
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Delete Account */}
        <div className="border-t border-gray-100 pt-4">
          <div className="w-full flex items-center justify-between py-3 rounded-xl px-2 text-left">
            <div>
              <h3 className="text-sm font-medium text-red-500">Delete Account</h3>
              <p className="text-xs text-red-400/80 mt-0.5">
                Permanently remove your account and data. More info inside. Proceed with caution.
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-red-400" />
          </div>
        </div>
      </div>
    </div>
  );
}