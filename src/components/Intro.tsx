'use client';

import React, { FC, useEffect, useRef, useState } from 'react';
import { showCopyToast } from '@/lib/toast';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

function scrambleText(el: HTMLElement, finalText: string, duration = 600, onDone?: () => void) {
  const len = finalText.length;
  const start = performance.now();
  function frame(now: number) {
    const t = Math.min(1, (now - start) / duration);
    let out = '';
    for (let i = 0; i < len; i++) {
      const revealAt = (i / len) * 0.7;
      if (t > revealAt + 0.3) out += finalText[i];
      else if (finalText[i] === ' ') out += ' ';
      else out += CHARS[Math.floor(Math.random() * CHARS.length)];
    }
    el.textContent = out;
    if (t < 1) requestAnimationFrame(frame);
    else {
      el.textContent = finalText;
      onDone?.();
    }
  }
  requestAnimationFrame(frame);
}

function wrapChars(el: HTMLElement) {
  if (el.querySelector('span.ch')) return;
  const text = el.textContent ?? '';
  el.textContent = '';
  for (const c of text) {
    const span = document.createElement('span');
    span.className = 'ch';
    span.textContent = c === ' ' ? ' ' : c;
    el.appendChild(span);
  }
}

function greetingFor(h: number) {
  if (h < 5) return 'Up late';
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  if (h < 22) return 'Good evening';
  return 'Up late';
}

const Intro: FC = () => {
  const [timeStr, setTimeStr] = useState('');
  const nameRef = useRef<HTMLSpanElement>(null);
  const busyRef = useRef(false);

  useEffect(() => {
    const tick = () => {
      const bkk = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }));
      const hh = String(bkk.getHours()).padStart(2, '0');
      const mm = String(bkk.getMinutes()).padStart(2, '0');
      const ss = String(bkk.getSeconds()).padStart(2, '0');
      setTimeStr(`${greetingFor(bkk.getHours())} · ${hh}:${mm}:${ss} BKK`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!nameRef.current) return;
    busyRef.current = true;
    scrambleText(nameRef.current, 'Punyaphat Surakiatkamjorn', 600, () => {
      wrapChars(nameRef.current!);
      busyRef.current = false;
    });
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!nameRef.current) return;
      nameRef.current.querySelectorAll<HTMLElement>('span.ch').forEach((ch) => {
        const r = ch.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const dist = Math.hypot(dx, dy);
        if (dist < 140) {
          const f = (1 - dist / 140) * 8;
          ch.style.transform = `translate(${(dx / dist) * f}px,${(dy / dist) * f}px)`;
        } else {
          ch.style.transform = '';
        }
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    showCopyToast('punyaphat.sura@gmail.com');
  };

  return (
    <header className="hero reveal">
      <div className="wrap">
        <div className="hero-label">
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--dot)',
              flexShrink: 0,
              display: 'inline-block',
            }}
          />
          <span className="live-time">{timeStr || 'Available'}</span>
        </div>
        <h1>
          <span
            ref={nameRef}
            className="scramble"
            style={{ cursor: 'default' }}>
            Punyaphat Surakiatkamjorn
          </span>
          {' — software engineer building product in the Next.js ecosystem. '}
          <span className="muted">Currently shipping at Top Gun, Bangkok.</span>
        </h1>
        <div className="hero-meta">
          <a href="mailto:punyaphat.sura@gmail.com" onClick={handleCopyEmail}>
            Email ↗
          </a>
          <a href="https://github.com/punyaphatsura" target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/punyaphat-surakiatkamjorn-91a1842a2/"
            target="_blank"
            rel="noopener noreferrer">
            LinkedIn ↗
          </a>
          <a
            href="https://raw.githubusercontent.com/punyaphatsura/punyaphatsura/refs/heads/main/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer">
            Résumé ↗
          </a>
        </div>
      </div>
    </header>
  );
};

export default Intro;
