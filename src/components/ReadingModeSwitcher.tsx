
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpenText, Sparkles } from "lucide-react";
import { ReadingMode } from "@/types";

interface ReadingModeSwitcherProps {
  currentMode: ReadingMode;
  onModeChange: (mode: ReadingMode) => void;
}

const ReadingModeSwitcher = ({ currentMode, onModeChange }: ReadingModeSwitcherProps) => {
  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-30">
      <Tabs 
        defaultValue={currentMode}
        onValueChange={(value) => onModeChange(value as ReadingMode)}
        className="w-64 bg-background/90 backdrop-blur-lg rounded-full shadow-lg border border-border"
      >
        <TabsList className="w-full">
          <TabsTrigger 
            value="focus" 
            className="flex-1 gap-1 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <BookOpenText size={16} />
            <span className="ml-1">Focus</span>
          </TabsTrigger>
          <TabsTrigger 
            value="explore" 
            className="flex-1 gap-1 rounded-full data-[state=active]:bg-app-teal-500 data-[state=active]:text-white"
          >
            <Sparkles size={16} />
            <span className="ml-1">Explore</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default ReadingModeSwitcher;
