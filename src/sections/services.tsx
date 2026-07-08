"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";

import { useScrollTo } from "@/hooks/use-scroll-to";

type ServiceItem =
  | string
  | {
    title: string;
    description: string;
  };

const SERVICES = [
  {
    chip: "Measurement & Assessment",
    title: "Education Measurement and Assessment Solutions",
    description:
      "We provide technical and psychometric solutions that strengthen the validity, reliability, and efficiency of assessment systems.",
    items: [
      {
        title: "Aptitude And Diagnostic Test Prep",
        description:
          "Targeted coaching for Teacher Licensure and Teacher Promotion examinations.",
      },
      {
        title: "Advanced IT Solutions",
        description:
          "Specialized systems for automated reading, marking, and grading of both objective (MCQ) and subjective (essay-type) questions.",
      },
      {
        title: "Quality Assurance",
        description:
          "Designing custom question banks, test item repositories, and anti-bias assessment guidelines.",
      },
      {
        title: "Data Analytics",
        description:
          "Generating detailed psychometric analyses and administrative reports to guide data-driven teaching adjustments.",
      },
      {
        title: "Integrity Management",
        description:
          "Deploying robust monitoring protocols to ensure the credibility of examination processes.",
      },
    ] satisfies ServiceItem[],
    buttonLabel: "Explore Assessment Solutions",
    image: "/assets/measurement.webp",
    imageAlt: "Education measurement and assessment planning",
  },
  {
    chip: "Leadership & Management",
    title: "Educational Leadership and School Management",
    description:
      "We support school leaders and institutions with practical frameworks for stronger teaching, governance, and performance.",
    items: [
      "Curriculum development, structural review, and instructional design.",
      "Executive school management and instructional leadership training.",
      "Formulation of tailored School Improvement Plans (SIPs) and rigorous School Performance Reviews.",
    ] satisfies ServiceItem[],
    buttonLabel: "Explore Leadership Services",
    image: "/assets/management.webp",
    imageAlt: "Educational leadership and school management consultation",
  },
  {
    chip: "Career & Counselling",
    title: "Career Guidance, Student Counselling and Test Preparation",
    description:
      "We help students build the skills and confidence needed to navigate key academic transitions.",
    items: [
      {
        title: "International Test Prep",
        description:
          "Premium preparatory support for IELTS, TOEFL, SAT, ACT, GRE, and GMAT.",
      },
      {
        title: "Local Exam Support",
        description:
          "Comprehensive revision and preparation packs for BECE and WASSCE.",
      },
      {
        title: "Academic Pathways",
        description:
          "Expert advice on school selection, programme selection, and school placement.",
      },
      {
        title: "Psychosocial Support",
        description:
          "Crisis counselling, behaviour management strategies for parents and school authorities, study habit optimization, and relationship skills development.",
      },
      {
        title: "Transition Coaching",
        description:
          "Pre-departure and post-arrival coaching services for study abroad programmes.",
      },
    ] satisfies ServiceItem[],
    buttonLabel: "Explore Student Services",
    image: "/assets/guidance.webp",
    imageAlt: "Students receiving career guidance and test preparation support",
  },
  {
    chip: "TLMs Development",
    title: "Teaching Learning Materials (TLMs) Development",
    description:
      "We improve classroom learning through high-quality instructional resources and practical author development support.",
    items: [
      "Development of foundational Literacy and Numeracy materials for KG, Primary, and levels.",
      "Design and production of materials for JHS, SHS, STEM, TVET.",
      "Authorship workshops and textbook development masterclasses for teachers, lecturers, and publishers.",
      "Compiling specialized Educational Leadership Guides for Directors, Managers, and School Heads.",
    ] satisfies ServiceItem[],
    buttonLabel: "Explore TLMs Services",
    image: "/assets/material.webp",
    imageAlt: "Teaching and learning materials development in a classroom setting",
  },
  {
    chip: "Corporate Training",
    title: "Corporate Training and Professional Development",
    description:
      "Tailored workshops that improve communication, team performance, and workplace effectiveness.",
    items: [
      "Business English and professional communication skills.",
      "Workplace optimization training: Time management, stress management, and networking, etc.",
      "Career progression training: CV writing, job interview preparation, and leadership communication, etc.",
      "Media interview strategies for CEOs and business executive and team management frameworks.",
    ] satisfies ServiceItem[],
    buttonLabel: "Explore Corporate Training",
    image: "/assets/corporate.webp",
    imageAlt: "Corporate training and professional development workshop",
  },
  {
    chip: "Policy & Advisory",
    title: "Government, Policy and NGO Advisory",
    description:
      "We provide advisory support for education policy, programme design, and system-level reforms.",
    items: [
      "Supply data-driven, empirical evidence to support policy formulation and practice.",
      "Comprehensive evaluation, review, and assessment of educational policies and programmes.",
      "Strategic advice on education reforms.",
      "Provide localized education data and advanced statistical analyses for national educational planning.",
    ] satisfies ServiceItem[],
    buttonLabel: "Explore Policy Advisory",
    image: "/assets/advisory.webp",
    imageAlt: "Government and NGO education policy advisory session",
  },
] as const;

