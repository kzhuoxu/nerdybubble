
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MOCK_BOOKS, MOCK_HIGHLIGHTS, CURRENT_USER } from "@/data/mockData";
import { ReadingMode, Comment } from "@/types";
import ReadingModeSwitcher from "@/components/ReadingModeSwitcher";
import CommentDialog from "@/components/reader/CommentDialog";
import ReaderControls from "@/components/reader/ReaderControls";
import ReaderContent from "@/components/reader/ReaderContent";
import SelectionBubble from "@/components/reader/SelectionBubble";
import { HighlightColor } from "@/components/reader/HighlightColorPicker";
import { toast } from "@/components/ui/use-toast";
import { Annotation } from "@/components/reader/MarginAnnotation";

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
  
  // New states for annotations
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [communityHighlights, setCommunityHighlights] = useState<any[]>(
    MOCK_HIGHLIGHTS.filter(h => h.bookId === id)
  );
  const [visibilityFilter, setVisibilityFilter] = useState<"all" | "mine" | "friends">("all");
  
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

  // Handle highlighting text
  const handleHighlightText = (color: HighlightColor) => {
    if (!selectedText) return;
    
    // Create a new highlight
    // Implementation goes here
    
    // Clear the selection
    setSelectedText("");
    setSelectionPosition(null);
  };

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

  // Handle share functionality
  const handleShare = () => {
    toast({
      title: "Share",
      description: "Sharing functionality will be implemented soon.",
    });
    
    setSelectedText("");
    setSelectionPosition(null);
  };

  // Handle AI insights
  const handleGetInsights = () => {
    toast({
      title: "AI Insights",
      description: "Analyzing your selected text...",
    });
    
    setTimeout(() => {
      toast({
        title: "AI Analysis Complete",
        description: "This passage introduces a key theme that will develop throughout the story.",
      });
    }, 2000);
    
    setSelectedText("");
    setSelectionPosition(null);
  };

  // Handle adding a note
  const handleAddNote = () => {
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
        showAnnotations={showAnnotations}
        annotations={annotations}
        communityHighlights={communityHighlights}
        visibilityFilter={visibilityFilter}
        handleTextSelection={handleTextSelection}
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
          onHighlight={handleHighlightText}
          onAddNote={handleAddNote}
          onShare={handleShare}
          onGetInsights={handleGetInsights}
          onClose={() => {
            setSelectedText("");
            setSelectionPosition(null);
          }}
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
