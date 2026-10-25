'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plane, Car, MapPin, Building2, Star } from 'lucide-react';

type BookingCategory = 'flight' | 'cars' | 'tours' | 'hotel';

export default function MyBookingPage() {
  const [activeTab, setActiveTab] = useState<BookingCategory>('flight');

  const tabs = [
    { id: 'flight', label: 'Flight', icon: Plane },
    { id: 'cars', label: 'Cars', icon: Car },
    { id: 'tours', label: 'tours', icon: MapPin },
    { id: 'hotel', label: 'Hotel', icon: Building2 },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-6">
      <h1 className="text-xl font-semibold text-center text-gray-800 mb-6">
        My Booking
      </h1>

      {/* Tabs Filter Bar */}
      <div className="flex items-center justify-between gap-2 bg-white p-1 rounded-full border border-gray-200/80 mb-6 shadow-sm max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as BookingCategory)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-full text-xs font-medium transition-all ${
                isActive
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Booking Cards List Container */}
      <div className="space-y-4 pt-2">
        {/* ================= Flight Bookings ================= */}
        {activeTab === 'flight' && (
          <div className="border border-rose-200/80 rounded-2xl p-5 hover:border-rose-300 transition-all bg-white shadow-sm">
            <div className="flex justify-between items-center mb-4 text-xs text-slate-500">
              <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-[9px]">
                  ★
                </div>
                <span>Air Canada</span>
              </div>
              <span>December 18h, 2022</span>
            </div>

            <div className="flex items-center justify-between my-4">
              <div>
                <div className="text-lg font-bold text-slate-900">07h05</div>
                <div className="text-[10px] text-slate-400">YUL</div>
              </div>

              <div className="flex-1 flex flex-col items-center px-4">
                <div className="w-full border-t border-dashed border-slate-300 relative flex justify-center items-center my-1">
                  <Plane className="w-3 h-3 text-slate-600 bg-white px-0.5 absolute rotate-90" />
                </div>
                <span className="text-[10px] text-slate-400">13h00</span>
              </div>

              <div className="text-right">
                <div className="text-lg font-bold text-slate-900">20h05</div>
                <div className="text-[10px] text-slate-400">NRT</div>
              </div>
            </div>

            <div className="grid grid-cols-4 pt-3 border-t border-slate-100 text-center text-xs">
              <div>
                <div className="font-semibold text-slate-800">8</div>
                <div className="text-[10px] text-slate-400">Gate</div>
              </div>
              <div>
                <div className="font-semibold text-slate-800">6</div>
                <div className="text-[10px] text-slate-400">Seat</div>
              </div>
              <div>
                <div className="font-semibold text-slate-800">3</div>
                <div className="text-[10px] text-slate-400">Terminal</div>
              </div>
              <div>
                <div className="font-semibold text-slate-800">AC006</div>
                <div className="text-[10px] text-slate-400">Flight</div>
              </div>
            </div>
          </div>
        )}

        {/* ================= Cars Bookings ================= */}
        {activeTab === 'cars' && (
          <div className="border border-rose-200/80 rounded-2xl p-5 hover:border-rose-300 transition-all bg-white shadow-sm relative flex items-center justify-between min-h-[110px] mt-6">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">S 500 Sedan</h3>
              <div className="flex items-center gap-6 text-xs text-slate-400">
                <span>Automatic</span>
                <span className="text-slate-200">|</span>
                <span>5 seats</span>
                <span className="text-slate-200">|</span>
                <span>Diesel</span>
              </div>
            </div>
            <div className="absolute -top-6 right-2 w-44 h-24">
              <Image
                src="https://pngimg.com/uploads/mercedes/mercedes_PNG1872.png"
                alt="S 500 Sedan"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
        )}

        {/* ================= Tours Bookings ================= */}
        {activeTab === 'tours' && (
          <div className="border border-rose-200/80 rounded-2xl p-4 hover:border-rose-300 transition-all bg-white shadow-sm relative flex items-center gap-4">
            <div className="flex items-center gap-1 font-bold text-xs text-slate-800 absolute top-4 right-4">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>4.3</span>
            </div>
            <div className="relative w-28 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=400&auto=format&fit=crop&q=80"
                alt="Luxor"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] text-slate-400 block">Full Day Tour</span>
              <h3 className="text-base font-bold text-slate-900">Luxor</h3>
              <p className="text-xs text-slate-400 pt-1">
                From <span className="text-blue-600 font-bold">$150</span> Per Person
              </p>
            </div>
          </div>
        )}

        {/* ================= Hotel Bookings ================= */}
        {activeTab === 'hotel' && (
          <div className="border border-rose-200/80 rounded-2xl p-4 hover:border-rose-300 transition-all bg-white shadow-sm relative flex items-center gap-4">
            <div className="flex items-center gap-1 font-bold text-xs text-slate-800 absolute top-4 right-4">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>4.3</span>
            </div>
            <div className="relative w-28 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&auto=format&fit=crop&q=80"
                alt="Golden Valley"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="space-y-1">
              <span className="inline-block bg-blue-50 text-blue-600 text-[10px] font-semibold px-1.5 py-0.5 rounded">
                15% off
              </span>
              <h3 className="text-base font-bold text-slate-900">Golden Valley</h3>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> New York,USA
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}