import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Download, Share2, Repeat } from 'lucide-react';

interface ResultRevealProps {
  imagePreview: string | null;
  promptText: string;
  onReset: () => void;
}

export const ResultReveal: React.FC<ResultRevealProps> = ({ 
  imagePreview, 
  promptText,
  onReset 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  
  // Create a simulated animated result
  const resultVideoUrl = 'https://assets.codepen.io/2292554/explosion.mp4';

  useEffect(() => {
    // Animate the reveal
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );
    }

    // Animate the video container with a flashy reveal
    if (videoContainerRef.current) {
      const tl = gsap.timeline();
      
      tl.fromTo(
        videoContainerRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' }
      );

      // Add a flash effect
      const flash = document.createElement('div');
      flash.style.position = 'absolute';
      flash.style.inset = '0';
      flash.style.backgroundColor = 'white';
      flash.style.zIndex = '1';
      videoContainerRef.current.appendChild(flash);

      tl.to(flash, { opacity: 0, duration: 0.3, onComplete: () => flash.remove() });
    }
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[80vh] py-12"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block bg-primary-500 text-white px-3 py-1 rounded-md mb-4 font-bold">
            ANIMATION COMPLETE!
          </div>
          <h2 className="font-press-start text-2xl md:text-3xl text-white mb-4">
            Your Manga Animation
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto">
            Your manga panel has been transformed into a dynamic animation! 
            Feel free to download it or share it with your friends.
          </p>
        </div>
        
        <div 
          ref={videoContainerRef} 
          className="manga-panel overflow-hidden relative mb-8"
        >
          {/* Here we would normally use the actual animated result, but for demo we'll use a placeholder video */}
          <video 
            className="w-full" 
            autoPlay 
            loop 
            muted 
            playsInline
            controls
          >
            <source src={resultVideoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Original image overlay */}
          {imagePreview && (
            <div className="absolute top-4 right-4 w-24 h-24 border-2 border-white rounded overflow-hidden">
              <img 
                src={imagePreview} 
                alt="Original" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <p className="text-white text-xs font-bold">Original</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-manga-dark border border-gray-800 rounded-md p-4 mb-8">
          <h3 className="font-bold text-white mb-2">Animation Details:</h3>
          <p className="text-gray-300 text-sm mb-4">
            <span className="font-bold">Style:</span> {promptText || "Standard animation"}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">24FPS</span>
            <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">720p</span>
            <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">5 seconds</span>
            <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">AI Generated</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="btn-secondary flex items-center">
            <Download size={20} className="mr-2" />
            Download GIF
          </button>
          <button className="btn-secondary flex items-center">
            <Download size={20} className="mr-2" />
            Download MP4
          </button>
          <button className="btn-primary flex items-center">
            <Share2 size={20} className="mr-2" />
            Share Animation
          </button>
          <button 
            onClick={onReset}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-md transition-all duration-300 flex items-center"
          >
            <Repeat size={20} className="mr-2" />
            Create New
          </button>
        </div>
      </div>
    </motion.div>
  );
};