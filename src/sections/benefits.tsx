"use client";

import Image from "next/image";
import Link from "next/link";

import { useScrollTo } from "@/hooks/use-scroll-to";
import { cn } from "@/lib/utils";

const BENEFITS = [
  {
    icon: "/assets/personalized-learning.svg",
    title: "Personalized Guidance",
    description:
      "Tailored academic and career pathways shaped around each student's goals, strengths, and circumstances.",
    tone: "warm",
  },
  {
    icon: "/assets/innovative-curriculum.svg",
    title: "Test Preparation",
    description:
      "Structured coaching for IELTS, TOEFL, SAT, ACT, GRE, GMAT, and other examinations that shape futures.",
    tone: "muted",
  },
  {
    icon: "/assets/supportive-community.svg",
    title: "Collaborative Partnership",
    description:
      "Close collaboration with students, parents, schools, and organizations throughout every engagement.",
    tone: "warm",
  },
  {
    icon: "/assets/skilled-educators.svg",
    title: "Decades of Expertise",
    description:
      "More than 35 years of practical insight from consultants who understand education from the inside.",
    tone: "muted",
  },
  {
    icon: "/assets/diverse-activities.svg",
    title: "Comprehensive Solutions",
    description:
      "From counselling and policy advisory to DARA scanners, Verificare OMR, and Addmen CBT software — support across the full education stack.",
    tone: "warm",
  },
  {
    icon: "/assets/modern-facilities.svg",
    title: "Measurable School Impact",
    description:
      "Programs trusted by 100+ schools to strengthen pedagogy, management, and student outcomes.",
    tone: "muted",
  },
] as const;

function ContactButton() {
  const handleClick = useScrollTo("contact-us");

  return (
    <Link
      href="#contact-us"
      onClick={handleClick}
      className="group/button relative flex min-h-20 md:min-h-24 w-full items-center justify-center overflow-hidden bg-secondary text-base font-medium"
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

const Benefits = () => {
  return (
    <section id="benefits" className="relative w-full overflow-hidden bg-primary py-5 lg:py-40">
      <div className="mx-auto w-full max-w-[1920px] px-4 md:px-0">
        <div className="bg-background max-w-7xl mx-auto">
          <div className="flex flex-col items-center gap-6 border-b border-border px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
            <div className="inline-flex items-center gap-2.5 border border-border px-2 md:px-4 py-1 md:py-2">
              <span className="size-2 shrink-0 bg-primary" aria-hidden />
              <span className="text-sm text-foreground">Why DOTLES</span>
            </div>
            <h2 className="max-w-xl text-center font-heading tracking-tight text-foreground text-2xl md:text-4xl">
              The Advantages of Working With Experienced Educational Leaders
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((benefit) => (
              <div
                key={benefit.title}
                className={cn(
                  "flex min-h-52 md:min-h-72 flex-col items-center justify-center gap-6 border-b border-border px-6 md:px-8 py-8 md:py-12 text-center last:border-b-0 sm:min-h-80 sm:border-r sm:even:border-r-0 sm:nth-last-[-n+2]:border-b-0 lg:nth-[3n]:border-r-0 lg:nth-last-[-n+3]:border-b-0",
                  benefit.tone === "warm" ? "bg-black/3" : "bg-background"
                )}
              >
                <div className="relative size-8 md:size-12 shrink-0">
                  <Image
                    src={benefit.icon}
                    alt={benefit.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex max-w-xs flex-col gap-1 md:gap-2">
                  <h3 className="font-heading text-base md:text-lg font-medium text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground md:text-base text-balance md:text-wrap">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <ContactButton />
        </div>
      </div>
    </section>
  );
};

export default Benefits;
