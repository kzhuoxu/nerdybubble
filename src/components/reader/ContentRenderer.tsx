
import { Highlight } from "@/types";
import { HIGHLIGHT_COLORS } from "./HighlightColorPicker";

interface ContentRendererProps {
  content: string;
  highlights?: Highlight[];
  mode: "focus" | "explore";
}

const ContentRenderer = ({ content, highlights = [], mode }: ContentRendererProps) => {
  if (mode === "focus") {
    return <>{renderContentWithHighlights(content, highlights)}</>;
  } else {
    return (
      <>
        {renderContentWithAIHighlights(content)}
        
        <div className="mt-8 mb-4 p-4 bg-app-teal-500/10 rounded-lg">
          <h3 className="font-medium text-lg mb-2">AI Summary</h3>
          <p className="text-sm">
            This chapter introduces the main themes of the book, exploring the concepts of labor, value, and human experience. The author establishes the philosophical framework that will guide the rest of the narrative.
          </p>
        </div>
        
        <div className="mt-6 p-4 bg-app-blue-100/20 rounded-lg">
          <h3 className="font-medium text-lg mb-2">Key Concepts</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>The relationship between labor and value creation</li>
            <li>Different perspectives on human motivation</li>
            <li>Historical context of economic systems</li>
          </ul>
        </div>
      </>
    );
  }
};

// Helper function to render content with user highlights
const renderContentWithHighlights = (content: string, highlights: Highlight[] = []) => {
  // For demo purposes, just render the content with a few simulated highlights
  const paragraphs = content.split("\n\n").filter(p => p.trim() !== "");
  
  return paragraphs.map((paragraph, index) => {
    // Simulate some paragraphs having different colored highlights
    if (index === 1) {
      return (
        <p key={index}>
          {paragraph.substring(0, 40)}
          <span className="bg-yellow-200">{paragraph.substring(40, 120)}</span>
          {paragraph.substring(120)}
        </p>
      );
    }
    
    if (index === 3) {
      return (
        <p key={index}>
          {paragraph.substring(0, 60)}
          <span className="bg-blue-200">{paragraph.substring(60, 140)}</span>
          {paragraph.substring(140)}
        </p>
      );
    }
    
    if (index === 5) {
      return (
        <p key={index}>
          {paragraph.substring(0, 20)}
          <span className="bg-green-200">{paragraph.substring(20, 100)}</span>
          {paragraph.substring(100)}
        </p>
      );
    }
    
    if (index === 7) {
      return (
        <p key={index}>
          {paragraph.substring(0, 80)}
          <span className="bg-purple-200">{paragraph.substring(80, 160)}</span>
          {paragraph.substring(160)}
        </p>
      );
    }
    
    return <p key={index}>{paragraph}</p>;
  });
};

// Helper function to render content with AI highlights
const renderContentWithAIHighlights = (content: string) => {
  // For demo purposes, just render the content with a few simulated AI highlights
  const paragraphs = content.split("\n\n").filter(p => p.trim() !== "");
  
  return paragraphs.map((paragraph, index) => {
    // Simulate some paragraphs having AI highlights
    if (index === 2 || index === 4) {
      return (
        <p key={index}>
          {paragraph.substring(0, 30)}
          <span className="ai-highlight">{paragraph.substring(30, 100)}</span>
          {paragraph.substring(100)}
        </p>
      );
    }
    
    return <p key={index}>{paragraph}</p>;
  });
};

export default ContentRenderer;
