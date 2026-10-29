import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { cookies } from 'next/headers';
import { getProfileAction } from '@/actions/profile.actions';

export default async function ProfileInfoPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value || '';

  const profileResponse = await getProfileAction(token);
  const user = profileResponse.success ? profileResponse.user : null;

  const data = {
    name: user?.name || user?.first_name ? `${user.first_name || ''} ${user.last_name || ''}`.trim() : 'غير محدد',
    email: user?.email || 'غير محدد',
    location: user?.location || user?.address || 'غير محدد',
    phone: user?.phone || user?.mobile || 'غير محدد',
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Back Button */}
      <div>
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>
      </div>

      {/* Main Container Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
        <h1 className="text-xl font-semibold text-center text-gray-800 mb-8">
          Personal Information
        </h1>

        <div className="space-y-5">
          {/* Name Field */}
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-xs font-medium text-gray-500 block">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              readOnly
              className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none transition-all cursor-default"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-medium text-gray-500 block">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              readOnly
              className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none transition-all cursor-default"
            />
          </div>

          {/* Location Field */}
          <div className="space-y-1.5">
            <label htmlFor="location" className="text-xs font-medium text-gray-500 block">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={data.location}
              readOnly
              className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none transition-all cursor-default"
            />
          </div>

          {/* Phone Number Field */}
          <div className="space-y-1.5">
            <label htmlFor="phone" className="text-xs font-medium text-gray-500 block">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={data.phone}
              readOnly
              className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none transition-all cursor-default"
            />
          </div>
        </div>
      </div>
    </div>
  );
}