'use client';

import { cn } from '@/lib/utils';
import type { Project } from '@/data/projects';
import Image, { StaticImageData } from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export function ProjectModal({
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

    ghost.style.top = fromRect.top + 'px';
    ghost.style.left = fromRect.left + 'px';
    ghost.style.width = fromRect.width + 'px';
    ghost.style.height = fromRect.height + 'px';
    ghost.style.borderRadius = '12px';
    document.body.appendChild(ghost);

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
    <div className={cn('pf-modal open', morphing && 'morphing')} role="dialog" aria-modal="true">
      <div className="pf-modal-backdrop" onClick={onClose} />
      <div className="pf-modal-panel">
        <button className="pf-modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

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
                    className={cn('slider-dot', i === slide && 'active')}
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
