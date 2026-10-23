'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ProfileInfoPage() {
  const [formData, setFormData] = useState({
    name: 'Knee Due',
    email: 'kneedue@gmail.com',
    location: 'San Francisco, CA',
    phone: '+1 234 567 8900',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          {/* Name Field */}
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-xs font-medium text-gray-500 block">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              placeholder="Enter your name"
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
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              placeholder="Enter your email"
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
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              placeholder="Enter your location"
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
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              placeholder="Enter your phone number"
            />
          </div>
        </form>
      </div>
    </div>
  );
}