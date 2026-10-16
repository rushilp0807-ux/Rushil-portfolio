import type { ReactNode } from "react";
import { ArrowUpRight, Github, Linkedin, Lock, Mail } from "lucide-react";
import ScrollFade from "@/components/ui/scroll-fade";
import ModelViewerWrapper from "@/components/ui/model-viewer-wrapper";
import FlowDiagram from "@/components/viz/flow-diagram";
import FractalBackground from "@/components/viz/fractal-background";
import LineChart from "@/components/viz/line-chart";
import mc from "@/data/montecarlo.json";
import { cadProjects, experience, monteCarlo, personalInfo, softwareProjects } from "@/data/portfolio";

function Chip({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <span className={`px-2.5 py-1 text-xs ${light ? "border border-lline text-lmuted" : "border border-line text-muted"}`}>
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
      <ScrollFade>
        <h2 className="mb-14 text-4xl md:text-5xl">Hardware Design</h2>
      </ScrollFade>
      <div className="flex flex-col gap-6">
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
      <ScrollFade>
        <h2 className="mb-14 text-4xl md:text-5xl">Experience</h2>
      </ScrollFade>
      <ol className="divide-y divide-line border-y border-line">
        {experience.map((e, i) => (
          <li key={e.id}>
            <ScrollFade delay={i * 0.06} className="grid gap-4 py-10 md:grid-cols-12 md:gap-8">
              <div className="text-sm text-muted md:col-span-3">
                <p>{e.dateRange}</p>
              </div>
              <div className="md:col-span-9">
                <h3 className="text-3xl md:text-4xl">{e.organization}</h3>
                <p className="mt-1 text-base text-accent">{e.title}</p>
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
      <ScrollFade>
        <h2 className="text-4xl md:text-5xl">Software Projects</h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-lmuted md:text-base">
          Each tool, drawn as the path a piece of work takes through it.
        </p>
      </ScrollFade>
      <div className="mt-14 grid gap-px border border-lline bg-lline">
        {softwareProjects.map((p) => (
          <ScrollFade key={p.id} className="grid bg-lcard lg:grid-cols-12">
            <div className="p-8 md:p-10 lg:col-span-5">
              <p className="text-sm text-lmuted">{p.kind}</p>
              <h3 className="mt-3 text-3xl md:text-4xl">{p.title}</h3>
              <p className="mt-4 max-w-prose text-sm leading-relaxed text-lmuted md:text-base">{p.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Chip key={t} light>
                    {t}
                  </Chip>
                ))}
              </div>
              {p.note && (
                <p className="mt-6 flex items-center gap-2 text-sm text-lmuted">
                  <Lock size={14} aria-hidden /> {p.note}
                </p>
              )}
            </div>
            <div className="flex items-center bg-lbg p-8 md:p-10 lg:col-span-7">
              <div className="w-full">
                <FlowDiagram steps={p.steps} loop={p.loop} />
              </div>
            </div>
          </ScrollFade>
        ))}
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
    <div className="bg-card p-6">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-3 flex items-baseline gap-3">
        <span className="nums font-display text-4xl text-accent">{pct1(a)}</span>
        <span className="text-sm text-muted">learning</span>
      </p>
      <p className="mt-1 flex items-baseline gap-3">
        <span className="nums font-display text-2xl">{pct1(b)}</span>
        <span className="text-sm text-muted">control</span>
      </p>
    </div>
  );

  return (
    <Section id="simulation" className="bg-bg">
      <ScrollFade>
        <h2 className="text-4xl md:text-5xl">{monteCarlo.title}</h2>
        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted md:text-base">{monteCarlo.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {monteCarlo.tags.map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>
      </ScrollFade>

      <div className="mt-14 grid gap-px border border-line bg-line lg:grid-cols-2">
        <ScrollFade className="bg-card p-6 md:p-8">
          <h3 className="text-2xl">Return per simulated year</h3>
          <p className="mt-1 text-sm text-muted">{mc.nSims} simulated years, same seeds for both runs. Higher is better.</p>
          <div className="mt-5">
            <LineChart
              format={pct}
              referenceLine={{ value: 0, label: "0%" }}
              summary={`Return for each of ${mc.nSims} simulated years. Learning run averaged ${pct1(learn.mean)}, control run averaged ${pct1(ctrl.mean)}.`}
              series={[
                { label: "Learning", values: learn.returns, color: "#f2b84b" },
                { label: "Control", values: ctrl.returns, color: "#a9b8e6", dashed: true },
              ]}
            />
          </div>
        </ScrollFade>
        <ScrollFade delay={0.08} className="bg-card p-6 md:p-8">
          <h3 className="text-2xl">What the agent learned</h3>
          <p className="mt-1 text-sm text-muted">Weight on the theme where the edge was planted. Rising means it found it.</p>
          <div className="mt-5">
            <LineChart
              format={(n) => n.toFixed(2)}
              referenceLine={{ value: 1, label: "start" }}
              summary={`Weight on the planted-edge theme across ${mc.nSims} simulated years, from ${learn.energy_w[0].toFixed(2)} to ${learn.energy_w[learn.energy_w.length - 1].toFixed(2)}.`}
              series={[{ label: "Weight", values: learn.energy_w, color: "#f2b84b" }]}
            />
          </div>
        </ScrollFade>
      </div>

      <ScrollFade className="mt-px grid gap-px border border-t-0 border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {stat("Average year", learn.mean, ctrl.mean)}
        {stat("Median year", learn.median, ctrl.median)}
        {stat("Worst-decile year", learn.p10, ctrl.p10)}
        <div className="bg-card p-6">
          <p className="text-sm text-muted">Rule violations</p>
          <p className="nums mt-3 font-display text-4xl">{mc.violations}</p>
          <p className="mt-1 text-sm text-muted">across {mc.nSims * 2} audited years</p>
        </div>
      </ScrollFade>

      <ScrollFade className="mt-10 border border-line p-6 md:p-8">
        <h3 className="text-2xl">How to read it</h3>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted md:text-base">
          {monteCarlo.reading.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <p className="mt-6 text-sm leading-relaxed text-muted">{monteCarlo.caveat}</p>
      </ScrollFade>
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
      <ScrollFade>
        <h2 className="text-4xl md:text-5xl">Contact</h2>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted md:text-base">
          Open to internships, projects and hackathon teams. Email is the fastest way to reach me.
        </p>
        <ul className="mt-10 grid gap-px border border-line bg-line md:grid-cols-3">
          {rows.map(({ icon: Icon, label, href }) => (
            <li key={label} className="bg-card">
              <a href={href} className="group flex min-h-[72px] items-center justify-between gap-3 px-6 hover:bg-bg">
                <span className="flex items-center gap-3 text-sm">
                  <Icon size={18} aria-hidden className="text-accent" />
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
