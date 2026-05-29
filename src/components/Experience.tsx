import React from 'react';

const experiences = [
  {
    period: '2025 — Now',
    role: 'Software Engineer',
    company: 'Top Gun',
  },
  {
    period: '2023 — 2024',
    role: 'Freelance Software Engineer',
    company: 'Independent',
  },
  {
    period: '2024',
    role: 'Software Developer · Intern',
    company: 'Playtorium',
  },
  {
    period: '2022',
    role: 'Software Developer · 1st place',
    company: 'Thailand Post — Startup Sandbox',
  },
];

const stack = [
  'TypeScript', 'Next.js', 'React', 'React Native',
  'Swift', 'Python', 'Tailwind', 'TanStack Query',
  'Zod', 'MongoDB', 'Elysia', 'Figma',
];

const Experience = () => {
  return (
    <>
      <section id="about" className="pf-section reveal">
        <div className="wrap">
          <h2>Experience</h2>
          <div className="exp-list">
            {experiences.map((exp, i) => (
              <div className="exp-item" key={i}>
                <div className="exp-period">{exp.period}</div>
                <div>
                  <div className="exp-role">{exp.role}</div>
                  <div className="exp-company">{exp.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pf-section reveal">
        <div className="wrap">
          <h2>Stack</h2>
          <div className="stack-inline">
            {stack.map((item, i) => (
              <React.Fragment key={item}>
                <span>{item}</span>
                {i < stack.length - 1 && ', '}
              </React.Fragment>
            ))}
            .
          </div>
        </div>
      </section>
    </>
  );
};

export default Experience;
