import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import TechStackSection from "@/components/TechStackSection";
import ImpactSection from "@/components/ImpactSection";
import RoadmapSection from "@/components/RoadmapSection";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TechStackSection />
      <ImpactSection />
      <RoadmapSection />
      <Footer />
    </div>
  );
};

export default Home;
