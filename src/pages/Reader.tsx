
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MOCK_BOOKS, MOCK_HIGHLIGHTS, CURRENT_USER } from "@/data/mockData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Settings, Bookmark, Share, MoreHorizontal, MessageCircle } from "lucide-react";
import { ReadingMode, Comment } from "@/types";
import ReadingModeSwitcher from "@/components/ReadingModeSwitcher";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import CommentDialog from "@/components/reader/CommentDialog";

const Reader = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [readingMode, setReadingMode] = useState<ReadingMode>("focus");
  const [showControls, setShowControls] = useState(true);
  const [selectedText, setSelectedText] = useState("");
  const [selectionPosition, setSelectionPosition] = useState<{ x: number, y: number } | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  
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
    if (showControls) {
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showControls]);

  // Handle tap on screen to toggle controls
  const handleScreenTap = () => {
    // Only show controls if no text is selected
    if (!selectedText) {
      setShowControls(!showControls);
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
        
        // Position the bubble above the selection
        setSelectionPosition({
          x: rect.left + (rect.width / 2),
          y: rect.top - 15
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

  // Handle adding a new comment
  const handleAddComment = (text: string) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      highlightId: `highlight-${Date.now()}`,
      userId: CURRENT_USER.id,
      text: text,
      createdAt: new Date().toISOString(),
      likes: 0
    };
    
    setComments(prev => [...prev, newComment]);
  };

  // Handle liking a comment
  const handleLikeComment = (commentId: string) => {
    setComments(prev => 
      prev.map(comment => 
        comment.id === commentId 
          ? { ...comment, likes: comment.likes + 1 } 
          : comment
      )
    );
  };

  // Open comments dialog
  const handleOpenComments = () => {
    setShowCommentDialog(true);
  };

  return (
    <div className="min-h-screen bg-reader-bg" onClick={handleScreenTap}>
      {/* Top controls */}
      {showControls && (
        <div className="fixed top-0 left-0 w-full bg-background/95 backdrop-blur-sm z-40 transition-all duration-300 py-3 px-4 border-b border-border">
          <div className="flex justify-between items-center max-w-screen-md mx-auto">
            <button 
              className="flex items-center text-muted-foreground"
              onClick={() => navigate(`/book/${id}`)}
            >
              <ChevronLeft size={20} />
              <span className="ml-1 line-clamp-1 text-sm font-medium">{book.title}</span>
            </button>
            <div className="flex items-center space-x-3">
              <button className="text-muted-foreground p-1.5 hover:text-foreground transition-colors">
                <Bookmark size={18} />
              </button>
              <button className="text-muted-foreground p-1.5 hover:text-foreground transition-colors">
                <Share size={18} />
              </button>
              <button className="text-muted-foreground p-1.5 hover:text-foreground transition-colors">
                <Settings size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reading content */}
      <ScrollArea className="h-screen pt-8 pb-20" ref={contentRef}>
        <div className={`reader-content px-4 md:px-8 pb-28 max-w-screen-md mx-auto ${readingMode === "focus" ? "focus-mode" : "explore-mode"}`}>
          {readingMode === "focus" ? (
            // Focus mode - clean reading experience
            <div className="pt-4">
              <h1 className="text-2xl md:text-3xl font-semibold mb-6">Chapter 1: The Beginning</h1>
              {renderContentWithHighlights(book.content, MOCK_HIGHLIGHTS)}
            </div>
          ) : (
            // Explore mode - AI enhanced reading experience
            <div className="pt-4">
              <h1 className="text-2xl md:text-3xl font-semibold mb-6">Chapter 1: The Beginning</h1>
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
          className="fixed z-50 transform -translate-x-1/2 -translate-y-full"
          style={{ 
            left: `${selectionPosition.x}px`, 
            top: `${selectionPosition.y}px` 
          }}
        >
          <div className="bg-background/95 backdrop-blur-sm shadow-lg rounded-full border border-border py-1.5 px-3 flex items-center space-x-3">
            <button className="text-muted-foreground hover:text-yellow-500 transition-colors p-1">
              <span className="bg-yellow-200 h-4 w-4 block rounded-full"></span>
            </button>
            <button 
              className="text-muted-foreground hover:text-app-blue-500 transition-colors p-1"
              onClick={handleOpenComments}
            >
              <MessageCircle size={16} />
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors p-1">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Comments dialog */}
      <CommentDialog 
        isOpen={showCommentDialog}
        onClose={() => setShowCommentDialog(false)}
        selectedText={selectedText}
        comments={comments}
        onAddComment={handleAddComment}
        onLikeComment={handleLikeComment}
      />
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
