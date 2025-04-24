
import { Highlighter, MessageCircle, MoreHorizontal, Trash2 } from "lucide-react";

interface SelectionBubbleProps {
  selectedText: string;
  selectionPosition: { x: number, y: number } | null;
  onOpenComments: () => void;
  isHighlighted?: boolean;
  onHighlight?: (color?: string) => void;
  onRemoveHighlight?: () => void;
}

const SelectionBubble = ({ 
  selectedText, 
  selectionPosition, 
  onOpenComments,
  isHighlighted = false, 
  onHighlight,
  onRemoveHighlight
}: SelectionBubbleProps) => {
  if (!selectedText || !selectionPosition) return null;
  
  return (
    <div 
      className="fixed z-50 transform -translate-x-1/2 -translate-y-full"
      style={{ 
        left: `${selectionPosition.x}px`, 
        top: `${selectionPosition.y}px` 
      }}
    >
      <div className="bg-background/95 backdrop-blur-sm shadow-lg rounded-full border border-border py-1.5 px-3 flex items-center space-x-3">
        {!isHighlighted ? (
          <button 
            className="text-muted-foreground hover:text-yellow-500 transition-colors p-1"
            onClick={() => onHighlight && onHighlight('yellow')}
            aria-label="Highlight text"
          >
            <Highlighter size={16} />
          </button>
        ) : (
          <button 
            className="text-muted-foreground hover:text-destructive transition-colors p-1"
            onClick={() => onRemoveHighlight && onRemoveHighlight()}
            aria-label="Remove highlight"
          >
            <Trash2 size={16} />
          </button>
        )}
        
        <button 
          className="text-muted-foreground hover:text-app-blue-500 transition-colors p-1"
          onClick={onOpenComments}
          aria-label="Comment on text"
        >
          <MessageCircle size={16} />
        </button>
        
        <button 
          className="text-muted-foreground hover:text-foreground transition-colors p-1"
          aria-label="More options"
        >
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
};

export default SelectionBubble;
