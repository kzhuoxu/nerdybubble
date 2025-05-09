
import { useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ContentRenderer from "./ContentRenderer";
import { Book, ReadingMode, Highlight } from "@/types";

interface ReaderContentProps {
  book: Book;
  readingMode: ReadingMode;
  contentRef: React.RefObject<HTMLDivElement>;
  highlights?: Highlight[];
  onCommentClick?: (text: string) => void;
}

const ReaderContent = ({ 
  book, 
  readingMode, 
  contentRef,
  highlights = [],
  onCommentClick
}: ReaderContentProps) => {
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
