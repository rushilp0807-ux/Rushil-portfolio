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

export type SoftwareProject = {
  id: string;
  title: string;
  kind: string;
  description: string;
  tags: string[];
  steps: string[];
  note?: string;
};

// The lead card: the agentic trading system and the simulation that tests it.
export const trading = {
  kind: "AI agent and simulation",
  title: "Agentic Trading System",
  description:
    "An agent that researches a small real-money account every day, week and month, ranks ideas, watches prices every 30 minutes, and emails me what it finds. It never trades. I place every order myself.",
  safety:
    "The hard limits live in code, not in the prompt: five positions at most, no leveraged funds, and a two-week minimum hold. The model proposes and deterministic code decides. A separate auditor checks every simulated run for rule violations.",
  steps: ["Schedule", "Research", "Validate", "Journal", "Email"],
  tags: ["Python", "Claude", "SQLite", "Task Scheduler", "Gmail API", "Monte Carlo"],
  chartTitle: "Monte Carlo test: return in each of 30 simulated years",
  note: "Before it touches real money, I run it through simulated markets with a known edge planted, one run that keeps what it learns against a control that starts fresh. Dollar levels are synthetic and thirty years is a small sample. The learning run cut the worst years but gave up the biggest winners.",
  stats: [
    { value: "295", label: "automated tests" },
    { value: "19,000+", label: "simulated runs" },
    { value: "5", label: "scheduled jobs" },
  ],
};

// Three stacked cards beside the lead.
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
    id: "po-automation",
    title: "Purchase Order Automation",
    kind: "Full-stack app",
    description:
      "Reads a purchase order PDF, pulls out the fields with Claude, checks them against the quote, and flags any gap before a person approves it. I built it twice: on Microsoft Power Platform, and as a fully local Next.js app with a database and a hard cap on AI calls.",
    tags: ["Next.js", "SQLite", "Claude API", "Power Platform"],
    steps: ["Extract", "Match", "Validate", "Approve"],
  },
  {
    id: "approvals",
    title: "Approval Workflows",
    kind: "Internship at NETZSCH",
    description:
      "Credit, warranty and free-of-charge requests used to move by email. A form now routes each one to the right approver by dollar amount and sales office, then logs the decision.",
    tags: ["Power Automate", "Forms", "Approvals", "Excel"],
    steps: ["Submit", "Route", "Approve", "Log"],
    note: "Built for an employer, not public",
  },
];

// Smaller cards below.
export const moreProjects: SoftwareProject[] = [
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
    id: "dayforce-bot",
    title: "Hours Report Bot",
    kind: "Windows app for a coworker",
    description:
      "Refreshes a daily hours spreadsheet from a company report with no clicks. It is a standalone Windows program with a setup screen, a scheduled task, and credentials kept in Windows Credential Manager.",
    tags: ["Python", "Playwright", "PyInstaller"],
    steps: ["Sign in", "Download", "Verify", "Swap"],
  },
  {
    id: "service-report",
    title: "Service Report Generator",
    kind: "Copilot Studio agent",
    description:
      "Turns a technician's form answers into a finished, branded Word report. It polishes the writing but never invents a detail: anything missing becomes a highlighted placeholder.",
    tags: ["Copilot Studio", "Power Automate", "Word"],
    steps: ["Form", "Polish", "Flag gaps", "Report"],
  },
  {
    id: "offer-tool",
    title: "Testing Offer Sender",
    kind: "Sales tool",
    description:
      "Lets a salesperson email a customer the right testing forms in under two minutes. One file, nothing to install, and it falls back to a ready-to-send draft on the new Outlook.",
    tags: ["HTA", "JScript", "Outlook"],
    steps: ["Pick files", "Fill template", "Send"],
  },
];

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
