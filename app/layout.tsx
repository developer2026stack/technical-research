import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: {
    default: "Bright Ocean Trading — Platform Documentation",
    template: "%s · Bright Ocean Trading Docs",
  },
  description:
    "Technical documentation for the 12-portal Sourcing-to-Market trade and logistics platform: how goods travel from China and the UAE to Jeddah, and on to buyers around the world.",
};

/* Set the theme before first paint so the page never flashes the wrong colours. */
const themeScript = `(function(){try{var t=localStorage.getItem('bot-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
