
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

const NotFound = () => {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(10);
  const [message, setMessage] = useState('');
  const { theme } = useTheme();
  const [maze, setMaze] = useState<number[][]>([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [exit, setExit] = useState({ x: 0, y: 0 });
  const [gameWon, setGameWon] = useState(false);

  const funnyMessages = [
    "Looks like you've gone outside my memory allocation 🧠💥",
    "404: Page not found. But hey, you found a secret area!",
    "Oops! The page you're looking for is on vacation.",
    "This link is as broken as my sleep schedule during finals week.",
    "Congratulations! You've discovered the rarest page on the internet - it doesn't exist!",
    "I searched high and low but couldn't find this page. Maybe it's hiding?",
    "The page you're looking for took a wrong turn at Albuquerque.",
    "This page has ascended to a higher plane of existence.",
    "404: Motivation not found 😭",
    "I debugged this at 2AM. Appreciate me."
  ];

  // Generate a simple maze
  const generateMaze = (size: number) => {
    // 0: path, 1: wall
    const newMaze = Array(size).fill(0).map(() => Array(size).fill(0));
    
    // Add some walls
    for (let i = 0; i < size * 2; i++) {
      const x = Math.floor(Math.random() * size);
      const y = Math.floor(Math.random() * size);
      if (x !== 0 || y !== 0) {  // Don't put a wall at the start
        newMaze[y][x] = 1;
      }
    }
    
    // Set exit position
    const exitX = size - 1;
    const exitY = size - 1;
    newMaze[exitY][exitX] = 2;  // 2 represents the exit
    setExit({ x: exitX, y: exitY });
    
    return newMaze;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (gameWon) return;
    
    const { x, y } = position;
    let newX = x;
    let newY = y;
    
    switch(e.key) {
      case 'ArrowUp':
        newY = Math.max(0, y - 1);
        break;
      case 'ArrowDown':
        newY = Math.min(maze.length - 1, y + 1);
        break;
      case 'ArrowLeft':
        newX = Math.max(0, x - 1);
        break;
      case 'ArrowRight':
        newX = Math.min(maze[0].length - 1, x + 1);
        break;
      default:
        return;
    }
    
    // Check if the move is valid (not into a wall)
    if (maze[newY][newX] !== 1) {
      setPosition({ x: newX, y: newY });
      
      // Check if player reached the exit
      if (newX === exit.x && newY === exit.y) {
        setGameWon(true);
        setTimeout(() => navigate('/'), 2000);
      }
    }
  };

  const resetGame = () => {
    const size = 8;
    setMaze(generateMaze(size));
    setPosition({ x: 0, y: 0 });
    setGameWon(false);
  };

  useEffect(() => {
    // Pick a random message
    const randomIndex = Math.floor(Math.random() * funnyMessages.length);
    setMessage(funnyMessages[randomIndex]);
    
    // Initialize the maze
    resetGame();

    // Countdown to redirect
    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-white dark:from-purple-900/30 dark:to-background p-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        <h1 className="text-7xl md:text-9xl font-bold text-purple-400 mb-6">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">Page Not Found</h2>
        
        <motion.p 
          className="text-lg text-gray-600 dark:text-gray-300 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {message}
        </motion.p>
        
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h3 className="text-xl font-medium mb-3">
            {gameWon ? "You escaped the 404 maze! Redirecting..." : "Escape the 404 maze to go home!"}
          </h3>
          
          <div 
            className="flex justify-center mb-4"
            tabIndex={0}
            onKeyDown={handleKeyDown}
          >
            <div className="grid grid-cols-8 gap-1 border border-purple-200 p-2 rounded-md">
              {maze.map((row, y) => (
                row.map((cell, x) => (
                  <div 
                    key={`${x}-${y}`} 
                    className={`
                      w-6 h-6 rounded-sm
                      ${cell === 1 ? 'bg-gray-800' : cell === 2 ? 'bg-green-500' : 'bg-purple-100 dark:bg-purple-700/30'}
                      ${position.x === x && position.y === y ? 'relative' : ''}
                    `}
                  >
                    {position.x === x && position.y === y && (
                      <motion.div
                        className="absolute inset-0 bg-blue-500 rounded-sm"
                        animate={{ scale: [0.8, 1, 0.8] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </div>
                ))
              ))}
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mb-3">Use arrow keys to navigate the maze</p>
          
          <Button variant="outline" size="sm" onClick={resetGame}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset Maze
          </Button>
        </motion.div>
        
        <div className="flex justify-center space-x-4">
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
        
        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          Redirecting to homepage in {counter} seconds...
        </p>
      </motion.div>
    </div>
  );
};

export default NotFound;
