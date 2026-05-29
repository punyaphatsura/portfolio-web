'use client';

import type { Project } from '@/data/projects';
import { useEffect, useRef } from 'react';

export function WorkItem({
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
