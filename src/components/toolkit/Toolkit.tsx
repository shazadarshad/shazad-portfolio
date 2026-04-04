const ROW_ONE = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js", "Python", "Tailwind CSS",
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js", "Python", "Tailwind CSS",
];

const ROW_TWO = [
  "MongoDB", "PostgreSQL", "Git", "Figma", "HTML & CSS", "REST APIs", "Vercel",
  "MongoDB", "PostgreSQL", "Git", "Figma", "HTML & CSS", "REST APIs", "Vercel",
];

export default function Toolkit() {
  return (
    <section id="toolkit" className="toolkit-section" aria-label="My tech toolkit">
      <div style={{ marginBottom: "2rem", paddingInline: "clamp(1.5rem, 5vw, 4rem)" }}>
        <p className="section__label">
          <span aria-hidden="true">◆</span> Tech Stack
        </p>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "var(--black)",
          }}
        >
          My Arsenal
        </h2>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="marquee-row" aria-hidden="true">
        <div className="marquee-track marquee-track--left">
          {ROW_ONE.map((item, i) => (
            <span key={`${item}-${i}`} className="marquee-item">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="marquee-row" aria-hidden="true">
        <div className="marquee-track marquee-track--right">
          {ROW_TWO.map((item, i) => (
            <span key={`${item}-${i}`} className="marquee-item">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Screen-reader accessible list */}
      <ul style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap" }}>
        {[...new Set([...ROW_ONE, ...ROW_TWO])].map((item) => <li key={item}>{item}</li>)}
      </ul>
    </section>
  );
}
