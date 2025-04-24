
import { Book } from "@/types";
import { Button } from "@/components/ui/button";
import { Star, Clock } from "lucide-react";

interface BookHeaderProps {
  book: Book;
  onStartReading: () => void;
}

const BookHeader = ({ book, onStartReading }: BookHeaderProps) => {
  const { title, author, coverUrl, rating, pages, readingTime, publishedDate } = book;
  
  // Format reading time as hours and minutes
  const hours = Math.floor(readingTime / 60);
  const minutes = readingTime % 60;
  const formattedReadingTime = `${hours > 0 ? `${hours}h ` : ''}${minutes}m`;

  return (
    <div className="flex mb-6">
      <div 
        className="w-32 h-48 rounded-lg bg-cover bg-center shadow-md flex-shrink-0 cursor-pointer"
        style={{ backgroundImage: `url(${coverUrl})` }}
        onClick={onStartReading}
      />
      <div className="ml-4">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-muted-foreground mb-2">by {author}</p>
        
        <div className="flex items-center mb-1">
          <Star size={16} className="text-yellow-500 fill-yellow-500 mr-1" />
          <span className="text-sm">{rating.toFixed(1)} • {pages} pages • {publishedDate.split("-")[0]}</span>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Clock size={14} className="mr-1" />
          <span>~{formattedReadingTime} reading time</span>
        </div>
        
        <div className="flex space-x-2 mt-auto">
          <Button className="flex-1" onClick={onStartReading}>Start Reading</Button>
          <Button variant="outline" className="flex-1">Add to Library</Button>
        </div>
      </div>
    </div>
  );
};

export default BookHeader;
