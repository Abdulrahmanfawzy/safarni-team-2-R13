import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/providers/QueryClientProvider";
import { Toaster } from "sonner";
import NextAuthProvider from "@/components/providers/NextAuthProvider";
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});
export const metadata: Metadata = {
  title: "Safarni",
  description: "Travel is the only thing you buy that makes you richer.",
};

export const instant = false;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <NextAuthProvider>
          <QueryProvider>{children}</QueryProvider>
          <Toaster richColors dir="auto" position="top-center" />
        </NextAuthProvider>
      </body>
    </html>
  );
}
