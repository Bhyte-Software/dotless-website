"use client";

import Image from "next/image";
import Link from "next/link";

import { useScrollTo } from "@/hooks/use-scroll-to";
import { cn } from "@/lib/utils";

const DELIVERY = [
  "Supply",
  "Installation",
  "Training",
  "Technical Support",
  "Consultancy",
  "After-Sales Service",
] as const;

const MARKING_BENEFITS = [
  {
    title: "Faster marking",
    description: "Process thousands of answer sheets in far less time.",
  },
  {
    title: "Higher accuracy",
    description: "Cuts human error in marking and data entry.",
  },
  {
    title: "Lower cost",
    description: "Saves labour, time, and administrative overhead.",
  },
  {
    title: "Real-time results",
    description: "Faster scoring, reporting, and decision-making.",
  },
  {
    title: "Stronger integrity",
    description: "Standardized, transparent assessment processes.",
  },
  {
    title: "Better analytics",
    description: "Reliable data for student performance analysis.",
  },
  {
    title: "Built to scale",
    description: "Fits universities and bodies with large cohorts.",
  },
  {
    title: "Digital transformation",
    description: "Moves exam management onto a technology-driven workflow.",
  },
] as const;

const DARA_USES = [
  "Examinations & Assessments",
  "Surveys & Research",
  "Tests & Questionnaires",
  "Voting & Ballot Processing",
  "Data & Image Capture",
  "Reports & Data Management",
] as const;

const PRODUCTS = [
  {
    chip: "Hardware",
    title: "DARA Lectodara 5,000",
    description:
      "High-speed data-capture scanner for exams, surveys, and forms — up to 5,000 A4 sheets an hour, or 6,000 on smaller documents. The LD hybrid 5000i captures black-and-white or colour images up to 600 dpi.",
    items: [
      "Horizontal and vertical barcode capture with real-time validation for tests, surveys, and forms",
      "Single- or double-sided reading, with simultaneous image capture into an indexed document database",
      "Two-tray sorter for pass/fail or valid/invalid, plus LCD screen, document counter, and Evaldara software",
    ],
    tone: "warm",
    image: "/assets/dara-scanner.png",
    imageAlt: "DARA Lectodara high-speed document scanner",
  },
  {
    chip: "Hardware",
    title: "DARA Lectodara 11,000",
    description:
      "The higher-volume Lectodara for universities and exam bodies that need to process large sittings without slowing down.",
    items: [
      "Up to 11,000 documents per hour, single- or double-sided, up to A4",
      "Simultaneous barcode capture, validation, and image indexing",
      "Internal inkjet printer for date, time, operator, document number, or examination results on each sheet",
      "Two-tray sorter, LCD screen, document counter, and Evaldara software included",
    ],
    tone: "muted",
    image: "/assets/dara-scanner.png",
    imageAlt: "DARA Lectodara high-speed document scanner",
  },
  {
    chip: "OMR Software",
    title: "Verificare OMR",
    description:
      "Design, print, scan, and analyze bubble sheets on the scanners you already have — no dedicated OMR machine required.",
    items: [
      "Works with flatbed, ADF, MFP, and high-speed document scanners",
      "AI-assisted accuracy, wrong-answer-key detection, and anti-cheating",
      "Exams, admissions, registration, attendance, surveys, feedback, and ballots",
      "Automatic form recognition, error correction, barcode and OCR, duplicate detection, and secure validation",
    ],
    tone: "muted",
    image: "/assets/verificare-form.png",
    imageAlt: "Verificare OMR form on a tablet with ICR and OMR capture",
  },
  {
    chip: "OMR Software",
    title: "Addmen OMR Software",
    description:
      "A flexible marking suite for institutions that need OMR, OCR, ICR, barcode, and QR recognition on standard office scanners.",
    items: [
      "Automated marking and reporting for exams, recruitment, and surveys",
      "Customizable answer sheets and forms",
      "Fast, accurate processing without a dedicated OMR scanner",
      "Suited to universities, schools, and large-scale assessments",
    ],
    tone: "warm",
    image: "/assets/omr-sheet.png",
    imageAlt: "Hand marking an OMR answer sheet",
  },
  {
    chip: "Online Exams",
    title: "Addmen CBT Platform",
    description:
      "A secure computer-based testing system for entrance exams, recruitment tests, and institutional assessments.",
    items: [
      "MCQ, descriptive, subjective, adaptive, and hybrid exam formats",
      "Cloud, web, or secure LAN deployment with candidate authentication, browser lockdown, encryption, and monitoring",
      "Instant scoring, rankings, analytics, and multi-site scale",
    ],
    tone: "warm",
  },
  {
    chip: "Paper Setting",
    title: "Addmen Question Paper Generator",
    description:
      "Automated, syllabus-based paper setting from a structured digital question bank.",
    items: [
      "Organize items by subject, topic, difficulty, marks, and learning outcomes",
      "MCQs, descriptive, numerical, case studies, and randomized sets to reduce malpractice",
      "Consistent quality and confidentiality with less manual paper-setting work",
    ],
    tone: "muted",
  },
] as const;

