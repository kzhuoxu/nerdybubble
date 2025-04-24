import { useParams, Link } from "react-router-dom";
import { MOCK_BOOKS, MOCK_BOOK_CLUBS, CURRENT_USER } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { ReadingMode, Comment } from "@/types";
import CommentDialog from "@/components/reader/CommentDialog";
import ReaderContent from "@/components/reader/ReaderContent";
import SelectionBubble from "@/components/reader/SelectionBubble";
import BookHeader from "@/components/book-detail/BookHeader";
import AboutTab from "@/components/book-detail/AboutTab";
import HighlightsTab from "@/components/book-detail/HighlightsTab";
import ReviewsTab from "@/components/book-detail/ReviewsTab";
import ClubsTab from "@/components/book-detail/ClubsTab";

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // Book detail state
  const book = MOCK_BOOKS.find(book => book.id === id);
  
  // Reader state
  const [isReading, setIsReading] = useState(false);
  const [readingMode, setReadingMode] = useState<ReadingMode>("focus");
  const [showControls, setShowControls] = useState(true);
  const [selectedText, setSelectedText] = useState("");
  const [selectionPosition, setSelectionPosition] = useState<{ x: number, y: number } | null>(null);
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  
  if (!book) {
    return <div className="p-8 text-center">Book not found</div>;
  }

  // Find book clubs that are reading this book
  const bookClubs = MOCK_BOOK_CLUBS.filter(club => club.bookId === id);

  const handleStartReading = () => {
    setIsReading(true);
  };

  // Toggle controls visibility after a short delay
  useEffect(() => {
    if (showControls && isReading) {
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showControls, isReading]);

  // Handle tap on screen to toggle controls
  const handleScreenTap = () => {
    // Only show controls if no text is selected
    if (!selectedText && isReading) {
      setShowControls(!showControls);
    }
  };

  // Handle text selection
  useEffect(() => {
    if (!isReading) return;
    
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
  }, [isReading]);

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

  // Exit reading mode
  const handleExitReading = () => {
    setIsReading(false);
    setSelectedText("");
    setSelectionPosition(null);
  };

  if (isReading) {
    return (
      <div className="min-h-screen bg-reader-bg" onClick={handleScreenTap}>
        {/* Top controls */}
        <div className="fixed top-0 left-0 w-full bg-background/95 backdrop-blur-sm z-40 transition-all duration-300 py-3 px-4 border-b border-border">
          <div className="flex justify-between items-center max-w-screen-md mx-auto">
            <button 
              className="flex items-center text-muted-foreground"
              onClick={handleExitReading}
            >
              <ChevronLeft size={20} />
              <span className="ml-1 line-clamp-1 text-sm font-medium">{book.title}</span>
            </button>
            <div className="flex items-center space-x-3">
              <button className="text-muted-foreground p-1.5 hover:text-foreground transition-colors">
                <X size={18} onClick={handleExitReading} />
              </button>
            </div>
          </div>
        </div>

        {/* Reading content */}
        <ReaderContent
          book={book}
          readingMode={readingMode}
          contentRef={contentRef}
        />

        {/* Reading mode switcher */}
        <ReadingModeSwitcher 
          currentMode={readingMode}
          onModeChange={setReadingMode}
        />
        
        {/* Selection highlight bubble - only appears when text is selected in focus mode */}
        {readingMode === "focus" && (
          <SelectionBubble
            selectedText={selectedText}
            selectionPosition={selectionPosition}
            onOpenComments={handleOpenComments}
          />
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
  }

  return (
    <div className="container px-4 pt-16 pb-24">
      <Link to="/" className="flex items-center text-muted-foreground mb-4">
        <ChevronLeft size={16} />
        <span className="text-sm">Back</span>
      </Link>
      
      <BookHeader book={book} onStartReading={handleStartReading} />
      
      <Tabs defaultValue="about">
        <TabsList className="w-full">
          <TabsTrigger value="about" className="flex-1">About</TabsTrigger>
          <TabsTrigger value="highlights" className="flex-1">Highlights</TabsTrigger>
          <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
          <TabsTrigger value="clubs" className="flex-1">Book Clubs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="about" className="mt-4">
          <AboutTab book={book} />
        </TabsContent>
        
        <TabsContent value="highlights" className="mt-4">
          <HighlightsTab book={book} />
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-4">
          <ReviewsTab book={book} />
        </TabsContent>
        
        <TabsContent value="clubs" className="mt-4">
          <ClubsTab bookClubs={bookClubs} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookDetail;
