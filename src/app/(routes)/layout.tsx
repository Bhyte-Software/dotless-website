import { cn } from "@/lib/utils";
import Footer from "@/sections/footer";
import Navigation from "@/sections/navigation";
import type { Metadata } from "next";
import { Roboto, Roboto_Serif } from "next/font/google";
import "../globals.css";
import { LenisProvider } from "@/components/ui/lenis-provider";

const roboto = Roboto({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const robotoSerif = Roboto_Serif({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dotles Education - Practical support for better educational outcomes",
  description:
    "From student counselling to institutional advisory services, Dotles Education delivers focused, evidence-based support across Ghana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("antialiased", roboto.variable, robotoSerif.variable, "font-sans")}
    >
      <body className="flex flex-col">
        <LenisProvider>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
