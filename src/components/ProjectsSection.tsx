"use client"

import * as React from "react"
import { LayoutGroup, motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { X, Globe, ExternalLink } from "lucide-react"
import { ArtCanvas, BACK_PATH, FRONT_PATH, ArtPreset } from "@/components/ui/glass-folder-cards"

// DEV CONSTANT: Set to 5 to slow all durations and delays 5x for frame-by-frame verification
const SLOW = 1
const EASE = [0.22, 1, 0.36, 1] as const
const FOLDER_ROT = [-4, -1.5, 3] as const
const KINDS = ["visual", "details", "links"] as const

export interface ProjectItem {
  id: string
  title: string
  subtitle: string
  category: string
  timeline: string
  tone: "dark" | "light"
  art: ArtPreset
  seed: number
  image: string
  shortDescription: string
  longDescription: string
  highlights: string[]
  tags: string[]
  githubUrl: string
  liveUrl: string
}

const PROJECTS: ProjectItem[] = [
  {
    id: "rentflow",
    title: "RentFlow",
    subtitle: "Online Property Rental & Tenant Management",
    category: "Full-Stack System",
    timeline: "Dec. 2025 – Apr. 2026",
    tone: "dark",
    art: "aurora",
    seed: 7,
    image: "/assets/projects/rentflow-dashboard.png",
    shortDescription:
      "Full-stack property rental ecosystem with role-based workflows for property listings, tenants, automated rent tracking, and administrative operations.",
    longDescription:
      "Engineered Spring Boot REST APIs and database-backed tenancy modules. Validated role-based workflows, tested request-response flows, identified integration defects, and improved release readiness with end-to-end user-journey verification.",
    highlights: [
      "Built Spring Boot REST APIs & database modules; tested request-response flows and debugged integration issues",
      "Developed and validated role-based workflows for property listings, tenants, rent tracking & admin operations",
      "Improved release readiness by verifying end-to-end user journeys and maintaining clear feature-flow documentation",
    ],
    tags: ["React", "Next.js", "Spring Boot", "REST APIs", "SQL"],
    githubUrl: "https://github.com/sangita-19bit/Online-Property-Rental-Tenant-Management-Platform",
    liveUrl: "https://online-property-rental-tenant-manag.vercel.app",
  },
  {
    id: "blinkexam",
    title: "BlinkExam",
    subtitle: "Online Examination & Assessment Engine",
    category: "Assessment Engine",
    timeline: "Aug. 2025 – Oct. 2025",
    tone: "dark",
    art: "ember",
    seed: 14,
    image: "/assets/projects/blink-exam-dashboard.png",
    shortDescription:
      "High-reliability online examination platform supporting dynamic quiz creation, strict timed attempts, automated scoring algorithms, and candidate analytics.",
    longDescription:
      "Built an online examination engine and designed comprehensive functional test scenarios for quiz creation, timed attempts, submission, evaluation, and result tracking with attention to edge cases and state consistency.",
    highlights: [
      "Designed functional test scenarios for quiz creation, timed attempts, submission, and automated evaluation",
      "Validated critical and regression-prone workflows, tracking automated scoring accuracy and edge cases",
      "Performed root-cause debugging of failed frontend-backend interactions and documented operational fixes",
    ],
    tags: ["Next.js", "React", "Spring Boot", "MongoDB", "Testing"],
    githubUrl: "https://github.com/sangita-19bit/Online-Examination-System",
    liveUrl: "https://online-examination-system-ivory.vercel.app",
  },
  {
    id: "swan-botanics",
    title: "Swan Botanics",
    subtitle: "Luxury E-Commerce & Editorial Storefront",
    category: "Responsive E-Commerce",
    timeline: "Aug. 2025 – Oct. 2025",
    tone: "dark",
    art: "verdant",
    seed: 21,
    image: "/assets/projects/swan-botanicals-dashboard.png",
    shortDescription:
      "Responsive e-commerce storefront celebrating natural living with curated catalog views, dynamic product filtering, streamlined cart flows, and cross-device usability.",
    longDescription:
      "Developed and tested a responsive e-commerce interface with catalog views, dynamic product updates, and user-friendly navigation. Resolved layout defects across screen sizes and structured maintainable catalog flows.",
    highlights: [
      "Developed responsive interface with curated catalog views, real-time filtering, and dynamic product updates",
      "Checked interface behavior across screen sizes, resolved layout defects, and improved component consistency",
      "Structured product-information and catalog-management flows to support maintainable updates and clear user journeys",
    ],
    tags: ["React", "Next.js", "Tailwind CSS", "HTML/CSS", "Responsive UI"],
    githubUrl: "https://github.com/sangita-19bit/Ecommerce-",
    liveUrl: "https://ecommerce-swan-botanicals-5cwd.vercel.app",
  },
]

function GitHubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  )
}

