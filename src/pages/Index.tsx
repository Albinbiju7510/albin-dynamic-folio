
import React from 'react';
import { PortfolioProvider } from '@/context/PortfolioContext';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import LanguageSection from '@/components/LanguageSection';
import LeadershipSection from '@/components/LeadershipSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import SecretIcon from '@/components/SecretIcon';

const Index = () => {
  return (
    <PortfolioProvider>
      <div className="min-h-screen">
        <Header />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <LanguageSection />
        <LeadershipSection />
        <ContactSection />
        <Footer />
        <SecretIcon />
      </div>
    </PortfolioProvider>
  );
};

export default Index;
