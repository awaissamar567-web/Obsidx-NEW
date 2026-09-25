"use client";

import { FormEvent, useState } from "react";

type ApplicationData = {
  platform: string;
  name: string;
  contact: string;
  audienceLocation: string;
  followers: string;
  engagement: string;
  revenue: string;
};

type SelectOption = { value: string; label: string };

const TOTAL_STEPS = 7;

const initialData: ApplicationData = {
  platform: "",
  name: "",
  contact: "",
  audienceLocation: "",
  followers: "",
  engagement: "",
  revenue: "",
};

const platformOptions: SelectOption[] = [
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "YouTube" },
  { value: "tiktok", label: "TikTok" },
  { value: "x", label: "X / Twitter" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "facebook", label: "Facebook" },
  { value: "podcast", label: "Podcast" },
  { value: "other", label: "Other" },
];

const revenueOptions: SelectOption[] = [
  { value: "pre-revenue", label: "Pre-revenue" },
  { value: "under-5k", label: "Under $5K/month" },
  { value: "5k-20k", label: "$5K–$20K/month" },
  { value: "20k-50k", label: "$20K–$50K/month" },
  { value: "50k-plus", label: "$50K+/month" },
];

function ObsidxSelect({ label, placeholder, value, options, autoFocus, onChange }: {
  label: string;
  placeholder: string;
  value: string;
  options: SelectOption[];
  autoFocus?: boolean;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === value);

  return (
    <div className="obsidx-select">
      <button
        autoFocus={autoFocus}
        className={open ? "obsidx-select-trigger is-open" : "obsidx-select-trigger"}
        type="button"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setOpen(true);
          }
          if (event.key === "Escape") setOpen(false);
        }}
      >
        <span className={selected ? "" : "is-placeholder"}>{selected?.label ?? placeholder}</span>
        <svg aria-hidden="true" viewBox="0 0 20 20"><path d="m5 7.5 5 5 5-5" /></svg>
      </button>
      {open && (
        <div className="obsidx-select-menu" role="listbox" aria-label={label}>
          {options.map((option) => (
            <button
              className={value === option.value ? "is-selected" : ""}
              type="button"
              role="option"
              aria-selected={value === option.value}
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              <span>{option.label}</span>
              {value === option.value && <span aria-hidden="true">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ApplicationForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initialData);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const update = (field: keyof ApplicationData, value: string) => {
    setData((current) => ({ ...current, [field]: value }));
    if (status === "error") setStatus("idle");
  };

  async function advance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (step === 2 && !data.platform) {
      setStatus("error");
      setMessage("Select your primary social media platform.");
      return;
    }

    if (step < TOTAL_STEPS - 1) {
      setStep((current) => current + 1);
      setStatus("idle");
      setMessage("");
      return;
    }

    if (!data.revenue) {
      setStatus("error");
      setMessage("Select your current monthly revenue.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "The application could not be sent.");
      setStatus("success");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "The application could not be sent.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="application-step application-success" role="status" aria-live="polite">
        <span className="step-kicker">Application received</span>
        <h2>We have your details.</h2>
        <p>We will review the fit and follow up with the next step.</p>
        <a className="text-button" href="/">Return to Obsidx</a>
      </div>
    );
  }

  const prompts = [
    {
      title: "What should we call you?",
      content: <input autoFocus aria-label="Your full name" placeholder="Full name" name="name" autoComplete="name" required value={data.name} onChange={(event) => update("name", event.target.value)} />,
    },
    {
      title: "Where should we contact you?",
      content: <input autoFocus aria-label="Preferred contact details" placeholder="Email address or preferred contact" name="contact" autoComplete="email" required value={data.contact} onChange={(event) => update("contact", event.target.value)} />,
    },
    {
      title: "Which platform holds most of your audience?",
      content: <ObsidxSelect autoFocus label="Primary social media platform" placeholder="Choose your primary platform" value={data.platform} options={platformOptions} onChange={(value) => update("platform", value)} />,
    },
    {
      title: "What's your Instagram or TikTok @?",
      content: <input autoFocus aria-label="Instagram or TikTok handle" placeholder="@yourhandle" name="audienceLocation" required value={data.audienceLocation} onChange={(event) => update("audienceLocation", event.target.value)} />,
    },
    {
      title: "How many followers do you have?",
      content: <input autoFocus aria-label="Total follower count" placeholder="Number of followers" name="followers" inputMode="numeric" required value={data.followers} onChange={(event) => update("followers", event.target.value)} />,
    },
    {
      title: "What is your audience engagement rate?",
      content: (
        <label className="engagement-field">
          <input autoFocus aria-label="Audience engagement rate" placeholder="Engagement rate (%)" name="engagement" inputMode="decimal" required value={data.engagement} onChange={(event) => update("engagement", event.target.value)} />
          <span className="engagement-help">
            Don&apos;t know it? <a href="https://hypeauditor.com/free-tools/instagram-engagement-calculator/" target="_blank" rel="noreferrer">Check your engagement rate</a>.
          </span>
        </label>
      ),
    },
    {
      title: "What is your current monthly revenue?",
      content: <ObsidxSelect autoFocus label="Current monthly revenue" placeholder="Choose your monthly revenue range" value={data.revenue} options={revenueOptions} onChange={(value) => update("revenue", value)} />,
    },
  ] as const;

  return (
    <form className="application-step" onSubmit={advance}>
      <div className="application-progress" aria-label={`Question ${step + 1} of ${TOTAL_STEPS}`}>
        <span>Question {step + 1} of {TOTAL_STEPS}</span>
        <div className="progress-track"><span style={{ transform: `scaleX(${(step + 1) / TOTAL_STEPS})` }} /></div>
      </div>

      <div className="application-question" key={step}>
        <h2>{prompts[step].title}</h2>
        <div className="application-control">{prompts[step].content}</div>
      </div>

      <div className="application-actions">
        <button className="application-back" type="button" disabled={step === 0} onClick={() => {
          setStep((current) => current - 1);
          setStatus("idle");
          setMessage("");
        }}>Back</button>
        <button className="button application-continue" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending..." : step === TOTAL_STEPS - 1 ? "Submit Application" : "Continue"}
        </button>
      </div>
      {status === "error" && <p className="form-error" role="alert">{message}</p>}
      <p className="application-note">Powered by Obsidx</p>
    </form>
  );
}
