'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const NavBar = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const saved = (() => {
      try {
        return localStorage.getItem('pf-theme');
      } catch {
        return null;
      }
    })();
    const initial = (saved as 'light' | 'dark') || 'light';
    setTheme(initial);
    document.body.setAttribute('data-theme', initial);
  }, []);

  const toggleTheme = (e: React.MouseEvent) => {
    const next = theme === 'dark' ? 'light' : 'dark';

    if (!document.startViewTransition) {
      applyTheme(next);
      return;
    }

    const x = e.clientX || window.innerWidth - 40;
    const y = e.clientY || 40;
    const endR = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    const transition = document.startViewTransition(() => applyTheme(next));
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endR}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 520,
          easing: 'cubic-bezier(.2,.7,.3,1)',
          pseudoElement: '::view-transition-new(root)',
        },
      );
    });
  };

  const applyTheme = (t: 'light' | 'dark') => {
    setTheme(t);
    document.body.setAttribute('data-theme', t);
    try {
      localStorage.setItem('pf-theme', t);
    } catch {}
  };

  return (
    <nav className="top">
      <div className="wrap">
        <div className="nav-name">
          <span className="status-dot" />
          Punyaphat
        </div>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? <Sun size={14} strokeWidth={1.75} /> : <Moon size={14} strokeWidth={1.75} />}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
