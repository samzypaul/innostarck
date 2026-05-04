"use client";
import {Navbar} from "@/app/components/ui/Navbar";
import {HeroSection} from "@/app/components/sections/HeroSection";
import {ServicesSection} from "@/app/components/sections/ServicesSection";
import {StandardSection} from "@/app/components/sections/StandardSection";
import {FounderSection} from "@/app/components/sections/FounderSection";
import {Footer} from "@/app/components/sections/Footer";
import {useActiveSection} from "@/app/hooks/useActiveSection";

export default function Page() {
  const sectionIds = ['home', 'services', 'standard', 'founder', 'contact','terms','privacy'];
  const activeSection = useActiveSection(sectionIds);

  return (
      <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-cyan-500/30 selection:text-cyan-900">
        <Navbar activeSection={activeSection} />
        <main>
          <HeroSection />
          <ServicesSection />
          <StandardSection />
          <FounderSection />
        </main>
        <Footer  />
      </div>
  );
}