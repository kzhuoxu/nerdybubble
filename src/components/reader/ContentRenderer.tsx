
import { Highlight } from "@/types";
import { CURRENT_USER, MOCK_USERS } from "@/data/mockData";

interface ContentRendererProps {
  content: string;
  highlights?: Highlight[];
  mode: "focus" | "explore";
  onCommentClick?: (text: string) => void;
}

const ContentRenderer = ({ content, highlights = [], mode, onCommentClick }: ContentRendererProps) => {
  if (mode === "focus") {
    return <>{renderContentWithHighlights(content, highlights, onCommentClick)}</>;
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
const renderContentWithHighlights = (
  content: string, 
  highlights: Highlight[] = [],
  onCommentClick?: (text: string) => void
) => {
  // For demo purposes, split content into paragraphs
  const paragraphs = content.split("\n\n").filter(p => p.trim() !== "");
  
  return paragraphs.map((paragraph, index) => {
    // Check for highlights in this paragraph
    const paragraphHighlights = highlights.filter(h => 
      paragraph.includes(h.text)
    );
    
    if (paragraphHighlights.length > 0) {
      // Need to handle multiple highlights in a paragraph
      let remainingParagraph = paragraph;
      let result: React.ReactNode[] = [];
      let lastIndex = 0;
      
      // Sort highlights by their position in the paragraph
      const sortedHighlights = paragraphHighlights.sort((a, b) => {
        const indexA = paragraph.indexOf(a.text);
        const indexB = paragraph.indexOf(b.text);
        return indexA - indexB;
      });
      
      sortedHighlights.forEach((highlight, hIndex) => {
        const highlightStart = paragraph.indexOf(highlight.text, lastIndex);
        
        if (highlightStart === -1) return;
        
        // Add text before this highlight
        if (highlightStart > lastIndex) {
          result.push(
            <span key={`${index}-pre-${hIndex}`}>
              {paragraph.substring(lastIndex, highlightStart)}
            </span>
          );
        }
        
        // User-specific styles
        const isCurrentUserHighlight = highlight.userId === CURRENT_USER.id;
        const hasComments = highlight.comments && highlight.comments.length > 0;
        
        // Add the highlighted text with appropriate styling
        result.push(
          <span 
            key={`${index}-highlight-${hIndex}`}
            className={`
              cursor-pointer
              ${isCurrentUserHighlight ? "highlight" : ""}
              ${hasComments ? (isCurrentUserHighlight ? "border-b-2 border-app-blue-500" : "border-b-2 border-dashed border-app-blue-300") : ""}
            `}
            onClick={() => hasComments && onCommentClick && onCommentClick(highlight.text)}
          >
            {highlight.text}
          </span>
        );
        
        lastIndex = highlightStart + highlight.text.length;
      });
      
      // Add any remaining text after the last highlight
      if (lastIndex < paragraph.length) {
        result.push(
          <span key={`${index}-post`}>
            {paragraph.substring(lastIndex)}
          </span>
        );
      }
      
      return <p key={index}>{result}</p>;
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
