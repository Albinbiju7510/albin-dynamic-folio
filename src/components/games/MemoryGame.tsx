
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface MemoryGameProps {
  mode: string;
}

const MemoryGame: React.FC<MemoryGameProps> = ({ mode }) => {
  const [cards, setCards] = useState<Array<{id: number, value: string, flipped: boolean, matched: boolean}>>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Different emojis based on mode
  const getEmojis = () => {
    switch (mode) {
      case 'creator':
        return ['📸', '🎬', '🎨', '🎭', '✏️', '🖌️', '🎤', '🎧'];
      case 'host':
        return ['🎤', '🎭', '👥', '🗣️', '📢', '👋', '🎪', '🎟️'];
      case 'dreamer':
        return ['✨', '🌟', '💫', '🌙', '🌠', '🔮', '💭', '🦄'];
      default:
        return ['🎮', '🎯', '🎪', '🎨', '🎭', '🎬', '🎤', '🎧'];
    }
  };

  useEffect(() => {
    initGame();
  }, [mode]);

  const initGame = () => {
    const emojis = getEmojis();
    let initialCards = [...emojis, ...emojis].map((value, index) => ({
      id: index,
      value,
      flipped: false,
      matched: false
    }));
    
    // Shuffle cards
    initialCards.sort(() => Math.random() - 0.5);
    
    setCards(initialCards);
    setFlippedCards([]);
    setMoves(0);
    setGameOver(false);
  };

  const handleCardClick = (id: number) => {
    // Ignore if game is over or card is already flipped/matched
    if (gameOver || cards[id].flipped || cards[id].matched) return;
    
    // Prevent flipping more than 2 cards
    if (flippedCards.length === 2) return;
    
    // Flip the card
    const newCards = [...cards];
    newCards[id].flipped = true;
    setCards(newCards);
    
    // Add to flipped cards
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);
    
    // If 2 cards are flipped, check for match
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      
      const [first, second] = newFlippedCards;
      if (cards[first].value === cards[second].value) {
        // Match found
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[first].matched = true;
          matchedCards[second].matched = true;
          setCards(matchedCards);
          
          // Check if game is over (all cards matched)
          if (matchedCards.every(card => card.matched)) {
            setGameOver(true);
          }
          
          setFlippedCards([]);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          const unmatchedCards = [...cards];
          unmatchedCards[first].flipped = false;
          unmatchedCards[second].flipped = false;
          setCards(unmatchedCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-center">
        <p className="text-lg font-medium mb-2">Memory Game</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Moves: {moves}</p>
      </div>

      <div className="grid grid-cols-4 gap-2 w-full max-w-xs mx-auto">
        {cards.map(card => (
          <motion.div
            key={card.id}
            className={`aspect-square cursor-pointer rounded-md flex items-center justify-center text-2xl ${
              card.flipped || card.matched 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700'
            } ${card.matched ? 'opacity-70' : ''}`}
            animate={{ rotateY: card.flipped || card.matched ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleCardClick(card.id)}
          >
            {(card.flipped || card.matched) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                {card.value}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {gameOver && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-center"
        >
          <p className="text-xl font-bold text-purple-500 mb-4">Congratulations!</p>
          <p className="mb-4">You completed the game in {moves} moves</p>
          <Button onClick={initGame}>Play Again</Button>
        </motion.div>
      )}

      {!gameOver && (
        <Button 
          variant="outline" 
          className="mt-4" 
          onClick={initGame}
        >
          Reset Game
        </Button>
      )}
    </div>
  );
};

export default MemoryGame;
