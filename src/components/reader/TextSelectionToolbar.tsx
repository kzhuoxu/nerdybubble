
import { MessageCircle, Share, Sparkles, X } from "lucide-react";
import HighlightColorPicker, { HighlightColor } from "./HighlightColorPicker";

interface TextSelectionToolbarProps {
  position: { x: number, y: number } | null;
  onHighlight: (color: HighlightColor) => void;
  onAddNote: () => void;
  onShare: () => void;
  onGetInsights: () => void;
  onClose: () => void;
}

const TextSelectionToolbar = ({ 
  position, 
  onHighlight,
  onAddNote,
  onShare,
  onGetInsights,
  onClose
}: TextSelectionToolbarProps) => {
  if (!position) return null;
  
  return (
    <div 
      className="fixed z-50 transform -translate-x-1/2"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y - 45}px` 
      }}
    >
      <div className="bg-background/95 backdrop-blur-sm shadow-lg rounded-full border border-border py-1.5 px-3 flex items-center space-x-3">
        <HighlightColorPicker onColorSelect={onHighlight} />
        <div className="h-4 w-px bg-gray-300"></div>
        <button 
          className="text-muted-foreground hover:text-foreground transition-colors p-1.5"
          onClick={onAddNote}
          aria-label="Add note"
        >
          <MessageCircle size={16} />
        </button>
        <button 
          className="text-muted-foreground hover:text-foreground transition-colors p-1.5"
          onClick={onShare}
          aria-label="Share"
        >
          <Share size={16} />
        </button>
        <button 
          className="text-muted-foreground hover:text-app-blue-500 transition-colors p-1.5"
          onClick={onGetInsights}
          aria-label="Get AI insights"
        >
          <Sparkles size={16} />
        </button>
        <button 
          className="text-muted-foreground hover:text-foreground transition-colors p-1.5"
          onClick={onClose}
          aria-label="Close toolbar"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default TextSelectionToolbar;
