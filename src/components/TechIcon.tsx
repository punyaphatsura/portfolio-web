import {
  Asp,
  Css,
  Elysia,
  Figma,
  Html,
  Javascript,
  MongoDB,
  Nextjs,
  Python,
  ReactIcon,
  ReactNative,
  Tailwind,
  Typescript,
  VueJS,
} from '@assets/tech';
import Image from 'next/image';
import React, { FC } from 'react';

interface Props {
  tech: string;
}

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
  { name: 'VueJS', icon: VueJS },
  { name: 'Asp', icon: Asp },
  { name: 'Python', icon: Python },
];

const TechIcon: FC<Props> = ({ tech }) => {
  return (
    <Image
      alt={tech}
      className="mr-2 size-8 object-contain transition-transform hover:scale-125 active:scale-90 md:mr-3 md:size-10"
      src={baseTechIcons.filter((b) => b.name === tech)[0]?.icon}
    />
  );
};

export default TechIcon;
