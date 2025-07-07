import { Inter } from "next/font/google";
import "./globals.css";
import SideMenu from "@/components/SideMenu";
import TopNav from "@/components/TopNav"; // ✅ Import the new nav bar

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
        className={`${inter.variable} font-sans antialiased bg-white text-gray-900`}
      >
        <SideMenu />

        {/* ✅ Top navigation bar with logo + dropdowns */}
        <div className="pl-0 md:pl-72">
          <TopNav />
        </div>

        {/* ✅ Page content */}
        <main className="pt-6 md:pt-10 pl-0 md:pl-72 transition-all duration-300">
          {children}
        </main>
      </body>
    </html>
  );
}
