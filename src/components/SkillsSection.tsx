
import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { usePortfolio } from '@/context/PortfolioContext';
import { Progress } from '@/components/ui/progress';

const SkillsSection: React.FC = () => {
  const { data } = usePortfolio();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [isVisible, setIsVisible] = useState(false);
  const [progressValues, setProgressValues] = useState<Record<string, number>>({});
  
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
      
      // Animate progress bars
      const timer = setTimeout(() => {
        const values: Record<string, number> = {};
        data.skills.forEach(skill => {
          values[skill.name] = skill.level;
        });
        setProgressValues(values);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [inView, data.skills]);

  // Filter skills based on active tab
  const filteredSkills = activeTab === 'all' 
    ? data.skills
    : data.skills.filter(skill => skill.category === activeTab);

  return (
    <section id="skills" ref={ref} className="py-20">
      <div className="container mx-auto px-4">
        <h2 className={`section-title transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          Skills & Expertise
        </h2>
        
        <div className={`flex flex-wrap justify-center gap-4 mb-10 mt-8 transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-full transition-all ${activeTab === 'all' ? 'bg-purple-500 text-white' : 'bg-secondary hover:bg-purple-100 dark:hover:bg-purple-900/20'}`}
          >
            All Skills
          </button>
          <button
            onClick={() => setActiveTab('programming')}
            className={`px-4 py-2 rounded-full transition-all ${activeTab === 'programming' ? 'bg-purple-500 text-white' : 'bg-secondary hover:bg-purple-100 dark:hover:bg-purple-900/20'}`}
          >
            Programming
          </button>
          <button
            onClick={() => setActiveTab('technology')}
            className={`px-4 py-2 rounded-full transition-all ${activeTab === 'technology' ? 'bg-purple-500 text-white' : 'bg-secondary hover:bg-purple-100 dark:hover:bg-purple-900/20'}`}
          >
            Technologies
          </button>
          <button
            onClick={() => setActiveTab('tool')}
            className={`px-4 py-2 rounded-full transition-all ${activeTab === 'tool' ? 'bg-purple-500 text-white' : 'bg-secondary hover:bg-purple-100 dark:hover:bg-purple-900/20'}`}
          >
            Tools
          </button>
          <button
            onClick={() => setActiveTab('soft')}
            className={`px-4 py-2 rounded-full transition-all ${activeTab === 'soft' ? 'bg-purple-500 text-white' : 'bg-secondary hover:bg-purple-100 dark:hover:bg-purple-900/20'}`}
          >
            Soft Skills
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          {filteredSkills.map((skill, index) => (
            <div 
              key={skill.name}
              className={`transition-all duration-700 delay-${index % 5}00 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{skill.name}</span>
                <span className="text-sm text-muted-foreground">{progressValues[skill.name] || 0}%</span>
              </div>
              <Progress 
                value={progressValues[skill.name] || 0} 
                className="h-2 bg-secondary bg-gradient-to-r from-purple-300 to-purple-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
