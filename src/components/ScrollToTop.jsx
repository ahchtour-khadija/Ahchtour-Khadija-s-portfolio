import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instant top for all internal route changes with HashRouter.
    // Uses 'instant' to override html { scroll-behavior: smooth } when supported,
    // falls back to 'auto' otherwise. No effect on external links.
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } catch {
      window.scrollTo(0, 0);
    }
    // Ensure documentElement is at top for browsers that honour CSS smooth scroll
    // even when window.scrollTo with instant is not supported.
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}
