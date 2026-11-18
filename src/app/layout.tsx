import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import "@fontsource-variable/jost";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-cream"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        {/* DUMMY: floating help button. Point it at WhatsApp / live chat. */}
        <Link
          href="/pages/contact"
          aria-label="Chat with us"
          className="fixed bottom-5 right-5 z-30 grid h-12 w-12 place-items-center rounded-full bg-ink text-cream shadow-lg ring-1 ring-cream/40 transition-transform hover:scale-105"
        >
          <MessageCircle size={22} strokeWidth={1.6} />
        </Link>
      </body>
    </html>
  );
}
