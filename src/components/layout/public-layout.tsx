import { useEffect, useState, type ReactNode } from "react";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

const links = [
  { id: "experience", label: "Experience" },
  { id: "software", label: "Software" },
  { id: "simulation", label: "Simulation" },
  { id: "cad", label: "CAD" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

function goTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 16;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function PublicLayout({ children }: { children: ReactNode }) {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Watch each whole <section>, not just its heading, so the highlight tracks the visible block.
    const owner = new Map<Element, string>();
    links.forEach((l) => {
      const sec = document.getElementById(l.id)?.closest("section");
      if (sec) owner.set(sec, l.id);
    });
    const obs = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        const id = hit && owner.get(hit.target);
        if (id) setActive(id);
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    owner.forEach((_, sec) => obs.observe(sec));
    return () => obs.disconnect();
  }, []);

  const click = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    goTo(id);
  };

  const NavList = ({ className = "" }: { className?: string }) => (
    <ul className={className}>
      {links.map((l, i) => (
        <li key={l.id}>
          <a
            href={`#${l.id}`}
            onClick={click(l.id)}
            aria-current={active === l.id ? "true" : undefined}
            className={`flex min-h-[44px] items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors ${
              active === l.id ? "bg-ink text-white" : "text-muted hover:bg-bg hover:text-ink"
            }`}
          >
            <span className="font-mono text-xs opacity-70">{String(i + 1).padStart(2, "0")}</span>
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="min-h-[100dvh] bg-bg text-ink lg:pl-64">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>

      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col justify-between border-r border-line bg-surface p-6 lg:flex">
        <div>
          <a href="#top" onClick={click("top")} className="block text-xl font-extrabold tracking-tight">
            {personalInfo.name}
          </a>
          <p className="mt-1 text-sm text-muted">Mechanical Engineering, UIUC</p>
          <nav aria-label="Primary" className="mt-10">
            <NavList className="space-y-1" />
          </nav>
        </div>
        <div className="space-y-4">
          <a
            href={personalInfo.resumeUrl}
            className="flex min-h-[44px] items-center justify-center rounded-lg bg-accent text-sm font-semibold text-white hover:opacity-90"
          >
            Resume (PDF)
          </a>
          <div className="flex justify-between">
            <a className="flex h-11 w-11 items-center justify-center rounded-lg text-muted hover:bg-bg hover:text-ink" href={`mailto:${personalInfo.email}`} aria-label="Email">
              <Mail size={18} />
            </a>
            <a className="flex h-11 w-11 items-center justify-center rounded-lg text-muted hover:bg-bg hover:text-ink" href={personalInfo.linkedinUrl} aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a className="flex h-11 w-11 items-center justify-center rounded-lg text-muted hover:bg-bg hover:text-ink" href={personalInfo.githubUrl} aria-label="GitHub">
              <Github size={18} />
            </a>
          </div>
        </div>
      </aside>

      <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur lg:hidden">
        <div className="flex h-14 items-center justify-between px-5">
          <a href="#top" onClick={click("top")} className="font-extrabold tracking-tight">
            {personalInfo.name}
          </a>
          <button
            className="flex h-11 w-11 items-center justify-center"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {open && (
          <nav aria-label="Primary" className="border-t border-line bg-surface px-3 py-3">
            <NavList className="space-y-1" />
            <a href={personalInfo.resumeUrl} className="mt-3 flex min-h-[44px] items-center justify-center rounded-lg bg-accent text-sm font-semibold text-white">
              Resume (PDF)
            </a>
          </nav>
        )}
      </header>

      <main id="main">{children}</main>

      <footer className="border-t border-line px-6 py-8 text-sm text-muted md:px-10">
        <p>Rushil Patil, University of Illinois Urbana-Champaign</p>
      </footer>
    </div>
  );
}
