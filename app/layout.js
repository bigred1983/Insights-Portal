import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SideMenu from "@/components/SideMenu";
import Script from "next/script"; // ✅ Needed to load Pagefind script

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Contentful Insights Portal",
  description: "Live dashboards, metrics, and team knowledge powered by Contentful.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Load Pagefind styles */}
        <link rel="stylesheet" href="/pagefind/pagefind-ui.css" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F9FAFB] text-gray-900`}
      >
        <SideMenu />

        <main className="pt-6 md:pt-10 pl-0 md:pl-72 transition-all duration-300">
          {/* ✅ Pagefind search bar */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
            <div id="search" className="pagefind-ui"></div>
          </div>

          {/* Page content */}
          {children}
        </main>

        {/* ✅ Load Pagefind script after page load */}
        <Script src="/pagefind/pagefind.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
