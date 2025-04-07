
import { useParams, Link } from "react-router-dom";
import { MOCK_BOOKS, MOCK_BOOK_CLUBS, MOCK_HIGHLIGHTS } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Star, Clock, BookOpen, Users, MessageSquare, ChevronLeft } from "lucide-react";
import HighlightCard from "@/components/HighlightCard";
import BookClubCard from "@/components/BookClubCard";

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const book = MOCK_BOOKS.find(book => book.id === id);
  
  if (!book) {
    return <div className="p-8 text-center">Book not found</div>;
  }

  const { title, author, coverUrl, description, rating, pages, readingTime, publishedDate, highlights = [] } = book;
  
  // Find book clubs that are reading this book
  const bookClubs = MOCK_BOOK_CLUBS.filter(club => club.bookId === id);
  
  // Format reading time as hours and minutes
  const hours = Math.floor(readingTime / 60);
  const minutes = readingTime % 60;
  const formattedReadingTime = `${hours > 0 ? `${hours}h ` : ''}${minutes}m`;

  return (
    <div className="container px-4 pt-16 pb-24">
      <Link to="/" className="flex items-center text-muted-foreground mb-4">
        <ChevronLeft size={16} />
        <span className="text-sm">Back</span>
      </Link>
      
      <div className="flex mb-6">
        <div 
          className="w-32 h-48 rounded-lg bg-cover bg-center shadow-md flex-shrink-0"
          style={{ backgroundImage: `url(${coverUrl})` }}
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
            <Button className="flex-1">Start Reading</Button>
            <Button variant="outline" className="flex-1">Add to Library</Button>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="about">
        <TabsList className="w-full">
          <TabsTrigger value="about" className="flex-1">About</TabsTrigger>
          <TabsTrigger value="highlights" className="flex-1">Highlights</TabsTrigger>
          <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
          <TabsTrigger value="clubs" className="flex-1">Book Clubs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="about" className="mt-4">
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
                  <span>{book.category}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Publication Date</span>
                  <span>{publishedDate}</span>
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="highlights" className="mt-4">
          <ScrollArea className="h-[calc(100vh-360px)]">
            {highlights.length > 0 ? (
              <div className="space-y-4">
                {highlights.map(highlight => (
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
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-4">
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
        </TabsContent>
        
        <TabsContent value="clubs" className="mt-4">
          <ScrollArea className="h-[calc(100vh-360px)]">
            {bookClubs.length > 0 ? (
              <div className="space-y-4">
                {bookClubs.map(club => (
                  <BookClubCard key={club.id} bookClub={club} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users size={36} className="mx-auto text-muted-foreground mb-2" />
                <h3 className="font-medium">No book clubs yet</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Start a book club for this book and invite friends to join.
                </p>
                <Button className="mt-4">Create Book Club</Button>
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookDetail;
