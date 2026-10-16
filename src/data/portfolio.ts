// All editable content lives here. Components only map over these arrays.
// Style rules: no em or en dashes, no "|" or middle-dot separators in visible text.
// Date ranges read "Feb 2026 to Present". Never claim what was not done.

// Public files are served under the Vite base path (GitHub Pages project site).
const BASE = import.meta.env.BASE_URL;

export const personalInfo = {
  name: "Rushil Patil",
  firstName: "Rushil",
  lastName: "Patil",
  heroLine: "Mechanical Engineering Student and Builder",
  affiliations: ["UIUC Grainger Engineering", "Business Minor", "Dean's List"],
  tagline: "I replace slow manual steps with tools that work.",
  intro:
    "Mechanical Engineering student at the University of Illinois with a business minor. I build automation tools, AI agents and 3D-printed designs.",
  bio: "I am a Mechanical Engineering student at the University of Illinois Urbana-Champaign with a business minor. I like finding the slow, manual step in a process and replacing it with a tool that works. This summer I built seven automation tools at NETZSCH Pumps and Systems, and on my own time I build AI agents, test them in simulation, and design parts for 3D printing.",
  education: {
    school: "University of Illinois at Urbana-Champaign, Grainger College of Engineering",
    degree: "B.S. Mechanical Engineering, Business Minor",
    expected: "Expected May 2029",
    gpa: "3.78 / 4.00",
  },
  currentFocus: "Process automation, AI agents, and CAD for 3D printing.",
  organizations: ["Business Council", "Illinois Business Consulting", "PRIME Mergers and Acquisitions"],
  stats: [
    { value: "7", label: "automation tools built at NETZSCH" },
    { value: "40+", label: "hours a month saved" },
    { value: "14,700+", label: "catalog parts matched by one tool" },
    { value: "3.78", label: "GPA at Illinois Grainger" },
  ],
  skills: {
    "CAD and Simulation": ["SolidWorks", "AutoCAD", "Fusion 360", "MATLAB", "3D Printing"],
    Software: ["Python", "Java", "Power Automate", "Power BI", "SAP"],
    Business: ["Excel", "PowerPoint", "DCF Valuation", "Financial Modeling"],
  } as Record<string, string[]>,
  resumeUrl: `${BASE}Patil_Rushil_Resume.pdf`,
  email: "rushilp0807@gmail.com",
  githubUrl: "https://github.com/rushilp0807-ux",
  linkedinUrl: "https://www.linkedin.com/in/rushilpatil",
};

export type CadProject = {
  id: string;
  title: string;
  dateRange: string;
  description: string;
  tags: string[];
  glbFileUrl: string;
};

// Only the two strongest designs are shown.
export const cadProjects: CadProject[] = [
  {
    id: "incense-holder",
    title: "Incense Stick Holder",
    dateRange: "Aug 2026",
    description:
      "A flowing 3D-printed holder designed in CAD and exported for printing. This is the first revision of the design.",
    tags: ["CAD", "3D Printing"],
    glbFileUrl: `${BASE}glb/incense-holder.glb`,
  },
  {
    id: "keychain-tool",
    title: "Keychain Tool",
    dateRange: "Apr 2026",
    description:
      "A compact keychain tool refined over eight revisions, printed each time to test fit and strength.",
    tags: ["Fusion 360", "3D Printing"],
    glbFileUrl: `${BASE}glb/keychain-tool.glb`,
  },
];

export type FlowStep = { title: string; detail: string };

export type SoftwareProject = {
  id: string;
  title: string;
  kind: string;
  description: string;
  tags: string[];
  note?: string;
  steps: FlowStep[];
  loop?: string;
};

