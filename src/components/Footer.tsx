import React from 'react';
import { Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-manga-dark border-t border-gray-800 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Cpu className="text-primary-500 h-6 w-6" />
            <span className="font-press-start text-lg text-white">AITips</span>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 mt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} AITips. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};