
import { MessageCircle, MoreHorizontal } from "lucide-react";

interface SelectionBubbleProps {
  selectedText: string;
  selectionPosition: { x: number, y: number } | null;
  onOpenComments: () => void;
}

const SelectionBubble = ({ selectedText, selectionPosition, onOpenComments }: SelectionBubbleProps) => {
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
        <button className="text-muted-foreground hover:text-yellow-500 transition-colors p-1">
          <span className="bg-yellow-200 h-4 w-4 block rounded-full"></span>
        </button>
        <button 
          className="text-muted-foreground hover:text-app-blue-500 transition-colors p-1"
          onClick={onOpenComments}
        >
          <MessageCircle size={16} />
        </button>
        <button className="text-muted-foreground hover:text-foreground transition-colors p-1">
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
};

export default SelectionBubble;