const VIEWPORT_HEIGHT_PER_SERVICE = 180;
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
      className="group/button relative flex h-20 md:h-32 w-full items-center justify-center overflow-hidden bg-secondary font-heading text-base md:text-xl font-medium"
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

function ServiceItemContent({ item }: { item: ServiceItem }) {
  if (typeof item === "string") {
    return <span>{item}</span>;
  }

  return (
    <>
      <span className="font-medium text-foreground">{item.title}: </span>
      <span>{item.description}</span>
    </>
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
    if (window.matchMedia("(max-width: 1023px)").matches) {
      setActiveIndex(0);
      return;
    }

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
    <div id="services" aria-label="Our services">
      <section className="relative lg:hidden">
        <div className="mx-auto w-full max-w-[1920px] bg-background">
          {SERVICES.map((service, index) => (
            <article
              key={service.title}
              className="border-b border-border last:border-b-0"
            >
              <div className="flex flex-col gap-6 pt-8 md:pt-14 md:pb-14">

                <div className="flex flex-col gap-1 md:gap-5 px-4 md:px-0">
                  <div className="inline-flex w-fit items-center gap-2.5 border border-border px-2 md:px-4 py-1 md:py-2 mb-2 md:mb-0">
                    <span className="size-2 shrink-0 bg-primary" aria-hidden />
                    <span className="text-sm text-foreground">{service.chip}</span>
                  </div>
                  <h2 className="max-w-xl font-heading text-2xl text-balance tracking-tight text-foreground">
                    {service.title}
                  </h2>
                  <p className="max-w-lg text-sm md:text-base leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <ul className="max-w-lg space-y-2.5 text-sm leading-relaxed text-muted-foreground mt-4 md:mt-0">
                    {service.items.map((item) => (
                      <li
                        key={typeof item === "string" ? item : item.title}
                        className="flex gap-2.5"
                      >
                        <span
                          className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                          aria-hidden
                        />
                        <span>
                          <ServiceItemContent item={item} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="h-20 md:h-32 border-t border-border pt-0">
                  <ServiceButton label={service.buttonLabel} />
                </div>
              </div>

              <div className="relative h-100 overflow-hidden">
                <ServiceImage
                  service={service}
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />
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
                    className="px-4 lg:px-12"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    <div className="min-h-[320px] sm:min-h-[380px] lg:min-h-[420px]">
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
                              className="max-w-xl font-heading text-3xl text-balance tracking-tight text-foreground lg:text-4xl"
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
                            <motion.ul
                              initial={
                                shouldReduceMotion ? false : { opacity: 0, y: 20 }
                              }
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                ...contentTransition,
                                delay: shouldReduceMotion ? 0 : 0.22,
                              }}
                              className="max-w-lg space-y-2.5 text-sm leading-relaxed text-muted-foreground"
                            >
                              {activeService.items.map((item) => (
                                <li
                                  key={
                                    typeof item === "string" ? item : item.title
                                  }
                                  className="flex gap-2.5"
                                >
                                  <span
                                    className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                                    aria-hidden
                                  />
                                  <span>
                                    <ServiceItemContent item={item} />
                                  </span>
                                </li>
                              ))}
                            </motion.ul>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="relative mt-8 h-20 md:h-32 border-t border-border lg:mt-0">
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
    </div>
  );
};

export default Services;
