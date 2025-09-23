import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface FPSContextType {
  isVisible: boolean;
  toggleFPS: () => void;
  closeFPS: () => void;
}

const FPSContext = createContext<FPSContextType | undefined>(undefined);

interface FPSProviderProps {
  children: ReactNode;
}

export const FPSProvider: React.FC<FPSProviderProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleFPS = () => {
    setIsVisible(prev => !prev);
  };

  const closeFPS = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Ctrl+Alt+F
      if (event.ctrlKey && event.altKey && event.key === 'f') {
        event.preventDefault();
        toggleFPS();
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <FPSContext.Provider value={{ isVisible, toggleFPS, closeFPS }}>
      {children}
    </FPSContext.Provider>
  );
};

export const useFPS = (): FPSContextType => {
  const context = useContext(FPSContext);
  if (context === undefined) {
    throw new Error('useFPS must be used within a FPSProvider');
  }
  return context;
};
