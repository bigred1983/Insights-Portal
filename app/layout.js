import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SideMenu from "@/components/SideMenu"; // ✅ Import the Side Menu

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "My Contentful Site",
  description: "A dynamic site powered by Contentful and Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 text-gray-900`}
      >
        {/* ✅ Add Side Menu */}
        <SideMenu />

        {/* ✅ Ensure main content is shifted when menu is open */}
        <main className="container mx-auto p-6 transition-all duration-300">
          {children}
        </main>
      </body>
    </html>
  );
}
