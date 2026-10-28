import { Milestone } from "./types"

export const DEFAULT_MARKER_STYLE: "fountain" | "pillar" | "signpost" = "fountain"

const rawMilestones: Milestone[] = [
  {
    id: "m-10th",
    title: "Class 10th Secondary Schooling",
    subtitle: "Vivekananda Siksha Niketan High School",
    year: "2021",
    category: "Secondary Education",
    distance: 60,
    markerStyle: "fountain",
    description:
      "Graduated with 92.0% distinction under WBBSE. Solid mathematical foundations, analytical reasoning, and quantitative problem solving.",
    tags: ["WBBSE Board", "Score: 92%", "Mathematics", "Academic Merit"],
    badge: "✦ 92.0% Merit",
    color: "#10b981", // Emerald
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "m-12th",
    title: "Class 12th Higher Secondary",
    subtitle: "Bankura Banga Vidyalaya",
    year: "2023",
    category: "Pure Science",
    distance: 200,
    markerStyle: "signpost",
    description:
      "Completed Class 12 Science (72.0%) with Physics, Chemistry, and Advanced Mathematics. Introduction to programmatic syntax and structured coding in C.",
    tags: ["WBCHSE", "Pure Science", "Calculus", "C Programming"],
    badge: "✦ Science Stream",
    color: "#f59e0b", // Amber
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "m-college-dsa",
    title: "B.E. CSE Start & DSA Mastery",
    subtitle: "Chandigarh University & Coding Ninjas",
    year: "Late 2023",
    category: "Algorithmic Foundations",
    distance: 350,
    markerStyle: "pillar",
    description:
      "Commenced Bachelor of Engineering in CSE. Intensive algorithmic program solving 150+ challenges spanning trees, recursion, two-pointer logic, and complexity analysis.",
    tags: ["Data Structures", "Algorithms", "C++", "Java", "150+ Solved"],
    badge: "✦ 150+ Solved",
    color: "#06b6d4", // Cyan
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "m-hackathon",
    title: "Zinnovatio Hackathon Sprint",
    subtitle: "Rapid Prototyping & Defect Testing",
    year: "2024",
    category: "Collaborative Engineering",
    distance: 490,
    markerStyle: "fountain",
    description:
      "Collaborated in a time-bound engineering hackathon. Engineered interactive React flows, integrated REST endpoints, and verified release readiness with fast regression tests.",
    tags: ["Hackathon", "React.js", "REST APIs", "Regression Testing", "Agile"],
    badge: "✦ Sprint Certified",
    color: "#f43f5e", // Rose
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "m-nptel-cloud",
    title: "IIT NPTEL Cloud Computing",
    subtitle: "IIT Kharagpur / Ministry of Education",
    year: "2024 – 2025",
    category: "Industry Certification",
    distance: 630,
    markerStyle: "fountain",
    description:
      "Rigorous national certification curriculum covering distributed cloud architectures, virtualization, IaaS/PaaS/SaaS models, hypervisors, and distributed storage.",
    tags: ["Cloud Computing", "IIT Kharagpur", "NPTEL", "Virtualization", "Distributed Systems"],
    badge: "✦ IIT Certified",
    color: "#10b981", // Emerald
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "m-degree-qa",
    title: "B.E. CSE Readiness & Engineering Target",
    subtitle: "Chandigarh University",
    year: "2025 – 2027",
    category: "Undergrad Degree",
    distance: 740,
    markerStyle: "pillar",
    description:
      "Targeting graduation 2027 (CGPA 6.97). Specializing in REST API services (Spring Boot), modern full-stack web, and QA testing lifecycle / release verification.",
    tags: ["Spring Boot", "REST APIs", "QA & Testing", "Full-Stack", "CGPA: 6.97"],
    badge: "✦ Target 2027",
    color: "#8b5cf6", // Purple
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
  },
]

export const MILESTONES: Milestone[] = [...rawMilestones].sort((a, b) => a.distance - b.distance)
