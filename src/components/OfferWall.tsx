import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { CheckCircle, Star, Gift, AlertCircle } from 'lucide-react';
import { OfferItem, LeadResult } from '../types';

interface OfferWallProps {
  onLeadCompleted: () => void;
}

export const OfferWall: React.FC<OfferWallProps> = ({ onLeadCompleted }) => {
  const [offers, setOffers] = useState<OfferItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completedLeads, setCompletedLeads] = useState<LeadResult[]>([]);
  
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current && backdropRef.current) {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      
      gsap.fromTo(
        modalRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.2)' }
      );
    }
    
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      
      const url = "https://d30xmmta1avvoi.cloudfront.net/public/offers/feed.php?user_id=538458&api_key=16388e91cdf3368db3bfd08d2dfe4ff0&s1=&s2=";
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setOffers(data.slice(0, 3));
      } else {
        setError("Failed to load offers");
      }
    } catch (err) {
      setError("Error loading offers. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOfferClick = (offer: OfferItem) => {
    window.open(offer.url, '_blank');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 p-4">
      <div 
        ref={backdropRef}
        className="absolute inset-0 bg-black bg-opacity-75"
      />
      
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-manga-dark border-4 border-white rounded-lg w-full max-w-lg mx-auto z-50 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 py-3 px-4">
          <h2 className="font-press-start text-base sm:text-lg text-white text-center">
            Complete Sponsor Offer
          </h2>
        </div>
        
        <div className="p-4 sm:p-6">
          <p className="text-center text-white text-sm sm:text-base mb-4">
            To keep this AI tool free, please support our sponsors by completing one of the offers below. 
            Your animation will be ready in 3 minutes!
          </p>
          
          <div className="mb-4 bg-yellow-900 bg-opacity-20 border border-accent-500 text-accent-400 p-2 sm:p-3 rounded-md flex items-start">
            <AlertCircle className="mr-2 flex-shrink-0 mt-0.5" size={16} />
            <p className="text-xs sm:text-sm">
              Complete just 1 offer to unlock your animation. Your support helps keep our AI tools free!
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center my-6">
              <div className="w-10 h-10 border-3 border-secondary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 my-6 text-sm">
              {error}
            </div>
          ) : (
            <div className="space-y-3 my-4">
              {offers.map((offer, index) => (
                <div 
                  key={index}
                  onClick={() => handleOfferClick(offer)}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="flex items-center p-3">
                    <div className="w-12 h-12 flex-shrink-0 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center mr-3">
                      {index === 0 && <Gift size={24} className="text-primary-500" />}
                      {index === 1 && <Star size={24} className="text-accent-500" />}
                      {index === 2 && <CheckCircle size={24} className="text-secondary-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-manga-dark text-sm mb-1 truncate">
                        {offer.anchor || "Special Offer"}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {offer.conversion || "Complete this offer to unlock your animation"}
                      </p>
                    </div>
                    <div className="ml-2">
                      <span className="bg-primary-500 text-white text-xs font-bold py-1 px-2 rounded">
                        FREE
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <p className="text-center text-xs text-gray-400 mt-4">
            By continuing, you agree to our <a href="#" className="text-secondary-500 hover:underline">Terms</a> and <a href="#" className="text-secondary-500 hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </motion.div>
    </div>
  );
};