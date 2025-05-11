
import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { usePortfolio } from '@/context/PortfolioContext';

const LeadershipSection: React.FC = () => {
  const { data } = usePortfolio();
  const [isVisible, setIsVisible] = useState(false);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  return (
    <section id="leadership" ref={ref} className="py-20">
      <div className="container mx-auto px-4">
        <h2 className={`section-title transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          Leadership & Contributions
        </h2>
        
        <div className="mt-10">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-purple-200 dark:bg-purple-500/20"></div>
            
            {/* Timeline items */}
            {data.roles.map((role, index) => (
              <div 
                key={`${role.title}-${index}`}
                className={`relative flex flex-col md:flex-row md:items-center mb-12 transition-all duration-700 delay-${index % 3}00 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-5 h-5 rounded-full bg-purple-500 border-4 border-white dark:border-background"></div>
                
                {/* Content - odd indexes */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right ml-8 md:ml-0' : 'md:pl-12 ml-8 md:ml-auto'}`}>
                  <span className="inline-block mb-1 text-sm font-medium text-purple-500">{role.duration}</span>
                  <h3 className="text-lg font-semibold mb-1">{role.title}</h3>
                  <h4 className="text-muted-foreground mb-2">{role.organization}</h4>
                  <p className="text-muted-foreground text-sm">{role.description}</p>
                </div>
                
                {/* Empty space for even indexes */}
                {index % 2 === 0 && <div className="hidden md:block md:w-1/2"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
