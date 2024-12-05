'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, FolderKanban, Home, Mail, Menu, User, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '#about', label: 'About', icon: User },
    { href: '#experience', label: 'Experience', icon: Briefcase },
    { href: '#projects', label: 'Projects', icon: FolderKanban },
    { href: '#contact', label: 'Contact', icon: Mail },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      y: '-100%',
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.07,
        staggerDirection: 1,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <nav className="sticky top-0 z-10 h-0 w-full">
      <div className="backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-white">Punyaphat</div>

            {/* Desktop Menu */}
            <div className="hidden space-x-4 md:flex">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-2 text-white transition-all hover:text-gray-300"
                    title={item.label}>
                    <Icon size={20} />
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-white focus:outline-none">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="bg-[#080e2180] backdrop-blur-md"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.label} variants={itemVariants}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 px-4 py-2 text-white transition-all hover:text-gray-300"
                    onClick={toggleMenu}>
                    <Icon size={20} />
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
