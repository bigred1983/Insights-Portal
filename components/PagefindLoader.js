'use client';

import { useEffect } from 'react';

export default function PagefindLoader() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = '/pagefind/pagefind-ui.js';
      script.type = 'module';
      document.body.appendChild(script);

      // Poll until PagefindUI is available, then initialize it
      const interval = setInterval(() => {
        if (window.PagefindUI) {
          window.PagefindUI({ element: '#search' });
          clearInterval(interval);
        }
      }, 200);
    }
  }, []);

  return null;
}
