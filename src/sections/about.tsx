"use client";

import Link from "next/link";

import { useScrollTo } from "@/hooks/use-scroll-to";

const STAKEHOLDERS = [
  "Students and student groups",
  "Educational institutions, school heads, and governing boards",
  "Lecturers, teachers, and academic staff",
  "Parents and educational authorities",
  "Government agencies, NGOs, and media personnel",
] as const;

const CORE_VALUES = [
  "Professionalism",
  "Integrity",
  "Teamwork",
  "Credibility",
  "Hard work",
] as const;

const OBJECTIVES = [
  {
    title: "Educational Leadership",
    description:
      "Nurturing exceptional school management and instructional leadership.",
  },
  {
    title: "Modern Assessment Solutions",
    description:
      "Engineering reliable, tech-forward measurement and grading frameworks.",
  },
  {
    title: "Holistic Counselling",
    description:
      "Guiding student career pathways and supporting academic transitions.",
  },
  {
    title: "Materials Development",
    description:
      "Authoring and producing premier, localized learning resources.",
  },
  {
    title: "Policy and Programme Evaluation",
    description:
      "Conducting rigorous reviews and monitoring to support national education reforms.",
  },
] as const;

const ROWS = [
  {
    label: "About Us",
    tone: "warm",
    content: (
      <div className="flex flex-col gap-4 md:gap-5">
        <p className="max-w-3xl text-sm md:text-base text-muted-foreground">
          Dotles Education Services is a premier, multi-disciplinary educational
          consultancy dedicated to driving excellence across the entire
          educational ecosystem. We offer expert advisory, strategic management,
          and technical solutions to an expansive network of stakeholders,
          including:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm md:text-base text-muted-foreground">
          {STAKEHOLDERS.map((stakeholder) => (
            <li key={stakeholder}>{stakeholder}</li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    label: "Vision & Mission",
    tone: "muted",
    content: (
      <div className="flex flex-col gap-4 md:gap-5">
        <p className="max-w-3xl text-sm md:text-base text-muted-foreground">
          <span className="font-medium text-foreground">Vision:</span> To be the
          first choice in educational consulting, empowering institutions to
          &quot;get it right&quot;.
        </p>
        <p className="max-w-3xl text-sm md:text-base text-muted-foreground">
          <span className="font-medium text-foreground">Mission:</span> To offer
          high-quality educational services and maximize outcomes through
          top-notch, evidence-based solutions.
        </p>
      </div>
    ),
  },
  {
    label: "Core Values",
    tone: "warm",
    content: (
      <div className="flex flex-col gap-4 md:gap-5">
        <p className="max-w-3xl text-sm md:text-base text-muted-foreground">
          Our operations are anchored on five fundamental pillars:
        </p>
        <div className="flex flex-wrap gap-3">
          {CORE_VALUES.map((value) => (
            <span
              key={value}
              className="inline-flex items-center border border-border px-3 py-1.5 text-sm text-foreground sm:text-base"
            >
              {value}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    label: "Objectives",
    tone: "muted",
    content: (
      <div className="flex flex-col gap-4 md:gap-5">
        <p className="max-w-3xl text-sm md:text-base text-muted-foreground">
          To elevate educational standards and maximize student and
          institutional outcomes across Ghana and beyond through data-driven
          expertise in:
        </p>
        <ul className="space-y-3">
          {OBJECTIVES.map((objective) => (
            <li key={objective.title} className="flex gap-2.5">
              <span
                className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                aria-hidden
              />
              <span className="text-sm md:text-base text-muted-foreground">
                <span className="font-medium text-foreground">
                  {objective.title}:{" "}
                </span>
                {objective.description}
              </span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
] as const;

function ContactButton() {
  const handleClick = useScrollTo("contact-us");

  return (
    <Link
      href="#contact-us"
      onClick={handleClick}
      className="group/button relative flex min-h-16 md:min-h-24 w-full items-center justify-center overflow-hidden bg-secondary text-base font-medium"
    >
      <span className="relative z-10 h-5 overflow-hidden font-heading text-secondary-foreground transition-colors duration-300 ease-out group-hover/button:text-primary-foreground">
        <span className="flex flex-col transition-transform duration-300 ease-out group-hover/button:-translate-y-1/2">
          <span className="flex h-5 items-center justify-center">Contact Us</span>
          <span className="flex h-5 items-center justify-center">Contact Us</span>
        </span>
      </span>
      <span
        aria-hidden
        className="absolute inset-0 translate-y-full bg-primary transition-transform duration-300 ease-out group-hover/button:translate-y-0"
      />
    </Link>
  );
}

const About = () => {
  return (
    <section id="about-us" className="relative w-full overflow-hidden bg-primary pt-0 pb-6 lg:pt-40 lg:pb-40">
      <div className="mx-auto w-full max-w-[1920px] px-4 md:px-0">
        <div className="mx-auto max-w-7xl bg-background">
          <div className="flex flex-col items-center gap-6 border-b border-border px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
            <div className="inline-flex items-center gap-2.5 border border-border px-2 md:px-4 py-1 md:py-2">
              <span className="size-2 shrink-0 bg-primary" aria-hidden />
              <span className="text-sm text-foreground">About DOTLES</span>
            </div>
            <h2 className="max-w-2xl text-center font-heading text-2xl md:text-4xl tracking-tight text-foreground text-balance md:text-wrap">
              About Dotles Education Services
            </h2>
          </div>

          <div className="mx-auto flex md:w-[80%] flex-col">
            {ROWS.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-1 gap-2 border-b border-border lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)]"
              >
                <div className="flex items-start border-border px-4 pt-6 pb-0 lg:px-12 lg:pt-14 lg:pb-14">
                  <p className="font-heading text-lg md:text-2xl tracking-tight text-foreground md:text-foreground/25 text-nowrap">
                    {row.label}
                  </p>
                </div>
                <div className="px-4 py-0 lg:px-12 lg:py-14 mb-4 md:mb-0 text-sm md:text-base">{row.content}</div>
              </div>
            ))}
          </div>

          <ContactButton />
        </div>
      </div>
    </section>
  );
};

export default About;
