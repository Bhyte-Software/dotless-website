"use client";

import { useLenis } from "lenis/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const IMPACTS = [
  {
    metric: "+95%",
    metricLabel: "Student Performance",
    chip: "Student Outcomes",
    title: "Measurable Improvement in Student Performance",
    image: "/assets/impact.webp",
    imageAlt: "Students collaborating on academic work",
    highlights: [
      {
        title: "Academic Results",
        description:
          "Consistent improvement in grades, exam scores, and learner confidence.",
      },
      {
        title: "Engagement",
        description:
          "Higher participation through tailored support and structured intervention.",
      },
    ],
  },
  {
    metric: "100+",
    metricLabel: "Schools",
    chip: "Institutional Reach",
    title: "Trusted by Schools and Institutions",
    image: "/assets/impact-1.webp",
    imageAlt: "School leaders reviewing educational outcomes together",
    highlights: [
      {
        title: "Partnerships",
        description:
          "Collaborations with primary, secondary, and post-secondary institutions.",
      },
      {
        title: "Lasting Impact",
        description:
          "Programs designed to embed improvement within school culture and practice.",
      },
    ],
  },
  {
    metric: "35+",
    metricLabel: "Years Experience",
    chip: "Our Legacy",
    title: "Over Three Decades of Educational Consultancy",
    image: "/assets/impact-2.webp",
    imageAlt: "Experienced consultants guiding educational strategy",
    highlights: [
      {
        title: "Sector Expertise",
        description:
          "Deep knowledge built through decades of hands-on consultancy work.",
      },
      {
        title: "Trusted Relationships",
        description:
          "Long-standing partnerships with students, families, and institutions.",
      },
    ],
  },
] as const;

const VIEWPORT_HEIGHT_PER_PANEL = 150;
const SCROLL_EXIT_SEGMENTS = 1;

const EASE = [0.22, 1, 0.36, 1] as const;

const SECTION_HEIGHT_VH =
  (IMPACTS.length + SCROLL_EXIT_SEGMENTS) * VIEWPORT_HEIGHT_PER_PANEL;

function ImpactImage({
  impact,
  priority,
  sizes,
  className,
  objectPosition = "center center",
}: {
  impact: (typeof IMPACTS)[number];
  priority?: boolean;
  sizes: string;
  className?: string;
  objectPosition?: string;
}) {
  return (
    <Image
      src={impact.image}
      alt={impact.imageAlt}
      fill
      priority={priority}
      sizes={sizes}
      className={className}
      style={{ objectPosition }}
    />
  );
}

