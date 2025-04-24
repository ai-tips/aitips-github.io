import React from 'react';
import { Zap } from 'lucide-react';

export const NavBar: React.FC = () => {
  return (
    <nav className="bg-manga-dark border-b border-gray-800 py-4 mb-8">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Zap className="text-primary-500 h-6 w-6" />
          <span className="font-press-start text-lg text-white">AITips</span>
        </div>
      </div>
    </nav>
  );
};