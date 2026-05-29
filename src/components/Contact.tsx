'use client';

import React from 'react';
import { contacts } from '@/data/contacts';
import { showCopyToast } from '@/lib/toast';

const Contact = () => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, copy?: string) => {
    if (!copy) return;
    e.preventDefault();
    showCopyToast(copy, `Copied — ${copy}`);
  };

  return (
    <section id="contact" className="pf-section reveal">
      <div className="wrap">
        <h2>Contact</h2>
        <div className="contact-grid">
          {contacts.map((c) => (
            <a
              key={c.key}
              href={c.href}
              target={c.copy ? undefined : '_blank'}
              rel={c.copy ? undefined : 'noopener noreferrer'}
              onClick={(e) => handleClick(e, c.copy)}>
              <span className="contact-k">{c.key}</span>
              <span className="contact-v">
                {c.value}
                <span className="contact-arr">↗</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
