
import { MessageCircle, MoreHorizontal } from "lucide-react";
import TextSelectionToolbar from "./TextSelectionToolbar";
import { HighlightColor } from "./HighlightColorPicker";

interface SelectionBubbleProps {
  selectedText: string;
  selectionPosition: { x: number, y: number } | null;
  onHighlight: (color: HighlightColor) => void;
  onAddNote: () => void;
  onShare: () => void;
  onGetInsights: () => void;
  onClose: () => void;
}

const SelectionBubble = ({ 
  selectedText, 
  selectionPosition,
  onHighlight,
  onAddNote,
  onShare,
  onGetInsights,
  onClose
}: SelectionBubbleProps) => {
  if (!selectedText || !selectionPosition) return null;
  
  return (
    <TextSelectionToolbar
      position={selectionPosition}
      onHighlight={onHighlight}
      onAddNote={onAddNote}
      onShare={onShare}
      onGetInsights={onGetInsights}
      onClose={onClose}
    />
  );
};

export default SelectionBubble;
