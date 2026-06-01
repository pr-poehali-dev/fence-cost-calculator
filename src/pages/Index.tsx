import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProductsSection from "@/components/sections/ProductsSection";
import CalculatorSection from "@/components/sections/CalculatorSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ContactsSection from "@/components/sections/ContactsSection";
import FooterSection from "@/components/sections/FooterSection";

const sectionIds = ["home", "about", "products", "calculator", "portfolio", "contacts"];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-64px 0px 0px 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavigate = (section: string) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen">
      <Header activeSection={activeSection} onNavigate={handleNavigate} />

      <div id="home">
        <HeroSection onNavigate={handleNavigate} />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <div id="products">
        <ProductsSection />
      </div>
      <div id="calculator">
        <CalculatorSection />
      </div>
      <div id="portfolio">
        <PortfolioSection />
      </div>
      <div id="contacts">
        <ContactsSection />
      </div>

      <FooterSection onNavigate={handleNavigate} />
    </div>
  );
}
