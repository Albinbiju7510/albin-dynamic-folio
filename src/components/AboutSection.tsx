
import React, { useRef, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { usePortfolio } from '@/context/PortfolioContext';

const AboutSection: React.FC = () => {
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

  return (
    <section id="about" ref={ref} className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className={`section-title transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          About Me
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-10">
          <div className={`md:col-span-7 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <p className="text-lg mb-6 leading-relaxed">
              {data.about}
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              <span className="tech-tag">Python</span>
              <span className="tech-tag">Web Development</span>
              <span className="tech-tag">React</span>
              <span className="tech-tag">UI/UX Design</span>
              <span className="tech-tag">Content Creation</span>
              <span className="tech-tag">Leadership</span>
            </div>
          </div>
          
          <div className={`md:col-span-5 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-white dark:bg-purple-600/5 rounded-xl p-6 shadow-md border border-purple-200/50 dark:border-purple-500/10">
              <h3 className="text-xl font-semibold mb-4 text-purple-500">Education</h3>
              <div className="mb-6">
                <div className="font-medium">BTech in Computer Science Engineering</div>
                <div className="text-muted-foreground">College of Engineering Aranmula</div>
                <div className="text-sm text-muted-foreground">2021 - Present</div>
              </div>
              
              <h3 className="text-xl font-semibold mb-4 text-purple-500">Quick Facts</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
                  <span>Third-year BTech student</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
                  <span>Passionate about innovative tech solutions</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
                  <span>Event organizer and community builder</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
                  <span>Tech content creator</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
