"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "contentful";

export default function SideMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pageSlugs, setPageSlugs] = useState([]);
  const [expanded, setExpanded] = useState({
    insights: false,
    team: false,
  });

  // Contentful client
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  useEffect(() => {
    async function fetchPages() {
      try {
        const res = await client.getEntries({ content_type: "page" });
        const slugs = res.items.map((item) => item.fields.slug);
        setPageSlugs(slugs);
      } catch (error) {
        console.error("❌ Error fetching pages:", error);
      }
    }

    fetchPages();
  }, []);

  // Menu grouping
  const groupedMenu = [
    {
      label: "Insights Portal",
      id: "insights",
      slug: "Insights_Portal",
      children: [
        "mbr-metrics",
        "north-star-metrics",
        "finance-dashboards",
        "field-dashboards",
        "marketing-dashboards",
        "product-dashboards",
        "studio-dashboards",
      ],
    },
    {
      label: "Meet the Team",
      id: "team",
      slug: "meet-the-team",
      children: [
        "mission-possible",
        "team-toad",
        "tools",
      ],
    },
  ];

  // Toggle expand/collapse
  const toggleExpand = (sectionId) => {
    setExpanded((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-4 left-4 z-50 bg-gray-900 text-white px-4 py-2 rounded-md shadow hover:bg-gray-700 transition"
      >
        {menuOpen ? "Close Menu" : "Open Menu"}
      </button>

      {/* Sidebar menu */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-6 z-40 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-xl font-bold mb-6">📂 Navigation</h2>

        <ul className="space-y-6">
          {groupedMenu.map((group) => (
            <li key={group.id}>
              {/* Anchor link to main group page */}
              <Link
                href={`/${group.slug}`}
                className="block px-4 py-2 bg-gray-800 rounded-md font-semibold hover:bg-gray-700 transition"
              >
                {group.label.toUpperCase()}
              </Link>

              {/* Expand/collapse toggle */}
              <button
                onClick={() => toggleExpand(group.id)}
                className="text-sm text-left w-full mt-1 px-4 py-1 text-gray-300 hover:text-white"
              >
                {expanded[group.id] ? "− Hide Subpages" : "+ Show Subpages"}
              </button>

              {/* Subpage links */}
              {expanded[group.id] && (
                <ul className="ml-4 mt-2 space-y-2">
                  {group.children.map((slug) =>
                    pageSlugs.includes(slug) ? (
                      <li key={slug}>
                        <Link
                          href={`/${slug}`}
                          className="block px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
                        >
                          {slug.replace(/-/g, " ").toUpperCase()}
                        </Link>
                      </li>
                    ) : null
                  )}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
