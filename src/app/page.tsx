import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import XaxaraDivider from "@/components/XaxaraDivider";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ArchiveSection from "@/components/ArchiveSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <XaxaraDivider />
        <AboutSection />
        <XaxaraDivider />
        <ProjectsSection />
        <XaxaraDivider />
        <ArchiveSection />
      </main>
      <Footer />
    </>
  );
}
