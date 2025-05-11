
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [puzzleState, setPuzzleState] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 0]);
  const [moves, setMoves] = useState(0);
  const { theme } = useTheme();
  
  // Terminal animation state
  const [text, setText] = useState("");
  const fullText = "Looks like you've gone outside my memory allocation 🧠💥\nError 404: Route not found\n> Path: " + location.pathname;
  
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    let index = 0;
    const typingInterval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;
      
      if (index > fullText.length) {
        clearInterval(typingInterval);
      }
    }, 50);
    
    return () => clearInterval(typingInterval);
  }, [location.pathname]);
  
  const handleTileClick = (index: number) => {
    // Check if adjacent to empty space (0)
    const emptyIndex = puzzleState.indexOf(0);
    const row = Math.floor(index / 3);
    const emptyRow = Math.floor(emptyIndex / 3);
    const col = index % 3;
    const emptyCol = emptyIndex % 3;
    
    // If tile is adjacent to empty space
    if (
      (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
      (col === emptyCol && Math.abs(row - emptyRow) === 1)
    ) {
      const newPuzzleState = [...puzzleState];
      newPuzzleState[emptyIndex] = puzzleState[index];
      newPuzzleState[index] = 0;
      setPuzzleState(newPuzzleState);
      setMoves(moves + 1);
      
      // Check if puzzle is solved
      if (newPuzzleState.join('') === '12345678' && emptyIndex === 8) {
        setTimeout(() => {
          alert(`Puzzle solved in ${moves + 1} moves! Great job!`);
          navigate('/');
        }, 500);
      }
    }
  };
  
  // Function to shuffle the puzzle
  const shufflePuzzle = () => {
    let newPuzzleState = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    
    // Do 50 random valid moves
    for (let i = 0; i < 50; i++) {
      const emptyIndex = newPuzzleState.indexOf(0);
      const possibleMoves = [];
      
      // Check up
      if (emptyIndex >= 3) possibleMoves.push(emptyIndex - 3);
      // Check down
      if (emptyIndex < 6) possibleMoves.push(emptyIndex + 3);
      // Check left
      if (emptyIndex % 3 !== 0) possibleMoves.push(emptyIndex - 1);
      // Check right
      if (emptyIndex % 3 !== 2) possibleMoves.push(emptyIndex + 1);
      
      const moveIndex = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      newPuzzleState[emptyIndex] = newPuzzleState[moveIndex];
      newPuzzleState[moveIndex] = 0;
    }
    
    setPuzzleState(newPuzzleState);
    setMoves(0);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-gray-100 dark:from-gray-900 dark:to-purple-900/20 p-4">
      <div className="max-w-lg w-full">
        <div className={`rounded-lg overflow-hidden shadow-xl transition-all ${theme === 'dark' ? 'bg-gray-800 border border-purple-500/20' : 'bg-white'}`}>
          <div className="p-1 bg-gray-800 flex items-center">
            <div className="flex space-x-2 px-2">
              <div className="rounded-full w-3 h-3 bg-red-500"></div>
              <div className="rounded-full w-3 h-3 bg-yellow-500"></div>
              <div className="rounded-full w-3 h-3 bg-green-500"></div>
            </div>
            <div className="flex-1 text-center text-xs text-gray-400">Terminal</div>
          </div>
          
          <div className="p-6">
            {showPuzzle ? (
              <div>
                <h2 className="text-2xl font-bold text-purple-500 mb-4">Slide Puzzle Challenge</h2>
                <p className="mb-4 text-gray-600 dark:text-gray-300">Arrange the numbers in order (1-8) to find your way back home.</p>
                
                <div className="grid grid-cols-3 gap-1 mb-4">
                  {puzzleState.map((tile, index) => (
                    <button
                      key={index}
                      onClick={() => handleTileClick(index)}
                      className={`w-20 h-20 flex items-center justify-center text-xl font-bold rounded ${
                        tile === 0 
                          ? 'bg-gray-200 dark:bg-gray-700' 
                          : 'bg-purple-500 text-white hover:bg-purple-600'
                      }`}
                      disabled={tile === 0}
                    >
                      {tile !== 0 && tile}
                    </button>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Moves: {moves}
                  </div>
                  <Button onClick={shufflePuzzle} variant="outline">
                    Shuffle
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-start mb-6">
                  <Terminal className="text-purple-500 h-10 w-10 mr-4" />
                  <div>
                    <pre className="font-mono text-sm whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                      {text}
                    </pre>
                  </div>
                </div>
                
                <div className="mt-8 space-y-4">
                  <Button 
                    onClick={() => navigate('/')} 
                    className="w-full bg-purple-500 hover:bg-purple-600"
                  >
                    Return to Home
                  </Button>
                  <Button 
                    onClick={() => setShowPuzzle(true)} 
                    variant="outline" 
                    className="w-full"
                  >
                    Try the Puzzle Challenge
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
