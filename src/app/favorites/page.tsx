'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, Star, Heart, Clock } from 'lucide-react';

interface FavoriteItem {
  id: string;
  title: string;
  category: string;
  image: string;
  rating: number;
  reviewsCount?: number;
  duration?: string;
  pickupAvailable?: boolean;
  price: string;
}

const initialFavorites: FavoriteItem[] = [
  {
    id: '1',
    title: 'paris City Tour',
    category: 'City Tour',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&auto=format&fit=crop&q=80',
    rating: 4.1,
    reviewsCount: 650,
    duration: '7 Days',
    pickupAvailable: true,
    price: '1500$',
  },
  {
    id: '2',
    title: 'Disneyland Paris',
    category: 'Theme Park',
    image: 'https://images.unsplash.com/photo-1588613485992-12a14943828d?w=500&auto=format&fit=crop&q=80',
    rating: 4.5,
    reviewsCount: 650,
    duration: '5 Days',
    pickupAvailable: true,
    price: '1050$',
  },
  {
    id: '3',
    title: 'River Cruise',
    category: 'Cruise',
    image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=500&auto=format&fit=crop&q=80',
    rating: 4.0,
    reviewsCount: 350,
    duration: '6 hour',
    pickupAvailable: true,
    price: '100$',
  },
  {
    id: '4',
    title: 'Eiffel Tower',
    category: 'Landmark',
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=500&auto=format&fit=crop&q=80',
    rating: 4.5,
    reviewsCount: 650,
    duration: '5 Days',
    pickupAvailable: true,
    price: '1050$',
  },
  {
    id: '5',
    title: 'Eiffel Tower',
    category: 'Full Day Tours',
    image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=500&auto=format&fit=crop&q=80',
    rating: 4.7,
    price: '200$',
  },
  {
    id: '6',
    title: 'Notre-Dame Cathedral',
    category: 'Full Day Tours',
    image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=500&auto=format&fit=crop&q=80',
    rating: 4.2,
    price: '250$',
  },
  {
    id: '7',
    title: 'Galeries Lafayette',
    category: 'Full Day Tours',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&auto=format&fit=crop&q=80',
    rating: 4.5,
    price: '150$',
  },
  {
    id: '8',
    title: 'Bois de Boulogne',
    category: 'Full Day Tours',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80',
    rating: 4.7,
    price: '200$',
  },
];

export default function FavoritePage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(initialFavorites);

  const removeItem = (id: string) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 font-sans p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header & Back Button */}
        <div className="flex items-center justify-between mb-8 relative">
          <button 
            type="button" 
            className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-slate-800 shadow-sm transition-all"
            title="Go back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
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
            <button
              onClick={() => setFavorites(initialFavorites)}
              className="mt-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
              Reset Favorites
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favorites.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group"
              >
                {/* Image & Favorite Heart Button */}
                <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center text-rose-500 shadow-md hover:scale-110 transition-transform"
                    title="Remove from favorites"
                  >
                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                  </button>
                </div>

                {/* Card Details */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                    <div className="flex items-center gap-1 text-xs font-semibold text-slate-800">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{item.rating}</span>
                      {item.reviewsCount && (
                        <span className="text-slate-400 font-normal">({item.reviewsCount})</span>
                      )}
                    </div>
                  </div>

                  {item.pickupAvailable ? (
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                      <span>Pickup Available</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-blue-500" /> {item.duration}
                      </span>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500 pt-1">
                      {item.category}
                    </div>
                  )}

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