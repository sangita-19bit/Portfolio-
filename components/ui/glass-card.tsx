"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

// Official LeetCode Brand SVG Icon (curved bracket with iconic horizontal bar)
export const LeetCodeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path d="M16.102 17.93l-2.07 1.944c-2.127 2.146-5.55 2.164-7.695.038l-4.11-4.08c-2.15-2.12-2.168-5.545-.04-7.682l4.11-4.103c2.145-2.126 5.568-2.108 7.695.038l1.968 1.848a1.25 1.25 0 01-1.708 1.822l-1.968-1.848c-1.182-1.194-3.08-1.204-4.275-.022l-4.11 4.103c-1.195 1.182-1.205 3.08-.022 4.274l4.11 4.08c1.194 1.182 3.092 1.17 4.275-.022l2.07-1.944a1.25 1.25 0 011.708 1.822zM23.01 11.09H9.99a1.25 1.25 0 100 2.5h13.02a1.25 1.25 0 100-2.5z" />
  </svg>
)

// GitHub Brand SVG Icon
export const GitHubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
)

// LinkedIn Brand SVG Icon
export const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
)

// Instagram Brand SVG Icon
export const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

// Twitter / X Brand SVG Icon
export const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

export const ULogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 29.667 31.69"
    aria-hidden="true"
    {...props}
  >
    <path d="M12.827,1.628A1.561,1.561,0,0,1,14.31,0h2.964a1.561,1.561,0,0,1,1.483,1.628v11.9a9.252,9.252,0,0,1-2.432,6.852q-2.432,2.409-6.963,2.409T2.4,20.452Q0,18.094,0,13.669V1.628A1.561,1.561,0,0,1,1.483,0h2.98A1.561,1.561,0,0,1,5.947,1.628V13.191a5.635,5.635,0,0,0,.85,3.451,3.153,3.153,0,0,0,2.632,1.094,3.032,3.032,0,0,0,2.582-1.076,5.836,5.836,0,0,0,.816-3.486Z" />
    <path d="M75.207,20.857a1.561,1.561,0,0,1-1.483,1.628h-2.98a1.561,1.561,0,0,1-1.483-1.628V1.628A1.561,1.561,0,0,1,70.743,0h2.98a1.561,1.561,0,0,1,1.483,1.628Z" transform="translate(-45.91 0)" />
    <path d="M0,80.018A1.561,1.561,0,0,1,1.483,78.39h26.7a1.561,1.561,0,0,1,1.483,1.628v2.006a1.561,1.561,0,0,1-1.483,1.628H1.483A1.561,1.561,0,0,1,0,82.025Z" transform="translate(0 -51.963)" />
  </svg>
)

export interface SocialLinkItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  delay?: string
  href?: string
  ariaLabel?: string
  onClick?: (e: React.MouseEvent) => void
}

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  actionLabel?: string
  actionHref?: string
  onActionClick?: (e: React.MouseEvent) => void
  badgeLogo?: React.ReactNode
  socials?: SocialLinkItem[]
}

