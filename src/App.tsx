import React from 'react';
import { Hero } from './components/Hero';
import { UploadSection } from './components/UploadSection';
import { AnimationLoader } from './components/AnimationLoader';
import { OfferWall } from './components/OfferWall';
import { ResultReveal } from './components/ResultReveal';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { WelcomeModal } from './components/WelcomeModal';
import { AnimationGenerationState } from './types';

function App() {
  const [state, setState] = React.useState<AnimationGenerationState>(() => {
    const savedState = localStorage.getItem('animationState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      // Check if the offer timer is still valid
      if (parsedState.stage === 'offer' && parsedState.offerStartTime) {
        const elapsedTime = Date.now() - parsedState.offerStartTime;
        if (elapsedTime >= 1200000) { // 20 minutes
          return {
            stage: 'initial',
            uploadedImage: null,
            imagePreview: null,
            promptText: '',
            progressMessage: 'Initializing...',
            leadCompleted: false,
            offerStartTime: null
          };
        }
      }
      return parsedState;
    }
    return {
      stage: 'initial',
      uploadedImage: null,
      imagePreview: null,
      promptText: '',
      progressMessage: 'Initializing...',
      leadCompleted: false,
      offerStartTime: null
    };
  });

  React.useEffect(() => {
    localStorage.setItem('animationState', JSON.stringify(state));
  }, [state]);

  React.useEffect(() => {
    if (state.stage === 'offer' && state.offerStartTime) {
      const elapsedTime = Date.now() - state.offerStartTime;
      const remainingTime = Math.max(1200000 - elapsedTime, 0); // 20 minutes

      const timer = setTimeout(() => {
        setState(prevState => ({
          ...prevState,
          stage: 'result',
          offerStartTime: null
        }));
      }, remainingTime);

      return () => clearTimeout(timer);
    }
  }, [state.stage, state.offerStartTime]);

  const handleFileUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setState({
      ...state,
      uploadedImage: file,
      imagePreview: imageUrl
    });
  };

  const handlePromptChange = (text: string) => {
    setState({
      ...state,
      promptText: text
    });
  };

  const handleGenerateClick = () => {
    if (!state.uploadedImage) return;
    
    setState({
      ...state,
      stage: 'loading',
      progressMessage: 'Sketching keyframes...'
    });

    const messages = [
      'Sketching keyframes...',
      'Inking dynamic motion...',
      'Coloring with impact!',
      'Finalizing epic poses...'
    ];

    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setState(prevState => ({
        ...prevState,
        progressMessage: messages[messageIndex]
      }));
    }, 2000);

    setTimeout(() => {
      clearInterval(messageInterval);
      setState(prevState => ({
        ...prevState,
        stage: 'welcome'
      }));
    }, 10000);
  };

  const handleShowOffers = () => {
    setState(prevState => ({
      ...prevState,
      stage: 'offer',
      offerStartTime: Date.now()
    }));
  };

  const handleLeadCompleted = () => {
    setState(prevState => ({
      ...prevState,
      stage: 'result',
      leadCompleted: true,
      offerStartTime: null
    }));
  };

  const handleReset = () => {
    setState({
      stage: 'initial',
      uploadedImage: null,
      imagePreview: null,
      promptText: '',
      progressMessage: 'Initializing...',
      leadCompleted: false,
      offerStartTime: null
    });
  };

  return (
    <div className="min-h-screen bg-manga-dark">
      <NavBar />
      
      <main className="container mx-auto px-4 pb-20">
        {state.stage === 'initial' && (
          <>
            <Hero />
            <UploadSection 
              imagePreview={state.imagePreview}
              promptText={state.promptText}
              onFileChange={handleFileUpload}
              onPromptChange={handlePromptChange}
              onGenerateClick={handleGenerateClick}
            />
          </>
        )}

        {state.stage === 'loading' && (
          <AnimationLoader message={state.progressMessage} />
        )}

        {state.stage === 'welcome' && (
          <WelcomeModal onShowOffers={handleShowOffers} />
        )}

        {state.stage === 'offer' && (
          <div className="fixed inset-0 z-50">
            <OfferWall onLeadCompleted={handleLeadCompleted} />
          </div>
        )}

        {state.stage === 'result' && (
          <ResultReveal 
            imagePreview={state.imagePreview} 
            promptText={state.promptText}
            onReset={handleReset}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;