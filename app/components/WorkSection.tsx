"use client";

import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    number: "01",
    category: "AI / EXPLAINABLE AI",
    title: "BREAST CANCER XAI",
    description:
      "An explainable AI project focused on breast cancer prediction with deep learning and visual explanations using XAI techniques.",
image: "/projects/breast-cancer-xai.png.png",
  status: "COMPLETED",
  link: "#",
    },
  {
    number: "02",
    category: "AI / FULL STACK",
    title: "CODESAATHI AI",
    description:
      "An AI-powered platform designed to help users interact with intelligent tools through a modern web experience.",
   status: "IN DEVELOPMENT",
  link: "#",
    },
  {
    number: "03",
    category: "AI / DOCUMENT ASSISTANT",
    title: "KAAGAZAI",
    description:
      "An AI-powered document and government-form assistant designed to make complex information easier to understand and use.",
   status: "IN DEVELOPMENT",
  link: "#",
    },
  {
    number: "04",
    category: "FULL STACK / REAL-TIME",
    title: "LOCATION TRACKER",
    description:
      "A real-time location tracking application with live location updates, map visualization and route tracking.",
 image: "/projects/location-tracker.jpeg",
  status: "COMPLETED",
  link: "#",
    },
];

export default function WorkSection() {
  return (
    <section id="work" className="work-section">
      <div className="work-header">
        <div>
          <span className="section-eyebrow">
            SELECTED WORK
          </span>

          <h2 className="work-title">
            PROJECTS THAT
            <br />
            <span>MAKE AN IMPACT.</span>
          </h2>
        </div>

        <p className="work-intro">
          A selection of AI, full-stack and interactive
          digital experiences built with technology,
          design and real-world problem solving.
        </p>
      </div>

      <div className="projects-list">
        {projects.map((project) => (
          <article
            key={project.number}
            className="project-card"
          >
            <div className="project-top">
              <span className="project-number">
                {project.number}
              </span>

              <span className="project-category">
                {project.category}
              </span>

              <div className="project-arrow">
                <ArrowUpRight size={22} />
              </div>
            </div>
<div className="project-visual">
  {project.image ? (
    <img
      src={project.image}
      alt={project.title}
      className="project-image"
    />
  ) : (
    <div className="project-placeholder">
      <span className="project-placeholder-label">
        {project.status}
      </span>

      <span className="placeholder-number">
        {project.number}
      </span>
    </div>
  )}
</div>

<div className="project-bottom">
              <div>
                <h3>{project.title}</h3>

                <p>{project.description}</p>
              </div>

             <a
  href={project.link}
  className="view-project"
>
  VIEW PROJECT
  <ArrowUpRight size={16} />
</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}