'use client';

import { useEffect } from 'react';

export default function PagefindLoader() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = '/pagefind/pagefind.js';
      script.type = 'module';
      script.onload = () => {
        if (window.PagefindUI) {
          window.PagefindUI({ element: '#search' });
        }
      };
      document.body.appendChild(script);
    }
  }, []);

  return null;
}