const Impact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const lenis = useLenis();

  useEffect(() => {
    if (window.matchMedia("(max-width: 1023px)").matches) {
      activeIndexRef.current = 0;
      setActiveIndex(0);
      return;
    }

    const updateActiveIndex = () => {
      const container = containerRef.current;
      if (!container) return;

      const { top, height } = container.getBoundingClientRect();
      const scrollableDistance = height - window.innerHeight;

      if (scrollableDistance <= 0) {
        activeIndexRef.current = 0;
        setActiveIndex(0);
        return;
      }

      const scrolled = Math.min(scrollableDistance, Math.max(0, -top));
      const exitBuffer =
        window.innerHeight *
        ((SCROLL_EXIT_SEGMENTS * VIEWPORT_HEIGHT_PER_PANEL) / 100);
      const switchDistance = Math.max(scrollableDistance - exitBuffer, 1);
      const switchScrolled = Math.min(switchDistance, scrolled);
      const progress = switchScrolled / switchDistance;
      const nextIndex = Math.min(
        IMPACTS.length - 1,
        Math.floor(progress * IMPACTS.length)
      );

      if (nextIndex !== activeIndexRef.current) {
        activeIndexRef.current = nextIndex;
        setActiveIndex(nextIndex);
      }
    };

    updateActiveIndex();
    lenis?.resize();

    if (lenis) {
      return lenis.on("scroll", updateActiveIndex);
    }

    window.addEventListener("scroll", updateActiveIndex, { passive: true });
    window.addEventListener("resize", updateActiveIndex);

    return () => {
      window.removeEventListener("scroll", updateActiveIndex);
      window.removeEventListener("resize", updateActiveIndex);
    };
  }, [lenis]);

  const activeImpact = IMPACTS[activeIndex];
  const contentTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.55, ease: EASE };
  const imageTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.7, ease: EASE };
  const metricTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.6, ease: EASE };

  return (
    <div id="impact" aria-label="Our impact">
      <section className="relative lg:hidden">
        <div className="mx-auto w-full max-w-[1920px]">
          {IMPACTS.map((impact, index) => (
            <article
              key={impact.metricLabel}
              className="border-b border-border last:border-b-0"
            >
              <div
                className="flex flex-col bg-background"
                aria-live="polite"
                aria-atomic="true"
              >
                <div className="px-4 pb-6 pt-8 text-center md:px-10">
                  <div className="flex flex-col items-start gap-2 md:items-center md:gap-6">
                    <div className="inline-flex items-center gap-2.5 border border-border px-2 py-1 md:px-4 md:py-2">
                      <span className="size-2 shrink-0 bg-primary" aria-hidden />
                      <span className="text-sm text-foreground">{impact.chip}</span>
                    </div>

                    <h2 className="max-w-xl text-left font-heading text-2xl tracking-tight text-foreground md:text-center md:text-3xl">
                      {impact.title}
                    </h2>
                  </div>
                </div>

                <div className="relative h-96 overflow-hidden bg-muted/20">
                  <ImpactImage
                    impact={impact}
                    priority={index === 0}
                    sizes="100vw"
                    className="object-contain object-center"
                  />
                </div>

                <div className="border-t border-border px-4 py-8">
                  <div className="grid gap-6 sm:grid-cols-2">
                    {impact.highlights.map((highlight) => (
                      <div
                        key={highlight.title}
                        className="flex flex-col gap-0 border-l border-primary pl-4 text-left"
                      >
                        <p className="font-heading text-base font-medium text-foreground">
                          {highlight.title}
                        </p>
                        <p className="text-sm leading-relaxed text-balance text-muted-foreground">
                          {highlight.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-3 bg-primary px-8 py-28 text-center text-primary-foreground">
                <p className="font-heading text-5xl tracking-tight">
                  {impact.metric}
                </p>
                <p className="font-heading text-base">{impact.metricLabel}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        ref={containerRef}
        className="relative hidden lg:block"
        style={{ height: `${SECTION_HEIGHT_VH}vh` }}
      >
        <div className="sticky top-[65px] h-[calc(100vh-65px)] overflow-hidden">
          <div className="mx-auto h-full w-full max-w-[1920px]">
            <div className="grid h-full grid-cols-[1.15fr_1fr]">
              <div
                className="relative flex min-h-0 flex-col bg-primary px-8 py-10 text-primary-foreground"
                aria-live="polite"
                aria-atomic="true"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeImpact.metricLabel}
                    initial={
                      shouldReduceMotion ? false : { opacity: 0, y: 40, scale: 0.96 }
                    }
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={
                      shouldReduceMotion
                        ? { opacity: 1 }
                        : { opacity: 0, y: -32, scale: 0.98 }
                    }
                    transition={metricTransition}
                    className="flex flex-col items-start gap-3"
                  >
                    <p className="font-heading text-6xl tracking-tight sm:text-7xl lg:text-8xl">
                      {activeImpact.metric}
                    </p>
                    <p className="font-heading text-xl sm:text-2xl">
                      {activeImpact.metricLabel}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-10 flex flex-1 flex-col gap-8">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={activeImpact.metricLabel}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={
                        shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -16 }
                      }
                      transition={contentTransition}
                      className="flex flex-col items-start gap-5"
                    >
                      <div className="inline-flex items-center gap-2.5 border border-primary-foreground/25 px-4 py-2">
                        <span
                          className="size-2 shrink-0 bg-primary-foreground"
                          aria-hidden
                        />
                        <span className="text-sm">{activeImpact.chip}</span>
                      </div>
                      <h2 className="max-w-xl font-heading text-3xl tracking-tight lg:text-4xl">
                        {activeImpact.title}
                      </h2>
                    </motion.div>
                  </AnimatePresence>

                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={activeImpact.metricLabel}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={
                        shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -12 }
                      }
                      transition={{
                        ...contentTransition,
                        delay: shouldReduceMotion ? 0 : 0.08,
                      }}
                      className="mt-auto grid gap-5 border-t border-primary-foreground/20 pt-6 sm:grid-cols-2"
                    >
                      {activeImpact.highlights.map((highlight) => (
                        <div
                          key={highlight.title}
                          className="flex flex-col gap-1 border-l border-primary-foreground/40 pl-4 text-left"
                        >
                          <p className="font-heading text-base sm:text-lg">
                            {highlight.title}
                          </p>
                          <p className="text-sm leading-relaxed text-primary-foreground/80">
                            {highlight.description}
                          </p>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="relative flex min-h-0 items-center justify-center overflow-hidden bg-muted/20 px-8 py-6">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeImpact.metricLabel}
                    initial={shouldReduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                    transition={imageTransition}
                    className="relative h-full w-full"
                  >
                    <ImpactImage
                      impact={activeImpact}
                      priority={activeIndex === 0}
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-contain object-center"
                      objectPosition="center center"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impact;
