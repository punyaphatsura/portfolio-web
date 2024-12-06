'use client';

import AboutMe from '@/components/AboutMe';
import Contact from '@/components/Contact';
import Intro from '@/components/Intro';
import Project from '@/components/Project';
import Experience from '@components/Experience';
import { motion, useScroll } from 'framer-motion';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Page() {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const { scrollY } = useScroll();

  useEffect(() => {
    window.scroll({ behavior: 'smooth', top: 0 });
  }, []);

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: scrollY.get() + event.clientY });
    };

    window.addEventListener('mousemove', onMouseMove);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [scrollY]); // Depend on scrollY to update the effect on scroll

  useEffect(() => {
    const onScroll = (event: WheelEvent) => {
      setMousePosition({ x: event.clientX, y: scrollY.get() + event.clientY });
    };
    window.addEventListener('wheel', onScroll);
    return () => {
      window.removeEventListener('wheel', onScroll);
    };
  }, [scrollY]);

  return (
    <motion.div
      initial={{ background: '#080e21' }}
      animate={{
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, #0B122A 0%, #000 25%)`,
      }}
      transition={{ ease: 'linear', duration: 0.1 }}
      className="max-w-screen h-full bg-black">
      <Head>
        <title>Punyaphat Surakiatkamjorn - Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-[1500px] w-full">
        <Intro />
      </div>
      <div className="h-[1500px] w-full md:h-[2000px]">
        <AboutMe />
      </div>
      <Experience />
      <Project />
      <Contact />
    </motion.div>
  );
}
