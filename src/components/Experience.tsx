// components/Experience.tsx
import {
  Asp,
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
  VueJS,
} from '@assets/tech';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

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
];

const experiences = [
  {
    title: 'Software Developer',
    company: 'Playtorium - Internship',
    date: '6/2024 - 7/2024',
    description: [
      'Developed and enhanced web applications using VueJS and .NET, and contributed to API integration and CI/CD pipeline management with GitLab CI.',
      'Gained experience in full-stack development through role switching, collaborative projects, and a company hackathon, improving teamwork and problem-solving skills.',
    ],
    stack: ['VueJS', 'Asp'],
  },
  {
    title: 'Software Engineer',
    company: 'AZAI - Freelance',
    date: '12/2023 - 5/2024',
    description: [
      'Utilized React Native and TypeScript for the development of a real estate management tool for landlords.',
      "Focused primarily on the front-end, enhancing the application's user interface and experience.",
    ],
    stack: ['React Native', 'TypeScript', 'Next.js'],
  },
  {
    title: 'Software Engineer and UX/UI Designer',
    company: 'SOpet - Freelance',
    date: '01/2023 - 11/2024',
    description: [
      'Designed UX/UI and developed front-end components for websites and applications.',
      'Utilized NextJS and React Native to create user-friendly interfaces across multiple devices.',
    ],
    stack: ['Next.js', 'Elysia', 'React Native', 'Figma'],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-12 md:py-64">
      <div className="container mx-auto px-6">
        <motion.p
          className="mb-6 bg-gradient-to-b from-white to-zinc-300 to-90% bg-clip-text text-3xl font-bold text-transparent"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}>
          Experiences
        </motion.p>
        <div className="flex flex-col">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              className="flex w-full items-center gap-x-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}>
              <div
                className={`flex flex-1 p-6 ${index % 2 === 0 ? 'justify-start' : 'md:justify-end'}`}>
                <div className="w-full max-w-[1000px] rounded-lg bg-white/10 p-6 shadow-sm backdrop-blur-md md:w-[80%]">
                  <div className="flex flex-col lg:flex-row">
                    <div className="flex flex-col">
                      <p className="text-2xl font-semibold text-zinc-200 lg:mr-10">
                        {experience.title}
                      </p>
                      <p className="text-zinc-400">
                        {experience.company} | {experience.date}
                      </p>
                    </div>
                    <div className="mt-4 flex flex-1 justify-start lg:mt-0 lg:justify-end">
                      {experience.stack.map((s, idx) => (
                        <Image
                          key={idx}
                          alt={s}
                          className="mr-3 h-10 w-10 object-contain"
                          src={baseTechIcons.filter((b) => b.name === s)[0]?.icon}
                        />
                      ))}
                    </div>
                  </div>
                  <ul className="mt-4 list-inside list-disc space-y-2">
                    {experience.description.map((desc, idx) => (
                      <li key={idx} className="text-zinc-400">
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
