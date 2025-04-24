
import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MOCK_BOOKS } from "@/data/mockData";
import { ReadingMode } from "@/types";
import ReadingModeSwitcher from "@/components/ReadingModeSwitcher";
import CommentDialog from "@/components/reader/CommentDialog";
import ReaderControls from "@/components/reader/ReaderControls";
import ReaderContent from "@/components/reader/ReaderContent";
import SelectionBubble from "@/components/reader/SelectionBubble";
import CommentScrollView from "@/components/reader/CommentScrollView";
import { useTextSelection } from "@/hooks/use-text-selection";
import { useHighlights } from "@/hooks/use-highlights";
import { useReaderControls } from "@/hooks/use-reader-controls";

const Reader = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [readingMode, setReadingMode] = useState<ReadingMode>("focus");
  const contentRef = useRef<HTMLDivElement>(null);
  const [showCommentDialog, setShowCommentDialog] = useState(false);
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

  const {
    highlights,
    addHighlight,
    removeHighlight,
    addCommentToHighlight
  } = useHighlights(book.id);

  const {
    selectedText,
    selectionPosition,
    selectionRange,
    isHighlighted
  } = useTextSelection(book.id, highlights, showCommentDialog, showCommentScrollView);

  const {
    showControls,
    handleScreenTap
  } = useReaderControls(selectedText);

  // Handle opening comments dialog
  const handleOpenComments = () => {
    setShowCommentDialog(true);
  };

  // Handle opening comment scroll view
  const handleOpenCommentScrollView = (text: string) => {
    const relatedHighlight = highlights.find(h => h.text === text);
    const relatedComments = relatedHighlight?.comments || [];
    
    setActiveComment({
      text,
      comments: relatedComments
    });
    
    setShowCommentScrollView(true);
  };

  // Handle adding a new comment
  const handleAddComment = (text: string) => {
    if (!selectedText) return;
    
    addCommentToHighlight(selectedText, text);
    setShowCommentDialog(false);
  };

  return (
    <div className="min-h-screen bg-reader-bg" onClick={handleScreenTap}>
      <ReaderControls 
        bookTitle={book.title}
        bookId={book.id}
        showControls={showControls}
      />

      <ReaderContent
        book={book}
        readingMode={readingMode}
        contentRef={contentRef}
        highlights={highlights}
        onCommentClick={handleOpenCommentScrollView}
      />

      <ReadingModeSwitcher 
        currentMode={readingMode}
        onModeChange={setReadingMode}
      />
      
      {readingMode === "focus" && (
        <SelectionBubble
          selectedText={selectedText}
          selectionPosition={selectionPosition}
          onOpenComments={handleOpenComments}
          isHighlighted={isHighlighted}
          onHighlight={() => addHighlight(selectedText, selectionRange)}
          onRemoveHighlight={() => removeHighlight(selectedText)}
        />
      )}

      <CommentDialog 
        isOpen={showCommentDialog}
        onClose={() => setShowCommentDialog(false)}
        selectedText={selectedText}
        onAddComment={handleAddComment}
      />

      <CommentScrollView
        isOpen={showCommentScrollView}
        onClose={() => setShowCommentScrollView(false)}
        selectedText={activeComment.text}
        comments={activeComment.comments}
        onAddComment={handleAddComment}
        onLikeComment={() => {}}
      />
    </div>
  );
};

export default Reader;
