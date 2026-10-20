"use client"

import { Mail, Phone, ExternalLink } from "lucide-react"

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

function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  )
}

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

        {/* Headline & Contact Pitch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-white tracking-tight leading-tight">
              Ready to contribute to product quality, operations, and scalable engineering.
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-sans mt-4 max-w-xl leading-relaxed">
              Seeking opportunities in Product Operations, Software Testing, and Full-Stack
              Development. Dedicated to ownership, structured problem solving, and release excellence.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-3">
            {/* Email Card */}
            <a
              href="mailto:sangitabeauty67@gmail.com"
              className="group p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-emerald-500/30 transition-all duration-200 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                    Direct Email
                  </div>
                  <div className="text-xs sm:text-sm font-mono text-white group-hover:text-emerald-300 transition-colors">
                    sangitabeauty67@gmail.com
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
            </a>

            {/* Phone Card */}
            <a
              href="tel:+917811884298"
              className="group p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/25 transition-all duration-200 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-neutral-300 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                    Phone Contact
                  </div>
                  <div className="text-xs sm:text-sm font-mono text-white group-hover:text-neutral-200 transition-colors">
                    +91 7811884298
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
            </a>

            {/* Socials Row */}
            <div className="grid grid-cols-2 gap-3 mt-1">
              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/sangita-as196"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-blue-500/30 transition-all duration-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <LinkedInIcon className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-mono text-neutral-300 group-hover:text-white">
                    LinkedIn
                  </span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-blue-400" />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/sangita-19bit"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/30 transition-all duration-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <GitHubIcon className="w-4 h-4 text-neutral-300" />
                  <span className="text-xs font-mono text-neutral-300 group-hover:text-white">
                    GitHub
                  </span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white" />
              </a>
            </div>
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
