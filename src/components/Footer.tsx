
import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

const Footer: React.FC = () => {
  const { data } = usePortfolio();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-purple-600/5 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-purple-500">{data.name}</h3>
            <p className="text-muted-foreground mt-1">{data.title}</p>
          </div>
          
          <div className="flex space-x-6">
            {data.contact.github && (
              <a 
                href={data.contact.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-purple-500 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            
            {data.contact.linkedin && (
              <a 
                href={data.contact.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-purple-500 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            
            <a 
              href={`mailto:${data.contact.email}`}
              className="text-muted-foreground hover:text-purple-500 transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-purple-200/30 dark:border-purple-600/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {currentYear} {data.name}. All rights reserved.
          </p>
          
          <div>
            <a href="#about" className="text-sm text-muted-foreground hover:text-purple-500 transition-colors mx-3">
              About
            </a>
            <a href="#projects" className="text-sm text-muted-foreground hover:text-purple-500 transition-colors mx-3">
              Projects
            </a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-purple-500 transition-colors mx-3">
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* Secret link to admin panel */}
      <div className="admin-link">
        <div 
          className="secret-button"
          onClick={() => window.location.href = '/admin'}
        ></div>
      </div>
    </footer>
  );
};

export default Footer;
