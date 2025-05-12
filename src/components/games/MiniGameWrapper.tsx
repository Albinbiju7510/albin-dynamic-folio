
import React, { useState } from 'react';
import { Gamepad, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import MemoryGame from './MemoryGame';
import QuizGame from './QuizGame';
import CodePuzzleGame from './CodePuzzleGame';

interface MiniGameWrapperProps {
  mode: string;
}

const MiniGameWrapper: React.FC<MiniGameWrapperProps> = ({ mode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getGameComponent = () => {
    switch (mode) {
      case 'student':
      case 'volunteer':
        return <QuizGame mode={mode} />;
      case 'developer':
        return <CodePuzzleGame />;
      default:
        return <MemoryGame mode={mode} />;
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 bg-purple-500 hover:bg-purple-600 text-white rounded-full shadow-lg z-40 flex items-center gap-2"
      >
        <Gamepad className="h-5 w-5" />
        <span>Play Mini-Game</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Mini-Game</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {getGameComponent()}
          </motion.div>
        </div>
      )}
    </>
  );
};

export default MiniGameWrapper;
