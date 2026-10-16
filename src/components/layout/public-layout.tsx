import { useEffect, useState, type ReactNode } from "react";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

const links = [
  { label: "CAD", href: "#cad" },
  { label: "Experience", href: "#experience" },
  { label: "Software", href: "#software" },
  { label: "Simulation", href: "#simulation" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function goTo(href: string) {
  const el = href === "#top" ? document.body : document.querySelector(href);
  if (!el) return;
  const top = href === "#top" ? 0 : el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function PublicLayout({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const click = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    goTo(href);
  };

  return (
    <div className="min-h-[100dvh] bg-bg text-fg">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-fg focus:px-4 focus:py-2 focus:text-bg">
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-line backdrop-blur transition-[background-color] ${
          scrolled ? "bg-bg/90" : "bg-bg/40"
        }`}
      >
        <nav className="container mx-auto flex h-16 items-center justify-between px-6" aria-label="Primary">
          <a href="#top" onClick={click("#top")} className="font-display text-2xl">
            {personalInfo.name}
          </a>
          <ul className="hidden items-center gap-8 text-sm text-muted md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={click(l.href)} className="hover:text-fg">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href={personalInfo.resumeUrl} className="bg-fg px-4 py-2 text-bg hover:opacity-90">
                Resume
              </a>
            </li>
          </ul>
          <button
            className="flex h-11 w-11 items-center justify-center md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
        {open && (
          <ul className="border-t border-line bg-bg px-6 py-4 md:hidden">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={click(l.href)} className="block py-3 text-muted">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href={personalInfo.resumeUrl} className="block py-3 text-fg">
                Resume
              </a>
            </li>
          </ul>
        )}
      </header>
      <main id="main">{children}</main>
      <footer className="border-t border-line">
        <div className="container mx-auto flex items-center justify-between px-6 py-8 text-sm text-muted">
          <p>Rushil Patil, University of Illinois Urbana-Champaign</p>
          <div className="flex gap-1">
            <a className="flex h-11 w-11 items-center justify-center hover:text-fg" href={`mailto:${personalInfo.email}`} aria-label="Email">
              <Mail size={18} />
            </a>
            <a className="flex h-11 w-11 items-center justify-center hover:text-fg" href={personalInfo.linkedinUrl} aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a className="flex h-11 w-11 items-center justify-center hover:text-fg" href={personalInfo.githubUrl} aria-label="GitHub">
              <Github size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
