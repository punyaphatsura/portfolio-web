'use client';

import type { Project } from '@/data/projects';
import { cn } from '@/lib/utils';
import Image, { StaticImageData } from 'next/image';
import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export function PreviewCard({
  project,
  cycleIndex,
}: {
  project: Project | null;
  cycleIndex: number;
}) {
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
      <div className={cn('pv', img ? 'has-image' : `pv-${project.idx}`)}>
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
