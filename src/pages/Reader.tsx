
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MOCK_BOOKS, MOCK_HIGHLIGHTS } from "@/data/mockData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Settings, Bookmark, Share, MoreHorizontal } from "lucide-react";
import { ReadingMode } from "@/types";
import ReadingModeSwitcher from "@/components/ReadingModeSwitcher";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const Reader = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [readingMode, setReadingMode] = useState<ReadingMode>("focus");
  const [showControls, setShowControls] = useState(true);
  const [selectedText, setSelectedText] = useState("");
  const [selectionPosition, setSelectionPosition] = useState<{ x: number, y: number } | null>(null);

  const book = MOCK_BOOKS.find(book => book.id === id);
  
  if (!book || !book.content) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Book not found</h2>
          <Button onClick={() => navigate('/')}>Return to Home</Button>
        </div>
      </div>
    );
  }

  // Toggle controls visibility after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showControls]);

  // Handle tap on screen to toggle controls
  const handleScreenTap = () => {
    // Only show controls if no text is selected
    if (!selectedText) {
      setShowControls(true);
    }
  };

  // Handle text selection
  useEffect(() => {
    const handleTextSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim() !== "") {
        setSelectedText(selection.toString().trim());
        
        // Calculate position for the selection bubble
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setSelectionPosition({
          x: rect.left + (rect.width / 2),
          y: rect.top - 10
        });
      } else {
        setSelectedText("");
        setSelectionPosition(null);
      }
    };

    document.addEventListener("mouseup", handleTextSelection);
    document.addEventListener("touchend", handleTextSelection);

    return () => {
      document.removeEventListener("mouseup", handleTextSelection);
      document.removeEventListener("touchend", handleTextSelection);
    };
  }, []);

  return (
    <div className="min-h-screen bg-reader-bg" onClick={handleScreenTap}>
      {/* Top controls */}
      {showControls && (
        <div className="fixed top-0 left-0 w-full bg-background/90 backdrop-blur-sm z-40 transition-all duration-300 py-4 px-4 border-b border-border">
          <div className="flex justify-between items-center">
            <button 
              className="flex items-center text-muted-foreground"
              onClick={() => navigate(`/book/${id}`)}
            >
              <ChevronLeft size={20} />
              <span className="ml-1 line-clamp-1">{book.title}</span>
            </button>
            <div className="flex items-center space-x-4">
              <button className="text-muted-foreground">
                <Bookmark size={20} />
              </button>
              <button className="text-muted-foreground">
                <Share size={20} />
              </button>
              <button className="text-muted-foreground">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reading content */}
      <ScrollArea className="h-screen pt-16 pb-24">
        <div className={`reader-content pb-28 ${readingMode === "focus" ? "focus-mode" : "explore-mode"}`}>
          {readingMode === "focus" ? (
            // Focus mode - clean reading experience
            <div>
              <h1 className="text-3xl font-semibold mb-6 mt-4">Chapter 1: The Beginning</h1>
              {renderContentWithHighlights(book.content, MOCK_HIGHLIGHTS)}
            </div>
          ) : (
            // Explore mode - AI enhanced reading experience
            <div>
              <h1 className="text-3xl font-semibold mb-6 mt-4">Chapter 1: The Beginning</h1>
              {renderContentWithAIHighlights(book.content)}
              
              <div className="mt-8 mb-4 p-4 bg-app-teal-500/10 rounded-lg">
                <h3 className="font-medium text-lg mb-2">AI Summary</h3>
                <p className="text-sm">
                  This chapter introduces the main themes of the book, exploring the concepts of labor, value, and human experience. The author establishes the philosophical framework that will guide the rest of the narrative.
                </p>
              </div>
              
              {book.category === "Non-fiction" && (
                <div className="mt-6 p-4 bg-app-blue-100/20 rounded-lg">
                  <h3 className="font-medium text-lg mb-2">Key Concepts</h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>The relationship between labor and value creation</li>
                    <li>Different perspectives on human motivation</li>
                    <li>Historical context of economic systems</li>
                  </ul>
                </div>
              )}

              {book.category === "Fiction" && (
                <div className="mt-6 p-4 bg-app-blue-100/20 rounded-lg">
                  <h3 className="font-medium text-lg mb-2">Character Map</h3>
                  <p className="text-sm text-muted-foreground mb-2">Key characters introduced in this chapter:</p>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-background p-2 rounded text-sm">Protagonist</div>
                    <div className="bg-background p-2 rounded text-sm">Supporting Character</div>
                    <div className="bg-background p-2 rounded text-sm">Antagonist</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Reading mode switcher */}
      <ReadingModeSwitcher 
        currentMode={readingMode}
        onModeChange={setReadingMode}
      />
      
      {/* Selection highlight bubble - only appears when text is selected in focus mode */}
      {readingMode === "focus" && selectedText && selectionPosition && (
        <div 
          className="fixed z-50 transform -translate-x-1/2"
          style={{ 
            left: `${selectionPosition.x}px`, 
            top: `${selectionPosition.y}px` 
          }}
        >
          <div className="bg-background/95 backdrop-blur-sm shadow-lg rounded-full border border-border py-2 px-3 flex items-center space-x-4">
            <button className="text-muted-foreground hover:text-yellow-500 transition-colors">
              <span className="bg-yellow-200 h-4 w-4 block rounded-full"></span>
            </button>
            <button className="text-muted-foreground hover:text-app-blue-500 transition-colors">
              <span className="bg-app-blue-200 h-4 w-4 block rounded-full"></span>
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to render content with user highlights
const renderContentWithHighlights = (content: string, highlights: typeof MOCK_HIGHLIGHTS) => {
  // For demo purposes, just render the content with a few simulated highlights
  const paragraphs = content.split("\n\n").filter(p => p.trim() !== "");
  
  return paragraphs.map((paragraph, index) => {
    // Simulate some paragraphs having highlights
    if (index === 1 || index === 3) {
      return (
        <p key={index}>
          {paragraph.substring(0, 40)}
          <span className="highlight">{paragraph.substring(40, 120)}</span>
          {paragraph.substring(120)}
        </p>
      );
    }
    
    return <p key={index}>{paragraph}</p>;
  });
};

// Helper function to render content with AI highlights
const renderContentWithAIHighlights = (content: string) => {
  // For demo purposes, just render the content with a few simulated AI highlights
  const paragraphs = content.split("\n\n").filter(p => p.trim() !== "");
  
  return paragraphs.map((paragraph, index) => {
    // Simulate some paragraphs having AI highlights
    if (index === 2 || index === 4) {
      return (
        <p key={index}>
          {paragraph.substring(0, 30)}
          <span className="ai-highlight">{paragraph.substring(30, 100)}</span>
          {paragraph.substring(100)}
        </p>
      );
    }
    
    return <p key={index}>{paragraph}</p>;
  });
};

export default Reader;
