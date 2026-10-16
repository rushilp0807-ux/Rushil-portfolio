import type { ReactNode } from "react";
import { ArrowUpRight, Lock, Mail, Linkedin, Github } from "lucide-react";
import ScrollFade from "@/components/ui/scroll-fade";
import ModelViewerWrapper from "@/components/ui/model-viewer-wrapper";
import FlowDiagram from "@/components/viz/flow-diagram";
import HeroPaths from "@/components/viz/hero-paths";
import LineChart from "@/components/viz/line-chart";
import mc from "@/data/montecarlo.json";
import { cadProjects, experience, monteCarlo, personalInfo, softwareProjects } from "@/data/portfolio";

function Chip({ children, dark = false }: { children: string; dark?: boolean }) {
  return (
    <span
      className={`rounded-full px-3 py-1 font-mono text-xs ${
        dark ? "border border-nline text-nmuted" : "border border-line bg-bg text-muted"
      }`}
    >
      {children}
    </span>
  );
}

function SectionHead({ id, n, title, lead }: { id: string; n: string; title: string; lead?: string }) {
  return (
    <ScrollFade>
      <div id={id} className="scroll-mt-4">
        <p className="font-mono text-sm text-accent">{n}</p>
        <h2 className="mt-2 text-4xl md:text-5xl">{title}</h2>
        {lead && <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{lead}</p>}
      </div>
    </ScrollFade>
  );
}

function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`px-6 py-20 md:px-10 md:py-28 ${className}`}>{children}</section>;
}

