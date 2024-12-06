'use client';

import {
  Css,
  Elysia,
  Figma,
  Html,
  Javascript,
  MongoDB,
  Nextjs,
  ReactIcon,
  ReactNative,
  Tailwind,
  Typescript,
} from '@assets/tech';
// Import the icons from your assets
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import React, { useRef } from 'react';

const baseTechIcons = [
  { name: 'HTML', icon: Html },
  { name: 'CSS', icon: Css },
  { name: 'Javascript', icon: Javascript },
  { name: 'TypeScript', icon: Typescript },
  { name: 'React', icon: ReactIcon },
  { name: 'React Native', icon: ReactNative },
  { name: 'Next.js', icon: Nextjs },
  { name: 'Tailwind', icon: Tailwind },
  { name: 'Elysia', icon: Elysia },
  { name: 'MongoDB', icon: MongoDB },
  { name: 'Figma', icon: Figma },
];

const techIcons = Array(5).fill(baseTechIcons).flat();

const TechStack = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    offset: ['end end', 'start start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [1000, -3000]);

  return (
    <div className="overflow-hidden" ref={ref}>
      <div className="border py-4">
        <motion.div className="flex w-[5000px] items-center space-x-6 border py-8" style={{ x }}>
          {techIcons.map((tech, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center justify-center space-y-4"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}>
              <Image
                src={tech.icon.src}
                width={48}
                height={48}
                alt={tech.name}
                className="size-8 object-contain md:size-12"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TechStack;
