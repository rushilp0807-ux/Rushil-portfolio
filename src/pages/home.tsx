import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Github, Linkedin, Lock, Mail } from "lucide-react";
import ScrollFade from "@/components/ui/scroll-fade";
import ModelViewerWrapper from "@/components/ui/model-viewer-wrapper";
import { cadProjects, experience, personalInfo, softwareProjects } from "@/data/portfolio";

function Chip({ children, dark = true }: { children: string; dark?: boolean }) {
  return (
    <span
      className={`px-2.5 py-1 text-xs ${
        dark ? "border border-line text-muted" : "border border-lline text-lmuted"
      }`}
    >
      {children}
    </span>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  const fade = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: 0.15 * i, ease: "easeOut" as const },
  });
  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-bg px-6 text-center"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, #232820 0%, #1a1e16 70%)" }}
      />
      <div className="relative z-10 flex max-w-3xl flex-col items-center gap-6">
        <motion.p {...fade(0)} className="text-sm text-muted">
          {personalInfo.tagline}
        </motion.p>
        <motion.h1 {...fade(1)} className="leading-none" style={{ fontSize: "clamp(4rem, 11vw, 8rem)" }}>
          {personalInfo.name}
        </motion.h1>
        <motion.ul {...fade(2)} className="flex flex-wrap justify-center gap-x-10 gap-y-2 text-sm text-muted">
          {personalInfo.affiliations.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </motion.ul>
        <motion.div {...fade(3)} className="mt-4 flex flex-wrap justify-center gap-4">
          <a
            href="#software"
            className="bg-fg px-6 py-3 text-sm text-bg hover:opacity-90"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#software")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            View Projects
          </a>
          <a href={personalInfo.resumeUrl} className="border border-fg/40 px-6 py-3 text-sm hover:border-fg">
            Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="bg-lbg py-28 text-lfg md:py-32">
      <div className="container mx-auto px-6">
        <ScrollFade>
          <h2 className="mb-14 text-4xl md:text-5xl">Experience</h2>
        </ScrollFade>
        <div className="grid gap-px border border-lline bg-lline md:grid-cols-3">
          {experience.map((e, i) => (
            <ScrollFade key={e.id} delay={i * 0.08} className="bg-lcard p-8">
              <p className="text-sm text-lmuted">{e.organization}</p>
              <p className="text-sm text-lmuted">{e.dateRange}</p>
              <h3 className="mt-6 text-3xl">{e.title}</h3>
              <p className="mt-4 max-w-prose text-sm leading-relaxed text-lmuted">{e.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {e.tags.map((t) => (
                  <Chip key={t} dark={false}>
                    {t}
                  </Chip>
                ))}
              </div>
            </ScrollFade>
          ))}
        </div>
      </div>
    </section>
  );
}

