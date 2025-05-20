
import React, { useState } from 'react';
import { Gamepad, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import MemoryGame from './MemoryGame';
import QuizGame from './QuizGame';
import CodePuzzleGame from './CodePuzzleGame';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface MiniGameWrapperProps {
  mode: string;
}

const MiniGameWrapper: React.FC<MiniGameWrapperProps> = ({ mode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeGame, setActiveGame] = useState('quiz');

  const getGameTitle = () => {
    switch(mode) {
      case 'student':
        return 'Student Knowledge Quiz';
      case 'volunteer':
        return 'Community Challenge';
      case 'creator':
        return 'Creative Games';
      case 'developer':
        return 'Code Challenges';
      case 'host':
        return 'Presenter Games';
      case 'dreamer':
        return 'Vision Quest';
      default:
        return 'Mini-Games';
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 bg-purple-500 hover:bg-purple-600 text-white rounded-full shadow-lg z-40 flex items-center gap-2"
      >
        <Gamepad className="h-5 w-5" />
        <span>Play Mini-Games</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold font-heading">{getGameTitle()}</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <Tabs defaultValue="quiz" value={activeGame} onValueChange={setActiveGame} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6 w-full">
                <TabsTrigger value="quiz">Quiz</TabsTrigger>
                <TabsTrigger value="memory">Memory</TabsTrigger>
                <TabsTrigger value="puzzle">Puzzle</TabsTrigger>
              </TabsList>
              
              <TabsContent value="quiz" className="focus-visible:outline-none">
                <QuizGame mode={mode} />
              </TabsContent>
              
              <TabsContent value="memory" className="focus-visible:outline-none">
                <MemoryGame mode={mode} />
              </TabsContent>
              
              <TabsContent value="puzzle" className="focus-visible:outline-none">
                <CodePuzzleGame />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default MiniGameWrapper;
