
import React from 'react';
import { useTranslation } from '@/context/TranslationContext';
import { motion } from 'framer-motion';
import { Instagram, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

const moodItems = [
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=600&h=400&q=80',
    caption: 'Peaceful moments'
  },
  {
    type: 'quote',
    text: 'The best way to predict the future is to create it.',
    author: 'Abraham Lincoln'
  },
  {
    type: 'playlist',
    name: 'Coding Focus',
    platform: 'Spotify',
    link: '#'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&h=400&q=80',
    caption: 'Nature inspires me'
  },
  {
    type: 'quote',
    text: 'Education is not the learning of facts, but the training of the mind to think.',
    author: 'Albert Einstein'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=600&h=400&q=80',
    caption: 'Sometimes you just need to relax'
  }
];

const MoodBoard = () => {
  const { translate } = useTranslation();

  return (
    <section id="moodboard" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="section-title inline-block">
            {translate('Moodboard')}
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {translate('A collection of things that inspire me, reflect my personality, and things I love.')}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {moodItems.map((item, index) => {
            if (item.type === 'image') {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={item.src} 
                      alt={item.caption}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <p className="p-4 text-white font-medium">{translate(item.caption)}</p>
                    </div>
                  </div>
                </motion.div>
              );
            } else if (item.type === 'quote') {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/20 dark:to-purple-800/10 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center"
                >
                  <div>
                    <p className="text-lg italic mb-3">"{translate(item.text)}"</p>
                    <p className="text-right text-sm text-gray-600 dark:text-gray-400">— {item.author}</p>
                  </div>
                </motion.div>
              );
            } else if (item.type === 'playlist') {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/20 dark:to-green-800/10 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold mb-2">{translate(item.name)}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{item.platform}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    {translate('Listen')}
                  </Button>
                </motion.div>
              );
            }
            return null;
          })}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="https://www.instagram.com/stories.of_albin" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-purple-500 hover:text-purple-600 transition-colors"
          >
            <Camera className="h-5 w-5" />
            <span>{translate('More photos on Instagram')}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default MoodBoard;
