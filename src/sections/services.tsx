"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";

import { useScrollTo } from "@/hooks/use-scroll-to";

const SERVICES = [
  {
    chip: "Educational Guidance",
    title: "Navigate Every Academic and Career Decision With Clarity",
    description:
      "Whether you are choosing a university, exploring a new field, or planning your career, our consultants offer one-on-one support for students, parents, and professionals — helping you evaluate options and move forward with confidence.",
    buttonLabel: "Explore Career Guidance",
    image: "/assets/guidance.webp",
    imageAlt: "Consultant providing educational and career guidance",
  },
  {
    chip: "Test Preparation",
    title: "Prepare for the Exams That Open Doors",
    description:
      "Our programs cover IELTS, TOEFL, SAT, ACT, GRE, GMAT, and more — tailored to your timeline and target scores. Through focused practice and proven strategies, we help you approach exam day with confidence.",
    buttonLabel: "View Test Prep Programs",
    image: "/assets/group-of-students.webp",
    imageAlt: "Group of students preparing for standardized tests",
  },
  {
    chip: "Policy & Analysis",
    title: "Shape Education Policy With Evidence and Insight",
    description:
      "We partner with schools, authorities, and organizations to review data, design reforms, and improve outcomes at scale. From drafting to impact analysis, DOTLES brings decades of sector experience to every engagement.",
    buttonLabel: "Discover Policy Services",
    image: "/assets/policy.webp",
    imageAlt: "Education policy planning and institutional collaboration",
  },
] as const;

const VIEWPORT_HEIGHT_PER_SERVICE = 150;
/** Extra viewport segment so the last service can dwell before the section releases. */
const SCROLL_EXIT_SEGMENTS = 1;

const EASE = [0.22, 1, 0.36, 1] as const;

const SECTION_HEIGHT_VH =
  (SERVICES.length + SCROLL_EXIT_SEGMENTS) * VIEWPORT_HEIGHT_PER_SERVICE;

function ServiceButton({ label }: { label: string }) {
  const handleClick = useScrollTo("contact-us");

  return (
    <Link
      href="#contact-us"
      onClick={handleClick}
      className="group/button relative flex h-32 w-full items-center justify-center overflow-hidden bg-secondary font-heading text-xl font-medium"
    >
      <span className="relative z-10 h-6 overflow-hidden text-secondary-foreground transition-colors duration-300 ease-out group-hover/button:text-primary-foreground">
        <span className="flex flex-col transition-transform duration-300 ease-out group-hover/button:-translate-y-1/2">
          <span className="flex h-6 items-center justify-center">{label}</span>
          <span className="flex h-6 items-center justify-center">{label}</span>
        </span>
      </span>
      <span
        aria-hidden
        className="absolute inset-0 translate-y-full bg-primary transition-transform duration-300 ease-out group-hover/button:translate-y-0"
      />
    </Link>
  );
}

