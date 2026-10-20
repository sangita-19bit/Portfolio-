"use client"

import { motion } from "framer-motion"

interface SkillGroup {
  category: string
  subtitle: string
  skills: string[]
  accent: string
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Testing & Product Quality",
    subtitle: "Validation & Defect Analysis",
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
    accent: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  },
  {
    category: "Support & Documentation",
    subtitle: "Troubleshooting & Communication",
    skills: [
      "Technical Troubleshooting",
      "Issue Reproduction",
      "Incident Documentation",
      "User-Flow Documentation",
      "Stakeholder Communication",
    ],
    accent: "text-blue-400 border-blue-500/30 bg-blue-500/10",
  },
  {
    category: "Languages & Data",
    subtitle: "Core Programming & Queries",
    skills: ["Python", "SQL", "Java", "C", "C++", "JavaScript", "HTML", "CSS"],
    accent: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  },
  {
    category: "Frontend Engineering",
    subtitle: "Modern Component Architecture",
    skills: ["React.js", "Next.js", "Tailwind CSS", "Responsive Web Design"],
    accent: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
  },
  {
    category: "Backend & Databases",
    subtitle: "API Services & Data Stores",
    skills: ["Spring Boot", "REST APIs", "MongoDB", "SQL", "Data Modeling Basics"],
    accent: "text-violet-400 border-violet-500/30 bg-violet-500/10",
  },
  {
    category: "Core CS & Tools",
    subtitle: "Foundations & Development Stack",
    skills: [
      "Data Structures & Algorithms",
      "OOP",
      "DBMS",
      "Git",
      "GitHub",
      "VS Code",
      "Command Line Basics",
    ],
    accent: "text-rose-400 border-rose-500/30 bg-rose-500/10",
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
    <section id="skills" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-black text-white overflow-hidden border-t border-white/10">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Top Header / Meta Navbar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-10">
          <span className="text-xs sm:text-[13px] font-mono tracking-wider text-neutral-300 font-medium uppercase">
            Technical Capabilities
          </span>
          <span className="text-xs sm:text-[13px] font-mono tracking-wider text-neutral-400">
            06 Domains · Verified Competencies
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

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {SKILL_GROUPS.map((group, idx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="rounded-2xl border border-white/10 bg-neutral-950/70 backdrop-blur-xl p-5 flex flex-col justify-between hover:border-white/20 transition-all duration-300 shadow-lg group"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                    0{idx + 1}
                  </span>
                  <span className="text-[9.5px] font-mono text-neutral-500">
                    {group.skills.length} skills
                  </span>
                </div>
                <h3 className="text-base font-serif font-light text-white tracking-tight">
                  {group.category}
                </h3>
                <p className="text-[11px] font-mono text-neutral-400 mt-0.5 mb-4">
                  {group.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 group-hover:border-white/20 group-hover:text-white transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Core Strengths Strip */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 rounded-2xl border border-white/10 bg-neutral-950/50 backdrop-blur-xl p-5"
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3.5">
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-semibold">
              Operational Attributes & Core Strengths
            </span>
            <span className="text-[10px] font-mono text-neutral-500">Work Ethic & Culture</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {CORE_STRENGTHS.map((strength) => (
              <span
                key={strength}
                className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300"
              >
                ✦ {strength}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
