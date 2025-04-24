import { OfferItem, LeadResult } from '../types';

// API Key for offers (from the provided info)
const USER_ID = '538458';
const API_KEY = '16388e91cdf3368db3bfd08d2dfe4ff0';

// Base URLs
const OFFERS_BASE_URL = 'https://d30xmmta1avvoi.cloudfront.net/public/offers/feed.php';
const LEADS_CHECK_URL = 'https://d30xmmta1avvoi.cloudfront.net/public/external/check2.php';

/**
 * Fetches available offers from the CPA API
 */
export const fetchOffers = async (): Promise<OfferItem[]> => {
  try {
    const url = `${OFFERS_BASE_URL}?user_id=${USER_ID}&api_key=${API_KEY}&s1=&s2=`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch offers');
    }
    
    const data = await response.json();
    return data.slice(0, 3); // Only return first 3 offers
  } catch (error) {
    console.error('Error fetching offers:', error);
    throw error;
  }
};

/**
 * Checks if user has completed any leads
 */
export const checkLeads = async (testing: boolean = false): Promise<LeadResult[]> => {
  try {
    const url = `${LEADS_CHECK_URL}?testing=${testing ? 1 : 0}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to check leads');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error checking leads:', error);
    throw error;
  }
};