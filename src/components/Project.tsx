'use client';

import { projects, type Project } from '@/data/projects';
import { useCallback, useEffect, useRef, useState } from 'react';
import { PreviewCard } from './PreviewCard';
import { ProjectModal } from './ProjectModal';
import { WorkItem } from './WorkItem';

const ProjectList = () => {
  const [hovered, setHovered] = useState<Project | null>(null);
  const [cycleIndex, setCycleIndex] = useState(0);
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [fromRect, setFromRect] = useState<DOMRect | null>(null);
  const [mounted, setMounted] = useState(false);
  const cycleTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleHover = useCallback((p: Project) => {
    setHovered(p);
    setCycleIndex(0);
    if (cycleTimer.current) clearInterval(cycleTimer.current);
    if (p.images.length > 1) {
      cycleTimer.current = setInterval(() => setCycleIndex((i) => i + 1), 1400);
    }
  }, []);

  const handleLeave = useCallback(() => {
    setHovered(null);
    if (cycleTimer.current) {
      clearInterval(cycleTimer.current);
      cycleTimer.current = null;
    }
    setCycleIndex(0);
  }, []);

  const handleClick = useCallback((p: Project) => {
    const card = document.querySelector<HTMLElement>('.preview-card.show');
    setFromRect(card ? card.getBoundingClientRect() : null);
    setHovered(null);
    if (cycleTimer.current) {
      clearInterval(cycleTimer.current);
      cycleTimer.current = null;
    }
    setOpenProject(p);
  }, []);

  return (
    <>
      <section id="work" className="pf-section reveal">
        <div className="wrap">
          <h2>Selected work</h2>
          <div className="work-list">
            {projects.map((p) => (
              <WorkItem
                key={p.num}
                project={p}
                onHover={handleHover}
                onLeave={handleLeave}
                onClick={handleClick}
              />
            ))}
          </div>
        </div>
      </section>

      {mounted && <PreviewCard project={hovered} cycleIndex={cycleIndex} />}
      {mounted && openProject && (
        <ProjectModal
          project={openProject}
          fromRect={fromRect}
          onClose={() => {
            setOpenProject(null);
            setFromRect(null);
          }}
        />
      )}
    </>
  );
};

export default ProjectList;
