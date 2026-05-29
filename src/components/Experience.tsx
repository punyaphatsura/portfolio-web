'use client';

import { Fragment, useState } from 'react';
import { experiences, stack } from '@/data/experience';

const Experience = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <section id="about" className="pf-section reveal">
        <div className="wrap">
          <h2>Experience</h2>
          <div className="exp-list">
            {experiences.map((exp, i) => (
              <div
                className="exp-item"
                key={i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="exp-period">{exp.period}</div>
                <div className="exp-content">
                  <div className="exp-header">
                    <div>
                      <div className="exp-role">{exp.role}</div>
                      <div className="exp-company">{exp.company}</div>
                    </div>
                    {exp.description && (
                      <span className={`exp-chevron${openIndex === i ? ' is-open' : ''}`} />
                    )}
                  </div>
                  {exp.description && (
                    <div className={`exp-desc-wrap${openIndex === i ? ' is-open' : ''}`}>
                      <ul className="exp-desc">
                        {exp.description.map((line, j) => (
                          <li key={j}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  )}
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
              <Fragment key={item}>
                <span>{item}</span>
                {i < stack.length - 1 && ', '}
              </Fragment>
            ))}
            .
          </div>
        </div>
      </section>
    </>
  );
};

export default Experience;
