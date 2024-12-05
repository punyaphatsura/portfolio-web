import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('punyaphat.sura@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Hide notification after 2 seconds
    } catch (error) {
      console.error('Failed to copy email: ', error);
    }
  };

  return (
    <section id="contact" className="text-white">
      <motion.div
        className="container mx-auto flex h-screen flex-col justify-center px-6 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}>
        <h2 className="mb-6 text-3xl font-bold">Get In Touch</h2>
        <p className="mb-8 text-lg">
          I{"'"}m always open to discussing new opportunities, creative ideas, or potential
          collaborations. Feel free to reach out to me!
        </p>
        <div className="mb-8 flex justify-center space-x-6">
          <button
            onClick={handleCopyEmail}
            className="relative text-gray-400 transition-colors hover:text-white">
            <motion.div
              className={`absolute bottom-0 right-full top-0 mr-3 whitespace-nowrap rounded bg-black/20 px-2 py-1 text-sm text-white`}
              initial={{
                opacity: 0,
                x: 10, // Start off-screen to the right
              }}
              animate={{
                opacity: copied ? 1 : 0,
                x: copied ? 0 : 10, // Slide in from the right
              }}
              exit={{
                opacity: 0,
                x: 10, // Slide out to the right
              }}
              transition={{ duration: 0.3 }}>
              Email Copied!
            </motion.div>
            <FaEnvelope size={32} />
          </button>
          <a
            href="https://github.com/punyaphatsura"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 transition-colors hover:text-white">
            <FaGithub size={32} />
          </a>
          <a
            href="https://linkedin.com/in/punyaphat-surakiatkamjorn-91a1842a2/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 transition-colors hover:text-white">
            <FaLinkedin size={32} />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
