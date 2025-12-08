import profilePic from '@/assets/image/profile.jpg';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FileText } from 'lucide-react';
import Image from 'next/image';
import React, { FC, useRef } from 'react';
import { FaArrowUp, FaGithub, FaLinkedin } from 'react-icons/fa';

const Intro: FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const mainVariant = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: 'spring' },
    },
  };

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-20">
      <motion.div
        style={{ y, opacity }}
        className="flex w-full flex-col items-center justify-center gap-y-6 px-4 text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 0.1,
          }}
          className="rounded-full bg-secondary/30 p-2 ring-1 ring-white/10 backdrop-blur-md">
          <Image
            alt="profile"
            src={profilePic}
            height={120}
            width={120}
            className="h-24 w-24 select-none rounded-full object-cover md:h-32 md:w-32"
            quality={100}
            priority
          />
        </motion.div>

        <div className="space-y-2">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-4xl font-bold !leading-loose tracking-tight text-transparent md:text-6xl lg:text-7xl">
            Welcome to My Portfolio
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mx-auto max-w-[600px] text-lg text-muted-foreground md:text-xl">
            Hi, I&apos;m <span className="font-semibold text-foreground">Punyaphat</span>, a
            Software Engineer
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <a
            href="https://raw.githubusercontent.com/punyaphatsura/punyaphatsura/refs/heads/main/Resume.pdf"
            download="Punyaphat_Resume.pdf"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
            <FileText className="mr-2 h-4 w-4" />
            Resume
          </a>
          <div className="flex gap-3">
            <a
              href="https://www.linkedin.com/in/punyaphat-surakiatkamjorn-91a1842a2/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-input bg-background/50 px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              <FaLinkedin className="mr-2 h-5 w-5 text-[#0077b5]" />
              LinkedIn
            </a>
            <a
              href="https://github.com/punyaphatsura"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-input bg-background/50 px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              <FaGithub className="mr-2 h-5 w-5" />
              GitHub
            </a>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        variants={mainVariant}
        initial="hidden"
        animate="show"
        className="absolute bottom-10 flex animate-bounce flex-col items-center justify-center gap-2 text-muted-foreground">
        <span className="text-sm font-medium">Scroll Down</span>
        <FaArrowUp className="rotate-180" />
      </motion.div>
    </section>
  );
};

export default Intro;
