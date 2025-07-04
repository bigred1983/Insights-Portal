'use client';

import { useEffect } from 'react';

export default function PagefindLoader() {
  useEffect(() => {
    // Only run in the browser
    if (typeof window !== 'undefined') {
      import('/pagefind/pagefind.js').then(() => {
        window.PagefindUI({
          element: '#search'
        });
      });
    }
  }, []);

  return null; // No UI needed, just runs the script
}
