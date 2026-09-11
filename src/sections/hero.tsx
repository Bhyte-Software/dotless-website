"use client";

import Image from "next/image";
import Link from "next/link";

import { useScrollTo } from "@/hooks/use-scroll-to";
import { cn } from "@/lib/utils";

const HERO_IMAGE = "/assets/hero.webp";

const INFO_BLOCKS = [
    {
        title: "Advisory Support",
        description:
            "Clear educational guidance for students, families, and institutions.",
    },
    {
        title: "Digital Assessment",
        description:
            "DARA scanners and Verificare/Addmen OMR and CBT software that make exam marking faster, more accurate, and easier to scale.",
    },
    {
        title: "Whole-School Improvement",
        description:
            "Support for leadership, teaching quality, and measurable student outcomes.",
    },
] as const;

function HeroButton({
    label,
    variant,
    className,
}: {
    label: string;
    variant: "primary" | "secondary";
    className?: string;
}) {
    const isPrimary = variant === "primary";
    const handleClick = useScrollTo("contact-us");

    return (
        <Link
            href="#contact-us"
            onClick={handleClick}
            className={cn(
                "group/button relative flex min-h-16 flex-1 items-center justify-center overflow-hidden text-sm font-medium",
                isPrimary ? "bg-primary" : "bg-secondary",
                className
            )}
        >
            <span
                className={cn(
                    "relative z-10 h-6 overflow-hidden transition-colors duration-300 ease-out",
                    isPrimary
                        ? "text-primary-foreground"
                        : "text-secondary-foreground group-hover/button:text-primary-foreground"
                )}
            >
                <span className="flex flex-col transition-transform duration-300 ease-out group-hover/button:-translate-y-1/2">
                    <span className="flex h-6 items-center justify-center">{label}</span>
                    <span className="flex h-6 items-center justify-center">{label}</span>
                </span>
            </span>
            <span
                aria-hidden
                className={cn(
                    "absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover/button:translate-y-0",
                    isPrimary ? "bg-secondary" : "bg-primary"
                )}
            />
        </Link>
    );
}

const Hero = () => {
    return (
        <section className="relative w-full overflow-hidden">
            <div className="mx-auto w-full max-w-[1920px]">
                <div className="grid w-full grid-cols-1 lg:grid-cols-10">
                    <div className="relative order-2 h-[68svh] overflow-hidden md:min-h-[min(100vh,760px)] lg:order-1 lg:col-span-4 lg:min-h-[760px] lg:h-screen">
                        <Image
                            src={HERO_IMAGE}
                            alt="Students receiving expert educational guidance and mentorship"
                            fill
                            priority
                            quality={100}
                            sizes="(max-width: 1024px) 100vw, 40vw"
                            className="object-cover object-center"
                        />
                    </div>

                    <div className="order-1 flex flex-col md:min-h-[min(100vh,760px)] lg:order-2 lg:col-span-6 lg:min-h-[760px] lg:h-screen">
                        <div className="flex flex-1 flex-col">
                            <div className="flex flex-1 flex-col justify-between gap-10 px-4 py-10 md:px-10 md:py-12 lg:px-12 lg:py-16">
                                <div className="flex max-w-3xl flex-col gap-1.5 md:gap-4 pt-10">
                                    <h1
                                        id="hero-heading"
                                        className="font-heading text-3xl font-regular tracking-tight text-foreground md:text-5xl lg:text-6xl mt-12 md:mt-0"
                                    >
                                        Practical Educational Support for{" "}
                                        <span className="text-primary">Better Outcomes</span>
                                    </h1>
                                    <p className="max-w-xl text-sm md:text-base text-muted-foreground text-balance md:text-wrap">
                                        From student counselling and school leadership to DARA
                                        scanners and OMR/CBT software, DOTLES delivers
                                        evidence-based support that helps institutions and
                                        learners improve results.
                                    </p>
                                </div>

                                <div className="grid gap-4 md:gap-6 md:grid-cols-3">
                                    {INFO_BLOCKS.map((block) => (
                                        <div
                                            key={block.title}
                                            className="flex h-full flex-col gap-1 border-l border-primary pl-5"
                                        >
                                            <p className="text-sm font-medium text-foreground md:text-base font-heading">
                                                {block.title}
                                            </p>
                                            <p className="text-sm text-muted-foreground text-balance md:text-wrap">
                                                {block.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 border-t border-border md:grid-cols-2 md:h-32">
                            <HeroButton label="Get a Quote" variant="primary" className="h-16 md:h-32 font-serif font-medium text-base md:text-xl" />
                            <HeroButton label="Learn More" variant="secondary" className="h-16 md:h-32 font-serif font-medium text-base md:text-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
