"use client";

import { ArrowUpRight } from "lucide-react";

const services = [
  {
    number: "01",
    title: "WEB DEVELOPMENT",
    description:
      "Modern, responsive websites and full-stack web applications built for performance and real-world business needs.",
  },
  {
    number: "02",
    title: "AI INTEGRATION",
    description:
      "AI-powered features and intelligent workflows integrated into useful, modern digital products.",
  },
  {
    number: "03",
    title: "CREATIVE WEBSITES",
    description:
      "Interactive websites with smooth motion, immersive visuals and memorable digital experiences.",
  },
  {
    number: "04",
    title: "VIDEO EDITING",
    description:
      "Clean and engaging video editing for creators, brands, products and digital content.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="services-section">
      <div className="services-header">
        <span className="section-eyebrow">
          WHAT I DO
        </span>

        <h2 className="services-title">
          SERVICES BUILT
          <br />
          <span>FOR DIGITAL GROWTH.</span>
        </h2>
      </div>

      <div className="services-list">
        {services.map((service) => (
          <div
            key={service.number}
            className="service-row magnetic"
          >
            <span className="service-number">
              {service.number}
            </span>

            <div className="service-content">
              <h3>{service.title}</h3>

              <p>{service.description}</p>
            </div>

            <div className="service-arrow">
              <ArrowUpRight size={22} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}