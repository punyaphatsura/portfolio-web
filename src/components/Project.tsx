'use client';

import {
  BROKE1,
  BROKE2,
  BROKE3,
  BROKE4,
  BROKE5,
  Crafty1,
  Crafty2,
  Crafty3,
  JarnNai1,
  JarnNai2,
  KhongKhunTTS1,
  KhongKhunTTS2,
  KhongKhunTTS3,
  KhongKhunTTS4,
  KhongKhunTTS5,
  KhongKhunTTS6,
  MassengerWebChat,
  PaperRef1,
  PaperRef2,
} from '@assets/image/project';
import Image, { StaticImageData } from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const projects = [
  {
    idx: 1,
    num: '01',
    name: 'KhongKhun TTS',
    sub: 'Multilingual Thai–English speech synthesis',
    year: '2025',
    role: 'Internal tools & demo platform',
    stack: ['Next.js', 'Python', 'TypeScript', 'Tailwind'],
    summary:
      'Multilingual Thai–English dubbing system using LLM translation and zero-shot TTS that preserves speaker identity. I built the internal tooling: data validators, demo sites, and the model-weight comparison platform that streamlined the research workflow.',
    link: 'github.com/dubbing-ai',
    href: 'https://github.com/dubbing-ai',
    images: [
      KhongKhunTTS1,
      KhongKhunTTS2,
      KhongKhunTTS3,
      KhongKhunTTS4,
      KhongKhunTTS5,
      KhongKhunTTS6,
    ],
  },
  {
    idx: 2,
    num: '02',
    name: 'BROKE',
    sub: 'iOS app for bank-slip expense tracking',
    year: '2024',
    role: 'iOS app · sole developer',
    stack: ['Swift', 'SwiftUI', 'CoreData', 'Gemini API'],
    summary:
      "iOS app that extracts expense data from Thai bank slips using Gemini's slip-upload API and automatically organizes transactions. Built with SwiftUI and CoreData — clean UX for recording expenses and a foundation for future analytics.",
    link: 'github.com/punyaphatsura/BROKE-app',
    href: 'https://github.com/punyaphatsura/BROKE-app',
    images: [BROKE1, BROKE2, BROKE3, BROKE4, BROKE5],
  },
  {
    idx: 3,
    num: '03',
    name: 'Massager',
    sub: 'Real-time chat over Socket.IO',
    year: '2024',
    role: 'Full-stack',
    stack: ['Next.js', 'Tailwind', 'MongoDB', 'Socket.IO'],
    summary:
      'Real-time chat app with authentication, history, timestamps, private & group chats, emoji support, and typing notifications. Built with Next.js and Socket.IO over MongoDB.',
    link: 'github.com/punyaphatsura/network-project',
    href: 'https://github.com/punyaphatsura/network-project',
    images: [MassengerWebChat],
  },
  {
    idx: 4,
    num: '04',
    name: 'Crafty',
    sub: 'Handmade craft marketplace',
    year: '2024',
    role: 'Full-stack · team of 6',
    stack: ['Next.js', 'Tailwind', 'MongoDB'],
    summary:
      'Web platform for buying and selling handmade crafts with user posts, ratings, reviews, and identity verification. Built as the Software Engineering II term project.',
    link: 'github.com/Admin-OR-1-1/2110336-SE2-Crafty',
    href: 'https://github.com/Admin-OR-1-1/2110336-SE2-Crafty',
    images: [Crafty1, Crafty2, Crafty3],
  },
  {
    idx: 5,
    num: '05',
    name: 'Paper Reference Graph',
    sub: 'Academic citation network visualization',
    year: '2023',
    role: 'Visualization lead',
    stack: ['Python', 'Streamlit', 'Gephi'],
    summary:
      'Data-science project visualizing the reference network of engineering papers from Scopus. I built the interactive Streamlit visualizations and Gephi exports.',
    link: 'github.com/700-38/paper-reference-graph',
    href: 'https://github.com/700-38/paper-reference-graph',
    images: [PaperRef1, PaperRef2],
  },
  {
    idx: 6,
    num: '06',
    name: 'Jarn Nai',
    sub: 'Instructor abbreviation directory',
    year: '2023',
    role: 'Sole developer',
    stack: ['Solid.js', 'Astro'],
    summary:
      "A tiny site solving a daily frustration: the CompEng department's instructor data has no abbreviations. Picked SolidJS because it's React-like, very fast, and I wanted to explore something off the beaten path.",
    link: 'github.com/punyaphatsura/jarn-nai',
    href: 'https://github.com/punyaphatsura/jarn-nai',
    images: [JarnNai1, JarnNai2],
  },
];