/**
 * Visual content rendered inside resting folder cards
 * Keeps headers and miniature cues crisp and peeking cleanly out of the folder flap
 */
function FolderCardContent({ kind, project }: { kind: "visual" | "details" | "links"; project: ProjectItem }) {
  if (kind === "visual") {
    return (
      <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
        {/* Subtle background image watermark */}
        <div className="absolute inset-0 opacity-35 pointer-events-none">
          <img src={project.image} alt="" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent" />
        </div>

        {/* Peeking Tab Header */}
        <div className="relative z-10 flex items-center justify-between px-2 pt-1.5 pb-1 border-b border-white/15 bg-black/40 backdrop-blur-sm rounded-t-xl">
          <div className="inline-flex items-center gap-1 text-[9px] font-mono text-emerald-400 font-semibold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>01 · Visual</span>
          </div>
          <span className="text-[8px] font-mono text-white/60">{project.timeline.split("–")[0]?.trim()}</span>
        </div>

        {/* Thumbnail Preview Area */}
        <div className="relative z-10 p-2 flex items-end justify-between mt-auto">
          <div className="truncate">
            <div className="text-[10px] font-serif text-white font-light tracking-wide truncate">{project.title}</div>
            <div className="text-[8px] font-mono text-neutral-400 truncate">{project.category}</div>
          </div>
          <span className="text-[7.5px] font-mono text-emerald-400 border border-emerald-500/30 bg-emerald-500/15 px-1.5 py-0.5 rounded-full shrink-0 ml-1">
            Live
          </span>
        </div>
      </div>
    )
  }

  if (kind === "details") {
    return (
      <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
        {/* Peeking Tab Header */}
        <div className="flex items-center justify-between px-2 pt-1.5 pb-1 border-b border-white/15 bg-black/40 backdrop-blur-sm rounded-t-xl">
          <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-400/90 font-semibold">
            02 · System
          </span>
          <span className="text-[8px] font-mono text-neutral-300 px-1 py-0.2 rounded bg-white/10">
            {project.category.split(" ")[0]}
          </span>
        </div>

        {/* Schematic Mock Lines */}
        <div className="space-y-1.5 px-2 my-auto opacity-40">
          <div className="h-1 bg-white/30 rounded-full w-4/5" />
          <div className="h-1 bg-white/20 rounded-full w-full" />
          <div className="h-1 bg-white/15 rounded-full w-2/3" />
        </div>

        {/* Tags Row */}
        <div className="flex items-center gap-1 px-2 pb-1.5 overflow-hidden mt-auto">
          {project.tags.slice(0, 2).map((t) => (
            <span key={t} className="text-[7.5px] font-mono px-1 py-0.5 rounded bg-white/10 text-neutral-300 truncate">
              {t}
            </span>
          ))}
        </div>
      </div>
    )
  }

  // links
  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
      {/* Peeking Tab Header */}
      <div className="flex items-center justify-between px-2 pt-1.5 pb-1 border-b border-white/15 bg-black/40 backdrop-blur-sm rounded-t-xl">
        <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-200 font-semibold">
          03 · Links
        </span>
        <span className="text-[8px] font-mono text-emerald-400">Live ↗</span>
      </div>

      {/* Mini Action Badges */}
      <div className="flex flex-col gap-1.5 px-2 my-auto">
        <div className="flex items-center gap-1 text-[8px] font-mono text-emerald-300/90">
          <Globe className="w-2.5 h-2.5 text-emerald-400" />
          <span>Demo Platform</span>
        </div>
        <div className="flex items-center gap-1 text-[8px] font-mono text-neutral-400">
          <GitHubIcon className="w-2.5 h-2.5 text-neutral-300" />
          <span>Source Code</span>
        </div>
      </div>

      <div className="text-[7.5px] font-mono text-neutral-500 px-2 pb-1.5 truncate mt-auto">
        Click to expand
      </div>
    </div>
  )
}

