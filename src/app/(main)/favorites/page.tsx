import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Star, Heart, Clock } from 'lucide-react';
import { cookies } from 'next/headers';
import { getFavoritesAction } from '@/actions/favorite.actions';
import FavoriteItemClient from '@/components/favorite-item-client'; // أو نضعها كـ Client Component داخلي

export default async function FavoritePage() {
  // 1. جلب التوكن من الـ Cookies
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value || '';

  // 2. جلب المفضلة من السيرفر عبر الـ Action
  const res = await getFavoritesAction(token);
  const favorites = res.success && res.favorites ? res.favorites : [];

  return (
    <div className="min-h-screen text-slate-800 font-sans mt-5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header & Back Button */}
        <div className="flex items-center justify-between mb-8 relative">
          <Link 
            href="/profile"
            className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-slate-800 shadow-sm transition-all"
            title="Go back"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          
          <h1 className="text-xl font-bold text-slate-900 absolute left-1/2 -translate-x-1/2">
            Favorite
          </h1>

          <div className="w-10" />
        </div>

        {/* Empty State vs Grid */}
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No Favorites Yet</h3>
            <p className="text-sm text-slate-500 max-w-sm">
              You haven't added any favorite places or tours yet. Explore and save your favorite experiences!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favorites.map((item: any) => (
              <div 
                key={item.id} 
                className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group"
              >
                {/* Image & Favorite Heart Button */}
                <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-slate-100">
                  <Image
                    src={item.image || item.photo || "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&auto=format&fit=crop&q=80"}
                    alt={item.title || item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                  <button
                    type="button"
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center text-rose-500 shadow-md hover:scale-110 transition-transform cursor-pointer"
                    title="Remove from favorites"
                  >
                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                  </button>
                </div>

                {/* Card Details */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900">{item.title || item.name}</h3>
                    <div className="flex items-center gap-1 text-xs font-semibold text-slate-800">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{item.rating || '4.5'}</span>
                      {item.reviewsCount && (
                        <span className="text-slate-400 font-normal">({item.reviewsCount})</span>
                      )}
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 pt-1">
                    {item.category || item.type || 'Tour Experience'}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      From <span className="text-blue-600 font-bold text-sm">${item.price}</span> Per Person
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}