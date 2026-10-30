import Image from 'next/image';
import Link from 'next/link';
import { Plane, Car, MapPin, Building2, Star, Package } from 'lucide-react';
import { cookies } from 'next/headers';
import { getBookingsAction } from '@/actions/profile.actions';

type BookingCategory = 'flight' | 'cars' | 'tours' | 'hotel';

interface PageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function MyBookingPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const activeTab = (resolvedParams?.tab as BookingCategory) || 'flight';

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value || '';
  const bookingRes = await getBookingsAction(token);
  const rawBookings = bookingRes.success && bookingRes.bookings ? bookingRes.bookings : [];

  const bookingsList = Array.isArray(rawBookings)
    ? rawBookings.filter((b: any) => !b.type || b.type === activeTab)
    : [];

  const tabs = [
    { id: 'flight', label: 'Flight', icon: Plane },
    { id: 'cars', label: 'Cars', icon: Car },
    { id: 'tours', label: 'Tours', icon: MapPin },
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
            <Link
              key={tab.id}
              href={`/profile/booking?tab=${tab.id}`}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-full text-xs font-medium transition-all ${
                isActive
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Booking Cards List Container */}
      <div className="space-y-4 pt-2">
        {bookingsList.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <Package className="w-10 h-10 mx-auto text-gray-300" />
            <p className="text-xs text-gray-400">No {activeTab} bookings found.</p>
          </div>
        ) : (
          bookingsList.map((item: any, idx: number) => (
            <div key={item.id || idx}>
              {activeTab === 'flight' && (
                <div className="border border-rose-200/80 rounded-2xl p-5 hover:border-rose-300 transition-all bg-white shadow-sm">
                  <div className="flex justify-between items-center mb-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-[9px]">
                        ★
                      </div>
                      <span>{item.airline || item.title || 'Air Canada'}</span>
                    </div>
                    <span>{item.date || 'December 18th, 2026'}</span>
                  </div>

                  <div className="flex items-center justify-between my-4">
                    <div>
                      <div className="text-lg font-bold text-slate-900">{item.departure_time || '07h05'}</div>
                      <div className="text-[10px] text-slate-400">{item.from_code || 'YUL'}</div>
                    </div>

                    <div className="flex-1 flex flex-col items-center px-4">
                      <div className="w-full border-t border-dashed border-slate-300 relative flex justify-center items-center my-1">
                        <Plane className="w-3 h-3 text-slate-600 bg-white px-0.5 absolute rotate-90" />
                      </div>
                      <span className="text-[10px] text-slate-400">{item.duration || '13h00'}</span>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-bold text-slate-900">{item.arrival_time || '20h05'}</div>
                      <div className="text-[10px] text-slate-400">{item.to_code || 'NRT'}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 pt-3 border-t border-slate-100 text-center text-xs">
                    <div>
                      <div className="font-semibold text-slate-800">{item.gate || '8'}</div>
                      <div className="text-[10px] text-slate-400">Gate</div>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">{item.seat || '6'}</div>
                      <div className="text-[10px] text-slate-400">Seat</div>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">{item.terminal || '3'}</div>
                      <div className="text-[10px] text-slate-400">Terminal</div>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">{item.flight_number || 'AC006'}</div>
                      <div className="text-[10px] text-slate-400">Flight</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'cars' && (
                <div className="border border-rose-200/80 rounded-2xl p-5 hover:border-rose-300 transition-all bg-white shadow-sm relative flex items-center justify-between min-h-[110px]">
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-900">{item.title || item.name || 'S 500 Sedan'}</h3>
                    <div className="flex items-center gap-6 text-xs text-slate-400">
                      <span>{item.transmission || 'Automatic'}</span>
                      <span className="text-slate-200">|</span>
                      <span>{item.seats || '5 seats'}</span>
                      <span className="text-slate-200">|</span>
                      <span>{item.fuel || 'Diesel'}</span>
                    </div>
                  </div>
                  <div className="relative w-36 h-20">
                    <Image
                      src={item.image || "https://pngimg.com/uploads/mercedes/mercedes_PNG1872.png"}
                      alt={item.title || "Car"}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </div>
              )}

              {activeTab === 'tours' && (
                <div className="border border-rose-200/80 rounded-2xl p-4 hover:border-rose-300 transition-all bg-white shadow-sm relative flex items-center gap-4">
                  <div className="flex items-center gap-1 font-bold text-xs text-slate-800 absolute top-4 right-4">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{item.rating || '4.3'}</span>
                  </div>
                  <div className="relative w-28 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image || "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=400&auto=format&fit=crop&q=80"}
                      alt={item.title || "Tour"}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-400 block">{item.type_text || 'Full Day Tour'}</span>
                    <h3 className="text-base font-bold text-slate-900">{item.title || 'Luxor'}</h3>
                    <p className="text-xs text-slate-400 pt-1">
                      From <span className="text-blue-600 font-bold">${item.price || '150'}</span> Per Person
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'hotel' && (
                <div className="border border-rose-200/80 rounded-2xl p-4 hover:border-rose-300 transition-all bg-white shadow-sm relative flex items-center gap-4">
                  <div className="flex items-center gap-1 font-bold text-xs text-slate-800 absolute top-4 right-4">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{item.rating || '4.3'}</span>
                  </div>
                  <div className="relative w-28 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&auto=format&fit=crop&q=80"}
                      alt={item.title || "Hotel"}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="space-y-1">
                    {item.discount && (
                      <span className="inline-block bg-blue-50 text-blue-600 text-[10px] font-semibold px-1.5 py-0.5 rounded">
                        {item.discount}
                      </span>
                    )}
                    <h3 className="text-base font-bold text-slate-900">{item.title || 'Golden Valley'}</h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {item.location || 'New York, USA'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}