function Hero() {
  return (
    <section id="top" className="dot-grid relative overflow-hidden px-6 pb-16 pt-14 md:px-10 md:pb-24 md:pt-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="font-mono text-sm text-muted">Mechanical Engineering, University of Illinois</p>
          <h1 className="mt-5 text-6xl font-extrabold md:text-8xl">
            {personalInfo.firstName}
            <br />
            <span className="text-accent">{personalInfo.lastName}</span>
          </h1>
          <p className="mt-8 max-w-xl text-xl font-medium leading-snug md:text-2xl">{personalInfo.tagline}</p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{personalInfo.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#software"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("software")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex min-h-[48px] items-center rounded-lg bg-ink px-6 text-sm font-semibold text-white hover:opacity-90"
            >
              See the projects
            </a>
            <a
              href={personalInfo.resumeUrl}
              className="flex min-h-[48px] items-center rounded-lg border border-ink/20 bg-surface px-6 text-sm font-semibold hover:border-ink"
            >
              Resume
            </a>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="aspect-[5/3] rounded-3xl border border-line bg-surface p-4 shadow-sm">
            <HeroPaths />
          </div>
        </div>
      </div>
      <dl className="mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-4">
        {personalInfo.stats.map((s) => (
          <div key={s.label} className="flex flex-col rounded-2xl border border-line bg-surface p-5">
            <dt className="order-2 mt-1 text-sm leading-snug text-muted">{s.label}</dt>
            <dd className="order-1 text-3xl font-extrabold tracking-tight md:text-4xl">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Experience() {
  return (
    <Section>
      <div className="mx-auto max-w-6xl">
        <SectionHead id="experience" n="01" title="Experience" />
        <ol className="mt-12 divide-y divide-line border-y border-line">
          {experience.map((e, i) => (
            <li key={e.id}>
              <ScrollFade delay={i * 0.06} className="grid gap-4 py-8 md:grid-cols-12 md:gap-8">
                <p className="font-mono text-sm text-muted md:col-span-3">{e.dateRange}</p>
                <div className="md:col-span-9">
                  <h3 className="text-2xl md:text-3xl">{e.organization}</h3>
                  <p className="mt-1 text-base font-medium text-accent">{e.title}</p>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">{e.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {e.tags.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                </div>
              </ScrollFade>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

function Software() {
  return (
    <Section className="bg-surface">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          id="software"
          n="02"
          title="Software and automation"
          lead="Each tool, drawn as the path a piece of work takes through it."
        />
        <div className="mt-12 space-y-6">
          {softwareProjects.map((p) => (
            <ScrollFade key={p.id} className="rounded-3xl border border-line bg-surface p-6 md:p-10">
              <div className="grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <p className="font-mono text-xs text-muted">{p.kind}</p>
                  <h3 className="mt-2 text-3xl">{p.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-muted">{p.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                  {p.note && (
                    <p className="mt-5 flex items-center gap-2 text-sm text-muted">
                      <Lock size={14} aria-hidden /> {p.note}
                    </p>
                  )}
                </div>
                <div className="flex items-center lg:col-span-8">
                  <div className="w-full">
                    <FlowDiagram steps={p.steps} loop={p.loop} />
                  </div>
                </div>
              </div>
            </ScrollFade>
          ))}
        </div>
      </div>
    </Section>
  );
}

const pct = (n: number) => `${n > 0 ? "+" : ""}${n.toFixed(0)}%`;
const pct1 = (n: number) => `${n > 0 ? "+" : ""}${n.toFixed(1)}%`;

function Simulation() {
  const learn = mc.learn;
  const ctrl = mc.ctrl;
  const stat = (label: string, a: number, b: number) => (
    <div className="rounded-xl border border-nline bg-night2 p-4">
      <p className="font-mono text-xs text-nmuted">{label}</p>
      <p className="mt-2 flex items-baseline gap-3">
        <span className="text-2xl font-extrabold text-warm">{pct1(a)}</span>
        <span className="text-sm text-nmuted">learning</span>
      </p>
      <p className="flex items-baseline gap-3">
        <span className="text-lg font-bold text-white/80">{pct1(b)}</span>
        <span className="text-sm text-nmuted">control</span>
      </p>
    </div>
  );

  return (
    <Section className="bg-night text-white">
      <div className="mx-auto max-w-6xl">
        <ScrollFade>
          <div id="simulation" className="scroll-mt-4">
            <p className="font-mono text-sm text-warm">03</p>
            <h2 className="mt-2 text-4xl md:text-5xl">{monteCarlo.title}</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-nmuted md:text-lg">{monteCarlo.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {monteCarlo.tags.map((t) => (
                <Chip key={t} dark>
                  {t}
                </Chip>
              ))}
            </div>
          </div>
        </ScrollFade>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <ScrollFade className="rounded-3xl border border-nline bg-night2 p-6">
            <h3 className="text-xl">Return per simulated year</h3>
            <p className="mt-1 text-sm text-nmuted">
              {mc.nSims} simulated years, same seeds for both runs. Higher is better.
            </p>
            <div className="mt-4">
              <LineChart
                dark
                yLabel="Return (%)"
                format={pct}
                referenceLine={{ value: 0, label: "0%" }}
                summary={`Return for each of ${mc.nSims} simulated years. Learning run averaged ${pct(learn.mean)}, control run averaged ${pct(ctrl.mean)}.`}
                series={[
                  { label: "Learning", values: learn.returns, color: "#ff5b1f" },
                  { label: "Control", values: ctrl.returns, color: "#9aa5b6", dashed: true },
                ]}
              />
            </div>
          </ScrollFade>
          <ScrollFade delay={0.08} className="rounded-3xl border border-nline bg-night2 p-6">
            <h3 className="text-xl">What the agent learned</h3>
            <p className="mt-1 text-sm text-nmuted">
              Weight on the theme where the edge was planted. Rising means it found it.
            </p>
            <div className="mt-4">
              <LineChart
                dark
                yLabel="Theme weight"
                format={(n) => n.toFixed(2)}
                referenceLine={{ value: 1, label: "start" }}
                summary={`Weight on the planted-edge theme across ${mc.nSims} simulated years, from ${learn.energy_w[0].toFixed(2)} to ${learn.energy_w[learn.energy_w.length - 1].toFixed(2)}.`}
                series={[{ label: "Weight", values: learn.energy_w, color: "#ff5b1f" }]}
              />
            </div>
          </ScrollFade>
        </div>

        <ScrollFade className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stat("Average year", learn.mean, ctrl.mean)}
          {stat("Median year", learn.median, ctrl.median)}
          {stat("Worst-decile year", learn.p10, ctrl.p10)}
          <div className="rounded-xl border border-nline bg-night2 p-4">
            <p className="font-mono text-xs text-nmuted">Rule violations</p>
            <p className="mt-2 text-2xl font-extrabold text-white">{mc.violations}</p>
            <p className="text-sm text-nmuted">across {mc.nSims * 2} audited years</p>
          </div>
        </ScrollFade>

        <ScrollFade className="mt-10 rounded-3xl border border-nline p-6 md:p-8">
          <h3 className="text-xl">How to read it</h3>
          <ul className="mt-4 space-y-3 text-base leading-relaxed text-nmuted">
            {monteCarlo.reading.map((r) => (
              <li key={r} className="flex gap-3">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-warm" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-nmuted">{monteCarlo.caveat}</p>
        </ScrollFade>
      </div>
    </Section>
  );
}

function Cad() {
  return (
    <Section>
      <div className="mx-auto max-w-6xl">
        <SectionHead id="cad" n="04" title="CAD and 3D printing" lead="Drag either model to rotate it." />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {cadProjects.map((p, i) => (
            <ScrollFade key={p.id} delay={i * 0.08} className="overflow-hidden rounded-3xl border border-line bg-surface">
              <ModelViewerWrapper src={p.glbFileUrl} alt={`3D model of ${p.title}`} className="h-[320px] md:h-[400px]" />
              <div className="p-6 md:p-8">
                <p className="font-mono text-xs text-muted">{p.dateRange}</p>
                <h3 className="mt-2 text-2xl md:text-3xl">{p.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted">{p.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
              </div>
            </ScrollFade>
          ))}
        </div>
      </div>
    </Section>
  );
}

function About() {
  const { skills, education } = personalInfo;
  return (
    <Section className="bg-surface">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-12">
        <ScrollFade className="lg:col-span-7">
          <div id="about" className="scroll-mt-4">
            <p className="font-mono text-sm text-accent">05</p>
            <h2 className="mt-2 text-4xl md:text-5xl">About</h2>
          </div>
          <p className="mt-8 max-w-prose text-base leading-relaxed text-muted md:text-lg">{personalInfo.bio}</p>
          <dl className="mt-10 space-y-6 text-base">
            <div>
              <dt className="font-mono text-xs text-muted">Education</dt>
              <dd className="mt-1 font-medium">{education.school}</dd>
              <dd className="text-muted">
                {education.degree}, {education.expected}, GPA {education.gpa}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-muted">Current focus</dt>
              <dd className="mt-1">{personalInfo.currentFocus}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-muted">Organizations</dt>
              <dd className="mt-1">{personalInfo.organizations.join(", ")}</dd>
            </div>
          </dl>
        </ScrollFade>
        <ScrollFade delay={0.1} className="space-y-8 lg:col-span-5">
          {Object.entries(skills).map(([label, items]) => (
            <div key={label}>
              <h3 className="mb-3 text-xl">{label}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </div>
          ))}
        </ScrollFade>
      </div>
    </Section>
  );
}

function Contact() {
  const rows = [
    { icon: Mail, label: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: Linkedin, label: "LinkedIn", href: personalInfo.linkedinUrl },
    { icon: Github, label: "GitHub", href: personalInfo.githubUrl },
  ];
  return (
    <Section>
      <div className="mx-auto max-w-6xl">
        <ScrollFade>
          <div id="contact" className="scroll-mt-4">
            <p className="font-mono text-sm text-accent">06</p>
            <h2 className="mt-2 text-4xl md:text-5xl">Contact</h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              Open to internships, projects and hackathon teams. Email is the fastest way to reach me.
            </p>
          </div>
          <ul className="mt-10 grid gap-3 md:grid-cols-3">
            {rows.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="group flex min-h-[64px] items-center justify-between gap-3 rounded-2xl border border-line bg-surface px-5 hover:border-ink"
                >
                  <span className="flex items-center gap-3 font-medium">
                    <Icon size={18} aria-hidden className="text-accent" />
                    {label}
                  </span>
                  <ArrowUpRight size={18} aria-hidden className="text-muted group-hover:text-ink" />
                </a>
              </li>
            ))}
          </ul>
        </ScrollFade>
      </div>
    </Section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Experience />
      <Software />
      <Simulation />
      <Cad />
      <About />
      <Contact />
    </>
  );
}
