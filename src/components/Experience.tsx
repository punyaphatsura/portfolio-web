import { Fragment } from 'react';
import { experiences, stack } from '@/data/experience';

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
