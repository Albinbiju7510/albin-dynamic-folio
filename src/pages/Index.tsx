
import React, { useState } from 'react';
import { PortfolioProvider } from '@/context/PortfolioContext';
import { useTranslation } from '@/context/TranslationContext';
import { motion, AnimatePresence } from 'framer-motion';
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
import ModeSelector from '@/components/ModeSelector';
import PhotoGallery from '@/components/PhotoGallery';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { GlobeIcon, Grid3X3 } from 'lucide-react';

const Index = () => {
  const { language, setLanguage, isLoading } = useTranslation();
  const [showModeSelector, setShowModeSelector] = useState(false);

  const handleToggleModeSelector = () => {
    setShowModeSelector(!showModeSelector);
  };

  return (
    <PortfolioProvider>
      <div className="min-h-screen relative">
        {/* Language Selector - Only show when Mode Selector is active */}
        {showModeSelector && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 z-50"
          >
            <Select value={language} onValueChange={(value) => setLanguage(value as 'en' | 'ml' | 'ta')}>
              <SelectTrigger className="w-auto min-w-[100px] bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm">
                <div className="flex items-center space-x-2">
                  <GlobeIcon className="h-4 w-4" />
                  <SelectValue placeholder="Language" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ml">മലയാളം</SelectItem>
                <SelectItem value="ta">தமிழ்</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
        )}

        {/* Mode Selector Button - Updated with icon and animation */}
        <div className="fixed bottom-20 right-4 z-40">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={handleToggleModeSelector}
              className={`bg-purple-500 hover:bg-purple-600 shadow-lg rounded-full p-3 h-auto transition-all duration-300 ${showModeSelector ? 'ring-4 ring-purple-300 dark:ring-purple-600/30' : ''}`}
            >
              <Grid3X3 className="h-5 w-5 mr-2" />
              {showModeSelector ? 'View Portfolio' : 'Select Mode'}
            </Button>
          </motion.div>
        </div>

        {isLoading ? (
          <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-t-purple-500 border-r-transparent border-b-purple-300 border-l-transparent rounded-full animate-spin mb-4"></div>
              <h3 className="text-xl font-bold font-heading">Translating content...</h3>
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {showModeSelector ? (
              <motion.div
                key="mode-selector"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-white dark:from-purple-900/30 dark:to-background"
              >
                <ModeSelector className="pt-16" />
              </motion.div>
            ) : (
              <motion.div
                key="portfolio"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Header />
                <HeroSection />
                <AboutSection />
                <SkillsSection />
                <ProjectsSection />
                <LanguageSection />
                <PhotoGallery />
                <LeadershipSection />
                <ContactSection />
                <Footer />
                <SecretIcon />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </PortfolioProvider>
  );
};

export default Index;