function ServiceImage({
  service,
  priority,
  sizes,
  className,
}: {
  service: (typeof SERVICES)[number];
  priority?: boolean;
  sizes: string;
  className?: string;
}) {
  return (
    <Image
      src={service.image}
      alt={service.imageAlt}
      fill
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const lenis = useLenis();

  useEffect(() => {
    const updateActiveIndex = () => {
      const container = containerRef.current;
      if (!container) return;

      const { top, height } = container.getBoundingClientRect();
      const scrollableDistance = height - window.innerHeight;

      if (scrollableDistance <= 0) {
        setActiveIndex(0);
        return;
      }

      const scrolled = Math.min(scrollableDistance, Math.max(0, -top));
      const exitBuffer =
        window.innerHeight *
        ((SCROLL_EXIT_SEGMENTS * VIEWPORT_HEIGHT_PER_SERVICE) / 100);
      const switchDistance = Math.max(scrollableDistance - exitBuffer, 1);
      const switchScrolled = Math.min(switchDistance, scrolled);
      const progress = switchScrolled / switchDistance;
      const nextIndex = Math.min(
        SERVICES.length - 1,
        Math.floor(progress * SERVICES.length)
      );

      setActiveIndex(nextIndex);
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

  const activeService = SERVICES[activeIndex];
  const contentTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.55, ease: EASE };
  const imageTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.7, ease: EASE };

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative"
      style={{ height: `${SECTION_HEIGHT_VH}vh` }}
      aria-label="Our services"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="mx-auto h-full w-full max-w-[1920px]">
          <div className="grid h-full grid-cols-1 lg:grid-cols-[1fr_1.5fr]">
            <div className="relative flex min-h-0 flex-col bg-background lg:min-h-full">
              <div className="relative h-48 shrink-0 overflow-hidden lg:hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={activeService.title}
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, scale: 1.06 }
                    }
                    animate={{ opacity: 1, scale: 1 }}
                    exit={
                      shouldReduceMotion
                        ? { opacity: 1 }
                        : { opacity: 0, scale: 1.02 }
                    }
                    transition={imageTransition}
                    className="absolute inset-0"
                  >
                    <ServiceImage
                      service={activeService}
                      priority={activeIndex === 0}
                      sizes="100vw"
                      className="object-cover object-center"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex min-h-0 flex-1 flex-col justify-between pt-12">
                <div
                  className="px-6 sm:px-10 lg:px-12"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <div className="min-h-[280px] sm:min-h-[320px] lg:min-h-[380px]">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={activeService.title}
                        initial={
                          shouldReduceMotion
                            ? false
                            : { opacity: 0, y: 32 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        exit={
                          shouldReduceMotion
                            ? { opacity: 1 }
                            : { opacity: 0, y: -24 }
                        }
                        transition={contentTransition}
                        className="flex flex-col gap-6"
                      >
                        <motion.div
                          initial={
                            shouldReduceMotion ? false : { opacity: 0, x: -16 }
                          }
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            ...contentTransition,
                            delay: shouldReduceMotion ? 0 : 0.06,
                          }}
                          className="inline-flex w-fit items-center gap-2.5 border border-border px-4 py-2"
                        >
                          <span
                            className="size-2 shrink-0 bg-primary"
                            aria-hidden
                          />
                          <span className="text-sm text-foreground">
                            {activeService.chip}
                          </span>
                        </motion.div>

                        <div className="flex flex-col gap-5">
                          <motion.h2
                            initial={
                              shouldReduceMotion ? false : { opacity: 0, y: 20 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              ...contentTransition,
                              delay: shouldReduceMotion ? 0 : 0.1,
                            }}
                            className="max-w-xl font-heading text-3xl tracking-tight text-foreground lg:text-5xl"
                          >
                            {activeService.title}
                          </motion.h2>
                          <motion.p
                            initial={
                              shouldReduceMotion ? false : { opacity: 0, y: 20 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              ...contentTransition,
                              delay: shouldReduceMotion ? 0 : 0.16,
                            }}
                            className="max-w-lg text-base leading-relaxed text-muted-foreground"
                          >
                            {activeService.description}
                          </motion.p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                <div className="relative mt-8 h-32 border-t border-border lg:mt-0">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={activeService.title}
                      initial={
                        shouldReduceMotion ? false : { opacity: 0, y: 20 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      exit={
                        shouldReduceMotion
                          ? { opacity: 1 }
                          : { opacity: 0, y: -12 }
                      }
                      transition={{
                        ...contentTransition,
                        delay: shouldReduceMotion ? 0 : 0.08,
                      }}
                      className="absolute inset-0"
                    >
                      <ServiceButton label={activeService.buttonLabel} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="relative hidden overflow-hidden lg:block">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={activeService.title}
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, scale: 1.05 }
                  }
                  animate={{ opacity: 1, scale: 1 }}
                  exit={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : { opacity: 0, scale: 1.02 }
                  }
                  transition={imageTransition}
                  className="absolute inset-0"
                >
                  <ServiceImage
                    service={activeService}
                    priority={activeIndex === 0}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
