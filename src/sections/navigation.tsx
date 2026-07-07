"use client";

import Link from "next/link";

import { useScrollTo } from "@/hooks/use-scroll-to";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { id: "about-us", label: "About Us" },
  { id: "services", label: "Services" },
  { id: "benefits", label: "Benefits" },
  { id: "impact", label: "Impact" },
] as const;

function AnimatedScrollLink({
  targetId,
  label,
  className,
  textClassName,
  hoverBgClassName,
  hoverTextClassName,
}: {
  targetId: string;
  label: string;
  className?: string;
  textClassName?: string;
  hoverBgClassName: string;
  hoverTextClassName?: string;
}) {
  const handleClick = useScrollTo(targetId);

  return (
    <Link
      href={`#${targetId}`}
      onClick={handleClick}
      className={cn(
        "group/nav relative flex h-16 items-center justify-center overflow-hidden bg-background px-4 text-sm",
        className
      )}
    >
      <span
        className={cn(
          "relative z-10 h-5 overflow-hidden text-foreground",
          textClassName
        )}
      >
        <span className="flex flex-col transition-transform duration-300 ease-out group-hover/nav:-translate-y-1/2">
          <span className="flex h-5 items-center justify-center whitespace-nowrap">
            {label}
          </span>
          <span
            className={cn(
              "flex h-5 items-center justify-center whitespace-nowrap",
              hoverTextClassName
            )}
          >
            {label}
          </span>
        </span>
      </span>
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover/nav:translate-y-0",
          hoverBgClassName
        )}
      />
    </Link>
  );
}

function AnimatedLink({
  href,
  label,
  className,
  textClassName,
  hoverBgClassName,
  hoverTextClassName,
}: {
  href: string;
  label: string;
  className?: string;
  textClassName?: string;
  hoverBgClassName: string;
  hoverTextClassName?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group/nav relative flex h-16 items-center justify-center overflow-hidden bg-background px-4 text-sm",
        className
      )}
    >
      <span
        className={cn(
          "relative z-10 h-5 overflow-hidden text-foreground",
          textClassName
        )}
      >
        <span className="flex flex-col transition-transform duration-300 ease-out group-hover/nav:-translate-y-1/2">
          <span className="flex h-5 items-center justify-center whitespace-nowrap">
            {label}
          </span>
          <span
            className={cn(
              "flex h-5 items-center justify-center whitespace-nowrap",
              hoverTextClassName
            )}
          >
            {label}
          </span>
        </span>
      </span>
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover/nav:translate-y-0",
          hoverBgClassName
        )}
      />
    </Link>
  );
}

const Navigation = () => {
  return (
    <header className="w-full absolute top-0 z-20">
      <div className="mx-auto w-full max-w-[1920px]">
        <nav
          aria-label="Main navigation"
          className="h-16 grid w-full grid-cols-1 lg:grid-cols-10"
        >
          <div className="col-span-4">
            <AnimatedLink
              href="/"
              label="DOTLESS"
              className="w-fit font-extrabold text-lg "
              hoverBgClassName="bg-primary"
              hoverTextClassName="text-primary-foreground"
            />
          </div>


          <div className="col-span-6 flex w-full border-b">
            {NAV_LINKS.map((link) => (
              <AnimatedScrollLink
                key={link.id}
                targetId={link.id}
                label={link.label}
                className="min-w-0 flex-1 border-r border-border"
                hoverBgClassName="bg-black/5"
              />
            ))}

            <AnimatedScrollLink
              targetId="contact-us"
              label="Contact Us"
              className="min-w-0 flex-1 bg-secondary"
              textClassName="text-secondary-foreground"
              hoverBgClassName="bg-primary"
              hoverTextClassName="text-primary-foreground"
            />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
