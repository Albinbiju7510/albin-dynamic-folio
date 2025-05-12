
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface QuizGameProps {
  mode: string;
}

const QuizGame: React.FC<QuizGameProps> = ({ mode }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState<Array<{
    question: string;
    options: string[];
    answer: number;
  }>>([]);

  useEffect(() => {
    if (mode === 'student') {
      setQuestions([
        {
          question: "What is the most common degree for Computer Science?",
          options: ["BA", "BTech", "BSc", "BCA"],
          answer: 1
        },
        {
          question: "Which of these is NOT a programming paradigm?",
          options: ["Object-Oriented", "Functional", "Procedural", "Alphabetical"],
          answer: 3
        },
        {
          question: "What does CPU stand for?",
          options: ["Central Processing Unit", "Computer Personal Unit", "Central Processor Utility", "Core Processing Unit"],
          answer: 0
        },
        {
          question: "Which data structure uses LIFO principle?",
          options: ["Queue", "Stack", "Linked List", "Tree"],
          answer: 1
        },
        {
          question: "What year was C++ first released?",
          options: ["1985", "1990", "1979", "1995"],
          answer: 0
        }
      ]);
    } else if (mode === 'volunteer') {
      setQuestions([
        {
          question: "What does NSS stand for?",
          options: ["National Student Service", "National Service Scheme", "New Social Service", "National Student Society"],
          answer: 1
        },
        {
          question: "Which organization promotes innovation in colleges?",
          options: ["NSS", "IEDC", "IEEE", "ISTE"],
          answer: 1
        },
        {
          question: "What is the main goal of community service?",
          options: ["Financial gain", "Building resume", "Helping others", "Meeting new people"],
          answer: 2
        },
        {
          question: "What does TinkerHub focus on?",
          options: ["Sports", "Arts", "Technology learning", "Cooking"],
          answer: 2
        },
        {
          question: "Which of these is a key leadership skill?",
          options: ["Independence", "Communication", "Competition", "Perfectionism"],
          answer: 1
        }
      ]);
    }
  }, [mode]);

  const handleAnswer = (selectedOption: number) => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  if (questions.length === 0) {
    return <div className="text-center py-10">Loading questions...</div>;
  }

  return (
    <div className="flex flex-col items-center max-w-md mx-auto">
      {!showResult ? (
        <>
          <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all"
              style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
            ></div>
          </div>
          
          <motion.div
            key={currentQuestion}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-6"
          >
            <h3 className="text-lg font-medium mb-4">
              Question {currentQuestion + 1} of {questions.length}
            </h3>
            <p className="text-xl">{questions[currentQuestion].question}</p>
          </motion.div>

          <div className="space-y-3 w-full">
            {questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleAnswer(index)}
                className="w-full p-3 text-left rounded-md border hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all"
              >
                {option}
              </motion.button>
            ))}
          </div>
        </>
      ) : (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-6"
        >
          <h3 className="text-2xl font-bold mb-4">Quiz Finished!</h3>
          <p className="text-xl mb-8">Your score: {score} out of {questions.length}</p>
          
          {score === questions.length ? (
            <p className="text-green-500 text-lg mb-6">Perfect score! Well done!</p>
          ) : score >= questions.length / 2 ? (
            <p className="text-purple-500 text-lg mb-6">Good job!</p>
          ) : (
            <p className="text-amber-500 text-lg mb-6">Better luck next time!</p>
          )}
          
          <Button onClick={restartQuiz}>Try Again</Button>
        </motion.div>
      )}
    </div>
  );
};

export default QuizGame;
