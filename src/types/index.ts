export interface AnimationGenerationState {
  stage: 'initial' | 'loading' | 'welcome' | 'offer' | 'result';
  uploadedImage: File | null;
  imagePreview: string | null;
  promptText: string;
  progressMessage: string;
  leadCompleted: boolean;
  offerStartTime: number | null;
}

export interface OfferItem {
  id: string;
  url: string;
  anchor: string;
  conversion: string;
  description?: string;
  image?: string;
}

export interface LeadResult {
  offer_id: string;
  points: string;
}