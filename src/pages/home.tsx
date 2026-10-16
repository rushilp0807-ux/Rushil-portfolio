import type { ReactNode } from "react";
import { ArrowUpRight, Github, Linkedin, Lock, Mail } from "lucide-react";
import ScrollFade from "@/components/ui/scroll-fade";
import ModelViewerWrapper from "@/components/ui/model-viewer-wrapper";
import FractalBackground from "@/components/viz/fractal-background";
import LineChart from "@/components/viz/line-chart";
import StepWords from "@/components/viz/step-words";
import mc from "@/data/montecarlo.json";
import { cadProjects, experience, monteCarlo, personalInfo, softwareProjects } from "@/data/portfolio";

function Chip({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <span className={`px-2.5 py-1 text-xs ${light ? "bg-black/[0.08] text-lmuted" : "bg-white/10 text-muted"}`}>
      {children}
    </span>
  );
}

function Section({ id, className = "", children }: { id: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={`py-28 md:py-32 ${className}`}>
      <div className="container mx-auto px-6">{children}</div>
    </section>
  );
}

function Head({ title, sub, light = false }: { title: string; sub: string; light?: boolean }) {
  return (
    <ScrollFade>
      <h2 className="text-4xl md:text-5xl">{title}</h2>
      <p className={`mt-4 max-w-xl text-sm leading-relaxed md:text-base ${light ? "text-lmuted" : "text-muted"}`}>{sub}</p>
    </ScrollFade>
  );
}

const pct = (n: number) => `${n > 0 ? "+" : ""}${n.toFixed(0)}%`;
const pct1 = (n: number) => `${n > 0 ? "+" : ""}${n.toFixed(1)}%`;

function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-bg px-6 text-center">
      <FractalBackground />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, rgba(11,29,90,0.15) 0%, #0b1d5a 78%)" }}
      />
      <div className="relative z-10 flex max-w-3xl flex-col items-center gap-6">
        <ScrollFade>
          <p className="text-sm text-muted">{personalInfo.heroLine}</p>
        </ScrollFade>
        <ScrollFade delay={0.1}>
          <h1 className="leading-none" style={{ fontSize: "clamp(4rem, 11vw, 8rem)" }}>
            {personalInfo.name}
          </h1>
        </ScrollFade>
        <ScrollFade delay={0.2}>
          <ul className="flex flex-wrap justify-center gap-x-10 gap-y-2 text-sm text-muted">
            {personalInfo.affiliations.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </ScrollFade>
        <ScrollFade delay={0.3} className="mt-4 flex flex-wrap justify-center gap-4">
          <a
            href="#cad"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("cad")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-fg px-6 py-3 text-sm text-bg hover:opacity-90"
          >
            View Projects
          </a>
          <a href={personalInfo.resumeUrl} className="border border-fg/40 px-6 py-3 text-sm hover:border-fg">
            Resume
          </a>
        </ScrollFade>
      </div>
    </section>
  );
}

