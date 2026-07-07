import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

const HERO_IMAGE = "/assets/hero.png";

const INFO_BLOCKS = [
    {
        title: "Expert Educational Guidance",
        description:
            "Academic and career guidance for students, parents, and professionals.",
    },
    {
        title: "Academic Excellence",
        description:
            "Personalized support tailored to each learner's goals and aspirations.",
    },
    {
        title: "Transformative School Support",
        description:
            "Programs that strengthen pedagogy, management, and student outcomes.",
    },
] as const;

function HeroButton({
    href,
    label,
    variant,
    className,
}: {
    href: string;
    label: string;
    variant: "primary" | "secondary";
    className?: string;
}) {
    const isPrimary = variant === "primary";

    return (
        <Link
            href={href}
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
                    <div className="flex min-h-[min(100vh,760px)] flex-col lg:col-span-4 lg:min-h-[760px] lg:h-screen">
                        <div className="relative min-h-0 flex-1 overflow-hidden">
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

                        <div className="flex h-32 flex-col justify-between border-b bg-background px-8 py-4 border-l-8 border-l-primary">
                            <p className="text-left text-base text-muted-foreground text-balance">
                                &ldquo;Guiding students towards their academic and career
                                success with clarity, care, and expertise you can trust.&rdquo;
                            </p>
                            <div className="flex flex-col gap-4">
                                <p className="font-heading text-base font-medium text-foreground">
                                    DOTLES Advisory Team
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex min-h-[min(100vh,760px)] flex-col lg:col-span-6 lg:min-h-[760px] lg:h-screen">
                        <div className="flex flex-1 flex-col">
                            <div className="flex flex-1 flex-col justify-between gap-10 px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-16">
                                <div className="flex max-w-3xl flex-col gap-4 pt-10">
                                    <h1
                                        id="hero-heading"
                                        className="font-heading text-4xl font-regular tracking-tight text-foreground sm:text-5xl lg:text-6xl"
                                    >
                                        Turn Educational Ambition Into{" "}
                                        <span className="text-primary">Lasting Achievement</span>
                                    </h1>
                                    <p className="max-w-xl text-base text-muted-foreground">
                                        From university pathways to whole-school improvement, DOTLES
                                        brings over 35 years of practice-tested insight to students,
                                        families, and institutions ready to move forward with
                                        confidence.
                                    </p>
                                </div>

                                <div className="grid gap-6 sm:grid-cols-3">
                                    {INFO_BLOCKS.map((block) => (
                                        <div
                                            key={block.title}
                                            className="flex h-full flex-col gap-1 border-l border-primary pl-5"
                                        >
                                            <p className="text-sm font-medium text-foreground sm:text-base">
                                                {block.title}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {block.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 border-t border-border sm:grid-cols-2 h-32">
                            <HeroButton href="/contact" label="Get a Quote" variant="primary" className="h-32 font-serif font-medium text-xl" />
                            <HeroButton href="/services" label="Learn More" variant="secondary" className="h-32 font-serif font-medium text-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
