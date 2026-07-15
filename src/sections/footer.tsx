"use client";

import Link from "next/link";

import { useScrollTo } from "@/hooks/use-scroll-to";
import { cn } from "@/lib/utils";

const MENU_LINKS = [
  { scrollTo: "benefits", label: "Benefits" },
  { scrollTo: "impact", label: "Impact" },
  { scrollTo: "contact-us", label: "Contact Us" },
] as const;

const SOCIAL_LINKS = [
  { href: "https://www.facebook.com/", label: "Facebook" },
  { href: "https://linkedin.com/", label: "LinkedIn" },
  { href: "https://x.com/", label: "Twitter" },
] as const;

const DISCOVER_LINKS = [
  { scrollTo: "services", label: "Services" },
  { scrollTo: "about-us", label: "About Us" },
] as const;

const CONTACT_LINKS = [
  {
    href: "https://maps.google.com/?q=173+East+Legon+Dam+Road,+East+Legon,+Accra,+Ghana",
    label: "173 East Legon Dam Road, East Legon, Accra, Ghana",
    external: true,
    multiline: true,
  },
  {
    href: "tel:+233208164325",
    label: "+233 20 816 4325",
  },
  {
    href: "tel:+233553465183",
    label: "+233 55 346 5183",
  },
  {
    href: "tel:+233503320100",
    label: "+233 50 332 0100",
  },
  {
    href: "mailto:contact@dotleseducation.com",
    label: "contact@dotleseducation.com",
  },

] as const;

type FooterLinkItem =
  | { href: string; label: string; external?: boolean; multiline?: boolean }
  | { scrollTo: string; label: string };

type FooterLinkProps = {
  href: string;
  label: string;
  external?: boolean;
  multiline?: boolean;
};

function FooterScrollLink({
  targetId,
  label,
}: {
  targetId: string;
  label: string;
}) {
  const handleClick = useScrollTo(targetId);

  return (
    <Link
      href={`#${targetId}`}
      onClick={handleClick}
      className="group/footer-link relative inline-flex overflow-hidden"
    >
      <span className="relative z-10 h-5 overflow-hidden text-foreground">
        <span className="flex flex-col transition-transform duration-300 ease-out group-hover/footer-link:-translate-y-1/2">
          <span className="flex h-5 items-center font-heading text-sm">
            {label}
          </span>
          <span className="flex h-5 items-center font-heading text-sm text-muted-foreground">
            {label}
          </span>
        </span>
      </span>
    </Link>
  );
}

function FooterLink({ href, label, external, multiline }: FooterLinkProps) {
  const linkProps = external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  if (multiline) {
    return (
      <Link
        href={href}
        className="block max-w-full text-balance font-heading text-sm leading-snug text-foreground transition-colors hover:text-muted-foreground"
        {...linkProps}
      >
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group/footer-link relative inline-flex overflow-hidden"
      {...linkProps}
    >
      <span className="relative z-10 h-5 overflow-hidden text-foreground">
        <span className="flex flex-col transition-transform duration-300 ease-out group-hover/footer-link:-translate-y-1/2">
          <span className="flex h-5 items-center font-heading text-sm">
            {label}
          </span>
          <span className="flex h-5 items-center font-heading text-sm text-muted-foreground">
            {label}
          </span>
        </span>
      </span>
    </Link>
  );
}

type FooterBlockProps = {
  title: string;
  links: readonly FooterLinkItem[];
  className?: string;
};

function FooterBlock({ title, links, className }: FooterBlockProps) {
  return (
    <div className={cn("flex flex-col gap-4 bg-background p-4 py-8 md:p-10 md:py-12 md:min-h-60", className)}>
      <p className="text-base text-muted-foreground font-serif font-medium">{title}</p>
      <div className="flex flex-col items-start gap-2">
        {links.map((link) =>
          "scrollTo" in link ? (
            <FooterScrollLink
              key={link.label}
              targetId={link.scrollTo}
              label={link.label}
            />
          ) : (
            <FooterLink key={link.href} {...link} />
          )
        )}
      </div>
    </div>
  );
}

function GetQuoteButton() {
  const handleClick = useScrollTo("contact-us");

  return (
    <Link
      href="#contact-us"
      onClick={handleClick}
      className="group/cta relative flex min-h-24 md:min-h-52 items-center justify-center overflow-hidden bg-secondary"
    >
      <span className="relative z-10 h-7 overflow-hidden font-heading text-xl font-medium text-secondary-foreground transition-colors duration-300 ease-out group-hover/cta:text-secondary">
        <span className="flex flex-col transition-transform duration-300 ease-out group-hover/cta:-translate-y-1/2">
          <span className="flex h-7 items-center justify-center">Get a Quote</span>
          <span className="flex h-7 items-center justify-center text-white">
            Get a Quote
          </span>
        </span>
      </span>
      <span
        aria-hidden
        className="absolute inset-0 translate-y-full bg-primary transition-transform duration-300 ease-out group-hover/cta:translate-y-0"
      />
    </Link>
  );
}

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="mx-auto w-full max-w-[1920px]">
        <div className="bg-background">
          <div className="flex flex-col">
            <GetQuoteButton />

            <div className="grid flex-1 grid-cols-2 gap-px bg-border md:grid-cols-2">
              <FooterBlock title="Menu" links={MENU_LINKS} />
              <FooterBlock title="Follow Us" links={SOCIAL_LINKS.map((l) => ({ ...l, external: true }))} />
              <FooterBlock title="Discover" links={DISCOVER_LINKS} className="col-span-2 md:col-span-1" />
              <FooterBlock title="Get In Touch" links={CONTACT_LINKS} className="col-span-2 md:col-span-1" />
            </div>

            <div className="flex min-h-16 items-center justify-center bg-[#1C1D5F] px-6 py-4">
              <p className="text-center font-heading text-sm text-secondary">
                © {new Date().getFullYear()}, DOTLES Education
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
