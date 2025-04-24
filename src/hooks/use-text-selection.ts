
import { useState, useEffect } from "react";
import { Highlight } from "@/types";

interface TextSelectionState {
  selectedText: string;
  selectionPosition: { x: number, y: number } | null;
  selectionRange: Range | null;
  isHighlighted: boolean;
}

export const useTextSelection = (
  bookId: string,
  highlights: Highlight[],
  showCommentDialog: boolean,
  showCommentScrollView: boolean
) => {
  const [textSelection, setTextSelection] = useState<TextSelectionState>({
    selectedText: "",
    selectionPosition: null,
    selectionRange: null,
    isHighlighted: false
  });

  useEffect(() => {
    const handleTextSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim() !== "") {
        const selectedContent = selection.toString().trim();
        
        // Save the range for later use (highlighting)
        const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
        const rect = range?.getBoundingClientRect();
        
        // Check if this selection is already highlighted
        const selectionIsHighlighted = highlights.some(h => 
          h.text === selectedContent && h.bookId === bookId
        );
        
        setTextSelection({
          selectedText: selectedContent,
          selectionPosition: rect ? {
            x: rect.left + (rect.width / 2),
            y: rect.top - 15
          } : null,
          selectionRange: range ? range.cloneRange() : null,
          isHighlighted: selectionIsHighlighted
        });
      } else {
        // Don't clear selection if dialogs are open
        if (!showCommentDialog && !showCommentScrollView) {
          clearSelection();
        }
      }
    };

    const clearSelection = () => {
      setTextSelection({
        selectedText: "",
        selectionPosition: null,
        selectionRange: null,
        isHighlighted: false
      });
    };

    document.addEventListener("mouseup", handleTextSelection);
    document.addEventListener("touchend", handleTextSelection);

    return () => {
      document.removeEventListener("mouseup", handleTextSelection);
      document.removeEventListener("touchend", handleTextSelection);
    };
  }, [highlights, showCommentDialog, showCommentScrollView, bookId]);

  return textSelection;
};
