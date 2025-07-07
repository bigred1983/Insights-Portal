"use client";

import Link from "next/link";
import { useState } from "react";

const menuConfig = [
  {
    label: "Insights",
    links: [
      { label: "MBR Metrics", href: "/mbr-metrics" },
      { label: "Studio Metrics", href: "/studio-metrics" },
      { label: "Field Dashboards", href: "/field-dashboards" },
      { label: "Marketing Dashboards", href: "/marketing-dashboards" },
      { label: "Finance Dashboards", href: "/finance-dashboards" },
      { label: "Product Dashboards", href: "/product-dashboards" },
      { label: "Studio Dashboards", href: "/studio-dashboards" },
    ],
  },
  {
    label: "About",
    links: [
      { label: "Meet the Team", href: "/meet-the-team" },
      { label: "Work With Us", href: "/work-with-us" },
      { label: "Tools", href: "/tools" },
    ],
  },
  {
    label: "Use Cases",
    links: [
      { label: "Highlights", href: "/team-highlights" },
    ],
  },
  {
    label: "Resources",
    links: [
      { label: "Tableau", href: "https://tableau.com", external: true },
      { label: "Atlan", href: "https://atlan.com", external: true },
      { label: "Training Materials", href: "/training-materials" },
    ],
  },
];

export default function TopNav() {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menuLabel) => {
    setOpenMenu((prev) => (prev === menuLabel ? null : menuLabel));
  };

  return (
    <nav className="bg-white px-6 py-4 border-b border-gray-200 shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-800">
          <img src="/Contentful_Logo_2024_Dark.png" alt="Logo" className="h-10 w-auto" />
        </Link>

        {/* Nav links */}
        <ul className="flex space-x-8">
          {menuConfig.map((menu) => (
            <li key={menu.label} className="relative">
              <button
                onClick={() => toggleMenu(menu.label)}
                className="text-gray-700 font-semibold hover:text-blue-600 transition"
              >
                {menu.label}
              </button>

              {/* Dropdown */}
              {openMenu === menu.label && (
                <ul className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 shadow-lg rounded-md z-50">
                  {menu.links.map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
