'use client';

import React from 'react';

const contacts = [
  {
    key: 'Email',
    value: 'punyaphat.sura@gmail.com',
    href: 'mailto:punyaphat.sura@gmail.com',
    copy: 'punyaphat.sura@gmail.com',
  },
  {
    key: 'GitHub',
    value: '@punyaphatsura',
    href: 'https://github.com/punyaphatsura',
  },
  {
    key: 'LinkedIn',
    value: '/in/punyaphat-surakiatkamjorn',
    href: 'https://linkedin.com/in/punyaphat-surakiatkamjorn-91a1842a2/',
  },
  {
    key: 'Résumé',
    value: 'Download PDF',
    href: 'https://raw.githubusercontent.com/punyaphatsura/punyaphatsura/refs/heads/main/Resume.pdf',
  },
];

const Contact = () => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, copy?: string) => {
    if (!copy) return;
    e.preventDefault();
    navigator.clipboard?.writeText(copy).then(() => {
      const toast = document.getElementById('copy-toast');
      if (!toast) return;
      toast.textContent = `Copied — ${copy}`;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 1800);
    });
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
