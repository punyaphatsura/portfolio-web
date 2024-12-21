import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Crafty1,
  Crafty2,
  Crafty3,
  JarnNai1,
  JarnNai2,
  MassengerWebChat,
  PaperRef1,
  PaperRef2,
  PersonalWeb,
} from '@assets/image/project';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import { FaLink } from 'react-icons/fa6';

import TechIcon from './TechIcon';

const projects = [
  {
    title: 'Massager WebChat',
    description:
      'This is the final project for the Computer Networks course. To build a real-time chat app, I used Next.js and Socket.io to complete this project. The features include authentication, chat history, timestamps, private and group chats, emoji support, and user typing notifications.',
    technologies: ['Next.js', 'Tailwind', 'MongoDB'],
    link: 'https://github.com/punyaphatsura/network-project',
    images: [MassengerWebChat],
  },
  {
    title: 'Crafty',
    description:
      'This is the term project for the Software Engineering II course, implemented using Next.js. It is a web-based platform for buying and selling handmade crafts, featuring user posts, ratings, reviews, and identity verification.',
    technologies: ['Next.js', 'Tailwind', 'MongoDB'],
    link: 'https://github.com/Admin-OR-1-1/2110336-SE2-Crafty',
    images: [Crafty1, Crafty2, Crafty3],
  },
  {
    title: 'Personal Portfolio',
    description:
      'This portfolio website, built with Next.js, React, and TypeScript, showcases my skills, projects, and experience in web development. It also serves as a platform for practicing Framer Motion animations.',
    technologies: ['Next.js', 'Tailwind'],
    link: 'https://github.com/punyaphatsura/portfolio-web',
    images: [PersonalWeb],
  },
  {
    title: 'Paper Reference Analysis Project',
    description:
      'Data science final project focused on analyzing and visualizing the reference network of academic papers in the engineering field using Scopus data. I was responsible for developing data visualizations using Streamlit and Gephi.',
    technologies: ['Python'],
    link: 'https://github.com/700-38/paper-reference-graph',
    images: [PaperRef1, PaperRef2],
  },
  {
    title: 'Jarn Nai',
    description:
      "Actually, this website shouldn't have been necessary, but the instructor data in the Computer Engineering Department does not include any abbreviations for the instructors. I created this website to spare others from the frustration of guessing and searching for abbreviations, as my friends and I had to. I chose SolidJS for this project because it’s React-like, very fast, and I wanted to explore a framework that isn't as widely used.",
    technologies: ['Solid.js', 'Astro'],
    link: 'https://github.com/punyaphatsura/jarn-nai',
    images: [JarnNai1, JarnNai2],
  },
];

const Project = () => {
  return (
    <section id="projects" className="py-16">
      <div className="container mx-auto px-6">
        <motion.p
          className="mb-6 bg-gradient-to-b from-white to-zinc-300 to-90% bg-clip-text text-2xl font-bold text-transparent md:text-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}>
          Projects
        </motion.p>
        <div className="flex flex-col justify-center lg:flex-row lg:flex-wrap">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="flex items-center lg:w-1/2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 + index * 0.25 }}>
              <div className="flex w-full p-6 lg:w-auto">
                <div className="flex max-w-[1000px] flex-col gap-y-4 rounded-lg bg-white/10 p-6 shadow-sm backdrop-blur-md">
                  <div className="mb-3 flex flex-col">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Go to ${project.title}'s Link`}
                      className="flex items-center text-xl font-semibold text-zinc-200 underline transition-opacity hover:no-underline hover:opacity-80 md:text-2xl">
                      <span className="shrink">{project.title}</span>
                      <FaLink size={20} className="ml-2 shrink-0" color="white" />
                    </a>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Carousel>
                      <CarouselContent className="h-full">
                        {project.images.map((image, idx) => (
                          <CarouselItem key={idx} className="flex justify-center">
                            <Image
                              src={image}
                              className="w-full rounded-xl border border-white object-cover"
                              alt={project.title}
                              priority
                              quality={100}
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      {project.images.length > 1 && (
                        <>
                          <CarouselPrevious />
                          <CarouselNext />
                        </>
                      )}
                    </Carousel>
                  </div>
                  <div className="flex">
                    {project.technologies.map((tech, idx) => (
                      <TechIcon key={idx} tech={tech} />
                    ))}
                  </div>
                  <p className="text-sm text-zinc-400 md:text-base">{project.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Project;
