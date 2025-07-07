import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SideMenu from "@/components/SideMenu";
import Image from "next/image";
import Link from "next/link";

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
        <link rel="stylesheet" href="/pagefind/pagefind-ui.css" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <SideMenu />

        {/* ✅ Top bar with Contentful logo and nav */}
        <div className="pl-0 md:pl-72">
          <header className="bg-white px-6 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/Contentful_Logo_2024_Dark.png"
                alt="Contentful Logo"
                width={150}
                height={40}
                priority
              />
            </Link>

            {/* Optional nav links - uncomment if needed */}
            {/* <nav className="hidden md:flex space-x-6">
              <Link href="/insights" className="text-gray-700 hover:text-blue-600 transition">
                📊 Insights
              </Link>
              <Link href="/dashboards" className="text-gray-700 hover:text-blue-600 transition">
                📈 Dashboards
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">
                ℹ️ About
              </Link>
            </nav> */}
          </header>
        </div>

        {/* ✅ Page content */}
        <main className="pt-6 md:pt-10 pl-0 md:pl-72 transition-all duration-300">
          {children}
        </main>
      </body>
    </html>
  );
}
