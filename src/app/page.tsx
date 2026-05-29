'use client';

import Contact from '@/components/Contact';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';
import Intro from '@/components/Intro';
import Project from '@/components/Project';
import { useEffect, useRef } from 'react';

const GAP = 28;

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const isDark = document.body.getAttribute('data-theme') === 'dark';
      const base = isDark ? '255,255,255' : '10,10,10';
      const { x: mx, y: my } = mouseRef.current;
      ctx.clearRect(0, 0, w, h);
      for (let y = GAP / 2; y < h; y += GAP) {
        for (let x = GAP / 2; x < w; x += GAP) {
          const dist = Math.hypot(x - mx, y - my);
          const k = dist < 140 ? 1 - dist / 140 : 0;
          const r = 0.7 + k * 1.8;
          const a = (isDark ? 0.18 : 0.16) + k * (isDark ? 0.6 : 0.4);
          ctx.fillStyle = `rgba(${base},${a})`;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  useEffect(() => {
    const cl = document.getElementById('cursor-light');
    if (!cl) return;
    const onMove = (e: MouseEvent) => {
      cl.style.transform = `translate(${e.clientX}px,${e.clientY}px) translate(-50%,-50%)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const hint = document.getElementById('kbd-hint');
    if (!hint) return;
    let t: ReturnType<typeof setTimeout>;
    const flash = () => {
      hint.classList.add('show');
      clearTimeout(t);
      t = setTimeout(() => hint.classList.remove('show'), 2400);
    };
    const id = setTimeout(flash, 1400);
    const onKey = (e: KeyboardEvent) => { if (e.key === 't' || e.key === 'T') flash(); };
    window.addEventListener('keydown', onKey);
    return () => { clearTimeout(id); clearTimeout(t); window.removeEventListener('keydown', onKey); };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} id="dot-field" aria-hidden="true" />
      <div className="cursor-light on" id="cursor-light" aria-hidden="true" />
      <div className="copy-toast" id="copy-toast" aria-live="polite" />
      <div className="kbd-hint" id="kbd-hint" aria-hidden="true">
        <kbd>T</kbd> theme
      </div>
      <Intro />
      <Project />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}
