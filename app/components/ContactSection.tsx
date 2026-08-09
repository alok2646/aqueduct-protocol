"use client";

import { ArrowUpRight } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-top">
        <span className="section-eyebrow">
          HAVE A PROJECT IN MIND?
        </span>

        <h2 className="contact-title">
          LET'S BUILD
          <br />
          <span>SOMETHING GREAT.</span>
        </h2>
      </div>

      <div className="contact-content">
        <p className="contact-description">
          Have an idea, a business website, an AI product
          or a creative project in mind? Let's turn the
          idea into a digital experience.
        </p>

        <a
         href="mailto:aloksinghs2646@gmail.com"
          className="contact-button magnetic"
        >
          START A PROJECT
          <ArrowUpRight size={22} />
        </a>
      </div>

      <div className="contact-footer">
  <span>AVAILABLE FOR SELECTED PROJECTS</span>

  <a
    href="mailto:aloksinghs2646@gmail.com"
    className="contact-email"
  >
    aloksinghs2646@gmail.com
  </a>

  <span>INDIA / WORLDWIDE</span>
</div>
    </section>
  );
}