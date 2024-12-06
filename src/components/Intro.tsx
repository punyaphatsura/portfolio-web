import profilePic from '@/assets/image/profile.jpg';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FileText } from 'lucide-react';
import Image from 'next/image';
import React, { FC, useEffect, useRef, useState } from 'react';
import { FaArrowUp, FaDownload, FaGithub, FaLinkedin } from 'react-icons/fa';

const Intro: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isClientLoaded, setIsClientLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    offset: ['end end', 'start start'],
  });

  const translateX = useTransform(scrollYProgress, [1, 0.6], [0, windowWidth]);
  const negTranslateX = useTransform(scrollYProgress, [1, 0.6], [0, -1 * windowWidth]);

  const opacity = useTransform(scrollYProgress, [1, 0.6], [1, 0]);

  const buttonsOpacity = useTransform(scrollYProgress, [1, 0.8], [1, 0]);
  const buttonsY = useTransform(scrollYProgress, [1, 0.8], [0, 200]);

  const mainVariant = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: 'spring' },
    },
  };

  useEffect(() => {
    setIsClientLoaded(true);
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);
    const onResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.scrollTo(0, 0);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="sticky left-0 top-0 pb-4">
      {
        <>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: 'spring', delay: 2 }}
            style={{ opacity, height: windowHeight - 32 - 48 }}
            className="relative flex w-full flex-col items-center justify-center gap-y-6 overflow-x-hidden text-center">
            <motion.div className="rounded-full bg-white/10 p-2 backdrop-blur-md">
              <Image
                alt="profile"
                src={profilePic}
                height={100}
                width={100}
                className="h-20 w-20 select-none rounded-full object-cover"
                priority
              />
            </motion.div>
            <motion.p
              className="bg-gradient-to-b from-white to-zinc-300 to-90% bg-clip-text text-3xl font-semibold leading-normal text-transparent md:text-6xl"
              style={{ x: negTranslateX }}>
              Welcome to My Portfolio
            </motion.p>
            <motion.p
              className="text-xs text-zinc-400 md:hidden"
              style={{ x: translateX, transitionProperty: 'all' }}>
              Better experience on desktop screens.
            </motion.p>
            <motion.p
              className="text-sm text-zinc-400 md:text-lg"
              style={{ x: translateX, transitionProperty: 'all' }}>
              Hi, I{"'"}m <span className="text-white">Punyaphat</span>, a Full-Stack Developer & UI
              Designer
            </motion.p>

            <motion.div
              className="flex flex-col items-center gap-y-4 md:flex-row md:space-x-4"
              style={{ opacity: buttonsOpacity, y: buttonsY }}>
              <motion.a
                href="https://raw.githubusercontent.com/punyaphatsura/punyaphatsura/refs/heads/main/Resume.pdf"
                download="Punyaphat_Resume.pdf"
                className="inline-flex w-full items-center justify-center rounded-lg bg-blue-950 px-6 py-3 text-sm font-semibold text-white shadow-md ring-2 ring-blue-600 transition-all duration-300 hover:bg-blue-900 focus:outline-none md:text-base">
                <FileText size={20} className="mr-2" />
                Resume
              </motion.a>
              <motion.div className="flex flex-row space-x-4">
                <motion.a
                  href="https://www.linkedin.com/in/punyaphat-surakiatkamjorn-91a1842a2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-sky-950 px-6 py-3 text-sm font-semibold text-white shadow-md ring-2 ring-sky-600 transition-all duration-300 hover:bg-sky-900 focus:outline-none md:text-base">
                  <FaLinkedin className="mr-2 size-5" />
                  LinkedIn
                </motion.a>
                <motion.a
                  href="https://github.com/punyaphatsura"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-gray-800 px-6 py-3 text-sm font-semibold text-white shadow-md ring-2 ring-white transition-all duration-300 hover:bg-gray-700 focus:outline-none md:text-base">
                  <FaGithub className="mr-2 size-5" />
                  GitHub
                </motion.a>
              </motion.div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="show"
              variants={mainVariant}
              className="absolute bottom-0 flex animate-bounce flex-col items-center justify-center">
              <p className="text-md mb-2 font-semibold text-slate-600 md:text-xl">Slide up</p>
              <FaArrowUp color="rgb(71 85 105)" />
            </motion.div>
          </motion.div>
        </>
      }
    </div>
  );
};

export default Intro;