function QuoteButton() {
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
            Request a Product Quote
          </span>
          <span className="flex h-5 items-center justify-center">
            Request a Product Quote
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

const Products = () => {
  return (
    <section
      id="products"
      aria-label="Products we supply"
      className="relative w-full overflow-hidden bg-primary py-5 lg:py-40"
    >
      <div className="mx-auto w-full max-w-[1920px] px-4 md:px-0">
        <div className="mx-auto max-w-7xl bg-background">
          <div className="flex flex-col items-center gap-6 border-b border-border px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
            <div className="inline-flex items-center gap-2.5 border border-border px-2 md:px-4 py-1 md:py-2">
              <span className="size-2 shrink-0 bg-primary" aria-hidden />
              <span className="text-sm text-foreground">What We Supply</span>
            </div>
            <h2 className="max-w-2xl text-center font-heading text-2xl tracking-tight text-foreground md:text-4xl text-balance">
              Exam Marking Hardware and Software We Sell
            </h2>
            <p className="max-w-2xl text-center text-sm leading-relaxed text-muted-foreground md:text-base">
              DOTLES is the official distributor of DARA scanning and
              data-capture solutions in Africa. We also supply Verificare and
              Addmen software for OMR marking, computer-based testing, and
              automated question-paper generation.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {DELIVERY.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center border border-border px-3 py-1.5 text-sm text-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="border-b border-border px-6 py-10 sm:px-10 lg:px-16">
            <div className="mb-8 flex flex-col items-center gap-2">
              <h3 className="text-center font-heading text-xl tracking-tight text-foreground md:text-2xl">
                Why Digitize Exam Marking
              </h3>
              <p className="max-w-xl text-center text-sm leading-relaxed text-muted-foreground md:text-base">
                OMR turns examination marking into a faster, more accurate,
                transparent, and data-driven process.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {MARKING_BENEFITS.map((benefit) => (
                <div
                  key={benefit.title}
                  className="flex flex-col gap-1 border-l border-primary pl-4"
                >
                  <p className="font-heading text-sm font-medium text-foreground md:text-base">
                    {benefit.title}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 border-b border-border px-6 py-8 sm:px-10">
            <p className="text-center text-sm text-muted-foreground">
              DARA solutions are used for
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {DARA_USES.map((use) => (
                <span
                  key={use}
                  className="inline-flex items-center border border-border px-3 py-1.5 text-sm text-foreground"
                >
                  {use}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {PRODUCTS.map((product) => (
              <article
                key={product.title}
                className={cn(
                  "flex flex-col gap-5 border-b border-border px-6 py-8 last:border-b-0 md:px-10 md:py-12 lg:odd:border-r",
                  product.tone === "warm" ? "bg-black/3" : "bg-background"
                )}
              >
                <div className="inline-flex w-fit items-center gap-2.5 border border-border px-3 py-1.5">
                  <span className="size-2 shrink-0 bg-primary" aria-hidden />
                  <span className="text-sm text-foreground">{product.chip}</span>
                </div>
                {"image" in product && product.image ? (
                  <div className="relative h-40 w-full overflow-hidden border border-border bg-background">
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-contain object-center p-4"
                    />
                  </div>
                ) : null}
                <div className="flex flex-col gap-3">
                  <h3 className="font-heading text-xl tracking-tight text-foreground md:text-2xl">
                    {product.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                    {product.description}
                  </p>
                  <ul className="space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                    {product.items.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <span
                          className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                          aria-hidden
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <QuoteButton />
        </div>
      </div>
    </section>
  );
};

export default Products;
