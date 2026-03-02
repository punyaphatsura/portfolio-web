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

import TechIcon from './TechIcon';

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
    title: 'Software Engineer',
    company: 'Top Gun Co., Ltd. - Part time/Full time',
    date: 'JAN 2025 - Present',
    description: [
      'Leveraged NX Next.js to implement an Anti-Corruption Layer with Zod and ViewModel transformations; established a strict server-state separation strategy using TanStack Query while developing internal shared packages for Design Systems and API contracts.',
      'Achieved instantaneous page loads for data-intensive views by architecting a dual-layer caching strategy and optimized static pages using Lighthouse as a primary performance benchmark.',
      'Developed a Puppeteer-based backend service within an NX NestJS environment to offload complex, personalized image generation from the client, optimizing resource utilization for high-quality assets.',
    ],
    stack: ['Next.js', 'React', 'TypeScript'],
  },
  {
    title: 'Software Developer',
    company: 'Playtorium - Internship',
    date: 'JUN 2024 - JUL 2024',
    description: [
      'Developed web applications using Vue.js and .NET, while managing CI/CD pipelines with GitLab.',
      'Implemented backend transactions, rollbacks, and optimized data management for performance in an agile team environment.',
    ],
    stack: ['VueJS', 'Asp'],
  },
  {
    title: 'Freelance Software Engineer',
    company: 'Freelance',
    date: 'JAN 2023 - NOV 2024',
    description: [
      'Developed mobile applications for property management and real estate listings using React Native, Expo, TypeScript, and TailwindCSS; implemented real-time chat via Socket.IO and built a web-based financial tool for bank slip submission and PromptPay QR generation using Next.js.',
      'Designed and implemented a chatbot-integrated website using Next.js and LangChain, focusing on delivering an intuitive user interface and sophisticated AI interactions.',
    ],
    stack: ['React Native', 'TypeScript', 'Next.js', 'Tailwind'],
  },
  {
    title: 'Software Developer',
    company: 'Thailand Post: Journey to Startup Sandbox 2022 Competition',
    date: '07/2022 - 10/2022',
    description: [
      'Competed as a Kotlin Software Developer in the Thailand Post startup initiative, focusing on exceeding customer expectations',
      'Designed and developed cutting-edge warehouse management applications and achieved 1st place in the competition, showcasing exceptional innovative solutions.',
    ],
    stack: [],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-12 md:py-64">
      <div className="container mx-auto px-6">
        <motion.p
          className="mb-6 bg-gradient-to-b from-white to-zinc-300 to-90% bg-clip-text text-2xl font-bold text-transparent md:text-3xl"
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
                    <div className="flex flex-col gap-y-1">
                      <p className="text-xl font-semibold text-zinc-200 md:text-2xl lg:mr-10">
                        {experience.title}
                      </p>
                      <p className="text-sm text-zinc-400 md:text-base">
                        {experience.company} | {experience.date}
                      </p>
                    </div>
                    <div className="mt-4 flex flex-1 justify-start lg:mt-0 lg:justify-end">
                      {experience.stack.map((tech, idx) => (
                        <TechIcon key={idx} tech={tech} />
                      ))}
                    </div>
                  </div>
                  <ul className="mt-4 list-inside list-disc space-y-2">
                    {experience.description.map((desc, idx) => (
                      <li key={idx} className="text-sm text-zinc-400">
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
