
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { usePortfolio } from '@/context/PortfolioContext';
import { Menu, X, Github, Linkedin, Mail, Instagram, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { useTranslation } from '@/context/TranslationContext';

const Header: React.FC = () => {
  const { data } = usePortfolio();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { translate } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Updated social media links
  const githubLink = "https://github.com/Albinbiju7510";
  const instagramLink = "https://www.instagram.com/mr.___infinity__";
  const emailAddress = "albinbiju75100@gmail.com";

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-purple-600/10 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className={`text-xl font-bold transition-all duration-300 ${scrolled ? 'text-purple-500' : 'text-purple-400'}`}>
            {data.name}
          </span>
        </div>
        
        {/* Mobile menu button */}
        <div className="block md:hidden">
          <Button 
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('about')}
            className="text-foreground/80 hover:text-purple-500 transition-colors"
          >
            {translate('About')}
          </button>
          <button
            onClick={() => scrollToSection('skills')}
            className="text-foreground/80 hover:text-purple-500 transition-colors"
          >
            {translate('Skills')}
          </button>
          <button
            onClick={() => scrollToSection('projects')} 
            className="text-foreground/80 hover:text-purple-500 transition-colors"
          >
            {translate('Projects')}
          </button>
          <button
            onClick={() => scrollToSection('gallery')}
            className="text-foreground/80 hover:text-purple-500 transition-colors"
          >
            {translate('Gallery')}
          </button>
          <button
            onClick={() => scrollToSection('leadership')}
            className="text-foreground/80 hover:text-purple-500 transition-colors"
          >
            {translate('Leadership')}
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-foreground/80 hover:text-purple-500 transition-colors"
          >
            {translate('Contact')}
          </button>
        </nav>

        {/* Social Icons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-foreground/70 hover:text-purple-500"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          
          <a href={githubLink} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-purple-500 transition-colors">
            <Github className="h-5 w-5" />
          </a>
          <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-purple-500 transition-colors">
            <Linkedin className="h-5 w-5" />
          </a>
          <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-purple-500 transition-colors">
            <Instagram className="h-5 w-5" />
          </a>
          <a href={`mailto:${emailAddress}`} className="text-foreground/70 hover:text-purple-500 transition-colors">
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-purple-600/20 backdrop-blur-md shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <button
              onClick={() => scrollToSection('about')}
              className="py-2 text-foreground/80 hover:text-purple-500 transition-colors"
            >
              {translate('About')}
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="py-2 text-foreground/80 hover:text-purple-500 transition-colors"
            >
              {translate('Skills')}
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="py-2 text-foreground/80 hover:text-purple-500 transition-colors"
            >
              {translate('Projects')}
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="py-2 text-foreground/80 hover:text-purple-500 transition-colors"
            >
              {translate('Gallery')}
            </button>
            <button
              onClick={() => scrollToSection('leadership')}
              className="py-2 text-foreground/80 hover:text-purple-500 transition-colors"
            >
              {translate('Leadership')}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="py-2 text-foreground/80 hover:text-purple-500 transition-colors"
            >
              {translate('Contact')}
            </button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="flex items-center justify-start px-0 py-2 text-foreground/80 hover:text-purple-500"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="h-5 w-5 mr-2" />
                  <span>{translate('Light Mode')}</span>
                </>
              ) : (
                <>
                  <Moon className="h-5 w-5 mr-2" />
                  <span>{translate('Dark Mode')}</span>
                </>
              )}
            </Button>
            
            {/* Social Icons - Mobile */}
            <div className="flex items-center space-x-4 pt-2">
              <a href={githubLink} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-purple-500 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-purple-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-purple-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={`mailto:${emailAddress}`} className="text-foreground/70 hover:text-purple-500 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
