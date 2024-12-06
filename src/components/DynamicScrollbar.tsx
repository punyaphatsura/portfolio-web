'use client';

import React, { useEffect, useState } from 'react';

const DynamicScrollbar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed right-0 top-0 z-50 w-1 bg-white transition-all duration-100 ease-linear"
      style={{
        height: `${Math.max(0, scrollProgress)}%`,
        backgroundColor: scrollProgress > 99 ? 'green' : 'white',
      }}
    />
  );
};

export default DynamicScrollbar;
