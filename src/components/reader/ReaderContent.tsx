
import { useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ContentRenderer from "./ContentRenderer";
import { Book, ReadingMode, Highlight, Comment } from "@/types";

interface ReaderContentProps {
  book: Book;
  readingMode: ReadingMode;
  contentRef: React.RefObject<HTMLDivElement>;
  highlights?: Highlight[];
  comments?: Comment[];
  onCommentClick?: (text: string) => void;
}

const ReaderContent = ({ 
  book, 
  readingMode, 
  contentRef,
  highlights = [],
  comments = [],
  onCommentClick
}: ReaderContentProps) => {
  // Track which sentences have comments by the current user vs. other users
  const hasSentenceComment = (text: string): { hasUserComment: boolean, hasOtherComment: boolean } => {
    // Logic to determine if a sentence has comments
    // This would need to be enhanced with actual user checking logic
    const matchingComments = comments.filter(comment => 
      book.content?.includes(text) && comment.text.includes(text)
    );
    
    const hasUserComment = matchingComments.some(comment => comment.userId === 'current-user-id');
    const hasOtherComment = matchingComments.some(comment => comment.userId !== 'current-user-id');
    
    return { hasUserComment, hasOtherComment };
  };

  return (
    <ScrollArea className="h-screen pt-8 pb-20" ref={contentRef}>
      <div className={`reader-content px-4 md:px-8 pb-28 max-w-screen-md mx-auto ${readingMode === "focus" ? "focus-mode" : "explore-mode"}`}>
        <div className="pt-4">
          <h1 className="text-2xl md:text-3xl font-semibold mb-6">Chapter 1: The Beginning</h1>
          <ContentRenderer 
            content={book.content || ""} 
            mode={readingMode}
            highlights={highlights}
            onCommentClick={onCommentClick}
            hasSentenceComment={hasSentenceComment}
          />
          
          {readingMode === "explore" && book.category === "Fiction" && (
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
      </div>
    </ScrollArea>
  );
};

export default ReaderContent;
