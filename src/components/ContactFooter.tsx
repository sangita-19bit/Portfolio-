"use client"

import { Mail, Phone, ExternalLink, Sparkles } from "lucide-react"
import GlassCard, {
  LinkedInIcon,
  GitHubIcon,
  LeetCodeIcon,
} from "@/components/ui/glass-card"

export default function ContactFooter() {
  return (
    <footer id="contact" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-neutral-950 text-white overflow-hidden border-t border-white/10">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-emerald-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col justify-between">
        {/* Top Header / Meta Navbar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-12">
          <span className="text-xs sm:text-[13px] font-mono tracking-wider text-neutral-300 font-medium uppercase">
            Communication & Links
          </span>
          <span className="text-xs sm:text-[13px] font-mono tracking-wider text-neutral-400">
            Open to Roles & Collaborations
          </span>
        </div>

        {/* Headline & Contact Pitch with 3D GlassCard Integration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 items-center">
          {/* Left Column: Editorial Headline, Direct Contacts & External Profiles */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Available for Immediate Opportunities</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-white tracking-tight leading-tight">
                Ready to contribute to product quality, operations, and scalable engineering.
              </h2>
              <p className="text-sm sm:text-base text-neutral-400 font-sans mt-4 max-w-xl leading-relaxed">
                Seeking opportunities in Product Operations, Software Testing, and Full-Stack
                Development. Dedicated to ownership, structured problem solving, and release excellence.
              </p>
            </div>

            {/* Quick Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              {/* Email Card */}
              <a
                href="mailto:sangitabeauty67@gmail.com"
                className="group flex-1 p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-emerald-500/30 transition-all duration-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                      Direct Email
                    </div>
                    <div className="text-xs font-mono text-white group-hover:text-emerald-300 transition-colors">
                      sangitabeauty67@gmail.com
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
              </a>

              {/* Phone Card */}
              <a
                href="tel:+917811884298"
                className="group flex-1 p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/25 transition-all duration-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-neutral-300 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                      Phone Contact
                    </div>
                    <div className="text-xs font-mono text-white group-hover:text-neutral-200 transition-colors">
                      +91 7811884298
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </a>
            </div>

            {/* Quick Profile Links */}
            <div className="grid grid-cols-3 gap-3 mt-3">
              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/sangita-as196"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-blue-500/30 transition-all duration-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <LinkedInIcon className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-xs font-mono text-neutral-300 group-hover:text-white">
                    LinkedIn
                  </span>
                </div>
                <ExternalLink className="w-3 h-3 text-neutral-500 group-hover:text-blue-400 transition-colors" />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/sangita-19bit"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/30 transition-all duration-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <GitHubIcon className="w-3.5 h-3.5 text-neutral-300" />
                  <span className="text-xs font-mono text-neutral-300 group-hover:text-white">
                    GitHub
                  </span>
                </div>
                <ExternalLink className="w-3 h-3 text-neutral-500 group-hover:text-white transition-colors" />
              </a>

              {/* LeetCode */}
              <a
                href="https://leetcode.com/u/Schowdhury85/"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-amber-500/30 transition-all duration-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <LeetCodeIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-mono text-neutral-300 group-hover:text-white">
                    LeetCode
                  </span>
                </div>
                <ExternalLink className="w-3 h-3 text-neutral-500 group-hover:text-amber-400 transition-colors" />
              </a>
            </div>
          </div>

          {/* Right Column: 3D Interactive GlassCard */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end py-4">
            <GlassCard
              title="Sangita Chowdhury"
              description="Open to Product Operations, Software Testing & Full-Stack Development roles."
              actionLabel="Connect"
              actionHref="mailto:sangitabeauty67@gmail.com?subject=Opportunity%20Inquiry%20-%20Sangita%20Chowdhury"
              badgeLogo={
                <span className="font-serif font-bold text-sm tracking-tighter text-black select-none">
                  SC
                </span>
              }
              socials={[
                {
                  icon: LinkedInIcon,
                  delay: "400ms",
                  href: "https://linkedin.com/in/sangita-as196",
                  ariaLabel: "LinkedIn Profile",
                },
                {
                  icon: GitHubIcon,
                  delay: "600ms",
                  href: "https://github.com/sangita-19bit",
                  ariaLabel: "GitHub Profile",
                },
                {
                  icon: LeetCodeIcon,
                  delay: "800ms",
                  href: "https://leetcode.com/u/Schowdhury85/",
                  ariaLabel: "LeetCode Profile",
                },
              ]}
              className="scale-95 sm:scale-100 hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        </div>

        {/* Bottom Colophon / Copyright Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-neutral-500">
          <div>
            <span>Sangita Chowdhury</span>
            <span className="mx-2">·</span>
            <span>B.E. Computer Science & Engineering</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Punjab & West Bengal, India</span>
            <span>·</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
