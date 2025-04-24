import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Sparkles, PanelTop } from 'lucide-react';

interface UploadSectionProps {
  imagePreview: string | null;
  promptText: string;
  onFileChange: (file: File) => void;
  onPromptChange: (text: string) => void;
  onGenerateClick: () => void;
}

export const UploadSection: React.FC<UploadSectionProps> = ({
  imagePreview,
  promptText,
  onFileChange,
  onPromptChange,
  onGenerateClick
}) => {
  const startSceneInputRef = useRef<HTMLInputElement>(null);
  const endSceneInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startScene, setStartScene] = useState<string | null>(null);
  const [endScene, setEndScene] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, isStartScene: boolean) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (isStartScene) {
        setStartScene(imageUrl);
      } else {
        setEndScene(imageUrl);
      }
      onFileChange(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent, isStartScene: boolean) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      if (isStartScene) {
        setStartScene(imageUrl);
      } else {
        setEndScene(imageUrl);
      }
      onFileChange(file);
    }
  };

  return (
    <section id="upload" className="py-16">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row gap-8"
        >
          {/* Start Scene Upload */}
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-press-start mb-4 text-white">Upload Start Scene</h2>
            <div 
              className={`manga-panel min-h-[300px] flex flex-col items-center justify-center p-4 cursor-pointer transition-all ${isDragging ? 'border-primary-500 bg-manga-dark bg-opacity-10' : ''}`}
              onClick={() => startSceneInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, true)}
            >
              <input 
                type="file" 
                ref={startSceneInputRef}
                className="hidden" 
                accept="image/*"
                onChange={(e) => handleFileSelect(e, true)}
              />
              
              {startScene ? (
                <div className="relative w-full h-full">
                  <img 
                    src={startScene} 
                    alt="Start Scene" 
                    className="w-full h-full object-contain" 
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-white text-center">Click to change image</p>
                  </div>
                </div>
              ) : (
                <>
                  <Upload size={48} className="text-gray-400 mb-4" />
                  <p className="text-gray-700 text-center mb-2 font-bold">Upload Starting Scene</p>
                  <p className="text-gray-500 text-center text-sm">or click to browse</p>
                </>
              )}
            </div>
          </div>
          
          {/* End Scene Upload */}
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-press-start mb-4 text-white">Upload End Scene</h2>
            <div 
              className={`manga-panel min-h-[300px] flex flex-col items-center justify-center p-4 cursor-pointer transition-all ${isDragging ? 'border-primary-500 bg-manga-dark bg-opacity-10' : ''}`}
              onClick={() => endSceneInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, false)}
            >
              <input 
                type="file" 
                ref={endSceneInputRef}
                className="hidden" 
                accept="image/*"
                onChange={(e) => handleFileSelect(e, false)}
              />
              
              {endScene ? (
                <div className="relative w-full h-full">
                  <img 
                    src={endScene} 
                    alt="End Scene" 
                    className="w-full h-full object-contain" 
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-white text-center">Click to change image</p>
                  </div>
                </div>
              ) : (
                <>
                  <Upload size={48} className="text-gray-400 mb-4" />
                  <p className="text-gray-700 text-center mb-2 font-bold">Upload Ending Scene</p>
                  <p className="text-gray-500 text-center text-sm">or click to browse</p>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Animation Style Input */}
        <div className="mt-8">
          <div className="manga-panel p-4">
            <div className="flex items-center mb-4">
              <PanelTop size={20} className="text-manga-dark mr-2" />
              <p className="font-bold text-manga-dark">Animation Style</p>
            </div>
            
            <textarea 
              value={promptText}
              onChange={(e) => onPromptChange(e.target.value)}
              placeholder="Describe how you want the animation to look..."
              className="w-full p-3 bg-white border border-gray-300 rounded-md mb-4 text-manga-dark resize-none focus:outline-none focus:ring-2 focus:ring-secondary-500"
            />
            
            <button 
              onClick={onGenerateClick}
              disabled={!startScene || !endScene}
              className={`w-full btn-primary flex items-center justify-center ${(!startScene || !endScene) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Sparkles size={20} className="mr-2" />
              Generate Animation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};