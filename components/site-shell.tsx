"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/nav";
import { ThemeToggle } from "./theme-toggle";

function Wordmark() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-ocean text-white shadow-sm">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 17c1.6 1.2 3.1 1.2 4.7 0 1.6-1.2 3.1-1.2 4.7 0 1.6 1.2 3.1 1.2 4.7 0 1.6-1.2 3.1-1.2 4.7 0" />
          <path d="M4 13.5 12 10l8 3.5" />
          <path d="M12 10V4M8.5 6.5 12 4l3.5 2.5" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block text-[13px] font-semibold tracking-tight text-text">
          Bright Ocean Trading
        </span>
        <span className="block text-[11px] text-text-dim">Platform Documentation</span>
      </span>
    </Link>
  );
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="space-y-6">
      {nav.map((group) => (
        <div key={group.label}>
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-dim">
            {group.label}
          </p>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "group relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13.5px] transition",
                      active
                        ? "bg-ocean-soft font-semibold text-ocean"
                        : "text-text-soft hover:bg-surface-2 hover:text-text",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "h-1.5 w-1.5 shrink-0 rounded-full transition",
                        active ? "bg-ocean" : "bg-line group-hover:bg-text-dim",
                      ].join(" ")}
                    />
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="min-h-screen">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-line bg-bg/85 px-4 py-3 backdrop-blur lg:hidden">
        <Wordmark />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Open navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface text-text-soft"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="scroll-thin absolute inset-y-0 left-0 w-[80%] max-w-xs overflow-y-auto border-r border-line bg-bg px-3 pb-10 pt-20">
            <NavList onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="scroll-thin fixed inset-y-0 left-0 z-30 hidden w-72 flex-col overflow-y-auto border-r border-line bg-bg-soft px-4 py-6 lg:flex">
        <div className="mb-8 flex items-center justify-between gap-2 px-1">
          <Wordmark />
          <ThemeToggle />
        </div>
        <NavList />
        <div className="mt-auto pt-8">
          <div className="rounded-xl border border-line bg-surface p-3.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-dim">
              Document
            </p>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-text-soft">
              Technical Research — Sourcing-to-Market Trade &amp; Logistics Platform.
            </p>
            <p className="mt-2 text-[11.5px] text-text-dim">v1.0 · 12 portals</p>
          </div>
        </div>
      </aside>

      <main className="lg:pl-72">{children}</main>
    </div>
  );
}
