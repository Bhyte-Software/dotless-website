"use client";

import Link from "next/link";

import { useScrollTo } from "@/hooks/use-scroll-to";
import { cn } from "@/lib/utils";

const CORE_VALUES = [
  {
    title: "Excellence",
    description:
      "We hold ourselves to the highest standards in every engagement we undertake.",
  },
  {
    title: "Integrity",
    description:
      "Honest counsel and transparent recommendations our clients can trust.",
  },
  {
    title: "Partnership",
    description:
      "We work alongside clients as committed collaborators, not distant advisors.",
  },
  {
    title: "Impact",
    description:
      "We focus on outcomes that create real, lasting change for learners and institutions.",
  },
] as const;

const ROWS = [
  {
    label: "Mission",
    tone: "warm",
    content: (
      <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        To empower students, families, schools, and institutions with expert
        guidance that turns educational ambition into meaningful, measurable
        outcomes — through every stage of the learning journey.
      </p>
    ),
  },
  {
    label: "Vision",
    tone: "muted",
    content: (
      <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        To be the most trusted educational consultancy, recognized for integrity,
        depth of expertise, and lasting impact across academics, careers, and
        institutional growth worldwide.
      </p>
    ),
  },
  {
    label: "Values",
    tone: "warm",
    content: (
      <div className="flex flex-col gap-8">
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Our work is grounded in principles that shape how we advise,
          collaborate, and deliver results for every student, school, and
          organization we serve.
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {CORE_VALUES.map((value) => (
            <div
              key={value.title}
              className="flex flex-col gap-2 border-l border-primary pl-5"
            >
              <p className="font-heading text-base font-medium text-foreground sm:text-lg">
                {value.title}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {value.description}
              </p>
            </div>
          ))}
        </div>
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
      className="group/button relative flex min-h-24 w-full items-center justify-center overflow-hidden bg-secondary text-base font-medium"
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
    <section id="about-us" className="relative w-full overflow-hidden bg-primary py-20 lg:py-40">
      <div className="mx-auto w-full max-w-[1920px]">
        <div className="mx-auto max-w-7xl bg-background">
          <div className="flex flex-col items-center gap-6 border-b border-border px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
            <div className="inline-flex items-center gap-2.5 border border-border px-4 py-2">
              <span className="size-2 shrink-0 bg-primary" aria-hidden />
              <span className="text-sm text-foreground">About DOTLES</span>
            </div>
            <h2 className="max-w-2xl text-center font-heading text-4xl tracking-tight text-foreground">
              The Principles That Guide Every Partnership We Build
            </h2>
          </div>

          <div className="flex flex-col w-[80%] mx-auto">
            {ROWS.map((row) => (
              <div
                key={row.label}
                className={cn(
                  "grid grid-cols-1 border-b border-border lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)]",
                )}
              >
                <div className="flex items-start border-border px-8 py-10 lg:px-12 lg:py-14">
                  <p className="font-heading text-2xl tracking-tight text-foreground/25">
                    {row.label}
                  </p>
                </div>
                <div className="px-8 py-10 lg:px-12 lg:py-14">{row.content}</div>
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
