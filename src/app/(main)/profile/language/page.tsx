import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';

interface PageProps {
  searchParams: Promise<{ lang?: string }>;
}

export default async function AppLanguagePage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const selectedLanguage = resolvedParams?.lang || 'en';

  const languages = [
    {
      id: 'en',
      name: 'English',
      nativeName: 'English (US)',
      flag: '🇺🇸',
    },
    {
      id: 'ar',
      name: 'Arabic',
      nativeName: 'العربية',
      flag: '🇸🇦',
    },
  ];

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
        App Language
      </h1>

      {/* Language Selection List (Using Next.js Links for Server-side Navigation) */}
      <div className="space-y-3 max-w-md mx-auto">
        {languages.map((lang) => {
          const isSelected = selectedLanguage === lang.id;
          return (
            <Link
              key={lang.id}
              href={`/profile/language?lang=${lang.id}`}
              className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left ${
                isSelected
                  ? 'border-blue-500 bg-blue-50/30 text-blue-600'
                  : 'border-gray-100 bg-gray-50/50 text-gray-700 hover:bg-gray-100/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{lang.flag}</span>
                <div>
                  <p className="text-sm font-semibold">{lang.name}</p>
                  <p className="text-xs text-gray-400">{lang.nativeName}</p>
                </div>
              </div>

              {isSelected && (
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}