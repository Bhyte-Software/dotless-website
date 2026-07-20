"use client";

import Image from "next/image";
import Link from "next/link";

import { useScrollTo } from "@/hooks/use-scroll-to";
import { cn } from "@/lib/utils";

const TEAM_MEMBERS = [
  {
    name: "Professor Kwasi Opoku-Amankwa",
    role: "Lead Consultant And Founding Head",
    image: "/assets/KwasiImage.jpeg",
    imageAlt: "Professor Kwasi Opoku-Amankwa",
    highlights: [
      { value: "35", label: "Years of expertise" },
      { value: "GES", label: "Former Director-General" },
      { value: "KNUST", label: "Multi-time Dean" },
      { value: "Ghana", label: "Classroom foundations" },
    ],
    bio: "Brings 35 years of expertise spanning education, strategic communications, publishing, and social development — from classroom experience across Ghana to leadership as GES Director-General and multi-time Dean at KNUST.",
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

function TeamMemberCard({
  member,
}: {
  member: (typeof TEAM_MEMBERS)[number];
}) {
  const infoPanel = (
    <div className="flex h-full min-h-0 flex-1 flex-col border-border bg-black/2">
      <div className="flex shrink-0 flex-col gap-1 border-b border-border px-5 py-5 sm:px-6 sm:py-6">
        <p className="font-heading text-lg font-medium text-foreground md:text-xl">
          {member.name}
        </p>
        <p className="text-sm text-muted-foreground text-balance">{member.role}</p>
      </div>

      <div className="grid shrink-0 grid-cols-2 border-b border-border">
        {member.highlights.map((highlight, index) => (
          <div
            key={highlight.label}
            className={cn(
              "flex flex-col justify-center gap-1 px-5 py-4 sm:px-6 sm:py-5",
              index % 2 === 0 && "border-r border-border",
              index < 2 && "border-b border-border"
            )}
          >
            <p className="font-heading text-xl font-medium tracking-tight text-foreground">
              {highlight.value}
            </p>
            <p className="text-sm text-muted-foreground">{highlight.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-1 items-end px-5 py-5 sm:px-6 sm:py-6">
        <p className="text-sm text-muted-foreground">{member.bio}</p>
      </div>
    </div>
  );

  const imagePanel = (
    <div className="relative h-96 w-full shrink-0 bg-muted sm:h-120 lg:h-[43rem] lg:w-[50%]">
      <Image
        src={member.image}
        alt={member.imageAlt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover object-top"
      />
    </div>
  );

  return (
    <article className="flex flex-col border-t border-border lg:min-h-[43rem] lg:flex-row">
      {infoPanel}
      {imagePanel}
    </article>
  );
}

const Team = () => {
  return (
    <section id="team" className="relative w-full overflow-hidden">
      <div className="mx-auto w-full max-w-[1920px] bg-background">
        <div className="flex flex-col items-center gap-6 border-b border-border px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
          <div className="inline-flex items-center gap-2.5 border border-border bg-black/2 px-2 md:px-4 py-1 md:py-2">
            <span className="size-2 shrink-0 bg-primary" aria-hidden />
            <span className="text-sm text-foreground">Our Team</span>
          </div>
          <h2 className="max-w-2xl text-balance text-center font-heading text-2xl md:text-4xl tracking-tight text-foreground">
            A Formidable Team of Academic Leaders Bridging Classroom Teaching
            and Research
          </h2>
        </div>

        <div className="mx-auto w-full max-w-5xl">
          {TEAM_MEMBERS.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>

        <ContactButton />
      </div>
    </section>
  );
};

export default Team;
