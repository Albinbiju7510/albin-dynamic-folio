
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Book, Bell, Film, Code, Mic, Star } from 'lucide-react';
import { useTranslation } from '@/context/TranslationContext';

interface ModeSelectorProps {
  className?: string;
}

interface ModeOption {
  icon: React.ReactNode;
  label: string;
  path: string;
  color: string;
  description: string;
  animation: {
    rotate?: number;
    scale?: number[];
    y?: number;
  };
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const { translate } = useTranslation();

  const modes: ModeOption[] = [
    {
      icon: <Book className="h-8 w-8" />,
      label: translate('Student'),
      path: '/mode/student',
      color: 'bg-blue-500 hover:bg-blue-600',
      description: translate('Academic journey and achievements'),
      animation: { rotate: 15, scale: [1, 1.05, 1] }
    },
    {
      icon: <Bell className="h-8 w-8" />,
      label: translate('Volunteer'),
      path: '/mode/volunteer',
      color: 'bg-green-500 hover:bg-green-600',
      description: translate('Community service and contributions'),
      animation: { y: -5, scale: [1, 1.1, 1] }
    },
    {
      icon: <Film className="h-8 w-8" />,
      label: translate('Content Creator'),
      path: '/mode/creator',
      color: 'bg-red-500 hover:bg-red-600',
      description: translate('Videos, reels, and creative works'),
      animation: { rotate: -10, scale: [1, 1.05, 1] }
    },
    {
      icon: <Code className="h-8 w-8" />,
      label: translate('Developer'),
      path: '/mode/developer',
      color: 'bg-purple-500 hover:bg-purple-600',
      description: translate('Projects and technical skills'),
      animation: { y: 5, scale: [1, 1.1, 1] }
    },
    {
      icon: <Mic className="h-8 w-8" />,
      label: translate('Host'),
      path: '/mode/host',
      color: 'bg-yellow-500 hover:bg-yellow-600',
      description: translate('Events, speaking, and presentations'),
      animation: { rotate: 10, scale: [1, 1.05, 1] }
    },
    {
      icon: <Star className="h-8 w-8" />,
      label: translate('Dreamer'),
      path: '/mode/dreamer',
      color: 'bg-indigo-500 hover:bg-indigo-600',
      description: translate('Goals, aspirations, and future visions'),
      animation: { y: -5, scale: [1, 1.1, 1] }
    }
  ];

  const handleModeSelect = (path: string) => {
    // Animate before navigation
    document.body.classList.add('page-transition');
    setTimeout(() => {
      navigate(path);
      setTimeout(() => {
        document.body.classList.remove('page-transition');
      }, 500);
    }, 300);
  };

  // Container variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  // Item variants for individual animations
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className={`w-full px-4 py-10 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-purple-500">
          {translate('Choose a Mode')}
        </h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          {translate('Each mode represents a different facet of my identity. Select one to explore that aspect of my life and work.')}
        </p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {modes.map((mode, index) => (
          <motion.div
            key={mode.path}
            variants={itemVariants}
            whileHover={{
              ...mode.animation,
              transition: { duration: 0.3, yoyo: Infinity }
            }}
            onClick={() => handleModeSelect(mode.path)}
            className={`${mode.color} text-white rounded-xl p-6 shadow-lg cursor-pointer transition-transform duration-300 transform hover:shadow-xl flex flex-col items-center`}
          >
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="mb-4 p-3 bg-white/20 rounded-full"
            >
              {mode.icon}
            </motion.div>
            <h3 className="text-xl font-bold mb-2">{mode.label}</h3>
            <p className="text-white/80 text-sm">{mode.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ModeSelector;
