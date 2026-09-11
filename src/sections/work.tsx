"use client";

import Image from "next/image";
import Link from "next/link";

import { useScrollTo } from "@/hooks/use-scroll-to";

const ENGAGEMENTS = [
  {
    chip: "Workshop",
    title: "Digital Transformation Drive in Higher Education",
    location: "Ho Technical University",
    description:
      "A recent demo and working session on digitizing exam marking — covering DARA scanning, OMR processing, and how universities can move from manual assessment to faster, more accurate results.",
    images: [
      {
        src: "/assets/leadership-session.jpg",
        alt: "Education leaders seated for the DOTLES session at Ho Technical University",
      },
      {
        src: "/assets/hero-presentation.jpg",
        alt: "DOTLES presenting the digital transformation demo at Ho Technical University",
      },
      {
        src: "/assets/corporate-presentation.jpg",
        alt: "DOTLES consultant speaking during the HTU workshop",
      },
      {
        src: "/assets/institutional-group.jpg",
        alt: "Group photograph with DOTLES and HTU participants",
      },
      {
        src: "/assets/leadership-team.jpg",
        alt: "DOTLES team with institutional partners after the HTU workshop",
      },
    ],
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
          <span className="flex h-5 items-center justify-center">
            Book a Workshop
          </span>
          <span className="flex h-5 items-center justify-center">
            Book a Workshop
          </span>
        </span>
      </span>
      <span
        aria-hidden
        className="absolute inset-0 translate-y-full bg-primary transition-transform duration-300 ease-out group-hover/button:translate-y-0"
      />
    </Link>
  );
}

const Work = () => {
  return (
    <section
      id="work"
      aria-label="Our work"
      className="relative w-full overflow-hidden bg-primary py-5 lg:py-40"
    >
      <div className="mx-auto w-full max-w-[1920px] px-4 md:px-0">
        <div className="mx-auto max-w-7xl bg-background">
          <div className="flex flex-col items-center gap-6 border-b border-border px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
            <div className="inline-flex items-center gap-2.5 border border-border px-2 md:px-4 py-1 md:py-2">
              <span className="size-2 shrink-0 bg-primary" aria-hidden />
              <span className="text-sm text-foreground">Our Work</span>
            </div>
            <h2 className="max-w-2xl text-center font-heading text-2xl tracking-tight text-foreground md:text-4xl text-balance">
              Workshops, Training, and Work on the Ground
            </h2>
            <p className="max-w-2xl text-center text-sm leading-relaxed text-muted-foreground md:text-base">
              A look at the teaching, demos, and institutional sessions DOTLES
              delivers across Ghana — starting with the recent workshop at Ho
              Technical University.
            </p>
          </div>

          {ENGAGEMENTS.map((engagement) => (
            <article
              key={engagement.title}
              className="border-b border-border last:border-b-0"
            >
              <div className="flex flex-col gap-4 border-b border-border px-6 py-8 sm:px-10 lg:px-16">
                <div className="inline-flex w-fit items-center gap-2.5 border border-border px-3 py-1.5">
                  <span className="size-2 shrink-0 bg-primary" aria-hidden />
                  <span className="text-sm text-foreground">
                    {engagement.chip}
                  </span>
                </div>
                <h3 className="max-w-2xl font-heading text-xl tracking-tight text-foreground md:text-2xl">
                  {engagement.title}
                </h3>
                <p className="font-heading text-sm text-primary md:text-base">
                  {engagement.location}
                </p>
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  {engagement.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {engagement.images.map((image, index) => (
                  <div
                    key={image.src}
                    className={
                      index === 0
                        ? "relative aspect-[4/3] overflow-hidden sm:col-span-2"
                        : "relative aspect-[4/3] overflow-hidden"
                    }
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes={
                        index === 0
                          ? "(max-width: 640px) 100vw, 66vw"
                          : "(max-width: 1024px) 50vw, 33vw"
                      }
                      className="object-cover object-center"
                    />
                  </div>
                ))}
              </div>
            </article>
          ))}

          <ContactButton />
        </div>
      </div>
    </section>
  );
};

export default Work;
