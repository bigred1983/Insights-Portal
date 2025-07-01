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
        className="fixed top-4 left-4 z-50 bg-gray-900 text-white px-4 py-2 rounded-md shadow hover:bg-gray-700 transition"
      >
        {menuOpen ? "Close Menu" : "Open Menu"}
      </button>

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-6 z-40 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-xl font-bold mb-6">📄 Pages</h2>

        <ul className="space-y-2">
          {pages.length > 0 ? (
            pages.map((slug, index) => (
              <li key={index}>
                <Link
                  href={`/${slug}`}
                  className="block px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition font-medium"
                >
                  {slug.replace(/-/g, " ").toUpperCase()}
                </Link>
              </li>
            ))
          ) : (
            <li className="text-sm text-gray-400">No pages found.</li>
          )}
        </ul>
      </aside>
    </>
  );
}
