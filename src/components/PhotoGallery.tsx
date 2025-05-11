
import React from 'react';
import { useTranslation } from '@/context/TranslationContext';
import { motion } from 'framer-motion';

const galleryItems = [
  {
    title: 'NSS Camp',
    imageSrc: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=600&h=400&q=80',
    description: 'NSS volunteers during food distribution camp'
  },
  {
    title: 'Event Hosting',
    imageSrc: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600&h=400&q=80',
    description: 'Hosting the annual tech fest at college'
  },
  {
    title: 'Food Distribution',
    imageSrc: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&h=400&q=80',
    description: 'Community service initiative for the underprivileged'
  },
  {
    title: 'Tech Workshop',
    imageSrc: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&h=400&q=80',
    description: 'Matrix coding workshop for beginners'
  },
  {
    title: 'Project Team',
    imageSrc: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&h=400&q=80',
    description: 'Mini project team working on a solution'
  },
  {
    title: 'College Life',
    imageSrc: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=600&h=400&q=80',
    description: 'Fun moments around the campus'
  }
];

const PhotoGallery = () => {
  const { translate } = useTranslation();

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/10 dark:to-background">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-title mb-12"
        >
          {translate('Photo Highlights')}
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.imageSrc} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg mb-1">{translate(item.title)}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{translate(item.description)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