/**
 * Rich interactive card content rendered when on the stage (Detail Row)
 */
function DetailCardContent({
  kind,
  project,
  onClose,
}: {
  kind: "visual" | "details" | "links"
  project: ProjectItem
  onClose?: () => void
}) {
  if (kind === "visual") {
    return (
      <div className="relative w-full h-full flex flex-col justify-between">
        {/* Inner Framed Visual Image Link */}
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title} live demo`}
          className="relative w-full h-full rounded-xl overflow-hidden border border-white/15 bg-neutral-900 flex flex-col justify-between group/preview block cursor-pointer"
        >
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover/preview:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/25 to-transparent pointer-events-none" />

          {/* Top Floating Badge */}
          <div className="relative z-10 m-2.5 flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[9.5px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Dashboard</span>
            </div>
            <span className="text-[9.5px] font-mono text-white/80 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/15">
              {project.timeline}
            </span>
          </div>

          {/* Bottom Image Caption */}
          <div className="relative z-10 p-3 pt-6 bg-gradient-to-t from-black/95 to-transparent flex items-end justify-between">
            <div>
              <div className="text-sm font-serif text-white font-light tracking-wide">{project.title}</div>
              <div className="text-[10px] font-mono text-neutral-400">{project.category}</div>
            </div>
            <span className="inline-flex items-center gap-1 text-[9px] font-mono text-emerald-400 border border-emerald-500/30 bg-emerald-500/15 px-2 py-0.5 rounded-full group-hover/preview:bg-emerald-500/25 group-hover/preview:border-emerald-400 transition-colors shadow-[0_0_12px_rgba(16,185,129,0.2)]">
              <span>Open Live</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </span>
          </div>
        </a>
      </div>
    )
  }

  if (kind === "details") {
    return (
      <div className="relative w-full h-full flex flex-col justify-between">
        {/* Header Information */}
        <div>
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
              Architecture & Systems
            </span>
            <span className="text-[10px] font-mono text-neutral-400">{project.category}</span>
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-light text-white tracking-tight mt-2.5">
            {project.title}
          </h3>
          <p className="text-[11px] sm:text-xs font-mono text-neutral-400 mt-0.5">{project.subtitle}</p>

          {/* Body Synopsis */}
          <p className="text-[12px] sm:text-[13px] leading-relaxed text-neutral-300 font-light mt-2.5 line-clamp-3">
            {project.longDescription}
          </p>
        </div>

        {/* Engineering Deliverables / Highlights */}
        <div className="space-y-1.5 py-1">
          {project.highlights.map((highlight, idx) => (
            <div key={idx} className="flex items-start gap-2 text-[11px] sm:text-[12px] text-neutral-300">
              <span className="text-emerald-400 mt-0.5 shrink-0">✦</span>
              <span className="leading-snug">{highlight}</span>
            </div>
          ))}
        </div>

        {/* Tech Stack Pills & Direct Interactive Action CTAs */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9.5px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-neutral-300 hover:border-white/25 hover:text-white transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action CTAs embedded inside Details Card */}
          <div className="flex items-center gap-2">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} live demo`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25 hover:border-emerald-400 hover:text-white text-xs font-mono transition-all duration-200 shadow-[0_0_15px_rgba(16,185,129,0.25)] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>Live Demo</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} GitHub repository`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/15 text-neutral-300 hover:bg-white/15 hover:border-white/30 hover:text-white text-xs font-mono transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <GitHubIcon className="w-3.5 h-3.5" />
              <span>GitHub Repo</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>
        </div>
      </div>
    )
  }

  // links (compact vertical action rail)
  return (
    <div className="relative w-full flex flex-col items-center gap-2.5">
      {/* 1. Earth / Globe Icon (Live Application Demo) */}
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Live Application Demo"
        className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25 hover:border-emerald-400 hover:text-emerald-300 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] cursor-pointer shrink-0"
      >
        <Globe className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-12 duration-300" />

        {/* Tactical Tooltip */}
        <div className="absolute right-full mr-2.5 px-2.5 py-1 rounded-md bg-neutral-900 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono tracking-wider uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 shadow-2xl -translate-x-1 group-hover:translate-x-0 z-50">
          Live Demo ↗
        </div>
      </a>

      {/* 2. GitHub Icon (Source Code Repository) */}
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open GitHub Repository"
        className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 border border-white/15 text-neutral-300 hover:bg-white/15 hover:border-white/35 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] cursor-pointer shrink-0"
      >
        <GitHubIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform group-hover:scale-110 duration-300" />

        {/* Tactical Tooltip */}
        <div className="absolute right-full mr-2.5 px-2.5 py-1 rounded-md bg-neutral-900 border border-white/20 text-neutral-200 text-[10px] font-mono tracking-wider uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 shadow-2xl -translate-x-1 group-hover:translate-x-0 z-50">
          GitHub Repo ↗
        </div>
      </a>

      {/* Subtle Divider */}
      <div className="w-5 h-[1px] bg-white/15 my-0.5 shrink-0" />

      {/* 3. Fold-Back / Close Icon */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Fold back into archive"
        className="group relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-neutral-400 hover:text-white hover:scale-105 active:scale-90 transition-all duration-200 flex items-center justify-center cursor-pointer shrink-0"
      >
        <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />

        {/* Tactical Tooltip */}
        <div className="absolute right-full mr-2.5 px-2 py-0.5 rounded-md bg-neutral-900 border border-white/20 text-neutral-300 text-[9.5px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 shadow-2xl z-50">
          Fold back (Esc)
        </div>
      </button>
    </div>
  )
}

/**
 * Shared FLIP layout card component
 * Uses layoutId so the browser interpolates from folder pocket directly to detail stage row
 */
function Card({
  id,
  kind,
  i,
  rotateFrom,
  rotateTo,
  delay,
  isFolder,
  project,
  onClose,
}: {
  id: string
  kind: "visual" | "details" | "links"
  i: number
  rotateFrom: number
  rotateTo: number
  delay: number
  isFolder: boolean
  project: ProjectItem
  onClose?: () => void
}) {
  const [flying, setFlying] = React.useState(false)
  const shouldReduceMotion = useReducedMotion()
  const dur = shouldReduceMotion ? 0.01 : 0.75 * SLOW
  const d = shouldReduceMotion ? 0 : delay

  // Dedicated sizing and responsive classes
  const cardClassName = isFolder
    ? "absolute inset-0 rounded-2xl border border-white/20 bg-neutral-950/90 backdrop-blur-md p-2.5 flex flex-col justify-between overflow-hidden shadow-xl select-none"
    : kind === "visual"
      ? "w-[240px] sm:w-[280px] md:w-[320px] lg:w-[340px] h-full rounded-2xl border border-white/20 bg-neutral-950/85 backdrop-blur-2xl p-2.5 relative flex flex-col justify-between overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] group shrink-0"
      : kind === "details"
        ? "flex-1 min-w-[280px] md:min-w-0 h-full rounded-2xl border border-white/20 bg-neutral-950/85 backdrop-blur-2xl p-4 sm:p-5 md:p-6 relative flex flex-col justify-between overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
        : "w-12 sm:w-14 shrink-0 self-start h-auto rounded-2xl border border-white/20 bg-neutral-950/85 backdrop-blur-2xl p-2 sm:p-2.5 relative flex flex-col items-center shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-visible"

  return (
    <motion.div
      layoutId={`${id}-${kind}`}
      className={cardClassName}
      style={{
        borderRadius: 20, // Inline style ensures Framer Motion corrects distortion during scale
        zIndex: isFolder ? i + 1 : flying ? 20 : 1,
      }}
      onLayoutAnimationStart={() => setFlying(true)}
      onLayoutAnimationComplete={() => setFlying(false)}
      transition={{ layout: { duration: dur, ease: EASE, delay: d } }}
    >
      {/* 4. Animate rotation with inner motion.div since layout animations don't interpolate rotate */}
      <motion.div
        initial={{ rotate: rotateFrom }}
        animate={{ rotate: rotateTo }}
        transition={{ duration: dur, ease: EASE, delay: d }}
        style={{
          width: "100%",
          height: isFolder || kind !== "links" ? "100%" : "auto",
          transformOrigin: "bottom center",
        }}
      >
        {/* 6. Card inner content uses layout="position" and fades in with a small delay so text is never stretched */}
        <motion.div
          layout="position"
          initial={{ opacity: rotateTo === 0 ? 0 : 1 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: rotateTo === 0 ? (shouldReduceMotion ? 0 : d + 0.35 * SLOW) : 0,
            duration: shouldReduceMotion ? 0.01 : 0.3 * SLOW,
          }}
          style={{
            width: "100%",
            height: isFolder || kind !== "links" ? "100%" : "auto",
          }}
          className={isFolder || kind !== "links" ? "h-full w-full" : "w-full flex flex-col items-center"}
        >
          {isFolder ? (
            <FolderCardContent kind={kind} project={project} />
          ) : (
            <DetailCardContent kind={kind} project={project} onClose={onClose} />
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

const W = 340
const H = 272
const FOLDER_W = 210
const K_SCALE = FOLDER_W / W // ~0.6176
const FOLDER_H = Math.round(H * K_SCALE) // ~168px

/**
 * Individual Project Folder
 * Features procedural art back-plate, cards pocket, and frosted glass front flap
 */
function ProjectFolder({
  project,
  activeId,
  pendingId,
  onSelect,
}: {
  project: ProjectItem
  activeId: string | null
  pendingId: string | null
  onSelect: (id: string) => void
}) {
  const shouldReduceMotion = useReducedMotion()
  const isVacated = activeId === project.id
  const isPending = pendingId === project.id

  return (
    <div className="flex flex-col items-center">
      {/* Folder Object Shell */}
      <div
        className="group relative cursor-pointer select-none"
        style={{ width: FOLDER_W, height: FOLDER_H }}
        onClick={() => onSelect(project.id)}
      >
        {/* Ground ambient shadow */}
        <div className="absolute -bottom-2 inset-x-4 h-6 rounded-full bg-black/60 blur-xl pointer-events-none group-hover:scale-105 transition-transform duration-300" />

        {/* 1. BACK PANEL: 340x272 scaled by K_SCALE with exact clipPath and SVG rim stroke (z-index: 5) */}
        <div
          className="absolute left-0 top-0 pointer-events-none"
          style={{ width: W, height: H, transformOrigin: "0 0", transform: `scale(${K_SCALE})`, zIndex: 5 }}
        >
          {/* Clipped procedural liquid art */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `path('${BACK_PATH}')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-800 to-neutral-950" />
            <ArtCanvas
              className="absolute -inset-3 w-[364px] h-[296px] object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              art={project.art}
              seed={project.seed}
              w={364}
              h={296}
              density={1.5}
              priority={0}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Back Rim SVG Stroke */}
          <svg className="absolute inset-0 w-[340px] h-[272px] pointer-events-none overflow-visible" viewBox="0 0 340 272">
            <path d={BACK_PATH} fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" />
          </svg>
        </div>

        {/* 2. CARDS POCKET: Layered behind front flap (z-index: 15), lifts on folder hover */}
        <div
          className="folder-cards absolute left-1/2 -translate-x-1/2 top-[16px] w-[148px] h-[116px] pointer-events-none group-hover:-translate-y-2.5 transition-transform duration-300 ease-out"
          style={{ zIndex: 15 }}
        >
          {/* Render inside folder ONLY when not active on stage */}
          {!isVacated &&
            KINDS.map((kind, i) => (
              <Card
                key={kind}
                id={project.id}
                kind={kind}
                i={i}
                rotateFrom={0}
                rotateTo={FOLDER_ROT[i]}
                delay={(2 - i) * 0.08 * SLOW}
                isFolder={true}
                project={project}
              />
            ))}
        </div>

        {/* 3. FRONT FLAP: Upper cover of the folder, always higher than cards (z-index: 40) */}
        <div
          className="folder-front absolute left-0 top-0 pointer-events-auto cursor-pointer transition-transform duration-300 ease-out group-hover:[transform:perspective(600px)_rotateX(-8deg)] origin-bottom"
          style={{ width: W, height: H, transformOrigin: "0 0", transform: `scale(${K_SCALE})`, zIndex: 40 }}
        >
          {/* Frosted Glass Core with Specular Reflection */}
          <div
            className="absolute left-0 top-[74px] w-[340px] h-[198px] backdrop-blur-xl bg-gradient-to-b from-neutral-900/60 via-neutral-950/80 to-neutral-950/95 overflow-hidden shadow-2xl"
            style={{ clipPath: `path('${FRONT_PATH}')` }}
          >
            {/* Specular Radial Rim */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.25),transparent_70%)] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/[0.03] to-transparent pointer-events-none" />
          </div>

          {/* Front Rim SVG Stroke with Linear Gradient */}
          <svg className="absolute left-0 top-[74px] w-[340px] h-[198px] pointer-events-none overflow-visible" viewBox="0 0 340 198">
            <defs>
              <linearGradient id={`gf-front-rim-${project.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ffffff" stopOpacity="0.85" />
                <stop offset="0.3" stopColor="#ffffff" stopOpacity="0.25" />
                <stop offset="1" stopColor="#ffffff" stopOpacity="0.08" />
              </linearGradient>
            </defs>
            <path d={FRONT_PATH} fill="none" stroke={`url(#gf-front-rim-${project.id})`} strokeWidth="2.4" />
          </svg>

          {/* Label: Project Title and Category Subtitle */}
          <div className="absolute left-7 bottom-7 right-20 z-10 flex flex-col pointer-events-none">
            <span className="text-white text-2xl font-light font-serif tracking-tight truncate">
              {project.title}
            </span>
            <span className="text-neutral-400 text-xs font-mono tracking-wider truncate mt-1">
              {project.subtitle}
            </span>
          </div>

          {/* Action indicator button icon */}
          <div className="absolute right-6 bottom-6 w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-neutral-300 group-hover:text-white group-hover:bg-white/20 transition-all duration-200">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* 7. Subtle Interactive Hint: Fades separately */}
      <div className="mt-2.5 flex items-center justify-center min-h-[22px]">
        <AnimatePresence mode="wait">
          {isPending ? (
            <motion.div
              key="pending"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.25 * SLOW }}
              className="text-emerald-400 text-[10px] font-mono tracking-wider uppercase flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Opening next...</span>
            </motion.div>
          ) : isVacated ? (
            <motion.button
              key="vacated"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.35 * SLOW }}
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onSelect(project.id)
              }}
              className="text-emerald-400 hover:text-emerald-300 text-[10px] font-mono tracking-wider uppercase flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Click to fold cards back into folder"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Vacated · Fold back</span>
            </motion.button>
          ) : (
            <motion.button
              key="open"
              initial={{ opacity: 0, y: -3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 3 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.35 * SLOW }}
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onSelect(project.id)
              }}
              className="text-neutral-500 hover:text-white text-[10px] font-mono tracking-wider uppercase transition-colors cursor-pointer"
            >
              Open archive
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function ProjectsSection() {
  const [activeId, setActiveId] = React.useState<string | null>(null)
  const [pendingId, setPendingId] = React.useState<string | null>(null)
  const timerRef = React.useRef<NodeJS.Timeout | null>(null)
  const shouldReduceMotion = useReducedMotion()
  const active = PROJECTS.find((p) => p.id === activeId)

  // Clean up any pending transition timer on unmount
  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleClose = React.useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setPendingId(null)
    setActiveId(null)
  }, [])

  // Listen for Escape key to close expanded showcase
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleClose])

  const handleFolderClick = (id: string) => {
    // Clear any existing transition timer
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }

    // 1. If clicking the already open project or the currently pending project -> fold back and cancel queue
    if (activeId === id) {
      handleClose()
      return
    }

    // 2. If a project is currently open on stage and user clicks a different project:
    // First close the open project completely, then initiate starting the next project!
    if (activeId !== null) {
      setPendingId(id)
      setActiveId(null) // Starts folding back the active project

      // Wait for closing animation to complete: duration (0.75s) + max stagger delay ((2-0)*0.08 = 0.16s) + safety margin
      const closeDurationMs = shouldReduceMotion ? 20 : Math.round((0.75 + 0.16) * 1000 * SLOW) + 60
      timerRef.current = setTimeout(() => {
        setActiveId(id)
        setPendingId(null)
        timerRef.current = null
      }, closeDurationMs)
      return
    }

    // 3. No project currently open -> open immediately
    setPendingId(null)
    setActiveId(id)
  }

  return (
    <LayoutGroup id="project-showcase">
      <div className="relative w-full flex-1 flex flex-col justify-between items-center select-none py-1 min-h-[620px] md:min-h-[660px]">
        {/* 1. Upper Header Section / Top Bar Illustration */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-5xl px-4 sm:px-6 pt-2 sm:pt-3 pb-1 flex items-center justify-between z-20 shrink-0 select-none"
        >
          <span className="text-xs sm:text-[13px] font-mono tracking-wider text-neutral-300 font-medium">
            Project archives
          </span>
          <span className="text-xs sm:text-[13px] font-mono tracking-wider text-neutral-400">
            2025 — 2026
          </span>
        </motion.div>

        {/* 2. Middle Interactive Stage: STRICTLY FIXED HEIGHT */}
        <div className="w-full relative flex items-center justify-center px-4 z-20 h-[340px] md:h-[350px] my-auto shrink-0">
          {active ? (
            /* DETAIL ROW: 3 shared cards of the active project side-by-side */
            <div
              key={active.id}
              className="w-full max-w-5xl h-full flex flex-row items-stretch gap-2.5 sm:gap-3 md:gap-4 relative overflow-x-auto md:overflow-visible"
            >
              {KINDS.map((kind, i) => (
                <Card
                  key={kind}
                  id={active.id}
                  kind={kind}
                  i={i}
                  rotateFrom={FOLDER_ROT[i]}
                  rotateTo={0}
                  delay={i * 0.08 * SLOW}
                  isFolder={false}
                  project={active}
                  onClose={handleClose}
                />
              ))}
            </div>
          ) : (
            /* Clean Viewing Space where the liquid metal metaball flows freely */
            <div key="empty-stage" className="w-full h-full pointer-events-none" />
          )}
        </div>

        {/* 3. Bottom Folders Dock: No z-index so folder-front (z-40) and folder-back (z-5) participate in shared stack with stage (z-20) */}
        <div className="w-full flex flex-col items-center pt-1 pb-1 md:pb-2 shrink-0">
          <div className="flex flex-wrap items-end justify-center gap-4 sm:gap-6 lg:gap-7 w-full max-w-4xl px-4">
            {PROJECTS.map((project) => (
              <ProjectFolder
                key={project.id}
                project={project}
                activeId={activeId}
                pendingId={pendingId}
                onSelect={handleFolderClick}
              />
            ))}
          </div>
        </div>
      </div>
    </LayoutGroup>
  )
}
