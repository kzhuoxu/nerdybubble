
import { Book } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

interface BookCardProps {
  book: Book;
  size?: "small" | "medium" | "large";
}

const BookCard = ({ book, size = "medium" }: BookCardProps) => {
  const { id, title, author, coverUrl, rating } = book;

  const sizeClasses = {
    small: {
      card: "w-28",
      cover: "h-36",
      title: "text-sm",
      author: "text-xs",
    },
    medium: {
      card: "w-36",
      cover: "h-48",
      title: "text-base",
      author: "text-sm",
    },
    large: {
      card: "w-44",
      cover: "h-56",
      title: "text-lg",
      author: "text-base",
    },
  };

  return (
    <Link to={`/book/${id}`}>
      <Card className={`overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow ${sizeClasses[size].card}`}>
        <div 
          className={`${sizeClasses[size].cover} bg-cover bg-center rounded-t-lg`}
          style={{ backgroundImage: `url(${coverUrl})` }}
        />
        <CardContent className="p-2">
          <h3 className={`${sizeClasses[size].title} font-semibold line-clamp-1`}>{title}</h3>
          <p className={`${sizeClasses[size].author} text-muted-foreground line-clamp-1`}>{author}</p>
          {size !== "small" && (
            <div className="flex items-center mt-1">
              <Star size={14} className="text-yellow-500 fill-yellow-500 mr-1" />
              <span className="text-xs">{rating.toFixed(1)}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default BookCard;
