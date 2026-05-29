import { motion, useScroll } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

import TechStack from './TechStack';

const AboutMe = () => {
  const ref = useRef(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const { scrollY } = useScroll({
    target: ref,
    offset: ['end end', 'start start'],
  });

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      const sec = document.getElementById('about');
      const secPosY = sec?.getBoundingClientRect().y || 0;
      const secPosX = sec?.getBoundingClientRect().x || 0;
      setMousePosition({ x: event.clientX - secPosX, y: event.clientY - secPosY });
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [scrollY]);

  return (
    <div className="sticky left-0 top-0 flex h-screen w-screen flex-col justify-center py-4">
      <motion.section
        ref={ref}
        id="about"
        className="mb-4 flex w-full flex-row"
        initial={{}}
        transition={{ ease: 'linear', duration: 0.1 }}>
        <div className="mx-auto flex flex-col px-6 text-center md:text-left">
          <motion.p
            className="mb-6 bg-gradient-to-b from-white to-zinc-300 to-90% bg-clip-text text-center text-2xl font-bold text-transparent md:text-3xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}>
            About Me
          </motion.p>
          <div className="flex flex-col items-center justify-center md:flex-row">
            <div className="mb-2 max-w-[1200px] md:mb-0 md:w-[80%]">
              <motion.p
                className="mb-4 text-center text-xs font-light text-zinc-400 md:text-base"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}>
                Results-driven Software Engineer with a passion for building user-centric
                applications that deliver real-world impact. Specialized in the{' '}
                <span className="font-semibold text-zinc-200">Next.js</span> ecosystem, with
                experience in optimizing complex systems.
              </motion.p>
              <motion.p
                className="mb-4 text-center text-xs font-light text-zinc-400 md:text-base"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}>
                I thrive on creating seamless digital experiences and am always eager to learn new
                technologies to solve challenges and improve digital products.
              </motion.p>
            </div>
          </div>
        </div>
      </motion.section>
      <div className="container mx-auto px-6 text-center md:text-left">
        <motion.p
          className="mb-6 bg-gradient-to-b from-white to-zinc-300 to-90% bg-clip-text text-center text-2xl font-bold text-transparent md:text-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}>
          My Tech Stack
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex w-full">
          <TechStack />
        </motion.div>
      </div>
    </div>
  );
};

export default AboutMe;
