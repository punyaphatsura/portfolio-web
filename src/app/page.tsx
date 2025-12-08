'use client';

import AboutMe from '@/components/AboutMe';
import Contact from '@/components/Contact';
import Intro from '@/components/Intro';
import Project from '@/components/Project';
import Experience from '@components/Experience';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useEffect } from 'react';

export default function Page() {
  const { scrollY } = useScroll();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const absoluteY = useTransform([springY, scrollY], (latest: any[]) => latest[0] + latest[1]);

  const background = useMotionTemplate`radial-gradient(circle at ${springX}px ${absoluteY}px, #0B122A 0%, #000 25%)`;

  useEffect(() => {
    window.scroll({ behavior: 'smooth', top: 0 });
  }, []);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      initial={{ background: '#080e21' }}
      style={{ background }}
      className="max-w-screen h-full bg-black">
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
