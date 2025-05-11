
import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { usePortfolio } from '@/context/PortfolioContext';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const LanguageSection: React.FC = () => {
  const { data } = usePortfolio();
  const [isVisible, setIsVisible] = useState(false);
  
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  if (!data.languages || data.languages.length === 0) {
    return null;
  }

  return (
    <section id="languages" ref={ref} className="py-16 bg-gradient-to-b from-purple-50 to-white dark:from-purple-900/10 dark:to-background">
      <div className="container mx-auto px-4">
        <h2 className={`section-title transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          Languages & Interests
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-xl font-semibold mb-4 text-purple-500">Languages</h3>
            
            <div className="space-y-4">
              {data.languages.map((language, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-lg">{language.name}</span>
                      <Badge variant="secondary">{language.proficiency}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {language.skills.map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="bg-purple-50 dark:bg-purple-900/20">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-xl font-semibold mb-4 text-purple-500">Hobbies & Interests</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.hobbies.map((hobby, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-all hover:-translate-y-1">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-lg mb-1">
                      {hobby.link ? (
                        <a 
                          href={hobby.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-500 hover:text-purple-600 flex items-center gap-1"
                        >
                          {hobby.name}
                          {hobby.name === "Photography" && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                            </svg>
                          )}
                        </a>
                      ) : (
                        <span>{hobby.name}</span>
                      )}
                    </h4>
                    <p className="text-sm text-muted-foreground">{hobby.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LanguageSection;
