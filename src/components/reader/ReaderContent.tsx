
import { useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ContentRenderer from "./ContentRenderer";
import { Annotation } from "./MarginAnnotation";
import { Book, ReadingMode, Highlight as HighlightType } from "@/types";
import { CURRENT_USER } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { HighlightColor } from "./HighlightColorPicker";
import { HIGHLIGHT_COLORS } from "./HighlightColorPicker";

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
        "h-screen pt-8 pb-20",
        showAnnotations && "pr-80"
      )} 
      ref={scrollAreaRef}
    >
      <div 
        className={cn(
          "reader-content px-4 md:px-8 pb-28 max-w-screen-md mx-auto",
          readingMode === "focus" ? "focus-mode" : "explore-mode",
          showAnnotations && "mr-80"
        )}
        ref={contentRef}
        onMouseUp={handleTextSelection}
        onTouchEnd={handleTextSelection}
      >
        <div className="pt-4">
          <h1 className="text-2xl md:text-3xl font-semibold mb-6">Chapter 1: The Beginning</h1>
          <div className="relative">
            <ContentRenderer 
              content={book.content || ""} 
              mode={readingMode}
              highlights={visibleHighlights}
            />
            
            {/* Margin annotations */}
            {showAnnotations && annotations.length > 0 && (
              <div className="absolute right-[-350px] top-0 w-64">
                {annotations.map((annotation) => (
                  <div key={annotation.id} className="mb-6 mt-12">
                    <div className="border-t border-gray-200 mb-2"></div>
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
