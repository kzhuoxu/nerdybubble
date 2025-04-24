
import { useState } from "react";
import { Highlight, Comment } from "@/types";
import { CURRENT_USER } from "@/data/mockData";
import { toast } from "sonner";

export const useHighlights = (bookId: string) => {
  const [highlights, setHighlights] = useState<Highlight[]>([]);

  const addHighlight = (selectedText: string, selectionRange: Range | null) => {
    if (selectedText && selectionRange) {
      const newHighlight: Highlight = {
        id: `highlight-${Date.now()}`,
        bookId,
        userId: CURRENT_USER.id,
        text: selectedText,
        chapter: 1,
        position: 0,
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: []
      };
      
      setHighlights(prev => [...prev, newHighlight]);
      window.getSelection()?.removeAllRanges();
      return newHighlight;
    }
  };

  const removeHighlight = (text: string) => {
    setHighlights(prev => prev.filter(h => h.text !== text));
    window.getSelection()?.removeAllRanges();
  };

  const addCommentToHighlight = (text: string, comment: string) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      highlightId: `highlight-${Date.now()}`,
      userId: CURRENT_USER.id,
      text: comment,
      createdAt: new Date().toISOString(),
      likes: 0
    };
    
    const existingHighlight = highlights.find(h => h.text === text);
    
    if (existingHighlight) {
      setHighlights(prev => 
        prev.map(h => 
          h.id === existingHighlight.id 
            ? { ...h, comments: [...(h.comments || []), newComment] }
            : h
        )
      );
    } else {
      const newHighlight: Highlight = {
        id: newComment.highlightId,
        bookId,
        userId: CURRENT_USER.id,
        text,
        chapter: 1,
        position: 0,
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: [newComment]
      };
      
      setHighlights(prev => [...prev, newHighlight]);
    }

    toast.success("Comment added successfully");
  };

  return {
    highlights,
    addHighlight,
    removeHighlight,
    addCommentToHighlight
  };
};
