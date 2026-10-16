// All editable content lives here. Components only map over these arrays.
// Style rules: no em or en dashes, no "|" or middle-dot separators in visible text.
// Date ranges read "Feb 2026 to Present". Never claim what was not done.

// Public files are served under the Vite base path (GitHub Pages project site).
const BASE = import.meta.env.BASE_URL;

export const personalInfo = {
  name: "Rushil Patil",
  heroLine: "Mechanical Engineering Student and Builder",
  affiliations: ["UIUC Mechanical Engineering", "Business Minor", "NETZSCH Intern"],
  bio: "I am a Mechanical Engineering student at the University of Illinois Urbana-Champaign with a business minor. I like finding the slow, manual step in a process and replacing it with a tool that works. This summer I built seven automation tools at NETZSCH Pumps and Systems. On my own time I build AI agents, test them in simulation, and design parts for 3D printing.",
  education: {
    school: "University of Illinois at Urbana-Champaign, Grainger College of Engineering",
    degree: "B.S. Mechanical Engineering, Business Minor",
    expected: "Expected May 2029",
    gpa: "3.78 / 4.00",
  },
  currentFocus: "Process automation, AI agents, and CAD for 3D printing.",
  organizations: ["Business Council", "Illinois Business Consulting", "PRIME Mergers and Acquisitions"],
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
    id: "enclosure",
    title: "Layered Electronics Enclosure",
    dateRange: "December 2025",
    description:
      "A stacked enclosure I designed in Fusion 360 around a battery pack, a control board and silicone heating pads. The model is shown exploded so every layer is visible.",
    tags: ["Fusion 360", "Assembly Design", "3D Printing"],
    glbFileUrl: `${BASE}glb/assembly.glb`,
  },
  {
    id: "storcase",
    title: "Storage Case",
    dateRange: "2025",
    description: "A large storage case with a drawer front, designed in Fusion 360.",
    tags: ["Fusion 360", "Product Design"],
    glbFileUrl: `${BASE}glb/storcase.glb`,
  },
];
export type SoftwareProject = {
  id: string;
  title: string;
  kind: string;
  description: string;
  tags: string[];
  steps: string[];
  note?: string;
};

// The three smaller cards beside the lead project.
export const softwareProjects: SoftwareProject[] = [
  {
    id: "spare-parts",
    title: "Spare-Parts Pricing Tool",
    kind: "Internship at NETZSCH",
    description:
      "Matches a new part to one of 14,700+ catalog entries and recommends a list price. AI does the matching and fixed formulas set the price, so every number can be explained.",
    tags: ["Excel", "Power Automate", "AI Builder"],
    steps: ["Match", "Compare", "Price", "Review"],
    note: "Built for an employer, not public",
  },
  {
    id: "ib-voice-quiz",
    title: "IB Voice Quiz",
    kind: "Web app",
    description:
      "A voice quiz for banking interview prep. It asks one of 976 questions, listens to my answer, and has an AI model grade it.",
    tags: ["PWA", "Speech", "Gemini"],
    steps: ["Ask", "Listen", "Transcribe", "Grade"],
  },
  {
    id: "stock-agent",
    title: "Stock Research Agent",
    kind: "AI agent",
    description:
      "Researches a small real portfolio every day, week and month, then emails me a summary. A rule check rejects anything outside my limits before I see it.",
    tags: ["Python", "Scheduling", "Claude"],
    steps: ["Schedule", "Research", "Check", "Email"],
  },
];

export const monteCarlo = {
  title: "Monte Carlo Trading Simulator",
  kind: "Simulation",
  description:
    "Before the stock agent touches real money, I test it in simulated markets. I plant a known edge, then compare one run that keeps what it learns against a control that starts fresh every year. Every run is audited for rule violations.",
  tags: ["Python", "Monte Carlo", "Bootstrap"],
  steps: ["Simulate", "Learn", "Audit", "Compare"],
  note: "Dollar levels are synthetic and thirty years is a small sample. The learning run cut the worst years but gave up the biggest winners.",
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
