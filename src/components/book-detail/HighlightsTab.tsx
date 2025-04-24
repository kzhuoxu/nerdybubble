
import { Book } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen } from "lucide-react";
import HighlightCard from "@/components/HighlightCard";

interface HighlightsTabProps {
  book: Book;
}

const HighlightsTab = ({ book }: HighlightsTabProps) => {
  return (
    <ScrollArea className="h-[calc(100vh-360px)]">
      {book.highlights && book.highlights.length > 0 ? (
        <div className="space-y-4">
          {book.highlights.map(highlight => (
            <HighlightCard key={highlight.id} highlight={highlight} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <BookOpen size={36} className="mx-auto text-muted-foreground mb-2" />
          <h3 className="font-medium">No highlights yet</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Start reading to add highlights and see what others are sharing.
          </p>
        </div>
      )}
    </ScrollArea>
  );
};

export default HighlightsTab;
