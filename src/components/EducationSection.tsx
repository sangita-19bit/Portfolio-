"use client"

import { motion } from "framer-motion"

interface EducationItem {
  institution: string
  location: string
  degree: string
  score: string
  period: string
}

interface CertificationItem {
  title: string
  issuer: string
  description: string
  tag: string
}

const EDUCATION_DATA: EducationItem[] = [
  {
    institution: "Chandigarh University",
    location: "Punjab, India",
    degree: "Bachelor of Engineering in Computer Science and Engineering",
    score: "CGPA: 6.97",
    period: "2023 – 2027",
  },
  {
    institution: "Bankura Banga Vidyalaya",
    location: "West Bengal, India",
    degree: "Higher Secondary (WBCHSE)",
    score: "Percentage: 72%",
    period: "2023",
  },
  {
    institution: "VSNHS",
    location: "West Bengal, India",
    degree: "Secondary Education (WBBSE)",
    score: "Percentage: 92%",
    period: "2021",
  },
]

const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    title: "NPTEL Cloud Computing Certification",
    issuer: "NPTEL / IIT",
    description:
      "Comprehensive certification covering cloud architectures, virtualization, resource allocation, and distributed-computing concepts.",
    tag: "Cloud & Systems",
  },
  {
    title: "Zinnovatio Hackathon Participant",
    issuer: "Zinnovatio",
    description:
      "Collaborative hackathon experience applying rapid problem-solving, structured execution, prototype development, and stakeholder presentation.",
    tag: "Hackathon",
  },
  {
    title: "Certification in Mastering DSA",
    issuer: "DSA Program",
    description:
      "Rigorous foundations in data structures, algorithmic complexity analysis, and hands-on algorithmic problem solving.",
    tag: "Algorithms & CS",
  },
]

export default function EducationSection() {
  return (
    <section id="education" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-black text-white overflow-hidden border-t border-white/10">
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Top Header / Meta Navbar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-10">
          <span className="text-xs sm:text-[13px] font-mono tracking-wider text-neutral-300 font-medium uppercase">
            Education & Certifications
          </span>
          <span className="text-xs sm:text-[13px] font-mono tracking-wider text-neutral-400">
            Academic Track · Verified Credentials
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Column 1: Academic Education */}
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-semibold">
                01 · Academic Background
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-light text-white tracking-tight mt-1">
                Formal Education
              </h2>
            </div>

            <div className="space-y-4">
              {EDUCATION_DATA.map((item, idx) => (
                <motion.div
                  key={item.institution}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="rounded-2xl border border-white/10 bg-neutral-950/60 backdrop-blur-xl p-5 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-serif font-light text-white tracking-tight">
                        {item.institution}
                      </h3>
                      <p className="text-xs text-neutral-400 font-mono mt-0.5">{item.location}</p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 shrink-0">
                      {item.period}
                    </span>
                  </div>

                  <p className="text-xs sm:text-[13px] text-neutral-300 font-sans mt-3">
                    {item.degree}
                  </p>

                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-emerald-400 font-medium">
                      {item.score}
                    </span>
                    <span className="text-[9.5px] font-mono text-neutral-500">Verified Transcript</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Column 2: Certifications & Achievements */}
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-semibold">
                02 · Credentials & Programs
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-light text-white tracking-tight mt-1">
                Certifications & Achievements
              </h2>
            </div>

            <div className="space-y-4">
              {CERTIFICATIONS_DATA.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="rounded-2xl border border-white/10 bg-neutral-950/60 backdrop-blur-xl p-5 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-serif font-light text-white tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-neutral-400 font-mono mt-0.5">{item.issuer}</p>
                    </div>
                    <span className="text-[9.5px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 shrink-0">
                      {item.tag}
                    </span>
                  </div>

                  <p className="text-xs leading-relaxed text-neutral-300 font-sans mt-3">
                    {item.description}
                  </p>

                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-neutral-400">
                      Credential Validated
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400">✦ Certified</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
