"use client";

const strengths = [
  {
    number: "01",
    title: "DEVELOPMENT",
    description:
      "Modern websites and full-stack applications built with clean architecture, responsive interfaces and real-world usability.",
  },
  {
    number: "02",
    title: "AI",
    description:
      "AI-powered products, intelligent workflows and practical AI integrations designed around real problems.",
  },
  {
    number: "03",
    title: "CREATIVE",
    description:
      "Interactive digital experiences, motion design and video editing that help brands stand out.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="about-header">
        <span className="section-eyebrow">
          WHY WORK WITH ME
        </span>

        <h2 className="about-title">
          I BUILD
          <br />
          <span>DIGITAL EXPERIENCES.</span>
        </h2>
      </div>

      <div className="about-statement">
        <p>
          I combine development, AI and creative thinking
          to turn ideas into modern digital products that
          people actually want to use.
        </p>
      </div>

      <div className="strengths-list">
        {strengths.map((strength) => (
          <div
            key={strength.number}
            className="strength-row magnetic"
          >
            <span className="strength-number">
            
              {strength.number}
            </span>

            <h3>{strength.title}</h3>

            <p>{strength.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}