function Software() {
  const [lead, ...rest] = softwareProjects;
  return (
    <section id="software" className="bg-bg py-28 md:py-32">
      <div className="container mx-auto px-6">
        <ScrollFade>
          <h2 className="mb-14 text-4xl md:text-5xl">Software and Automation</h2>
        </ScrollFade>
        <div className="grid gap-4 lg:grid-cols-12">
          <ScrollFade className="border border-line bg-card p-8 md:p-10 lg:col-span-7">
            <p className="text-sm text-muted">{lead.kind}</p>
            <h3 className="mt-4 text-4xl md:text-5xl">{lead.title}</h3>
            <p className="mt-5 max-w-prose text-sm leading-relaxed text-muted md:text-base">{lead.description}</p>
            {lead.steps && (
              <ol className="mt-8 flex flex-wrap items-center gap-3 text-sm">
                {lead.steps.map((s, i) => (
                  <li key={s} className="flex items-center gap-3">
                    <span>{s}</span>
                    {i < lead.steps!.length - 1 && <ArrowRight size={14} className="text-accent" aria-hidden />}
                  </li>
                ))}
              </ol>
            )}
            <div className="mt-8 flex flex-wrap gap-2">
              {lead.tags.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
            <p className="mt-8 flex items-center gap-2 text-xs text-muted">
              <Lock size={12} aria-hidden /> Built for an employer, not public
            </p>
          </ScrollFade>
          <div className="flex flex-col gap-4 lg:col-span-5">
            {rest.map((p, i) => (
              <ScrollFade key={p.id} delay={i * 0.08} className="bg-lbg p-7 text-lfg">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm text-lmuted">{p.kind}</p>
                  {p.githubUrl && (
                    <a href={p.githubUrl} aria-label={`${p.title} on GitHub`} className="flex h-11 w-11 items-center justify-center">
                      <ArrowUpRight size={18} />
                    </a>
                  )}
                </div>
                <h3 className="mt-2 text-3xl">{p.title}</h3>
                <p className="mt-3 max-w-prose text-sm leading-relaxed text-lmuted">{p.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Chip key={t} dark={false}>
                      {t}
                    </Chip>
                  ))}
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Cad() {
  return (
    <section id="cad" className="bg-lbg py-28 text-lfg md:py-32">
      <div className="container mx-auto px-6">
        <ScrollFade>
          <h2 className="mb-14 text-4xl md:text-5xl">CAD and 3D Printing</h2>
        </ScrollFade>
        <div className="flex flex-col gap-4">
          {cadProjects.map((p, i) => (
            <ScrollFade key={p.id} className="grid border border-lline bg-lcard md:grid-cols-2">
              <ModelViewerWrapper
                src={p.glbFileUrl}
                alt={`3D model of ${p.title}`}
                className={`h-[340px] md:h-[420px] ${i % 2 ? "md:order-2" : ""}`}
              />
              <div className="flex flex-col justify-center p-8 md:p-12">
                <p className="text-sm text-lmuted">{p.organization}</p>
                <p className="text-sm text-lmuted">{p.dateRange}</p>
                <h3 className="mt-6 text-3xl md:text-4xl">{p.title}</h3>
                <p className="mt-4 max-w-prose text-sm leading-relaxed text-lmuted md:text-base">{p.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Chip key={t} dark={false}>
                      {t}
                    </Chip>
                  ))}
                </div>
              </div>
            </ScrollFade>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const { skills, education } = personalInfo;
  const groups: [string, string[]][] = [
    ["CAD and Simulation", skills.cadSimulation],
    ["Software", skills.software],
    ["Business", skills.business],
  ];
  return (
    <section id="about" className="bg-bg py-28 md:py-32">
      <div className="container mx-auto grid gap-14 px-6 lg:grid-cols-12">
        <ScrollFade className="lg:col-span-7">
          <h2 className="text-4xl md:text-5xl">About</h2>
          <p className="mt-8 max-w-prose text-base leading-relaxed text-muted">{personalInfo.bio}</p>
          <dl className="mt-10 space-y-6 text-sm">
            <div>
              <dt className="text-muted">Education</dt>
              <dd className="mt-1">{education.school}</dd>
              <dd className="text-muted">
                {education.degree}, {education.expected}, GPA {education.gpa}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Current focus</dt>
              <dd className="mt-1">{personalInfo.currentFocus}</dd>
            </div>
            <div>
              <dt className="text-muted">Organizations</dt>
              <dd className="mt-1">{personalInfo.organizations.join(", ")}</dd>
            </div>
          </dl>
          <a href={personalInfo.resumeUrl} className="mt-10 inline-block bg-fg px-6 py-3 text-sm text-bg hover:opacity-90">
            Download Resume
          </a>
        </ScrollFade>
        <ScrollFade delay={0.1} className="space-y-8 lg:col-span-5">
          {groups.map(([label, items]) => (
            <div key={label}>
              <h3 className="mb-3 text-2xl">{label}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </div>
          ))}
        </ScrollFade>
      </div>
    </section>
  );
}

function Contact() {
  const rows = [
    { icon: Mail, label: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: Linkedin, label: "LinkedIn", href: personalInfo.linkedinUrl },
    { icon: Github, label: "GitHub", href: personalInfo.githubUrl },
  ];
  return (
    <section id="contact" className="bg-lbg py-28 text-lfg md:py-32">
      <div className="container mx-auto px-6">
        <ScrollFade>
          <h2 className="text-4xl md:text-5xl">Contact</h2>
          <p className="mt-6 max-w-prose text-base leading-relaxed text-lmuted">
            Open to internships, projects and hackathon teams. Email is the fastest way to reach me.
          </p>
          <ul className="mt-10 divide-y divide-lline border-y border-lline">
            {rows.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <a href={href} className="flex min-h-[44px] items-center gap-4 py-4 hover:text-lmuted">
                  <Icon size={18} aria-hidden />
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </ScrollFade>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Experience />
      <Software />
      <Cad />
      <About />
      <Contact />
    </>
  );
}
