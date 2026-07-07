import Link from "next/link";

import { cn } from "@/lib/utils";

const MENU_LINKS = [
  { href: "/about", label: "About" },
  { href: "/academics", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
  { href: "/news-and-events", label: "News & Events" },
  { href: "/contact-us", label: "Contact Us" },
] as const;

const SOCIAL_LINKS = [
  { href: "https://www.facebook.com/", label: "Facebook" },
  { href: "https://linkedin.com/", label: "LinkedIn" },
  { href: "https://x.com/", label: "Twitter" },
] as const;

const DISCOVER_LINKS = [
  { href: "/services", label: "Our Services" },
  { href: "/about", label: "About DOTLES" },
  { href: "/contact-us", label: "Get in Touch" },
] as const;

const CONTACT_LINKS = [
  { href: "mailto:hello@dotles.com", label: "hello@dotles.com" },
  { href: "tel:+12864468866", label: "+1 (286) 446-8866" },
  { href: "tel:+12864468240", label: "+1 (286) 446-8240" },
] as const;

type FooterLinkProps = {
  href: string;
  label: string;
  external?: boolean;
};

function FooterLink({ href, label, external }: FooterLinkProps) {
  const linkProps = external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

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
  links: readonly { href: string; label: string; external?: boolean }[];
};

function FooterBlock({ title, links }: FooterBlockProps) {
  return (
    <div className="flex flex-col gap-4 bg-background p-8 sm:p-10 min-h-60">
      <p className="text-base text-muted-foreground font-serif font-medium">{title}</p>
      <div className="flex flex-col items-start gap-2">
        {links.map((link) => (
          <FooterLink key={link.href} {...link} />
        ))}
      </div>
    </div>
  );
}

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="mx-auto w-full max-w-[1920px]">
        <div className="bg-background">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col">
              <div className="grid flex-1 grid-cols-1 gap-px bg-border sm:grid-cols-2">
                <FooterBlock title="Menu" links={MENU_LINKS} />
                <FooterBlock title="Follow Us" links={SOCIAL_LINKS.map((l) => ({ ...l, external: true }))} />
                <FooterBlock title="Discover" links={DISCOVER_LINKS} />
                <FooterBlock title="Get In Touch" links={CONTACT_LINKS} />
              </div>

              <Link
                href="/contact-us"
                className="group/cta relative flex min-h-52 items-center justify-center overflow-hidden bg-secondary"
              >
                <span className="relative z-10 h-7 overflow-hidden font-heading text-xl font-medium text-secondary-foreground transition-colors duration-300 ease-out group-hover/cta:text-secondary">
                  <span className="flex flex-col transition-transform duration-300 ease-out group-hover/cta:-translate-y-1/2">
                    <span className="flex h-7 items-center justify-center">
                      Get a Quote
                    </span>
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

              <div className="flex min-h-16 items-center justify-center bg-[#1C1D5F] px-6 py-4">
                <p className="text-center font-heading text-sm text-secondary">
                  © {new Date().getFullYear()}, DOTLES Education
                </p>
              </div>
            </div>

            <Link
              href="/"
              className={cn(
                "group/logo flex min-h-64 flex-col items-center justify-center gap-3 bg-primary p-10",
                "lg:min-h-full"
              )}
            >
              <span className="relative h-32 overflow-hidden font-heading text-9xl font-regular text-primary">
                <span className="flex flex-col transition-transform duration-300 ease-out group-hover/logo:-translate-y-1/2">
                  <span className="flex h-28 items-center justify-center sm:h-36 text-primary-foreground">
                    DE
                  </span>
                  <span className="flex h-28 items-center justify-center text-primary-foreground sm:h-36">
                    DE
                  </span>
                </span>
              </span>
              <h3 className="font-heading text-lg font-medium text-primary-foreground sm:text-xl">
                DOTLES Education
              </h3>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
