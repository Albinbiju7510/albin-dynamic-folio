
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const CodePuzzleGame: React.FC = () => {
  const [codeLines, setCodeLines] = useState<string[]>([]);
  const [currentSolution, setCurrentSolution] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [level, setLevel] = useState(0);
  
  const puzzles = [
    {
      title: "Print Hello World",
      description: "Arrange the code to print 'Hello World'",
      solution: [
        "console.log(",
        "'Hello World'",
        ");"
      ]
    },
    {
      title: "Create a Function",
      description: "Arrange the code to create a function that adds two numbers",
      solution: [
        "function add(a, b) {",
        "  return a + b;",
        "}"
      ]
    },
    {
      title: "Simple If Statement",
      description: "Create a simple if statement that checks if x is greater than 10",
      solution: [
        "if (x > 10) {",
        "  console.log('Greater');",
        "}"
      ]
    }
  ];

  useEffect(() => {
    resetPuzzle();
  }, [level]);

  const resetPuzzle = () => {
    const currentPuzzle = puzzles[level].solution;
    // Shuffle the code lines
    const shuffled = [...currentPuzzle].sort(() => Math.random() - 0.5);
    setCodeLines(shuffled);
    setCurrentSolution([]);
    setIsCorrect(false);
  };

  const handleLineClick = (line: string) => {
    if (codeLines.includes(line)) {
      // Move from code lines to solution
      setCodeLines(codeLines.filter(l => l !== line));
      setCurrentSolution([...currentSolution, line]);
    } else {
      // Move back from solution to code lines
      setCurrentSolution(currentSolution.filter(l => l !== line));
      setCodeLines([...codeLines, line]);
    }
  };

  const checkSolution = () => {
    const isEqual = 
      currentSolution.length === puzzles[level].solution.length && 
      currentSolution.every((line, i) => line === puzzles[level].solution[i]);
    
    setIsCorrect(isEqual);
  };

  const nextLevel = () => {
    if (level < puzzles.length - 1) {
      setLevel(level + 1);
    } else {
      // Restart from the beginning after completing all puzzles
      setLevel(0);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-medium mb-1">{puzzles[level].title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{puzzles[level].description}</p>
      
      <div className="w-full mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-md min-h-32">
        {currentSolution.length === 0 ? (
          <div className="text-center text-gray-500 italic">Your solution will appear here</div>
        ) : (
          <div className="font-mono">
            {currentSolution.map((line, index) => (
              <motion.div
                key={`solution-${index}`}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="py-1 px-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                onClick={() => handleLineClick(line)}
              >
                {line}
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-2">Available Code:</h4>
        <div className="flex flex-wrap gap-2">
          {codeLines.map((line, index) => (
            <motion.div
              key={`code-${index}`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-purple-100 dark:bg-purple-900/30 py-1 px-3 rounded cursor-pointer font-mono hover:bg-purple-200 dark:hover:bg-purple-900/50"
              onClick={() => handleLineClick(line)}
            >
              {line}
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="flex gap-4">
        <Button variant="outline" onClick={resetPuzzle}>Reset</Button>
        <Button onClick={checkSolution}>Check Solution</Button>
      </div>
      
      {isCorrect && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex flex-col items-center"
        >
          <div className="flex items-center text-green-500 mb-2">
            <Check className="mr-1 h-5 w-5" />
            <span className="font-medium">Correct solution!</span>
          </div>
          <Button onClick={nextLevel} className="bg-green-500 hover:bg-green-600">
            {level < puzzles.length - 1 ? 'Next Level' : 'Start Over'}
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default CodePuzzleGame;
