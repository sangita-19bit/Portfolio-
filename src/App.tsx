import SculptureHero from "@/components/ui/liquid-sculpture-hero"
import LiquidMetalHero from "@/components/ui/liquid-metal-hero"
import CustomCursor from "@/components/ui/cursor"
import ProjectsSection from "@/components/ProjectsSection"
import SkillsSection from "@/components/SkillsSection"
import EducationSection from "@/components/EducationSection"
import ContactFooter from "@/components/ContactFooter"

export default function App() {
  return (
    <div className="w-full min-h-screen bg-[#EBE9E5] text-[#151514] selection:bg-neutral-300 selection:text-black">
      {/* Cinematic Motion Primitives Custom Cursor */}
      <CustomCursor />

      {/* 1. Hero Section (Liquid Sculpture 3D Particle Hero) */}
      <SculptureHero
        theme="light"
        background="#EBE9E5"
        darkBackground="#111110"
        src="/assets/sculpture/sculpture-light.webp"
        darkSrc="/assets/sculpture/sculpture-dark.webp"
        mobileSrc="/assets/sculpture/sculpture-mobile-light.webp"
        mobileDarkSrc="/assets/sculpture/sculpture-mobile-dark.webp"
        backdropText="SANGITA"
        brand="Sangita Chowdhury"
        navLinks={[
          { label: "Projects", href: "#work" },
          { label: "Skills", href: "#skills" },
          { label: "Education", href: "#education" },
          { label: "Contact", href: "#contact" },
        ]}
        navCta={{
          label: "Resume",
          href: "mailto:sangitabeauty67@gmail.com?subject=Resume%20Inquiry%20-%20Sangita%20Chowdhury",
        }}
        eyebrow="Computer Science & Engineering · Chandigarh University"
        headline={"Engineering quality,\nvalidating every flow."}
        headlineAccent="validating every flow."
        body="Computer Science Engineering student seeking Product Operations & Software Engineering roles. Hands-on experience developing role-based workflows, Spring Boot REST APIs, and responsive interfaces with a core focus on testing, defect analysis, and release readiness."
        primaryCta={{ label: "Explore Projects", href: "#work" }}
        secondaryCta={{ label: "Get in touch", href: "#contact" }}
        themeToggle={true}
        interactive={true}
      />

      {/* 2. Project Section (Liquid Metal Background + Glass Folder Cards Project Drawer) */}
      <section id="work" className="relative w-full min-h-screen overflow-hidden">
        <div id="projects" className="absolute top-0 pointer-events-none" />
        <LiquidMetalHero
          bgPosition="absolute"
          shape="metaballs"
          colorBack="#000000"
          colorTint="#ffffff"
          scale={0.42}
          speed={0.75}
        >
          <ProjectsSection />
        </LiquidMetalHero>
      </section>

      {/* 3. Technical Skills & Capabilities (6 Domains from Resume) */}
      <SkillsSection />

      {/* 4. Education, Certifications & Achievements */}
      <EducationSection />

      {/* 5. Direct Contact & Communication Footer */}
      <ContactFooter />
    </div>
  )
}
