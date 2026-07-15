"use client";

import Image from "next/image";
import Link from "next/link";

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

function ServiceDesktopContent({
  service,
}: {
  service: (typeof SERVICES)[number];
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="inline-flex w-fit items-center gap-2.5 border border-border px-4 py-2">
        <span className="size-2 shrink-0 bg-primary" aria-hidden />
        <span className="text-sm text-foreground">{service.chip}</span>
      </div>

      <div className="flex flex-col gap-5">
        <h2 className="max-w-xl font-heading text-3xl text-balance tracking-tight text-foreground lg:text-4xl">
          {service.title}
        </h2>
        <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
          {service.description}
        </p>
        <ul className="max-w-lg space-y-2.5 text-sm leading-relaxed text-muted-foreground">
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
    </div>
  );
}

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

      <section className="relative hidden lg:block">
        <div className="mx-auto w-full max-w-[1920px] bg-background">
          {SERVICES.map((service, index) => (
            <article
              key={service.title}
              className="grid grid-cols-[1fr_1.5fr] border-b border-border"
            >
              <div className="min-h-[calc(100vh-65px)] px-12 pt-16 pb-48">
                <ServiceDesktopContent service={service} />
              </div>

              <div className="relative">
                <div className="sticky top-[65px] relative h-[calc(100vh-65px)]">
                  <ServiceImage
                    service={service}
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;
