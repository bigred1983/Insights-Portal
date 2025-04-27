"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "contentful";

export default function SideMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pages, setPages] = useState([]);

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  useEffect(() => {
    async function fetchPages() {
      try {
        const res = await client.getEntries({ content_type: "page" });
        setPages(res.items.map((item) => item.fields.slug));
      } catch (error) {
        console.error("❌ Error fetching pages:", error);
      }
    }
    fetchPages();
  }, []);

  return (
    <>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-5 left-5 z-50 bg-gray-900 text-white px-4 py-2 rounded-md"
      >
        {menuOpen ? "Close Menu" : "Open Menu"}
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-5 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-lg font-bold mb-4">📄 Pages</h2>

        <ul className="space-y-2">
          {pages.length > 0 ? (
            pages.map((slug, index) => {
              const formattedSlug = slug.toLowerCase().replace(/_/g, "-"); // ✅ fix here
              return (
                <li key={index}>
                  <Link
                    href={`/${formattedSlug}`}
                    className="block p-2 bg-gray-700 hover:bg-gray-600 rounded"
                  >
                    {slug.replace("_", " ").toUpperCase()}
                  </Link>
                </li>
              );
            })
          ) : (
            <p className="text-sm text-gray-400">No pages found.</p>
          )}
        </ul>
      </div>
    </>
  );
}
