
import { useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ContentRenderer from "./ContentRenderer";
import { Annotation } from "./MarginAnnotation";
import { Book, ReadingMode, Highlight as HighlightType } from "@/types";
import { CURRENT_USER } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { HighlightColor } from "./HighlightColorPicker";

interface ReaderContentProps {
  book: Book;
  readingMode: ReadingMode;
  contentRef: React.RefObject<HTMLDivElement>;
  showAnnotations: boolean;
  annotations: Annotation[];
  communityHighlights: HighlightType[];
  visibilityFilter: "all" | "mine" | "friends";
  handleTextSelection: () => void;
}

const ReaderContent = ({ 
  book, 
  readingMode, 
  contentRef,
  showAnnotations,
  annotations,
  communityHighlights,
  visibilityFilter,
  handleTextSelection
}: ReaderContentProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Filter community highlights based on visibility settings
  const visibleHighlights = communityHighlights.filter(highlight => {
    if (visibilityFilter === "mine") return highlight.userId === CURRENT_USER.id;
    if (visibilityFilter === "friends") return CURRENT_USER.friends.includes(highlight.userId) || highlight.userId === CURRENT_USER.id;
    return true; // "all" filter
  });
  
  return (
    <ScrollArea 
      className={cn(
        "h-screen",
        showAnnotations ? "pr-[320px]" : "pr-4"
      )} 
      ref={scrollAreaRef}
    >
      <div 
        className={cn(
          "reader-content mx-auto py-8 px-4 md:px-8 max-w-3xl transition-all duration-200 ease-in-out",
          readingMode === "focus" ? "focus-mode" : "explore-mode"
        )}
        ref={contentRef}
        onMouseUp={handleTextSelection}
        onTouchEnd={handleTextSelection}
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold mb-6">Chapter 1: The Beginning</h1>
          <div className="relative flex">
            <div className="flex-1 prose dark:prose-invert max-w-none">
              <ContentRenderer 
                content={book.content || ""} 
                mode={readingMode}
                highlights={visibleHighlights}
              />
            </div>
            
            {/* Margin annotations */}
            {showAnnotations && annotations.length > 0 && (
              <div className="fixed right-4 top-[80px] w-72 h-[calc(100vh-80px)] overflow-y-auto bg-background/95 backdrop-blur-sm border-l border-border pl-4">
                {annotations.map((annotation) => (
                  <div key={annotation.id} className="mb-6">
                    <div className="text-sm text-muted-foreground mb-1">Note</div>
                    <div className="text-sm">{annotation.text}</div>
                    <div className="flex items-center mt-1">
                      <div className="text-xs text-muted-foreground">{annotation.user.name}</div>
                      <div className="text-xs text-muted-foreground ml-auto">
                        {new Date(annotation.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
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
