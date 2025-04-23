
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import MarginAnnotation, { Annotation } from "./MarginAnnotation";
import { HIGHLIGHT_COLORS } from "./HighlightColorPicker";
import { HighlightColor } from "./HighlightColorPicker";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { CURRENT_USER } from "@/data/mockData";

type AnnotationFilter = "all" | "mine" | "friends" | "community";

interface AnnotationSidebarProps {
  annotations: Annotation[];
  highlights: any[];
  isOpen: boolean;
  onClose: () => void;
}

const AnnotationSidebar = ({ 
  annotations, 
  highlights,
  isOpen,
  onClose
}: AnnotationSidebarProps) => {
  const [activeTab, setActiveTab] = useState("highlights");
  const [colorFilter, setColorFilter] = useState<HighlightColor | "all">("all");
  const [visibilityFilter, setVisibilityFilter] = useState<AnnotationFilter>("all");
  
  const filteredHighlights = highlights.filter(highlight => {
    if (colorFilter !== "all" && highlight.color !== colorFilter) return false;
    
    switch (visibilityFilter) {
      case "mine":
        return highlight.userId === CURRENT_USER.id;
      case "friends":
        return CURRENT_USER.friends.includes(highlight.userId) || highlight.userId === CURRENT_USER.id;
      default:
        return true;
    }
  });
  
  const filteredAnnotations = annotations.filter(annotation => {
    switch (visibilityFilter) {
      case "mine":
        return annotation.user.id === CURRENT_USER.id;
      case "friends":
        return CURRENT_USER.friends.includes(annotation.user.id) || annotation.user.id === CURRENT_USER.id;
      default:
        return true;
    }
  });
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed top-0 right-0 h-full w-80 bg-background border-l border-border z-40 shadow-lg">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-medium">Annotations & Highlights</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X size={16} />
        </Button>
      </div>
      
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <div className="flex items-center text-sm">
          <Filter size={14} className="mr-1.5" />
          <span>Show:</span>
        </div>
        <select 
          className="text-sm bg-transparent border-none focus:ring-0"
          value={visibilityFilter}
          onChange={(e) => setVisibilityFilter(e.target.value as AnnotationFilter)}
        >
          <option value="all">All</option>
          <option value="mine">Mine</option>
          <option value="friends">Friends</option>
          <option value="community">Community</option>
        </select>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="highlights">Highlights</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="highlights" className="p-0">
          <div className="flex items-center justify-between px-4 py-2 border-b border-border">
            <span className="text-sm">Filter by color:</span>
            <div className="flex items-center">
              <button 
                className={`px-2 py-0.5 text-xs rounded-full mr-1 ${colorFilter === "all" ? "bg-gray-100" : ""}`}
                onClick={() => setColorFilter("all")}
              >
                All
              </button>
              {HIGHLIGHT_COLORS.map(color => (
                <button
                  key={color.name}
                  className={`w-4 h-4 rounded-full mx-0.5 ${color.class} ${colorFilter === color.name ? "ring-2 ring-offset-1 ring-gray-400" : ""}`}
                  onClick={() => setColorFilter(color.name)}
                  aria-label={`Filter by ${color.name} highlights`}
                />
              ))}
            </div>
          </div>
          
          <ScrollArea className="h-[calc(100vh-165px)]">
            <div className="p-4">
              {filteredHighlights.length > 0 ? (
                filteredHighlights.map((highlight) => (
                  <div key={highlight.id} className="mb-4">
                    <div className={`p-3 rounded-md mb-2 ${HIGHLIGHT_COLORS.find(c => c.name === highlight.color)?.class || "bg-yellow-200"}`}>
                      <p className="text-sm">{highlight.text}</p>
                      <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                        <span>Chapter {highlight.chapter}</span>
                        <span>{new Date(highlight.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No highlights found</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="notes" className="p-0">
          <ScrollArea className="h-[calc(100vh-130px)]">
            <div className="p-4">
              {filteredAnnotations.length > 0 ? (
                filteredAnnotations.map(annotation => (
                  <MarginAnnotation
                    key={annotation.id}
                    annotation={annotation}
                    onReply={(a) => console.log("Reply to", a)}
                    onLike={(a) => console.log("Like", a)}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No notes found</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnnotationSidebar;
