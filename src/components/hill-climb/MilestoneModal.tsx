"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, MapPin, CheckCircle2 } from "lucide-react"
import { Milestone } from "./types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface MilestoneModalProps {
  milestone: Milestone | null
  onClose: () => void
}

export default function MilestoneModal({ milestone, onClose }: MilestoneModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  if (!milestone) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm">
        {/* Backdrop click dismiss */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        {/* Modal Card Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
          className="relative w-full max-w-lg bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-3xl p-6 sm:p-7 shadow-2xl z-10 overflow-hidden"
        >
          {/* Subtle Accent Glow */}
          <div
            className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl pointer-events-none opacity-20"
            style={{ backgroundColor: milestone.color || "#10b981" }}
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 transition-colors"
            aria-label="Close milestone details"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header Metadata */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge
              variant="outline"
              className="bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-mono text-xs"
            >
              {milestone.category}
            </Badge>
            <span className="inline-flex items-center gap-1 text-xs font-mono text-neutral-500 dark:text-neutral-400">
              <Calendar className="w-3.5 h-3.5" />
              {milestone.year}
            </span>
          </div>

          {/* Title & Subtitle */}
          <h3 className="text-xl sm:text-2xl font-serif font-light text-zinc-900 dark:text-white tracking-tight">
            {milestone.title}
          </h3>
          <p className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 mt-1">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            {milestone.subtitle}
          </p>

          {/* Optional Image */}
          {milestone.image && (
            <div className="relative mt-4 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 max-h-44 shadow-sm">
              <img
                src={milestone.image}
                alt={milestone.title}
                className="w-full h-40 object-cover"
              />
              {milestone.badge && (
                <div className="absolute bottom-2.5 right-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[11px] font-mono font-semibold text-emerald-400 border border-emerald-500/30">
                  {milestone.badge}
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-neutral-300 font-sans mt-4 leading-relaxed">
            {milestone.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {milestone.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-zinc-700 dark:text-neutral-300 border border-black/5 dark:border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer Action */}
          <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Verified Portfolio Milestone</span>
            </div>
            <Button
              size="sm"
              onClick={onClose}
              className="bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 font-mono text-xs rounded-xl"
            >
              Continue Driving
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
