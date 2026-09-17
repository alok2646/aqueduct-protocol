"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import CustomCursor from "./components/CustomCursor";
import WorkSection from "./components/WorkSection";
import ServicesSection from "./components/ServicesSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
export default function Home() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      tl.from(".hero-meta", {
        y: 30,
        opacity: 0,
        duration: 0.8,
      })
        .from(
          ".hero-line",
          {
            yPercent: 110,
            opacity: 0,
            duration: 1.1,
            stagger: 0.12,
          },
          "-=0.45"
        )
        .from(
          ".hero-description",
          {
            y: 25,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.55"
        )
        .from(
          ".hero-actions",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.45"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <main>
      <CustomCursor />
      {/* NAVBAR */}
      <header className="navbar">
        <a href="#" className="logo">
          AK<span>.</span>
        </a>
        <a href="#contact" className="nav-button magnetic">
          Let's talk
          <ArrowUpRight size={15} />
        </a>
      </header>

      {/* HERO */}
      <section ref={heroRef} className="hero">
        <div className="hero-glow" />

        <div className="hero-content">
          <div className="hero-meta">
            <span className="status-dot" />
            AVAILABLE FOR SELECT PROJECTS
          </div>

          <h1>
            <span className="hero-line-wrapper">
              <span className="hero-line">I BUILD</span>
            </span>

            <span className="hero-line-wrapper">
              <span className="hero-line">DIGITAL</span>
            </span>

            <span className="hero-line-wrapper">
              <span className="hero-line muted">
                EXPERIENCES.
              </span>
            </span>
          </h1>

          <div className="hero-bottom">
            <p className="hero-description">
              I&apos;m Alok Kumar — a web developer and creative editor
              building modern websites, interactive experiences and digital
              content for ambitious brands, startups and creators.
            </p>

            <div className="hero-actions">
              <a href="#work" className="primary-button magnetic">
                VIEW MY WORK
                <ArrowUpRight size={16} />
              </a>

              <a href="#contact" className="secondary-button magnetic">
                START A PROJECT
              </a>
              <a
  href="/resume.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="secondary-button magnetic"
>
  VIEW RESUME
  <ArrowUpRight size={16} />
</a>
            </div>
          </div>

          <div className="hero-footer">
            <span>WEB DEVELOPMENT × CREATIVE</span>

            <span className="location">INDIA — WORLDWIDE</span>

            <ArrowDown size={16} className="bounce" />
          </div>
          <WorkSection />
          <ServicesSection />
          <AboutSection />
          <ContactSection />
        </div>
      </section>

      {/* MARQUEE */}
      <section className="marquee">
        <div className="marquee-track">
          {[1, 2].map((group) => (
            <div className="marquee-group" key={group}>
              <span>WEB DEVELOPMENT</span>
              <b>✦</b>
              <span>INTERACTIVE DESIGN</span>
              <b>✦</b>
              <span>REACT</span>
              <b>✦</b>
              <span>NEXT.JS</span>
              <b>✦</b>
              <span>CREATIVE EDITING</span>
              <b>✦</b>
            </div>
          ))}
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="placeholder-section">
        <div className="section-label">
          01 — SELECTED WORK
        </div>

        <h2>
          Projects that turn
          <br />
          ideas into experiences.
        </h2>

        <div className="project-placeholder">
          PROJECTS COMING SOON
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="services-section">
        <div className="section-label">
          02 — SERVICES
        </div>

        <div className="service-list">
          {[
            "Web Development",
            "Interactive Experiences",
            "Website Redesign",
            "Video Editing",
          ].map((service, index) => (
            <div className="service-row" key={service}>
              <span>0{index + 1}</span>

              <h3>{service}</h3>

              <span>↗</span>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about-section">
        <div className="section-label">
          03 — ABOUT
        </div>

        <div>
          <h2>
            I combine development, design and visual storytelling
            to create digital experiences that feel as good as they
            function.
          </h2>

          <p>
            Based in India and available worldwide. I work with
            businesses, startups, agencies and creators to bring
            digital ideas to life.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <div className="section-label">
          04 — CONTACT
        </div>

        <h2>
          HAVE AN
          <br />
          <span>IDEA?</span>
        </h2>

        <a href="mailto:hello@example.com">
          LET&apos;S BUILD IT →
        </a>
      </section>

      {/* FOOTER */}
      <footer>
        <div>
          <strong>Alok Kumar</strong>
          <span>Web Developer × Creative Editor</span>
        </div>

        <div className="footer-links">
          <a
            href="https://github.com/alok2646"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>

          <a
  href="https://www.linkedin.com/in/alok-kumar-80b734263/"
  target="_blank"
  rel="noopener noreferrer"
>
  LinkedIn
</a>

          <a
  href="https://www.instagram.com/alokumar1775/"
  target="_blank"
  rel="noopener noreferrer"
>
  Instagram
</a>
        </div>

        <span>© 2026 Alok Kumar</span>
      </footer>
    </main>
  );
}