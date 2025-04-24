
import { Book } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AboutTabProps {
  book: Book;
}

const AboutTab = ({ book }: AboutTabProps) => {
  const { description, publishedDate, category } = book;
  
  return (
    <ScrollArea className="h-[calc(100vh-360px)]">
      <p className="text-sm leading-relaxed">{description}</p>
      
      <div className="mt-6">
        <h3 className="font-medium mb-2">Details</h3>
        <div className="text-sm">
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">Publisher</span>
            <span>BookBloom Publishing</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">Language</span>
            <span>English</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">Category</span>
            <span>{category}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-muted-foreground">Publication Date</span>
            <span>{publishedDate}</span>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default AboutTab;
