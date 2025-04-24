import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const speedlineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Create speed lines with GSAP
    if (speedlineRefs.current.length > 0) {
      speedlineRefs.current.forEach((line, index) => {
        if (line) {
          gsap.set(line, {
            left: `${Math.random() * 100}%`,
            height: `${Math.random() * 100 + 50}px`,
            width: `${Math.random() * 3 + 1}px`,
            rotate: `${Math.random() * 45 - 22.5}deg`,
          });
          
          gsap.to(line, {
            x: '-100vw',
            duration: Math.random() * 2 + 1,
            repeat: -1,
            ease: 'none',
            delay: index * 0.2
          });
        }
      });
    }

    // Animate the heading with GSAP
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current, 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
      );
    }
  }, []);

  // Create an array of speed lines
  const speedLines = Array(10).fill(null);

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {speedLines.map((_, index) => (
        <div 
          key={index}
          ref={(el) => (speedlineRefs.current[index] = el)}
          className="absolute bg-white opacity-70"
        />
      ))}
      
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block bg-primary-500 text-white px-3 py-1 rounded-md mb-4 font-bold text-sm"
        >
          FREE AI MANGA ANIMATOR
        </motion.div>
        
        <h1 
          ref={headingRef}
          className="manga-heading mb-6 text-white"
        >
          <span className="block">Bring Your Manga to</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500">
            LIFE!
          </span>
        </h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto"
        >
          Upload your favorite panel or comic page, enter a few details—and watch as our AI animates it in seconds.
        </motion.p>
        
        <motion.a 
          href="#upload"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="btn-primary inline-flex items-center"
        >
          Animate Now <ArrowRight className="ml-2" />
        </motion.a>
      </div>
      
      <div className="absolute -bottom-16 left-0 right-0 h-32 bg-gradient-to-t from-manga-dark to-transparent z-0" />
    </section>
  );
};