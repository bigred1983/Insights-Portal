"use client";

import Link from "next/link";

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
    links: [{ label: "Highlights", href: "/team-highlights" }],
  },
  {
    label: "Resources",
    links: [
      {
        label: "Tableau",
        href: "https://prod-useast-b.online.tableau.com/#/site/contentful/explore?:iid=1",
        external: true,
      },
      {
        label: "Atlan",
        href: "https://contentful.atlan.com",
        external: true,
      },
      {
        label: "Request Tool Access",
        href: "https://contentful.atlassian.net/servicedesk/customer/portal/2/group/23/create/619",
        external: true,
      },
      {
        label: "Training Materials",
        href:
          "https://sites.google.com/contentful.com/data-team/insights-portal/data-fluency/data-vizualisation/tableau-training-materials",
        external: true,
      },
    ],
  },
];

export default function TopNav() {
  return (
    <nav className="bg-white px-6 py-4 border-b border-gray-200 shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-800">
          <img
            src="/Contentful_Logo_2024_Dark.png"
            alt="Logo"
            className="h-10 w-auto"
          />
        </Link>

        {/* Nav links and search */}
        <div className="flex items-center space-x-8">
          <ul className="flex space-x-8">
            {menuConfig.map((menu) => (
              <li key={menu.label} className="relative group">
                {/* Parent container keeps hover state alive */}
                <div className="cursor-pointer text-gray-700 font-semibold hover:text-blue-600 transition">
                  {menu.label}
                </div>

                {/* Dropdown stays within hoverable container */}
                <div className="absolute top-full left-0 w-56 bg-white border border-gray-200 shadow-lg rounded-md z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <ul className="py-2">
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
                </div>
              </li>
            ))}
          </ul>

          {/* 🔍 Search button */}
          <Link
            href="/static-search.html"
            className="bg-blue-600 text-white font-medium px-4 py-2 rounded hover:bg-blue-500 transition text-sm"
          >
            🔍 Search
          </Link>
        </div>
      </div>
    </nav>
  );
}
