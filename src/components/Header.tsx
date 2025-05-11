
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { usePortfolio } from '@/context/PortfolioContext';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

const Header: React.FC = () => {
  const { data } = usePortfolio();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
            About
          </button>
          <button
            onClick={() => scrollToSection('skills')}
            className="text-foreground/80 hover:text-purple-500 transition-colors"
          >
            Skills
          </button>
          <button
            onClick={() => scrollToSection('projects')} 
            className="text-foreground/80 hover:text-purple-500 transition-colors"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection('leadership')}
            className="text-foreground/80 hover:text-purple-500 transition-colors"
          >
            Leadership
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-foreground/80 hover:text-purple-500 transition-colors"
          >
            Contact
          </button>
        </nav>

        {/* Social Icons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {data.contact.github && (
            <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-purple-500 transition-colors">
              <Github className="h-5 w-5" />
            </a>
          )}
          {data.contact.linkedin && (
            <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-purple-500 transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
          )}
          <a href={`mailto:${data.contact.email}`} className="text-foreground/70 hover:text-purple-500 transition-colors">
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
              About
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="py-2 text-foreground/80 hover:text-purple-500 transition-colors"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="py-2 text-foreground/80 hover:text-purple-500 transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection('leadership')}
              className="py-2 text-foreground/80 hover:text-purple-500 transition-colors"
            >
              Leadership
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="py-2 text-foreground/80 hover:text-purple-500 transition-colors"
            >
              Contact
            </button>
            
            {/* Social Icons - Mobile */}
            <div className="flex items-center space-x-4 pt-2">
              {data.contact.github && (
                <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-purple-500 transition-colors">
                  <Github className="h-5 w-5" />
                </a>
              )}
              {data.contact.linkedin && (
                <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-purple-500 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              <a href={`mailto:${data.contact.email}`} className="text-foreground/70 hover:text-purple-500 transition-colors">
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
