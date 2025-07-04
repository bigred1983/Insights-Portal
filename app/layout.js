import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SideMenu from "@/components/SideMenu";
import Script from "next/script"; // ✅ Required

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F9FAFB] text-gray-900`}
      >
        <SideMenu />

        <main className="pt-6 md:pt-10 pl-0 md:pl-72 transition-all duration-300">
          {/* ✅ Pagefind search bar */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
            <div
              id="search"
              className="pagefind-ui"
              style={{
                background: "#fce8e6",
                border: "2px solid red",
                padding: "1rem",
                borderRadius: "8px",
              }}
            ></div>
          </div>

          {children}
        </main>

        {/* ✅ Load Pagefind UI script */}
        <Script src="/pagefind/pagefind-ui.js" type="module" strategy="afterInteractive" />

        {/* ✅ Initialize Pagefind when DOM is ready */}
        <Script id="pagefind-init" strategy="afterInteractive">
          {`
            window.addEventListener("DOMContentLoaded", () => {
              if (window.PagefindUI) {
                window.PagefindUI({ element: "#search" });
              }
            });
          `}
        </Script>
      </body>
    </html>
  );
}