function Cad() {
  return (
    <Section id="cad" className="bg-lbg text-lfg">
      <Head light title="Hardware Design" sub="Parts I designed and printed. Drag a model to rotate it." />
      <div className="mt-14 flex flex-col gap-6">
        {cadProjects.map((p, i) => (
          <ScrollFade key={p.id} className="grid border border-lline bg-lcard md:grid-cols-2">
            <ModelViewerWrapper
              src={p.glbFileUrl}
              alt={`3D model of ${p.title}`}
              className={`h-[340px] md:h-[440px] ${i % 2 ? "md:order-2" : ""}`}
            />
            <div className="flex flex-col justify-center p-8 md:p-12">
              <p className="text-sm text-lmuted">Personal project</p>
              <p className="text-sm text-lmuted">{p.dateRange}</p>
              <h3 className="mt-6 text-3xl md:text-4xl">{p.title}</h3>
              <p className="mt-4 max-w-prose text-sm leading-relaxed text-lmuted md:text-base">{p.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Chip key={t} light>
                    {t}
                  </Chip>
                ))}
              </div>
            </div>
          </ScrollFade>
        ))}
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" className="bg-bg">
      <Head title="Experience" sub="Internships, case work and consulting." />
      <ol className="mt-14 divide-y divide-line border-y border-line">
        {experience.map((e, i) => (
          <li key={e.id}>
            <ScrollFade delay={i * 0.06} className="grid gap-4 py-10 md:grid-cols-12 md:gap-8">
              <p className="text-sm text-muted md:col-span-3">{e.dateRange}</p>
              <div className="md:col-span-9">
                <h3 className="text-3xl md:text-4xl">{e.organization}</h3>
                <p className="mt-1 text-base text-muted">{e.title}</p>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">{e.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {e.tags.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
              </div>
            </ScrollFade>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Software() {
  return (
    <Section id="software" className="bg-lbg text-lfg">
      <Head light title="Software Projects" sub="Simulation, agents and tools I use every day." />
      <div className="mt-14 grid gap-4 lg:grid-cols-12">
        <ScrollFade className="flex flex-col border border-line bg-bg p-8 text-fg md:p-10 lg:col-span-7">
          <p className="text-sm text-muted">{monteCarlo.kind}</p>
          <h3 className="mt-3 text-4xl md:text-5xl">{monteCarlo.title}</h3>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted md:text-base">{monteCarlo.description}</p>
          <div className="my-8 flex flex-1 flex-col justify-center">
            <p className="mb-2 text-sm text-muted">Return in each of {mc.nSims} simulated years</p>
            <LineChart
              format={pct}
              referenceLine={{ value: 0, label: "" }}
              summary={`Return for each of ${mc.nSims} simulated years. Learning run averaged ${pct1(mc.learn.mean)}, control run averaged ${pct1(mc.ctrl.mean)}.`}
              series={[
                { label: "Learning", values: mc.learn.returns, color: "#f2b84b" },
                { label: "Control", values: mc.ctrl.returns, color: "#a9b8e6", dashed: true },
              ]}
            />
          </div>
          <div>
            <StepWords steps={monteCarlo.steps} />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {monteCarlo.tags.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
        </ScrollFade>

        <div className="flex flex-col gap-4 lg:col-span-5">
          {softwareProjects.map((p, i) => (
            <ScrollFade key={p.id} delay={i * 0.08} className="flex-1 border border-lline bg-lcard p-7">
              <p className="text-sm text-lmuted">{p.kind}</p>
              <h3 className="mt-2 text-3xl">{p.title}</h3>
              <p className="mt-3 max-w-prose text-sm leading-relaxed text-lmuted">{p.description}</p>
              <div className="mt-5">
                <StepWords light steps={p.steps} />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Chip key={t} light>
                    {t}
                  </Chip>
                ))}
              </div>
              {p.note && (
                <p className="mt-4 flex items-center gap-2 text-xs text-lmuted">
                  <Lock size={12} aria-hidden /> {p.note}
                </p>
              )}
            </ScrollFade>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Simulation() {
  const learn = mc.learn;
  const ctrl = mc.ctrl;
  const cell = (label: string, a: number, b: number) => (
    <div className="bg-card p-6">
      <p className="text-sm text-muted">{label}</p>
      <p className="nums mt-3 font-display text-4xl text-accent">{pct1(a)}</p>
      <p className="text-xs text-muted">learning run</p>
      <p className="nums mt-3 font-display text-2xl">{pct1(b)}</p>
      <p className="text-xs text-muted">control run</p>
    </div>
  );
  return (
    <Section id="simulation" className="bg-bg">
      <Head title="Simulation & Analysis" sub={monteCarlo.subtitle} />
      <ScrollFade className="mt-14 grid gap-px border border-line bg-line lg:grid-cols-12">
        <div className="bg-card p-6 md:p-8 lg:col-span-7">
          <h3 className="text-2xl">What the agent learned</h3>
          <p className="mt-1 text-sm text-muted">Weight on the theme where I planted the edge. It starts at 1.</p>
          <div className="mt-5">
            <LineChart
              format={(n) => n.toFixed(2)}
              referenceLine={{ value: 1, label: "start" }}
              summary={`Weight on the planted-edge theme across ${mc.nSims} simulated years, from ${learn.energy_w[0].toFixed(2)} to ${learn.energy_w[learn.energy_w.length - 1].toFixed(2)}.`}
              series={[{ label: "Weight", values: learn.energy_w, color: "#f2b84b" }]}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-px lg:col-span-5">
          {cell("Average year", learn.mean, ctrl.mean)}
          {cell("Median year", learn.median, ctrl.median)}
          {cell("Worst tenth of years", learn.p10, ctrl.p10)}
          <div className="bg-card p-6">
            <p className="text-sm text-muted">Rule violations</p>
            <p className="nums mt-3 font-display text-4xl">{mc.violations}</p>
            <p className="text-xs text-muted">in {mc.nSims * 2} audited years</p>
          </div>
        </div>
      </ScrollFade>
      <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">{monteCarlo.note}</p>
    </Section>
  );
}

function About() {
  const { skills, education } = personalInfo;
  return (
    <Section id="about" className="bg-lbg text-lfg">
      <div className="grid gap-14 lg:grid-cols-12">
        <ScrollFade className="lg:col-span-7">
          <h2 className="text-4xl md:text-5xl">About</h2>
          <p className="mt-8 max-w-prose text-base leading-relaxed text-lmuted">{personalInfo.bio}</p>
          <dl className="mt-10 space-y-6 text-sm">
            <div>
              <dt className="text-lmuted">Education</dt>
              <dd className="mt-1">{education.school}</dd>
              <dd className="text-lmuted">
                {education.degree}, {education.expected}, GPA {education.gpa}
              </dd>
            </div>
            <div>
              <dt className="text-lmuted">Current focus</dt>
              <dd className="mt-1">{personalInfo.currentFocus}</dd>
            </div>
            <div>
              <dt className="text-lmuted">Organizations</dt>
              <dd className="mt-1">{personalInfo.organizations.join(", ")}</dd>
            </div>
          </dl>
          <a href={personalInfo.resumeUrl} className="mt-10 inline-block bg-lfg px-6 py-3 text-sm text-lbg hover:opacity-90">
            Download Resume
          </a>
        </ScrollFade>
        <ScrollFade delay={0.1} className="space-y-8 lg:col-span-5">
          {Object.entries(skills).map(([label, items]) => (
            <div key={label}>
              <h3 className="mb-3 text-2xl">{label}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <Chip key={s} light>
                    {s}
                  </Chip>
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
    <Section id="contact" className="bg-bg">
      <Head title="Contact" sub="Open to internships, projects and hackathon teams." />
      <ScrollFade>
        <ul className="mt-10 grid gap-px border border-line bg-line md:grid-cols-3">
          {rows.map(({ icon: Icon, label, href }) => (
            <li key={label} className="bg-card">
              <a href={href} className="group flex min-h-[72px] items-center justify-between gap-3 px-6 hover:bg-bg">
                <span className="flex items-center gap-3 text-sm">
                  <Icon size={18} aria-hidden className="text-muted" />
                  {label}
                </span>
                <ArrowUpRight size={18} aria-hidden className="text-muted group-hover:text-fg" />
              </a>
            </li>
          ))}
        </ul>
      </ScrollFade>
    </Section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Cad />
      <Experience />
      <Software />
      <Simulation />
      <About />
      <Contact />
    </>
  );
}
