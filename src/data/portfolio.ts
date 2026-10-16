// All editable content lives here. Components only map over these arrays.
// Style rules: no em or en dashes, no "|" or middle-dot separators in visible text.
// Date ranges read "Feb 2026 to Present". Never claim what was not done.

export const personalInfo = {
  name: "Rushil Patil",
  tagline: "Mechanical Engineering Student and Builder",
  affiliations: ["UIUC Grainger Engineering", "Business Minor", "Dean's List"],
  bio: "I am a Mechanical Engineering student at the University of Illinois Urbana-Champaign with a business minor. I like finding the slow, manual step in a process and replacing it with a tool that works. This summer I built seven automation tools at NETZSCH Pumps and Systems, and on my own time I build AI agents and 3D-printed designs.",
  education: {
    school: "University of Illinois at Urbana-Champaign, Grainger College of Engineering",
    degree: "B.S. Mechanical Engineering, Business Minor",
    expected: "Expected May 2029",
    gpa: "3.78 / 4.00",
  },
  currentFocus: "Process automation, AI agents and CAD for 3D printing.",
  organizations: ["Business Council", "Illinois Business Consulting", "PRIME Mergers and Acquisitions"],
  skills: {
    cadSimulation: ["SolidWorks", "AutoCAD", "Fusion 360", "MATLAB", "3D Printing"],
    software: ["Python", "Java", "Power Automate", "Power BI", "SAP"],
    business: ["Excel", "PowerPoint", "DCF Valuation", "Financial Modeling"],
  },
  resumeUrl: "/Patil_Rushil_Resume.pdf",
  email: "rushilp0807@gmail.com",
  githubUrl: "https://github.com/rushilp0807-ux",
  linkedinUrl: "https://www.linkedin.com/in/rushilpatil",
};

export type CadProject = {
  id: string;
  title: string;
  organization: string;
  dateRange: string;
  description: string;
  tags: string[];
  // Optional web-ready .glb in public/glb. Without it the card shows a plain placeholder.
  glbFileUrl?: string;
};

export const cadProjects: CadProject[] = [
  {
    id: "incense-holder",
    title: "Incense Stick Holder",
    organization: "Personal project",
    dateRange: "Aug 2026",
    description:
      "A 3D-printed holder designed in CAD and exported for printing. This is the first revision of the design.",
    tags: ["CAD", "3D Printing"],
    glbFileUrl: "/glb/incense-holder.glb",
  },
  {
    id: "enclosure-lid",
    title: "Electronics Enclosure Lid",
    organization: "Personal project",
    dateRange: "Dec 2025",
    description:
      "A lid for an electronics enclosure built around a battery pack, charging board and heating pad, sized to the real component dimensions.",
    tags: ["SolidWorks", "3D Printing"],
    glbFileUrl: "/glb/enclosure-lid.glb",
  },
  {
    id: "keychain-tool",
    title: "Keychain Tool",
    organization: "Personal project",
    dateRange: "Apr 2026",
    description:
      "A compact keychain tool refined over eight revisions, printed each time to test fit and strength.",
    tags: ["Fusion 360", "3D Printing"],
    glbFileUrl: "/glb/keychain-tool.glb",
  },
  {
    id: "engineering-card",
    title: "Engineering Credit Card",
    organization: "Personal project",
    dateRange: "Nov 2025",
    description:
      "A wallet-sized printed card designed to carry everyday engineering reference features.",
    tags: ["Fusion 360", "3D Printing"],
    glbFileUrl: "/glb/credit-card.glb",
  },
];

export type SoftwareProject = {
  id: string;
  title: string;
  kind: string;
  description: string;
  githubUrl: string | null;
  liveUrl?: string | null;
  tags: string[];
  steps?: string[];
};

export const softwareProjects: SoftwareProject[] = [
  {
    id: "spare-parts",
    title: "Spare-Parts Pricing Tool",
    kind: "Internship project at NETZSCH",
    description:
      "Matches a new part against more than 14,700 catalog entries and recommends a list price. Excel and Power Automate, with AI-assisted matching and fixed pricing math.",
    githubUrl: null,
    tags: ["Excel", "Power Automate", "AI Builder"],
    steps: ["Match", "Compare", "Price", "Review"],
  },
  {
    id: "ib-voice-quiz",
    title: "IB Voice Quiz",
    kind: "Web app",
    description:
      "Voice-based interview practice with 976 questions. You answer out loud and an AI model grades the response.",
    githubUrl: null,
    tags: ["PWA", "Speech", "Gemini"],
  },
  {
    id: "stock-agent",
    title: "Stock Research Agent",
    kind: "AI agent",
    description:
      "Runs daily, weekly and monthly research on a small real portfolio and emails a summary. Tested with 277 automated tests.",
    githubUrl: null,
    tags: ["Python", "Scheduling", "Claude"],
  },
  {
    id: "monte-carlo",
    title: "Monte Carlo Trading Simulator",
    kind: "Simulation and testing",
    description:
      "Tests the research agent across many simulated market years before real money is involved. It plants a known edge, compares a learning run against a control run, and replays crash scenarios and resampled real returns. Every run is audited for rule violations.",
    githubUrl: null,
    tags: ["Python", "Monte Carlo", "Bootstrap"],
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
