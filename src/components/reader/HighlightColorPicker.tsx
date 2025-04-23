
import { useState } from "react";
import { cn } from "@/lib/utils";

const HIGHLIGHT_COLORS = [
  { name: "yellow", class: "bg-yellow-200", hoverClass: "hover:bg-yellow-300" },
  { name: "green", class: "bg-green-200", hoverClass: "hover:bg-green-300" },
  { name: "blue", class: "bg-blue-200", hoverClass: "hover:bg-blue-300" },
  { name: "purple", class: "bg-purple-200", hoverClass: "hover:bg-purple-300" },
  { name: "pink", class: "bg-pink-200", hoverClass: "hover:bg-pink-300" },
];

export type HighlightColor = typeof HIGHLIGHT_COLORS[number]["name"];

interface HighlightColorPickerProps {
  onColorSelect: (color: HighlightColor) => void;
  selectedColor?: HighlightColor;
}

const HighlightColorPicker = ({
  onColorSelect,
  selectedColor = "yellow",
}: HighlightColorPickerProps) => {
  return (
    <div className="flex items-center space-x-1.5">
      {HIGHLIGHT_COLORS.map((color) => (
        <button
          key={color.name}
          className={cn(
            "w-5 h-5 rounded-full transition-transform",
            color.class,
            color.hoverClass,
            selectedColor === color.name && "ring-2 ring-offset-1 ring-gray-400"
          )}
          onClick={() => onColorSelect(color.name)}
          aria-label={`Highlight with ${color.name} color`}
        />
      ))}
    </div>
  );
};

export default HighlightColorPicker;
export { HIGHLIGHT_COLORS };
