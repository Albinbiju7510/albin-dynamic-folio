
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Key, Puzzle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Define a set of puzzles
const puzzles = [
  {
    question: "What has keys but no locks, space but no room, and you can enter but not exit?",
    answer: "Albin@7510",
    hint: "It's something you use everyday to type"
  },
  {
    question: "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?",
    answer: "Albin@7510",
    hint: "Think about communication that uses air vibrations"
  },
  {
    question: "The more you take, the more you leave behind. What am I?",
    answer: "Albin@7510",
    hint: "It's something that marks your journey"
  },
  {
    question: "What gets wetter as it dries?",
    answer: "Albin@7510",
    hint: "You use it after taking a shower"
  },
  {
    question: "I'm tall when I'm young, and short when I'm old. What am I?",
    answer: "Albin@7510",
    hint: "Think of something that burns down over time"
  }
];

const SecretIcon: React.FC = () => {
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [puzzleOpen, setPuzzleOpen] = useState(false);
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const { toast } = useToast();

  const handleClick = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      
      if (newCount === 3) {
        setPuzzleOpen(true);
        setCurrentPuzzle(Math.floor(Math.random() * puzzles.length));
        setShowHint(false);
        return newCount;
      }
      
      if (newCount === 1) {
        toast({
          title: "Admin Access",
          description: "Click 3 times to unlock the puzzle for admin access.",
          duration: 3000,
        });
        
        setTimeout(() => {
          setClickCount(0);
        }, 5000);
      }
      
      return newCount;
    });
  };

  const handleAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer === puzzles[currentPuzzle].answer) {
      toast({
        title: "Access Granted",
        description: "Welcome to the admin panel!",
        duration: 3000,
      });
      setPuzzleOpen(false);
      setClickCount(0);
      setAnswer('');
      navigate('/admin');
    } else {
      toast({
        title: "Access Denied",
        description: "Incorrect answer. Try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className="fixed bottom-6 right-6 z-50 cursor-pointer p-2 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
            onClick={handleClick}
          >
            <div className={`transition-all duration-300 ${isVisible ? 'opacity-60' : 'opacity-20'}`}>
              <Key className="h-6 w-6 text-purple-500" />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Admin access (click 3 times)</p>
        </TooltipContent>
      </Tooltip>
      
      <Dialog open={puzzleOpen} onOpenChange={setPuzzleOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center font-heading">
              <Puzzle className="mr-2 h-5 w-5 text-purple-500" />
              Admin Access Puzzle
            </DialogTitle>
            <DialogDescription>
              Solve this puzzle to access the admin panel.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-6">
            <h3 className="text-lg font-medium mb-4">{puzzles[currentPuzzle].question}</h3>
            <form onSubmit={handleAnswerSubmit}>
              <Input 
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter your answer"
                className="mb-4"
              />
              
              {showHint && (
                <div className="text-sm text-purple-500 italic mb-4">
                  Hint: {puzzles[currentPuzzle].hint}
                </div>
              )}
              
              <div className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowHint(true)}
                  disabled={showHint}
                >
                  Show Hint
                </Button>
                <Button type="submit" className="bg-purple-500 hover:bg-purple-600">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SecretIcon;
