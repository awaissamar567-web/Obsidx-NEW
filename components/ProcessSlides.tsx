import type { CSSProperties } from "react";

const steps = [
  {
    label: "Research",
    title: "Find the Opportunity",
    body: "Audience, expertise, existing demand, and commercial signals reveal your strongest business opportunity.",
  },
  {
    label: "Product",
    title: "Shape the Offer",
    body: "Product, positioning, pricing, and customer journey, shaped into a clear, relevant, compelling offer.",
  },
  {
    label: "Launch",
    title: "Build the System",
    body: "Tools, sales process, delivery experience, and operating workflow, connected into one system built to launch and grow.",
  },
  {
    label: "Growth",
    title: "Launch and Improve",
    body: "Customer behavior, revenue, retention, and feedback guide every improvement after launch.",
  },
] as const;

export function ProcessSlides() {
  const total = String(steps.length).padStart(2, "0");

  return (
    <ol className="ox-slides">
      {steps.map((step, index) => (
        <li className="ox-slide" key={step.title} style={{ "--i": index } as CSSProperties}>
          <div className="ox-slide-ribbon" aria-hidden="true">
            <div className="ox-slide-ribbon-track">
              {Array.from({ length: 8 }, (_, n) => (
                <span key={n}>{step.label}</span>
              ))}
            </div>
          </div>
          <div className="ox-slide-body">
            <p className="ox-slide-count">
              <strong>{String(index + 1).padStart(2, "0")}</strong>
              <span>/{total}</span>
            </p>
            <div>
              <p className="ox-eyebrow">{step.label}</p>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
