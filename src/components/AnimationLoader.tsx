import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

interface AnimationLoaderProps {
  message: string;
}

export const AnimationLoader: React.FC<AnimationLoaderProps> = ({ message }) => {
  const shurikenRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate the shuriken spin
    if (shurikenRef.current) {
      gsap.to(shurikenRef.current, {
        rotation: 360,
        duration: 1.5,
        repeat: -1,
        ease: 'linear'
      });
    }

    // Animate panels sliding from right to left
    if (panelRef.current) {
      gsap.fromTo(
        panelRef.current.children,
        { x: '100%', opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          stagger: 0.15,
          duration: 0.5,
          ease: 'power2.out'
        }
      );
    }

    // Animate message changes
    if (messageRef.current) {
      gsap.fromTo(
        messageRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power1.out' }
      );
    }
  }, [message]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <div 
        ref={shurikenRef}
        className="relative mb-8"
      >
        <div className="w-24 h-24 relative">
          <div className="absolute inset-0 bg-primary-500 rotate-0 transform origin-center" style={{ clipPath: 'polygon(50% 0%, 45% 45%, 0% 50%, 45% 55%, 50% 100%, 55% 55%, 100% 50%, 55% 45%)' }}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-secondary-500 rounded-full"></div>
          </div>
        </div>
      </div>
      
      <div ref={messageRef} className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-press-start mb-2 text-white">
          {message}
        </h2>
        <p className="text-gray-400">
          Our AI is working its magic on your manga panel!
        </p>
      </div>
      
      <div 
        ref={panelRef}
        className="flex flex-col md:flex-row gap-4 w-full max-w-3xl overflow-hidden"
      >
        {[1, 2, 3, 4].map((panel) => (
          <motion.div 
            key={panel}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: panel * 0.2 }}
            className="manga-panel h-40 w-full md:w-1/4 flex items-center justify-center"
          >
            <div className="relative w-full h-full bg-gray-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-gray-400 rounded-full animate-pulse"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary-500" style={{ width: `${25 * panel}%` }}></div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 flex flex-col items-center">
        <div className="w-full max-w-sm bg-gray-800 h-2 rounded-full overflow-hidden mb-2">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 10, ease: 'linear' }}
            className="h-full bg-primary-500"
          ></motion.div>
        </div>
        <p className="text-gray-400 text-sm">Magic happening... please wait</p>
      </div>
    </div>
  );
};