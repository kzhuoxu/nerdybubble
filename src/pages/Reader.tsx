
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MOCK_BOOKS, MOCK_HIGHLIGHTS, CURRENT_USER } from "@/data/mockData";
import { ReadingMode, Comment, Highlight } from "@/types";
import ReadingModeSwitcher from "@/components/ReadingModeSwitcher";
import CommentDialog from "@/components/reader/CommentDialog";
import ReaderControls from "@/components/reader/ReaderControls";
import ReaderContent from "@/components/reader/ReaderContent";
import SelectionBubble from "@/components/reader/SelectionBubble";
import { toast } from "sonner";
import CommentScrollView from "@/components/reader/CommentScrollView";

const Reader = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [readingMode, setReadingMode] = useState<ReadingMode>("focus");
  const [showControls, setShowControls] = useState(true);
  const [selectedText, setSelectedText] = useState("");
  const [selectionPosition, setSelectionPosition] = useState<{ x: number, y: number } | null>(null);
  const [selectionRange, setSelectionRange] = useState<Range | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [highlights, setHighlights] = useState<Highlight[]>(MOCK_HIGHLIGHTS || []);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [showCommentScrollView, setShowCommentScrollView] = useState(false);
  const [activeComment, setActiveComment] = useState<{text: string, comments: Comment[]}>({
    text: "",
    comments: []
  });
  
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
        const selectedContent = selection.toString().trim();
        setSelectedText(selectedContent);
        
        // Save the range for later use (highlighting)
        if (selection.rangeCount > 0) {
          setSelectionRange(selection.getRangeAt(0).cloneRange());
        }
        
        // Calculate position for the selection bubble
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        // Position the bubble above the selection
        setSelectionPosition({
          x: rect.left + (rect.width / 2),
          y: rect.top - 15
        });

        // Check if this selection is already highlighted
        const selectionIsHighlighted = highlights.some(h => 
          h.text === selectedContent && h.bookId === book.id
        );
        setIsHighlighted(selectionIsHighlighted);
      } else {
        // Don't clear selection if the comment dialog is open
        if (!showCommentDialog && !showCommentScrollView) {
          clearSelection();
        }
      }
    };

    const clearSelection = () => {
      setSelectedText("");
      setSelectionPosition(null);
      setSelectionRange(null);
      setIsHighlighted(false);
    };

    document.addEventListener("mouseup", handleTextSelection);
    document.addEventListener("touchend", handleTextSelection);

    return () => {
      document.removeEventListener("mouseup", handleTextSelection);
      document.removeEventListener("touchend", handleTextSelection);
    };
  }, [highlights, showCommentDialog, showCommentScrollView, book.id]);

  // Handle highlighting text
  const handleHighlightText = (color: string = 'yellow') => {
    if (selectedText && selectionRange) {
      // Create a new highlight object
      const newHighlight: Highlight = {
        id: `highlight-${Date.now()}`,
        bookId: book.id,
        userId: CURRENT_USER.id,
        text: selectedText,
        chapter: 1, // Assuming chapter 1 for now
        position: 0, // We'd calculate this in a real app
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: []
      };
      
      // Add the highlight to our state
      setHighlights(prev => [...prev, newHighlight]);
      
      // Clear the selection
      window.getSelection()?.removeAllRanges();
      setSelectedText("");
      setSelectionPosition(null);
      setSelectionRange(null);
    }
  };

  // Handle removing a highlight
  const handleRemoveHighlight = () => {
    if (selectedText) {
      setHighlights(prev => prev.filter(h => h.text !== selectedText));
      window.getSelection()?.removeAllRanges();
      setSelectedText("");
      setSelectionPosition(null);
      setSelectionRange(null);
    }
  };

  // Handle adding a new comment
  const handleAddComment = (text: string) => {
    if (!selectedText) return;
    
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      highlightId: `highlight-${Date.now()}`,
      userId: CURRENT_USER.id,
      text: text,
      createdAt: new Date().toISOString(),
      likes: 0
    };
    
    // Create a new highlight with this comment if it doesn't exist
    const existingHighlight = highlights.find(h => h.text === selectedText);
    
    if (existingHighlight) {
      // Add comment to existing highlight
      setHighlights(prev => 
        prev.map(h => 
          h.id === existingHighlight.id 
            ? { 
                ...h, 
                comments: [...(h.comments || []), newComment] 
              } 
            : h
        )
      );
    } else {
      // Create new highlight with comment
      const newHighlight: Highlight = {
        id: newComment.highlightId,
        bookId: book.id,
        userId: CURRENT_USER.id,
        text: selectedText,
        chapter: 1, // Assuming chapter 1 for now
        position: 0, // We'd calculate this in a real app
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: [newComment]
      };
      
      setHighlights(prev => [...prev, newHighlight]);
    }
    
    setComments(prev => [...prev, newComment]);
    setShowCommentDialog(false);
    toast.success("Comment added successfully");
    
    // Clear selection
    window.getSelection()?.removeAllRanges();
    setSelectedText("");
    setSelectionPosition(null);
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

  // Open comment scroll view
  const handleOpenCommentScrollView = (text: string) => {
    // Find all comments for this text
    const relatedHighlight = highlights.find(h => h.text === text);
    const relatedComments = relatedHighlight?.comments || [];
    
    setActiveComment({
      text,
      comments: relatedComments
    });
    
    setShowCommentScrollView(true);
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
        highlights={highlights}
        onCommentClick={handleOpenCommentScrollView}
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
          isHighlighted={isHighlighted}
          onHighlight={handleHighlightText}
          onRemoveHighlight={handleRemoveHighlight}
        />
      )}

      {/* Comments dialog */}
      <CommentDialog 
        isOpen={showCommentDialog}
        onClose={() => setShowCommentDialog(false)}
        selectedText={selectedText}
        onAddComment={handleAddComment}
      />

      {/* Comment scroll view */}
      <CommentScrollView
        isOpen={showCommentScrollView}
        onClose={() => setShowCommentScrollView(false)}
        selectedText={activeComment.text}
        comments={activeComment.comments}
        onAddComment={handleAddComment}
        onLikeComment={handleLikeComment}
      />
    </div>
  );
};

export default Reader;
