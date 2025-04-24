
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MOCK_BOOKS, MOCK_HIGHLIGHTS, CURRENT_USER } from "@/data/mockData";
import { ReadingMode, Comment } from "@/types";
import ReadingModeSwitcher from "@/components/ReadingModeSwitcher";
import CommentDialog from "@/components/reader/CommentDialog";
import ReaderControls from "@/components/reader/ReaderControls";
import ReaderContent from "@/components/reader/ReaderContent";
import SelectionBubble from "@/components/reader/SelectionBubble";

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
          <button onClick={() => navigate('/')}>Return to Home</button>
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
      <ReaderControls 
        bookTitle={book.title}
        bookId={book.id}
        showControls={showControls}
      />

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
};

export default Reader;
