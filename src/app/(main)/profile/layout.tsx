import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { User, Calendar, Globe, Shield, LogOut, ChevronRight } from 'lucide-react';

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get('x-invoke-path') || headersList.get('referer') || '';

  const navItems = [
    {
      title: 'Personal Info',
      href: '/profile/info',
      icon: User,
    },
    {
      title: 'My Booking',
      href: '/profile/booking',
      icon: Calendar,
    },
    {
      title: 'App Language',
      href: '/profile/language',
      icon: Globe,
    },
    {
      title: 'Account & Security',
      href: '/profile/account',
      icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen bg-[#fff] text-gray-800 p-4 md:p-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 items-start">
        
      
        <aside className="w-full md:w-80 flex-shrink-0 space-y-4">
          
        
          <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 shadow-sm">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gray-100 flex-shrink-0">
              <Image
                src="/images/user-avatar.jpg"
                alt="Knee Due"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="overflow-hidden">
              <h2 className="text-base font-semibold text-gray-900 truncate">Knee Due</h2>
              <p className="text-xs text-gray-500 truncate">kneedue@gmail.com</p>
            </div>
          </div>


          <div className="bg-white rounded-2xl border border-gray-100 p-2 shadow-sm divide-y divide-gray-50">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.includes(item.href);

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`flex items-center justify-between p-3.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-blue-50/80 text-blue-600 font-semibold'
                      : 'hover:bg-gray-50 text-gray-700 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                    <span className="text-sm">{item.title}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                </Link>
              );
            })}

            
            <div className="pt-2">
              <button
                type="button"
                className="w-full flex items-center justify-between p-3.5 hover:bg-red-50/50 transition-colors rounded-xl text-red-500 text-left"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="w-5 h-5 text-red-500" />
                  <span className="text-sm font-medium">Logout</span>
                </div>
              </button>
            </div>
          </div>

        </aside>

      
        <section className="flex-1 w-full">
          {children}
        </section>

      </div>
    </div>
  );
}