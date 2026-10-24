"use client"

import { motion } from "framer-motion"
import {
  ShieldCheck,
  LifeBuoy,
  Code2,
  Layout,
  Server,
  GitBranch,
  type LucideIcon,
} from "lucide-react"
import { TiltCard } from "@/components/ui/tilt-card"
import KineticGrid from "@/components/ui/kinetic-grid"

interface SkillGroup {
  category: string
  subtitle: string
  tag: string
  skills: string[]
  icon: LucideIcon
  iconColor: string
  iconBg: string
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Testing & Product Quality",
    subtitle: "Validation & Defect Analysis",
    tag: "QA & Verification",
    skills: [
      "Functional Testing",
      "Regression Testing",
      "Integration Testing",
      "API Testing",
      "Test Case Design",
      "Defect Identification",
      "Root Cause Analysis",
      "Release Readiness",
    ],
    icon: ShieldCheck,
    iconColor: "text-emerald-400",
    iconBg: "border-emerald-500/20 bg-emerald-500/10",
  },
  {
    category: "Support & Documentation",
    subtitle: "Troubleshooting & Communication",
    tag: "Ops & Workflows",
    skills: [
      "Technical Troubleshooting",
      "Issue Reproduction",
      "Incident Documentation",
      "User-Flow Documentation",
      "Stakeholder Communication",
    ],
    icon: LifeBuoy,
    iconColor: "text-zinc-300",
    iconBg: "border-zinc-500/20 bg-zinc-500/10",
  },
  {
    category: "Languages & Data",
    subtitle: "Core Programming & Queries",
    tag: "Syntax & Logic",
    skills: ["Python", "SQL", "Java", "C", "C++", "JavaScript", "HTML", "CSS"],
    icon: Code2,
    iconColor: "text-amber-400",
    iconBg: "border-amber-500/20 bg-amber-500/10",
  },
  {
    category: "Frontend Engineering",
    subtitle: "Modern Component Architecture",
    tag: "UI & State",
    skills: ["React.js", "Next.js", "Tailwind CSS", "Responsive Web Design"],
    icon: Layout,
    iconColor: "text-zinc-200",
    iconBg: "border-zinc-400/20 bg-zinc-400/10",
  },
  {
    category: "Backend & Databases",
    subtitle: "API Services & Data Stores",
    tag: "Server & Schemas",
    skills: ["Spring Boot", "REST APIs", "MongoDB", "SQL", "Data Modeling Basics"],
    icon: Server,
    iconColor: "text-zinc-300",
    iconBg: "border-zinc-500/20 bg-zinc-500/10",
  },
  {
    category: "Core CS & Tools",
    subtitle: "Foundations & Development Stack",
    tag: "Systems & Versioning",
    skills: [
      "Data Structures & Algorithms",
      "OOP",
      "DBMS",
      "Git",
      "GitHub",
      "VS Code",
      "Command Line Basics",
    ],
    icon: GitBranch,
    iconColor: "text-rose-400",
    iconBg: "border-rose-500/20 bg-rose-500/10",
  },
]

const CORE_STRENGTHS = [
  "Ownership attitude",
  "Analytical thinking",
  "Clear written & spoken communication",
  "Team collaboration",
  "Time-bound execution",
  "Structured debugging",
  "Release & workflow readiness",
]

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative w-full text-white overflow-hidden border-t border-white/10"
    >
      {/* 21st.dev Kinetic Grid Interactive Background */}
      <KineticGrid
        globalColor="monochrome"
        bgPosition="absolute"
        className="py-20 px-4 sm:px-6 lg:px-8 min-h-0"
      >
        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Top Header / Meta Navbar */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-10">
            <span className="text-xs sm:text-[13px] font-mono tracking-wider text-neutral-300 font-medium uppercase">
              Technical Capabilities
            </span>
            <span className="text-xs sm:text-[13px] font-mono tracking-wider text-neutral-400">
              06 Domains · Interactive Kinetic Grid
            </span>
          </div>

        {/* Section Intro */}
        <div className="max-w-2xl mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-light text-white tracking-tight">
            Engineering execution with a product quality mindset.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans mt-3 leading-relaxed">
            Hands-on technical strengths spanning automated validation, REST API workflows,
            database fundamentals, and responsive full-stack interfaces.
          </p>
        </div>

        {/* 3D Tilt Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_GROUPS.map((group, idx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="h-full"
            >
              <TiltCard
                tiltLimit={14}
                scale={0.985}
                perspective={1000}
                effect="evade"
                spotlight={true}
                tabIndex={0}
                role="region"
                aria-label={group.category}
                className="skill-card h-full p-6 flex flex-col justify-between group cursor-pointer"
              >
                <div className="relative z-20 flex flex-col justify-between h-full [transform-style:preserve-3d]">
                  {/* Top Metadata & Heading with 3D Depth */}
                  <div className="[transform:translateZ(24px)]">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="chip text-[11px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md">
                          0{idx + 1}
                        </span>
                        <span className="skill-card-muted text-[10px] font-mono">
                          {group.tag}
                        </span>
                      </div>
                      <div
                        className="icon-box p-2 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      >
                        <group.icon className="icon w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-serif font-light tracking-tight transition-colors">
                      {group.category}
                    </h3>
                    <p className="text-[11px] font-mono mt-0.5 mb-5">
                      {group.subtitle}
                    </p>
                  </div>

                  {/* Skills Pill Chips with subtle 3D Elevation */}
                  <div className="skill-card-divider flex flex-wrap gap-1.5 pt-4 [transform:translateZ(14px)]">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="chip text-[10px] sm:text-[10.5px] font-mono px-2.5 py-1 rounded-full transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Core Strengths Strip */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8"
        >
          <TiltCard
            tiltLimit={6}
            scale={0.99}
            perspective={1000}
            effect="evade"
            spotlight={true}
            tabIndex={0}
            role="region"
            aria-label="Operational Attributes & Core Strengths"
            className="skill-card rounded-2xl p-5 sm:p-6 group cursor-pointer"
          >
            <div className="relative z-20 flex flex-col justify-between h-full [transform-style:preserve-3d]">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--card-divider)] mb-3.5 [transform:translateZ(20px)]">
                <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-700 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  Operational Attributes & Core Strengths
                </span>
                <span className="text-[10px] font-mono text-[var(--card-text-muted)]">Work Ethic & Culture</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 [transform:translateZ(14px)]">
                {CORE_STRENGTHS.map((strength) => (
                  <span
                    key={strength}
                    className="chip text-[11px] font-mono px-3 py-1.5 rounded-full transition-transform hover:scale-[1.03] flex items-center gap-1.5 cursor-default"
                  >
                    <span className="text-emerald-400 text-xs">✦</span>
                    <span>{strength}</span>
                  </span>
                ))}
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
      </KineticGrid>
    </section>
  )
}