// Flow diagrams describe how each system is structured. They contain no results.
export const softwareProjects: SoftwareProject[] = [
  {
    id: "spare-parts",
    title: "Spare-Parts Pricing Tool",
    kind: "Internship project at NETZSCH",
    description:
      "Matches a new part against more than 14,700 catalog entries and recommends a list price. AI handles the matching and fixed math sets the price, so the number is always explainable.",
    tags: ["Excel", "Power Automate", "AI Builder"],
    note: "Built for an employer, so the code is not public.",
    steps: [
      { title: "New part", detail: "Description and specs entered in Excel" },
      { title: "AI match", detail: "Finds the closest of 14,700+ catalog entries" },
      { title: "Price math", detail: "Fixed formulas, no AI in the number" },
      { title: "Review", detail: "A person approves the list price" },
    ],
  },
  {
    id: "ib-voice-quiz",
    title: "IB Voice Quiz",
    kind: "Web app",
    description:
      "Voice-based interview practice with 976 questions. You answer out loud and an AI model grades the response.",
    tags: ["PWA", "Speech", "Gemini"],
    steps: [
      { title: "Question", detail: "One of 976 interview questions" },
      { title: "Speak", detail: "Answer out loud in the browser" },
      { title: "Transcribe", detail: "Speech converted to text" },
      { title: "Grade", detail: "Gemini scores and gives feedback" },
    ],
    loop: "Next question",
  },
  {
    id: "stock-agent",
    title: "Stock Research Agent",
    kind: "AI agent",
    description:
      "Runs daily, weekly and monthly research on a small real portfolio and emails a summary. Hard rules check every idea before it is shown.",
    tags: ["Python", "Scheduling", "Claude"],
    steps: [
      { title: "Schedule", detail: "Daily, weekly and monthly runs" },
      { title: "Research", detail: "Headless Claude reviews the market" },
      { title: "Rule check", detail: "A validator rejects anything off-limits" },
      { title: "Email", detail: "Summary sent with queued retries" },
    ],
    loop: "Journal of past trades feeds the next run",
  },
];

export const monteCarlo = {
  title: "Monte Carlo Trading Simulator",
  kind: "Simulation and testing",
  description:
    "Before the stock agent touches real money, it is tested across many simulated market years. A known edge is planted in a synthetic market. One run keeps what it learns from year to year and a control run starts fresh every year, so the gap between them shows whether learning works. Every run is audited for rule violations.",
  tags: ["Python", "Monte Carlo", "Bootstrap"],
  caveat:
    "Dollar levels are synthetic, and 30 simulated years is a small sample, so this shows the method working rather than proving an edge.",
  reading: [
    "The learning run found the planted edge: its weight on that theme rose from 1.0 to 1.5 at year 13 and held.",
    "It had a milder bad year (worst decile -8.0 percent against -17.3 percent) and a better median year (+14.4 against +7.2).",
    "It gave up the biggest winners (best year +52 percent against +74 percent), and the average gap was small (+13.1 against +12.1).",
    "The first 12 years are identical because nothing had been learned yet.",
  ],
};

export type Experience = {
  id: string;
  title: string;
  organization: string;
  dateRange: string;
  summary: string;
  tags: string[];
};

export const experience: Experience[] = [
  {
    id: "netzsch",
    title: "Operations and Technology Intern",
    organization: "NETZSCH Pumps and Systems",
    dateRange: "May 2026 to Aug 2026",
    summary:
      "Mapped how 100+ monthly orders moved across 5 departments and SAP. Built 7 Excel and Power Automate tools and trained 13 employees, saving 40+ hours a month.",
    tags: ["Process mapping", "Power Automate", "SAP"],
  },
  {
    id: "prime",
    title: "Analyst",
    organization: "PRIME Mergers and Acquisitions",
    dateRange: "Feb 2026 to May 2026",
    summary:
      "Valued Boot Barn at $95 to $100 per share with a 5-year DCF and comparable analysis, as part of a 4-person team.",
    tags: ["DCF", "Valuation", "Excel"],
  },
  {
    id: "ibc",
    title: "Senior Consultant",
    organization: "Illinois Business Consulting",
    dateRange: "Aug 2025 to May 2026",
    summary:
      "Analyzed CRM workflows across 30+ dealers and recommended changes projected to raise license renewals by 10 to 15 percent.",
    tags: ["Consulting", "Analysis"],
  },
];
