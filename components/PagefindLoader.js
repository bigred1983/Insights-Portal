'use client';

import { useEffect } from 'react';

export default function PagefindLoader() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = '/pagefind/pagefind-ui.js'; // ✅ correct file
      script.type = 'module';
      script.onload = () => {
        if (window.PagefindUI) {
          window.PagefindUI({ element: '#search' });
        } else {
          console.error("❌ PagefindUI still not defined.");
        }
      };
      document.body.appendChild(script);
    }
  }, []);

  return null;
}
