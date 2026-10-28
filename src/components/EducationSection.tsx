"use client"

import { useState, lazy, Suspense } from "react"
import { motion } from "framer-motion"
import {
  GraduationCap,
  Award,
  Cloud,
  Code2,
  Sparkles,
  CheckCircle2,
  MapPin,
  Calendar,
  BookOpen,
  Terminal,
  Compass,
  Layers,
  Loader2,
} from "lucide-react"
import { Timeline, type TimelineEntry } from "@/components/ui/timeline"

// Lazy-load 3D Hill Climb game engine to keep initial page bundle ultra-fast
const HillClimbExperience = lazy(() => import("./hill-climb/HillClimbExperience"))

export default function EducationSection() {
  const [viewMode, setViewMode] = useState<"3d" | "timeline">("3d")
  const timelineData: TimelineEntry[] = [
    // Milestone 1: 2021 (School Foundations - Secondary Education)
    {
      title: "2021",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-white/10 bg-neutral-950/80 backdrop-blur-xl p-6 sm:p-8 hover:border-zinc-500/40 transition-all duration-300 shadow-xl group"
        >
          {/* Header Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 mb-5">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                01 · Secondary Education
              </span>
              <span className="text-xs font-mono text-neutral-400">Class X</span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400">
              <Calendar className="w-3.5 h-3.5 text-neutral-500" />
              Graduated 2021
            </span>
          </div>

          {/* School Name & Location */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="text-xl sm:text-2xl font-serif font-light text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                Vivekananda Siksha Niketan High School (VSNHS)
              </h4>
              <p className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 mt-1">
                <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                West Bengal, India · WBBSE Board
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-mono font-semibold">
                ✦ 92.0%
              </div>
              <p className="text-[10px] font-mono text-neutral-500 mt-1">Outstanding Merit</p>
            </div>
          </div>

          {/* Narrative & Focus */}
          <p className="text-xs sm:text-sm text-neutral-300 font-sans mt-4 leading-relaxed">
            Completed secondary schooling under the West Bengal Board of Secondary Education (WBBSE) with distinction. Built strong academic foundations in advanced mathematics, analytical reasoning, physical sciences, and early computational problem solving.
          </p>

          {/* Key Takeaways */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-5 pt-4 border-t border-white/10">
            <div className="flex items-start gap-2 text-xs text-neutral-300 font-sans">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Ranked in the top echelon with 92% aggregate academic distinction.</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-neutral-300 font-sans">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Excellence in quantitative mathematics and physical science foundations.</span>
            </div>
          </div>

          {/* Skill Pills */}
          <div className="flex flex-wrap gap-1.5 mt-5">
            {["WBBSE Board", "Secondary School", "Score: 92%", "Mathematics", "Physical Science", "Academic Distinction"].map((tag) => (
              <span
                key={tag}
                className="text-[10.5px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Contextual Visual Card */}
          <div className="relative mt-6 rounded-xl overflow-hidden border border-white/10 shadow-lg max-h-48 group-hover:border-white/20 transition-all">
            <img
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=80"
              alt="Secondary School Academic Foundations"
              className="w-full h-44 object-cover filter brightness-[0.7] group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-neutral-300">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                Foundational Academic Excellence
              </span>
              <span className="text-[11px] text-emerald-400">✦ Verified Transcript</span>
            </div>
          </div>
        </motion.div>
      ),
    },

    // Milestone 2: 2023 (School Journey - Higher Secondary Science)
    {
      title: "2023",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-white/10 bg-neutral-950/80 backdrop-blur-xl p-6 sm:p-8 hover:border-zinc-500/40 transition-all duration-300 shadow-xl group"
        >
          {/* Header Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 mb-5">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20">
                02 · Higher Secondary
              </span>
              <span className="text-xs font-mono text-neutral-400">Class XII · Pure Science</span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400">
              <Calendar className="w-3.5 h-3.5 text-neutral-500" />
              Graduated 2023
            </span>
          </div>

          {/* School Name & Location */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="text-xl sm:text-2xl font-serif font-light text-white tracking-tight group-hover:text-amber-300 transition-colors">
                Bankura Banga Vidyalaya
              </h4>
              <p className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 mt-1">
                <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                West Bengal, India · WBCHSE Board
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-mono font-semibold">
                ✦ 72.0%
              </div>
              <p className="text-[10px] font-mono text-neutral-500 mt-1">Science Stream</p>
            </div>
          </div>

          {/* Narrative & Focus */}
          <p className="text-xs sm:text-sm text-neutral-300 font-sans mt-4 leading-relaxed">
            Completed Class 12 Higher Secondary education with a focus on Pure Sciences and Mathematics. Mastered theoretical Physics, Chemistry, and Advanced Calculus, alongside introductory computer science syntax and programmatic algorithms in C.
          </p>

          {/* Key Takeaways */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-5 pt-4 border-t border-white/10">
            <div className="flex items-start gap-2 text-xs text-neutral-300 font-sans">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>Rigorous coursework in Differential Calculus, Vectors & Mechanics.</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-neutral-300 font-sans">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>Foundational programming logic, control structures & structured coding.</span>
            </div>
          </div>

          {/* Skill Pills */}
          <div className="flex flex-wrap gap-1.5 mt-5">
            {["WBCHSE Board", "Higher Secondary", "Score: 72%", "Physics", "Chemistry", "Mathematics", "C Programming Basics"].map((tag) => (
              <span
                key={tag}
                className="text-[10.5px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Contextual Visual Card */}
          <div className="relative mt-6 rounded-xl overflow-hidden border border-white/10 shadow-lg max-h-48 group-hover:border-white/20 transition-all">
            <img
              src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1000&q=80"
              alt="Higher Secondary Science Studies"
              className="w-full h-44 object-cover filter brightness-[0.7] group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-neutral-300">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                Pure Science & Computational Fundamentals
              </span>
              <span className="text-[11px] text-amber-400">✦ Verified Credential</span>
            </div>
          </div>
        </motion.div>
      ),
    },

    // Milestone 3: Late 2023 (College Inception & DSA Mastery)
    {
      title: "Late 2023",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-white/10 bg-neutral-950/80 backdrop-blur-xl p-6 sm:p-8 hover:border-zinc-500/40 transition-all duration-300 shadow-xl group"
        >
          {/* Header Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 mb-5">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20">
                03 · Inception & DSA Mastery
              </span>
              <span className="text-xs font-mono text-neutral-400">B.E. CSE Start · Program Credential</span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400">
              <Calendar className="w-3.5 h-3.5 text-neutral-500" />
              Aug – Dec 2023
            </span>
          </div>

          {/* Program & Institution */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="text-xl sm:text-2xl font-serif font-light text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                Certification in Mastering Data Structures & Algorithms
              </h4>
              <p className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 mt-1">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                Chandigarh University CSE Inception & Algorithmic Problem Solving
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-mono font-semibold">
                ✦ 150+ Solved
              </div>
              <p className="text-[10px] font-mono text-neutral-500 mt-1">Complexity & Logic</p>
            </div>
          </div>

          {/* Narrative & Focus */}
          <p className="text-xs sm:text-sm text-neutral-300 font-sans mt-4 leading-relaxed">
            Commenced Bachelor of Engineering in Computer Science and Engineering. Simultaneously enrolled in an intensive program focused on algorithmic problem solving, time/space complexity analysis ($O(1)$ to $O(N \log N)$), memory models, and core object-oriented paradigms.
          </p>

          {/* Key Takeaways */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-5 pt-4 border-t border-white/10">
            <div className="flex items-start gap-2 text-xs text-neutral-300 font-sans">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span>Linear & non-linear structures: Stacks, Queues, Binary Trees, and Hash Maps.</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-neutral-300 font-sans">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span>Sorting, recursion, binary search patterns, and two-pointer strategies.</span>
            </div>
          </div>

          {/* Skill Pills */}
          <div className="flex flex-wrap gap-1.5 mt-5">
            {["Data Structures", "Algorithms", "C++", "Java", "Time Complexity", "Object-Oriented Design", "DBMS Basics"].map((tag) => (
              <span
                key={tag}
                className="text-[10.5px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Contextual Visual Card */}
          <div className="relative mt-6 rounded-xl overflow-hidden border border-white/10 shadow-lg max-h-48 group-hover:border-white/20 transition-all">
            <img
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80"
              alt="Algorithmic problem solving and terminal code"
              className="w-full h-44 object-cover filter brightness-[0.7] group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-neutral-300">
              <span className="flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                Algorithmic Complexity & Foundations
              </span>
              <span className="text-[11px] text-cyan-400">✦ Certified Program</span>
            </div>
          </div>
        </motion.div>
      ),
    },

    // Milestone 4: 2024 (Zinnovatio Hackathon & Prototype Engineering)
    {
      title: "2024",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-white/10 bg-neutral-950/80 backdrop-blur-xl p-6 sm:p-8 hover:border-zinc-500/40 transition-all duration-300 shadow-xl group"
        >
          {/* Header Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 mb-5">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-rose-400 font-semibold px-2.5 py-1 rounded-md bg-rose-500/10 border border-rose-500/20">
                04 · Competitive Engineering
              </span>
              <span className="text-xs font-mono text-neutral-400">Collaborative Sprint</span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400">
              <Calendar className="w-3.5 h-3.5 text-neutral-500" />
              2024
            </span>
          </div>

          {/* Hackathon Name */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="text-xl sm:text-2xl font-serif font-light text-white tracking-tight group-hover:text-rose-300 transition-colors">
                Zinnovatio Hackathon Participant & Prototype Developer
              </h4>
              <p className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 mt-1">
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                Zinnovatio · Rapid Agile Prototyping & Defect Testing
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-mono font-semibold">
                ✦ Sprint Certified
              </div>
              <p className="text-[10px] font-mono text-neutral-500 mt-1">Prototype Delivery</p>
            </div>
          </div>

          {/* Narrative & Focus */}
          <p className="text-xs sm:text-sm text-neutral-300 font-sans mt-4 leading-relaxed">
            Collaborated in a time-bound hackathon sprint delivering an end-to-end web prototype under strict deadline constraints. Spearheaded interface responsiveness, REST API workflow integration, and cross-browser defect verification to achieve a release-ready project demonstration.
          </p>

          {/* Key Takeaways */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-5 pt-4 border-t border-white/10">
            <div className="flex items-start gap-2 text-xs text-neutral-300 font-sans">
              <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
              <span>Engineered interactive component views with dynamic state transitions.</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-neutral-300 font-sans">
              <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
              <span>Conducted fast regression cycles, defect logs, and stakeholder presentation.</span>
            </div>
          </div>

          {/* Skill Pills */}
          <div className="flex flex-wrap gap-1.5 mt-5">
            {["Hackathon Prototype", "Rapid Delivery", "React.js", "REST APIs", "Issue Reproduction", "Team Sprint"].map((tag) => (
              <span
                key={tag}
                className="text-[10.5px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Contextual Visual Card */}
          <div className="relative mt-6 rounded-xl overflow-hidden border border-white/10 shadow-lg max-h-48 group-hover:border-white/20 transition-all">
            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80"
              alt="Hackathon presentation and prototype collaboration"
              className="w-full h-44 object-cover filter brightness-[0.7] group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-neutral-300">
              <span className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-rose-400" />
                Competitive Team Execution
              </span>
              <span className="text-[11px] text-rose-400">✦ Verified Participant</span>
            </div>
          </div>
        </motion.div>
      ),
    },

    // Milestone 5: 2024 – 2025 (IIT NPTEL Cloud Computing Certification)
    {
      title: "2024 – 2025",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-white/10 bg-neutral-950/80 backdrop-blur-xl p-6 sm:p-8 hover:border-zinc-500/40 transition-all duration-300 shadow-xl group"
        >
          {/* Header Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 mb-5">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                05 · Industry Certification
              </span>
              <span className="text-xs font-mono text-neutral-400">IIT Kharagpur / NPTEL</span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400">
              <Calendar className="w-3.5 h-3.5 text-neutral-500" />
              Verified 2024–2025
            </span>
          </div>

          {/* Certificate Title */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="text-xl sm:text-2xl font-serif font-light text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                NPTEL Cloud Computing Certification
              </h4>
              <p className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 mt-1">
                <Cloud className="w-3.5 h-3.5 text-emerald-400" />
                Ministry of Education, Govt. of India / IIT Kharagpur
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-mono font-semibold">
                ✦ Certified
              </div>
              <p className="text-[10px] font-mono text-neutral-500 mt-1">IIT / NPTEL</p>
            </div>
          </div>

          {/* Narrative & Focus */}
          <p className="text-xs sm:text-sm text-neutral-300 font-sans mt-4 leading-relaxed">
            Rigorous certification curriculum covering distributed cloud systems, IaaS/PaaS/SaaS architectures, hardware virtualization, resource allocation, cloud storage systems, hypervisors, and security compliance models.
          </p>

          {/* Key Takeaways */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-5 pt-4 border-t border-white/10">
            <div className="flex items-start gap-2 text-xs text-neutral-300 font-sans">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Virtualization layers, hypervisor management, and container isolation concepts.</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-neutral-300 font-sans">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Distributed fault tolerance, high availability, and cloud storage architectures.</span>
            </div>
          </div>

          {/* Skill Pills */}
          <div className="flex flex-wrap gap-1.5 mt-5">
            {["Cloud Computing", "IIT Kharagpur", "NPTEL", "Virtualization", "IaaS / PaaS / SaaS", "Distributed Systems", "Cloud Security"].map((tag) => (
              <span
                key={tag}
                className="text-[10.5px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Contextual Visual Card */}
          <div className="relative mt-6 rounded-xl overflow-hidden border border-white/10 shadow-lg max-h-48 group-hover:border-white/20 transition-all">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80"
              alt="Cloud Computing and Distributed Infrastructure"
              className="w-full h-44 object-cover filter brightness-[0.7] group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-neutral-300">
              <span className="flex items-center gap-1.5">
                <Cloud className="w-3.5 h-3.5 text-emerald-400" />
                Cloud Systems & Infrastructure Architecture
              </span>
              <span className="text-[11px] text-emerald-400">✦ Verified National Certificate</span>
            </div>
          </div>
        </motion.div>
      ),
    },

    // Milestone 6: 2025 – 2027 (Degree & Engineering Readiness)
    {
      title: "2025 – 2027",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-emerald-500/30 bg-neutral-950/90 backdrop-blur-xl p-6 sm:p-8 hover:border-emerald-400/50 transition-all duration-300 shadow-2xl group"
        >
          {/* Header Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 mb-5">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                06 · Undergrad Degree · Target 2027
              </span>
              <span className="text-xs font-mono text-neutral-400">Final Phase</span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400">
              <Calendar className="w-3.5 h-3.5" />
              2023 – 2027 (Ongoing)
            </span>
          </div>

          {/* University Name & Degree */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="text-xl sm:text-2xl font-serif font-light text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                Chandigarh University
              </h4>
              <p className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 mt-1">
                <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                Punjab, India · Department of Computer Science & Engineering
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-mono font-semibold">
                ✦ CGPA: 6.97
              </div>
              <p className="text-[10px] font-mono text-neutral-500 mt-1">B.E. Computer Science</p>
            </div>
          </div>

          <h5 className="text-sm sm:text-base font-serif font-light text-neutral-200 mt-3">
            Bachelor of Engineering in Computer Science and Engineering
          </h5>

          {/* Narrative & Focus */}
          <p className="text-xs sm:text-sm text-neutral-300 font-sans mt-3 leading-relaxed">
            Advancing deep technical execution in core software engineering, REST API backend services, database fundamentals, software testing methodologies, defect tracking, and release readiness. Actively preparing for roles in Software Engineering, Testing/QA, and Product Operations.
          </p>

          {/* Key Takeaways */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-5 pt-4 border-t border-white/10">
            <div className="flex items-start gap-2 text-xs text-neutral-300 font-sans">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Full-stack web execution: Spring Boot REST APIs, React, Next.js, and SQL/MongoDB.</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-neutral-300 font-sans">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>QA mindset: regression flows, automated checks, defect lifecycle triage, and user flow documentation.</span>
            </div>
          </div>

          {/* Skill Pills */}
          <div className="flex flex-wrap gap-1.5 mt-5">
            {[
              "B.E. CSE",
              "Chandigarh University",
              "CGPA: 6.97",
              "Software Testing & QA",
              "Spring Boot APIs",
              "Product Operations",
              "Full-Stack Web",
              "Release Readiness",
            ].map((tag) => (
              <span
                key={tag}
                className="text-[10.5px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Contextual Visual Card */}
          <div className="relative mt-6 rounded-xl overflow-hidden border border-emerald-500/20 shadow-lg max-h-48 group-hover:border-emerald-500/40 transition-all">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80"
              alt="Engineering campus and graduation trajectory"
              className="w-full h-44 object-cover filter brightness-[0.7] group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-neutral-300">
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                Target Graduation 2027 · Chandigarh University
              </span>
              <span className="text-[11px] text-emerald-400">✦ Active Engineering Degree</span>
            </div>
          </div>
        </motion.div>
      ),
    },
  ]

  return (
    <section
      id="education"
      className="relative w-full bg-[#EBE9E5] text-[#151514] overflow-hidden border-t border-neutral-300"
    >
      {/* Subtle Ambient Background Light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-emerald-500/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Top Header / Meta Navbar inside section container */}
      <div className="max-w-7xl mx-auto pt-20 px-4 md:px-8 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-300/80 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-[13px] font-mono tracking-wider text-neutral-600 font-medium uppercase">
              Education & Certifications
            </span>
            <span className="text-[11px] font-mono text-emerald-700 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              ✦ 3D Interactive
            </span>
          </div>

          {/* Mode Switcher Pill */}
          <div className="flex items-center p-1 rounded-xl bg-white/80 border border-neutral-300 text-xs font-mono shadow-sm">
            <button
              type="button"
              onClick={() => setViewMode("3d")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === "3d"
                  ? "bg-emerald-500/20 text-emerald-800 border border-emerald-500/30 font-semibold shadow-sm"
                  : "text-neutral-500 hover:text-black"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>3D Hill Climb</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("timeline")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === "timeline"
                  ? "bg-emerald-500/20 text-emerald-800 border border-emerald-500/30 font-semibold shadow-sm"
                  : "text-neutral-500 hover:text-black"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Full Timeline</span>
            </button>
          </div>
        </div>

        {/* Section Intro Headline */}
        <div className="mb-8">
          <p className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-semibold mb-2">
            Milestones & Progression
          </p>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-zinc-900 tracking-tight">
            From school foundations to computer science engineering.
          </h3>
          <p className="text-sm text-neutral-600 max-w-3xl mt-2 leading-relaxed font-sans">
            Drive along the 3D hilly terrain to explore milestones, academic qualifications, and technical certifications.
            Use <kbd className="px-1.5 py-0.5 rounded bg-white border border-neutral-300 text-neutral-800 font-mono text-xs shadow-xs">D / →</kbd> to accelerate and <kbd className="px-1.5 py-0.5 rounded bg-white border border-neutral-300 text-neutral-800 font-mono text-xs shadow-xs">A / ←</kbd> to brake.
          </p>
        </div>

        {/* Dynamic Display Mode */}
        {viewMode === "3d" ? (
          <div className="pb-20">
            <Suspense
              fallback={
                <div className="w-full h-[540px] sm:h-[640px] lg:h-[700px] flex flex-col items-center justify-center bg-white/70 rounded-3xl border border-neutral-300 font-mono text-neutral-600 gap-3">
                  <Loader2 className="w-7 h-7 text-emerald-600 animate-spin" />
                  <span className="text-sm">Initializing 3D Hill Climb Engine...</span>
                </div>
              }
            >
              <HillClimbExperience onSwitchToTimeline={() => setViewMode("timeline")} />
            </Suspense>
          </div>
        ) : (
          <div className="pb-10">
            {/* Aceternity Animated Milestones Timeline */}
            <Timeline
              data={timelineData}
              eyebrow="Milestones & Timeline"
              title="Academic Archive & Complete Credentials"
              description="A chronological progression documenting secondary schooling, higher secondary pure sciences, engineering inception at Chandigarh University, and continuous industry certifications."
              className="bg-transparent dark:bg-transparent"
              beamGradient="bg-gradient-to-t from-emerald-500 via-cyan-500 to-transparent from-[0%] via-[12%] rounded-full shadow-[0_0_12px_rgba(16,185,129,0.7)]"
            />
          </div>
        )}
      </div>
    </section>
  )
}