type Project = (typeof projects)[0];

/* ── Modal ── */
function ProjectModal({
  project,
  fromRect,
  onClose,
}: {
  project: Project;
  fromRect: DOMRect | null;
  onClose: () => void;
}) {
  const [slide, setSlide] = useState(0);
  const [morphing, setMorphing] = useState(!!fromRect);
  const sliderRef = useRef<HTMLDivElement>(null);
  const total = project.images.length;
  const goTo = (idx: number) => setSlide(((idx % total) + total) % total);

  useEffect(() => {
    setSlide(0);
  }, [project]);

  // Morph ghost: animate preview card rect → modal slider rect
  useEffect(() => {
    if (!fromRect || !sliderRef.current) return;
    const toRect = sliderRef.current.getBoundingClientRect();

    const ghost = document.createElement('div');
    ghost.className = 'morph-ghost';

    const img = project.images[0];
    if (img) {
      const imgEl = document.createElement('img');
      imgEl.src = (img as { src: string }).src;
      imgEl.alt = '';
      ghost.appendChild(imgEl);
    }

    // Start at preview card position
    ghost.style.top = fromRect.top + 'px';
    ghost.style.left = fromRect.left + 'px';
    ghost.style.width = fromRect.width + 'px';
    ghost.style.height = fromRect.height + 'px';
    ghost.style.borderRadius = '12px';
    document.body.appendChild(ghost);

    // Animate to slider position next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ghost.style.transition =
          'top .5s cubic-bezier(.2,.7,.3,1), left .5s cubic-bezier(.2,.7,.3,1), width .5s cubic-bezier(.2,.7,.3,1), height .5s cubic-bezier(.2,.7,.3,1), border-radius .5s';
        ghost.style.top = toRect.top + 'px';
        ghost.style.left = toRect.left + 'px';
        ghost.style.width = toRect.width + 'px';
        ghost.style.height = toRect.height + 'px';
        ghost.style.borderRadius = '0';
      });
    });

    const cleanup = () => {
      ghost.remove();
      setMorphing(false);
    };
    ghost.addEventListener('transitionend', cleanup, { once: true });
    const fallback = setTimeout(cleanup, 600);
    return () => {
      clearTimeout(fallback);
      ghost.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goTo(slide - 1);
      if (e.key === 'ArrowRight') goTo(slide + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return createPortal(
    <div className={`pf-modal open${morphing ? " morphing" : ""}`} role="dialog" aria-modal="true">
      <div className="pf-modal-backdrop" onClick={onClose} />
      <div className="pf-modal-panel">
        <button className="pf-modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {/* Slider */}
        <div className="modal-slider" ref={sliderRef}>
          <div className="slider-track" style={{ transform: `translateX(-${slide * 100}%)` }}>
            {project.images.map((img, i) => (
              <div className="slider-slide" key={i}>
                <Image
                  src={img as StaticImageData}
                  alt={`${project.name} ${i + 1}`}
                  fill
                  style={{ objectFit: 'contain' }}
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
          {total > 1 && (
            <>
              <button className="slider-btn prev" onClick={() => goTo(slide - 1)}>
                ‹
              </button>
              <button className="slider-btn next" onClick={() => goTo(slide + 1)}>
                ›
              </button>
              <div className="slider-dots">
                {project.images.map((_, i) => (
                  <button
                    key={i}
                    className={`slider-dot${i === slide ? ' active' : ''}`}
                    onClick={() => goTo(i)}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
              <span className="slider-counter">
                {String(slide + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </>
          )}
        </div>

        {/* 2-column meta */}
        <div className="modal-meta">
          <div className="modal-head">
            <div className="modal-num">— {project.num} / 06</div>
            <h3>{project.name}</h3>
            <div className="modal-sub">{project.sub}</div>
            <p className="modal-summary">{project.summary}</p>
          </div>
          <div className="modal-side">
            <div className="modal-row">
              <span className="dk">Year</span>
              <span className="dv">{project.year}</span>
            </div>
            <div className="modal-row">
              <span className="dk">Role</span>
              <span className="dv">{project.role}</span>
            </div>
            <div className="modal-row">
              <span className="dk">Stack</span>
              <div className="modal-stack-chips">
                {project.stack.map((s) => (
                  <span key={s} className="modal-chip">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <a className="modal-link" href={project.href} target="_blank" rel="noopener noreferrer">
              {project.link} ↗
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ── Preview card ── */
function PreviewCard({ project, cycleIndex }: { project: Project | null; cycleIndex: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);

  const animate = useCallback(() => {
    currRef.current.x += (targetRef.current.x - currRef.current.x) * 0.18;
    currRef.current.y += (targetRef.current.y - currRef.current.y) * 0.18;
    if (cardRef.current) {
      cardRef.current.style.left = currRef.current.x + 'px';
      cardRef.current.style.top = currRef.current.y + 'px';
    }
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX + 24, y: e.clientY + 24 };
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    if (project) {
      currRef.current = { ...targetRef.current };
      rafRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(rafRef.current);
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [project, animate]);

  if (!project) return null;

  const img = project.images[cycleIndex % project.images.length];

  return createPortal(
    <div
      ref={cardRef}
      className="preview-card show"
      aria-hidden="true"
      style={{ position: 'fixed', top: 0, left: 0, transform: 'translate(-50%,-50%)' }}>
      <div className={`pv${img ? ' has-image' : ` pv-${project.idx}`}`}>
        {img && <Image src={img as StaticImageData} alt="" fill style={{ objectFit: 'cover' }} />}
        <span className="pv-year">
          {project.year} · {project.num}
          {project.images.length > 1
            ? ` · ${(cycleIndex % project.images.length) + 1}/${project.images.length}`
            : ''}
        </span>
        <span className="pv-corner" />
        {img && (
          <span className="pv-overlay">
            <span>{project.name}</span>
            <span>↗</span>
          </span>
        )}
      </div>
    </div>,
    document.body
  );
}

/* ── Work item with number roll ── */
function WorkItem({
  project,
  onHover,
  onLeave,
  onClick,
}: {
  project: Project;
  onHover: (p: Project) => void;
  onLeave: () => void;
  onClick: (p: Project) => void;
}) {
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const dur = 600 + Math.random() * 400;
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / dur);
          const ease = 1 - Math.pow(1 - t, 3);
          el.textContent = String(Math.round(project.idx * ease)).padStart(2, '0');
          if (t < 1) requestAnimationFrame(step);
        };
        el.textContent = '00';
        requestAnimationFrame(step);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [project.idx]);

  return (
    <div
      className="work-item"
      role="button"
      tabIndex={0}
      onMouseEnter={() => onHover(project)}
      onMouseLeave={onLeave}
      onClick={() => onClick(project)}
      onKeyDown={(e) => e.key === 'Enter' && onClick(project)}>
      <span ref={numRef} className="work-num">
        {project.num}
      </span>
      <div>
        <div className="work-name">{project.name}</div>
        <div className="work-sub">{project.sub}</div>
      </div>
      <div className="work-meta">
        <span>{project.year}</span>
        <span className="work-arrow">↗</span>
      </div>
    </div>
  );
}

/* ── Main ── */
const Project = () => {
  const [hovered, setHovered] = useState<Project | null>(null);
  const [cycleIndex, setCycleIndex] = useState(0);
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [fromRect, setFromRect] = useState<DOMRect | null>(null);
  const [mounted, setMounted] = useState(false);
  const cycleTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleHover = useCallback((p: Project) => {
    setHovered(p);
    setCycleIndex(0);
    if (cycleTimer.current) clearInterval(cycleTimer.current);
    if (p.images.length > 1) {
      cycleTimer.current = setInterval(() => setCycleIndex((i) => i + 1), 1400);
    }
  }, []);

  const handleLeave = useCallback(() => {
    setHovered(null);
    if (cycleTimer.current) {
      clearInterval(cycleTimer.current);
      cycleTimer.current = null;
    }
    setCycleIndex(0);
  }, []);

  const handleClick = useCallback((p: Project) => {
    // Capture preview card rect for morph animation
    const card = document.querySelector<HTMLElement>('.preview-card.show');
    setFromRect(card ? card.getBoundingClientRect() : null);
    setHovered(null);
    if (cycleTimer.current) {
      clearInterval(cycleTimer.current);
      cycleTimer.current = null;
    }
    setOpenProject(p);
  }, []);

  return (
    <>
      <section id="work" className="pf-section reveal">
        <div className="wrap">
          <h2>Selected work</h2>
          <div className="work-list">
            {projects.map((p) => (
              <WorkItem
                key={p.num}
                project={p}
                onHover={handleHover}
                onLeave={handleLeave}
                onClick={handleClick}
              />
            ))}
          </div>
        </div>
      </section>

      {mounted && <PreviewCard project={hovered} cycleIndex={cycleIndex} />}
      {mounted && openProject && (
        <ProjectModal
          project={openProject}
          fromRect={fromRect}
          onClose={() => {
            setOpenProject(null);
            setFromRect(null);
          }}
        />
      )}
    </>
  );
};

export default Project;
