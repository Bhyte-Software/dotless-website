"use client";

import Link from "next/link";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

import { useScrollTo } from "@/hooks/use-scroll-to";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const mobilePanelVariants = {
  closed: { y: "-100%" },
  open: {
    y: 0,
    transition: { duration: 0.45, ease: EASE },
  },
};

const mobileLinkContainerVariants = {
  open: {
    transition: { staggerChildren: 0.045, delayChildren: 0.1 },
  },
};

const mobileLinkVariants = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: { duration: 0.25, ease: EASE },
  },
};

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
        "group/nav relative flex h-12 md:h-16 items-center justify-center overflow-hidden bg-background px-4 text-sm",
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
        "group/nav relative flex h-12 md:h-16 items-center justify-center overflow-hidden bg-background px-4 text-sm",
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

function HamburgerButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex md:h-16 h-12 md:w-16 w-12 bg-secondary shrink-0 items-center justify-center md:hidden"
      aria-expanded={isOpen}
      aria-controls="mobile-navigation"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <IconMenu2
        className={cn(
          "size-5 transition-all duration-300 ease-out",
          isOpen && "scale-75 opacity-0"
        )}
      />
      <IconX
        className={cn(
          "absolute size-5 transition-all duration-300 ease-out",
          isOpen ? "scale-100 opacity-100" : "scale-75 opacity-0"
        )}
      />
    </button>
  );
}

function MobileMenuLink({
  targetId,
  label,
  onClose,
  variant = "default",
  className,
}: {
  targetId: string;
  label: string;
  onClose: () => void;
  variant?: "default" | "primary" | "secondary";
  className?: string;
}) {
  const handleClick = useScrollTo(targetId);

  return (
    <motion.div variants={mobileLinkVariants} className={className}>
      <Link
        href={`#${targetId}`}
        onClick={(event) => {
          handleClick(event);
          onClose();
        }}
        className={cn(
          "flex h-12 items-center border-b border-border px-6 text-base text-center justify-center transition-colors",
          variant === "primary" && "bg-primary text-primary-foreground",
          variant === "secondary" && "bg-secondary text-secondary-foreground",
          variant === "default" && "text-foreground active:bg-black/5"
        )}
      >
        {label}
      </Link>
    </motion.div>
  );
}

function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          initial={shouldReduceMotion ? false : "closed"}
          animate="open"
          exit={shouldReduceMotion ? undefined : "closed"}
          variants={
            shouldReduceMotion
              ? undefined
              : {
                  ...mobilePanelVariants,
                  closed: {
                    ...mobilePanelVariants.closed,
                    transition: { duration: 0.35, ease: EASE },
                  },
                }
          }
          className="fixed inset-x-0 top-0 bottom-0 z-40 flex flex-col overflow-hidden bg-background will-change-transform md:hidden"
        >
          <motion.nav
            variants={shouldReduceMotion ? undefined : mobileLinkContainerVariants}
            className="flex flex-1 flex-col pt-20"
            aria-label="Mobile navigation links"
          >
            {NAV_LINKS.map((link) => (
              <MobileMenuLink
                key={link.id}
                targetId={link.id}
                label={link.label}
                onClose={onClose}
              />
            ))}
            <MobileMenuLink
              targetId="contact-us"
              label="Contact Us"
              onClose={onClose}
              variant="primary"
              className="mt-auto"
            />
          </motion.nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);
  const toggleMobileMenu = useCallback(
    () => setIsMobileMenuOpen((open) => !open),
    []
  );

  return (
    <header className="fixed top-0 z-50 w-full md:z-20">
      <div className="mx-auto w-full max-w-[1920px]">
        <nav
          aria-label="Main navigation"
          className="relative z-50 md:h-16 h-12 grid w-full grid-cols-1 lg:grid-cols-10"
        >
          <div className="col-span-4 flex w-full items-center justify-between">
            <AnimatedLink
              href="/"
              label="DOTLES"
              className="w-fit font-bold md:font-extrabold text-base md:text-lg border-r border-b"
              hoverBgClassName="bg-primary"
              hoverTextClassName="text-primary-foreground"
            />
            <HamburgerButton
              isOpen={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            />
          </div>


          <div className="col-span-6 hidden md:flex w-full border-b border-l">
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
        <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
      </div>
    </header>
  );
};

export default Navigation;