const DEFAULT_SOCIALS: SocialLinkItem[] = [
  { icon: InstagramIcon, delay: "400ms", ariaLabel: "Instagram" },
  { icon: TwitterIcon, delay: "600ms", ariaLabel: "Twitter / X" },
  { icon: GitHubIcon, delay: "800ms", ariaLabel: "GitHub" },
]

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className = "",
      title = "Monochrome",
      description = "Create, share, and use beautiful custom elements made with CSS.",
      actionLabel = "View more",
      actionHref,
      onActionClick,
      badgeLogo,
      socials = DEFAULT_SOCIALS,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`group h-[310px] w-[300px] [perspective:1000px] ${className}`}
        {...props}
      >
        <div className="relative h-full rounded-[50px] bg-gradient-to-br from-zinc-900 to-black shadow-2xl transition-all duration-500 ease-in-out [transform-style:preserve-3d] group-hover:[box-shadow:rgba(0,0,0,0.3)_30px_50px_25px_-40px,rgba(0,0,0,0.1)_0px_25px_30px_0px] group-hover:[transform:rotate3d(1,1,0,30deg)]">
          {/* Glass Inner Plate (pointer-events-none prevents click blocking) */}
          <div className="pointer-events-none absolute inset-2 rounded-[55px] border-b border-l border-white/20 bg-gradient-to-b from-white/30 to-white/10 backdrop-blur-sm [transform-style:preserve-3d] [transform:translate3d(0,0,25px)]" />

          {/* Typography Content (pointer-events-none allows clicks through to interactive layers) */}
          <div className="pointer-events-none absolute inset-x-0 [transform:translate3d(0,0,26px)]">
            <div className="px-7 pt-[85px] pb-0">
              <span className="block text-xl font-black text-white tracking-tight">
                {title}
              </span>
              <span className="mt-3 block text-[13.5px] text-zinc-300 leading-snug line-clamp-3">
                {description}
              </span>
            </div>
          </div>

          {/* Bottom Socials & Action Button - Strictly absolute positioned at the bottom */}
          <div className="absolute bottom-5 left-5 right-5 z-30 pointer-events-auto flex items-center justify-between [transform-style:preserve-3d] [transform:translate3d(0,0,26px)]">
            {/* Socials Row (Bottom-Left) */}
            <div className="flex items-center gap-2.5 [transform-style:preserve-3d]">
              {socials.map((item, index) => {
                const IconComponent = item.icon
                const commonClasses =
                  "group/social grid h-[32px] w-[32px] place-content-center rounded-full border-none bg-white text-black shadow-[rgba(0,0,0,0.5)_0px_7px_5px_-5px] transition-all duration-200 ease-in-out group-hover:[box-shadow:rgba(0,0,0,0.2)_-5px_20px_10px_0px] group-hover:[transform:translate3d(0,0,50px)] hover:[transform:translate3d(0,0,65px)] hover:bg-black hover:text-white active:bg-yellow-400 active:text-black cursor-pointer select-none [transform-style:preserve-3d]"

                if (item.href) {
                  return (
                    <a
                      key={index}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.ariaLabel || `social-link-${index}`}
                      onClick={item.onClick}
                      className={commonClasses}
                      style={{ transitionDelay: item.delay }}
                    >
                      <IconComponent className="h-4 w-4 fill-currentColor stroke-currentColor transition-colors duration-200" />
                    </a>
                  )
                }

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={item.onClick}
                    aria-label={item.ariaLabel || `social-button-${index}`}
                    className={commonClasses}
                    style={{ transitionDelay: item.delay }}
                  >
                    <IconComponent className="h-4 w-4 fill-currentColor stroke-currentColor transition-colors duration-200" />
                  </button>
                )
              })}
            </div>

            {/* Action / Connect Button (Bottom-Right) */}
            <div className="flex items-center justify-end [transform-style:preserve-3d]">
              {actionHref ? (
                <a
                  href={actionHref}
                  target={actionHref.startsWith("http") ? "_blank" : undefined}
                  rel={actionHref.startsWith("http") ? "noopener noreferrer" : undefined}
                  onClick={onActionClick}
                  className="flex items-center gap-0.5 border-none bg-none text-xs font-bold text-white hover:text-emerald-300 transition-all duration-200 ease-in-out hover:[transform:translate3d(0,0,10px)] cursor-pointer group/action"
                >
                  <span>{actionLabel}</span>
                  <ChevronDown
                    className="h-4 w-4 stroke-white transition-transform duration-200 group-hover/action:translate-y-0.5"
                    strokeWidth={3}
                  />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={onActionClick}
                  className="flex items-center gap-0.5 border-none bg-none text-xs font-bold text-white hover:text-emerald-300 transition-all duration-200 ease-in-out hover:[transform:translate3d(0,0,10px)] cursor-pointer group/action"
                >
                  <span>{actionLabel}</span>
                  <ChevronDown
                    className="h-4 w-4 stroke-white transition-transform duration-200 group-hover/action:translate-y-0.5"
                    strokeWidth={3}
                  />
                </button>
              )}
            </div>
          </div>

          {/* Layered Concentric Glass Circles (pointer-events-none prevents covering buttons) */}
          <div className="pointer-events-none absolute top-0 right-0 [transform-style:preserve-3d]">
            {[
              { size: "170px", pos: "8px", z: "20px", delay: "0s" },
              { size: "140px", pos: "10px", z: "40px", delay: "0.4s" },
              { size: "110px", pos: "17px", z: "60px", delay: "0.8s" },
              { size: "80px", pos: "23px", z: "80px", delay: "1.2s" },
            ].map((circle, index) => (
              <div
                key={index}
                className="pointer-events-none absolute aspect-square rounded-full bg-white/10 shadow-[rgba(100,100,111,0.2)_-10px_10px_20px_0px] transition-all duration-500 ease-in-out"
                style={{
                  width: circle.size,
                  top: circle.pos,
                  right: circle.pos,
                  transform: `translate3d(0, 0, ${circle.z})`,
                  transitionDelay: circle.delay,
                }}
              />
            ))}

            {/* Elevated 3D Top Badge */}
            <div
              className="pointer-events-auto absolute grid aspect-square w-[50px] place-content-center rounded-full bg-white shadow-[rgba(100,100,111,0.2)_-10px_10px_20px_0px] transition-all duration-500 ease-in-out [transform:translate3d(0,0,100px)] [transition-delay:1.6s] group-hover:[transform:translate3d(0,0,120px)]"
              style={{ top: "30px", right: "30px" }}
            >
              {badgeLogo || <ULogo className="w-5 fill-black" />}
            </div>
          </div>
        </div>
      </div>
    )
  }
)

GlassCard.displayName = "GlassCard"

export default GlassCard
