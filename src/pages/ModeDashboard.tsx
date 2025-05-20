import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/context/TranslationContext';
import { usePortfolio } from '@/context/PortfolioContext';
import { PortfolioProvider } from '@/context/PortfolioContext';
import MiniGameWrapper from '@/components/games/MiniGameWrapper';

interface ModeConfig {
  title: string;
  description: string;
  color: string;
  bgClass: string;
}

const modeConfigs: Record<string, ModeConfig> = {
  student: {
    title: "Student Mode",
    description: "Exploring my academic journey, courses, and achievements",
    color: "text-blue-500",
    bgClass: "bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-800/10"
  },
  volunteer: {
    title: "Volunteer Mode",
    description: "Showcasing my community service and contributions",
    color: "text-green-500",
    bgClass: "bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/20 dark:to-green-800/10"
  },
  creator: {
    title: "Content Creator Mode",
    description: "My creative works, videos, and artistic projects",
    color: "text-red-500",
    bgClass: "bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/20 dark:to-red-800/10"
  },
  developer: {
    title: "Developer Mode",
    description: "Code projects, technical skills, and developer journey",
    color: "text-purple-500",
    bgClass: "bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/20 dark:to-purple-800/10"
  },
  host: {
    title: "Host Mode",
    description: "Events, speaking engagements, and presentations",
    color: "text-yellow-500",
    bgClass: "bg-gradient-to-br from-yellow-100 to-yellow-50 dark:from-yellow-900/20 dark:to-yellow-800/10"
  },
  dreamer: {
    title: "Dreamer Mode",
    description: "Future aspirations, goals, and creative visions",
    color: "text-indigo-500",
    bgClass: "bg-gradient-to-br from-indigo-100 to-indigo-50 dark:from-indigo-900/20 dark:to-indigo-800/10"
  }
};

const ModeDashboardContent = () => {
  const { modeId } = useParams<{ modeId: string }>();
  const navigate = useNavigate();
  const { translate } = useTranslation();
  const { data } = usePortfolio();
  const [isLoading, setIsLoading] = useState(true);
  
  // Get mode configuration or default to student mode if invalid
  const mode = modeConfigs[modeId || ''] || modeConfigs.student;

  useEffect(() => {
    // Simulate loading for transition effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [modeId]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'm' || e.key === 'M') {
      navigate('/');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle content based on mode
  const renderModeContent = () => {
    switch (modeId) {
      case 'student':
        return (
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Education</h3>
              <p className="mb-2"><span className="font-semibold">Degree:</span> BTech in Computer Science Engineering</p>
              <p className="mb-2"><span className="font-semibold">Institution:</span> College of Engineering Aranmula</p>
              <p><span className="font-semibold">Period:</span> 2021 - Present</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Academic Projects</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Campus Resource Utilization App</li>
                <li>Multi-User Chat Application</li>
                <li>Data Analysis System</li>
              </ul>
            </div>
          </div>
        );
      
      case 'developer':
        return (
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Technical Skills</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {data.skills.filter(skill => skill.category === 'programming' || skill.category === 'technology').map((skill, index) => (
                  <div key={index} className="tech-tag">{skill.name}</div>
                ))}
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Development Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.projects.map((project, index) => (
                  <div key={index} className="project-card">
                    <h4 className="text-lg font-bold">{project.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-xs rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'volunteer':
        return (
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Community Service</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">NSS Volunteer Secretary</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Led volunteer initiatives focused on social causes and community development.</p>
                </div>
                <div>
                  <h4 className="font-semibold">TinkerHub Campus Lead</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Organized tech workshops and innovation challenges for students.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Leadership Roles</h3>
              <div className="space-y-4">
                {data.roles.map((role, index) => (
                  <div key={index}>
                    <h4 className="font-semibold">{role.title} at {role.organization}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{role.duration}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{role.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      // Add other cases for remaining modes
      default:
        return (
          <div className="text-center p-8">
            <p className="text-xl">Content for this mode is coming soon!</p>
            <Button 
              onClick={() => navigate('/')} 
              className="mt-4"
              variant="outline"
            >
              Return to Mode Selection
            </Button>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen ${mode.bgClass} pb-16`}
    >
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
          <div className="text-center">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "loop"
              }}
              className={`w-16 h-16 rounded-full ${mode.bgClass} shadow-lg mb-4`}
            />
            <h3 className={`text-xl font-bold font-heading ${mode.color}`}>Loading {mode.title}...</h3>
          </div>
        </div>
      ) : (
        <>
          <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => navigate('/')}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className={`text-xl font-bold font-heading ${mode.color}`}>
                  {translate(mode.title)}
                </h1>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Press 'M' to return to mode selection
                </p>
              </div>
            </div>
          </header>
          
          <main className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className={`text-3xl md:text-4xl font-bold mb-4 font-heading ${mode.color}`}>
                  {translate(mode.title)}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {translate(mode.description)}
                </p>
              </div>
              
              {renderModeContent()}
            </motion.div>
          </main>

          {/* Add the MiniGame component */}
          {modeId && <MiniGameWrapper mode={modeId} />}
        </>
      )}
    </motion.div>
  );
};

// Wrap the component with PortfolioProvider
const ModeDashboard = () => {
  return (
    <PortfolioProvider>
      <ModeDashboardContent />
    </PortfolioProvider>
  );
};

export default ModeDashboard;
