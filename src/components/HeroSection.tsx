
import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePortfolio } from '@/context/PortfolioContext';

const HeroSection: React.FC = () => {
  const { data } = usePortfolio();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay the animation slightly for dramatic effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-16">
      {/* Decorative Elements - Circles */}
      <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-purple-300/10 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-purple-400/10 animate-float"></div>
      <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-purple-200/20 animate-rotate-slow"></div>

      <div className={`container mx-auto px-4 z-10 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-purple-500 tracking-tight">
              Hi, I'm {data.name}
            </h1>
            <h2 className="text-2xl md:text-3xl mb-6 text-foreground/80 font-light">
              {data.title}
            </h2>
            <p className="text-lg mb-8 text-foreground/70 max-w-lg">
              Passionate about blending technology and creativity to build innovative solutions that make a difference.
            </p>
            <div className="flex gap-4">
              <Button onClick={scrollToAbout} className="bg-purple-500 hover:bg-purple-600">
                Discover More
              </Button>
              <Button variant="outline" className="border-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/20">
                Download Resume
              </Button>
            </div>
          </div>
          
          <div className="md:w-2/5">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full overflow-hidden border-4 border-purple-300 shadow-xl transform hover:scale-105 transition-transform duration-300">
                <img 
                  src="/lovable-uploads/ab897175-147a-4b6b-bc35-be0d1894c521.png" 
                  alt="Albin Biju" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative shape behind profile */}
              <div className="absolute -z-10 w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 -bottom-2 -right-2 opacity-30 animate-pulse-slow"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-purple-500" />
      </div>
    </section>
  );
};

export default HeroSection;
