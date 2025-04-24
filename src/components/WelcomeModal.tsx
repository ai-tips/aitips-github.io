import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface WelcomeModalProps {
  onShowOffers: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ onShowOffers }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-manga-dark border-4 border-white rounded-lg max-w-2xl w-full mx-4 p-6"
      >
        <div className="text-center mb-6">
          <h2 className="font-press-start text-xl text-white mb-4">
            Welcome to AITips! 🎉
          </h2>
          <div className="bg-yellow-900 bg-opacity-20 border border-accent-500 text-accent-400 p-4 rounded-md flex items-start mb-6">
            <AlertCircle className="mr-2 flex-shrink-0 mt-0.5" size={18} />
            <p className="text-sm text-left">
              To keep our AI tools free and accessible, we rely on support from our sponsors. 
              Please complete one quick offer to unlock full access to our animation tools.
            </p>
          </div>
          <p className="text-gray-300 mb-6">
            Your support helps us maintain and improve our services while keeping them free for everyone.
          </p>
          <button
            onClick={onShowOffers}
            className="btn-primary w-full"
          >
            View Sponsor Offers
          </button>
        </div>
      </motion.div>
    </div>
  );
};