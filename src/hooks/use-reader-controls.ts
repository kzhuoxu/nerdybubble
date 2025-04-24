
import { useState, useEffect } from "react";

export const useReaderControls = (selectedText: string) => {
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    if (showControls) {
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showControls]);

  const handleScreenTap = () => {
    // Only show controls if no text is selected
    if (!selectedText) {
      setShowControls(!showControls);
    }
  };

  return {
    showControls,
    handleScreenTap
  };
};
