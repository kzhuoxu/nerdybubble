
import { Book } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Star } from "lucide-react";

interface ReviewsTabProps {
  book: Book;
}

const ReviewsTab = ({ book }: ReviewsTabProps) => {
  return (
    <ScrollArea className="h-[calc(100vh-360px)]">
      {book.reviews && book.reviews.length > 0 ? (
        <div className="space-y-4">
          {book.reviews.map(review => (
            <div key={review.id} className="p-4 border rounded-lg">
              <div className="flex justify-between mb-2">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="ml-2">
                    <p className="text-sm font-medium">User</p>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          size={12} 
                          className={i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm">{review.text}</p>
              <div className="flex items-center mt-2 text-xs text-muted-foreground">
                <button className="flex items-center">
                  <MessageSquare size={12} className="mr-1" />
                  <span>Reply</span>
                </button>
                <span className="mx-2">•</span>
                <button className="flex items-center">
                  <Star size={12} className="mr-1" />
                  <span>Helpful ({review.likes})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <MessageSquare size={36} className="mx-auto text-muted-foreground mb-2" />
          <h3 className="font-medium">No reviews yet</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Be the first to review this book.
          </p>
          <Button className="mt-4">Write a Review</Button>
        </div>
      )}
    </ScrollArea>
  );
};

export default ReviewsTab;
