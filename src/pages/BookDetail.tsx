import { useParams, Link } from "react-router-dom";
import { MOCK_BOOKS, MOCK_BOOK_CLUBS, MOCK_HIGHLIGHTS, CURRENT_USER } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Star, Clock, BookOpen, Users, MessageCircle, ChevronLeft, 
  X, Bookmark, BookmarkCheck, List
} from "lucide-react";
import HighlightCard from "@/components/HighlightCard";
import BookClubCard from "@/components/BookClubCard";
import { useState, useRef, useEffect } from "react";
import { ReadingMode, Comment, Highlight as HighlightType } from "@/types";
import ReadingModeSwitcher from "@/components/ReadingModeSwitcher";
import CommentDialog from "@/components/reader/CommentDialog";
import ReaderControls from "@/components/reader/ReaderControls";
import ReaderContent from "@/components/reader/ReaderContent";
import SelectionBubble from "@/components/reader/SelectionBubble";
import { HighlightColor } from "@/components/reader/HighlightColorPicker";
import { toast } from "@/components/ui/use-toast";
import AnnotationSidebar from "@/components/reader/AnnotationSidebar";
import { Annotation } from "@/components/reader/MarginAnnotation";

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // Book detail state
  const book = MOCK_BOOKS.find(book => book.id === id);
  
  // Reader state
  const [isReading, setIsReading] = useState(false);
  const [readingMode, setReadingMode] = useState<ReadingMode>("focus");
  const [showControls, setShowControls] = useState(true);
  const [selectedText, setSelectedText] = useState("");
  const [selectionPosition, setSelectionPosition] = useState<{ x: number, y: number } | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  // New states for the new features
  const [showAnnotationSidebar, setShowAnnotationSidebar] = useState(false);
  const [userHighlights, setUserHighlights] = useState<HighlightType[]>([]);
  const [communityHighlights, setCommunityHighlights] = useState<HighlightType[]>(MOCK_HIGHLIGHTS.filter(h => h.bookId === id));
  const [annotations, setAnnotations] = useState<Annotation[]>([
    {
      id: "note-1",
      user: CURRENT_USER,
      text: "This is an important passage about the main character's development.",
      timestamp: new Date().toISOString(),
      likes: 3,
      replies: 1,
    }
  ]);
  const [visibilityFilter, setVisibilityFilter] = useState<"all" | "mine" | "friends">("all");

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

  // Toggle controls visibility after a short delay
  useEffect(() => {
    if (showControls && isReading) {
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showControls, isReading]);

  // Handle tap on screen to toggle controls
  const handleScreenTap = () => {
    // Only show controls if no text is selected
    if (!selectedText && isReading) {
      setShowControls(!showControls);
    }
  };

  // Handle text selection
  const handleTextSelection = () => {
    if (!isReading) return;
    
    const selection = window.getSelection();
    if (selection && selection.toString().trim() !== "") {
      setSelectedText(selection.toString().trim());
      
      // Calculate position for the selection bubble
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      // Position the bubble above the selection
      setSelectionPosition({
        x: rect.left + (rect.width / 2),
        y: rect.top - 15
      });
    } else {
      setSelectedText("");
      setSelectionPosition(null);
    }
  };

  // Handle highlighting text
  const handleHighlightText = (color: HighlightColor) => {
    if (!selectedText) return;
    
    // Create a new highlight
    const newHighlight: HighlightType = {
      id: `highlight-${Date.now()}`,
      bookId: book.id,
      userId: CURRENT_USER.id,
      text: selectedText,
      chapter: 1,
      position: 0,
      createdAt: new Date().toISOString(),
      likes: 0,
      color: color
    };
    
    // Add to user highlights and community highlights
    setUserHighlights(prev => [...prev, newHighlight]);
    setCommunityHighlights(prev => [...prev, newHighlight]);
    
    // Show toast confirmation
    toast({
      title: "Highlight added",
      description: "Your highlight has been saved.",
    });
    
    // Clear the selection
    setSelectedText("");
    setSelectionPosition(null);
  };

  // Handle adding a note
  const handleAddNote = () => {
    if (!selectedText) return;
    
    setShowCommentDialog(true);
  };

  // Handle sharing
  const handleShare = () => {
    toast({
      title: "Share",
      description: "Sharing functionality will be implemented soon.",
    });
    
    setSelectedText("");
    setSelectionPosition(null);
  };

  // Handle getting AI insights
  const handleGetInsights = () => {
    toast({
      title: "AI Insights",
      description: "Analyzing your selected text...",
    });
    
    setTimeout(() => {
      toast({
        title: "AI Analysis Complete",
        description: "This passage introduces a key theme that will develop throughout the story.",
      });
    }, 2000);
    
    setSelectedText("");
    setSelectionPosition(null);
  };

  // Handle adding a new comment
  const handleAddComment = (text: string) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      highlightId: `highlight-${Date.now()}`,
      userId: CURRENT_USER.id,
      text: text,
      createdAt: new Date().toISOString(),
      likes: 0
    };
    
    setComments(prev => [...prev, newComment]);
    
    // Also add as annotation
    const newAnnotation: Annotation = {
      id: `note-${Date.now()}`,
      user: CURRENT_USER,
      text: text,
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: 0,
    };
    
    setAnnotations(prev => [...prev, newAnnotation]);
  };

  // Handle liking a comment
  const handleLikeComment = (commentId: string) => {
    setComments(prev => 
      prev.map(comment => 
        comment.id === commentId 
          ? { ...comment, likes: comment.likes + 1 } 
          : comment
      )
    );
  };

  // Start reading
  const handleStartReading = () => {
    setIsReading(true);
  };

  // Exit reading mode
  const handleExitReading = () => {
    setIsReading(false);
    setSelectedText("");
    setSelectionPosition(null);
    setShowAnnotationSidebar(false);
  };

  // Toggle sidebar visibility
  const toggleAnnotationSidebar = () => {
    setShowAnnotationSidebar(!showAnnotationSidebar);
  };

  if (isReading) {
    return (
      <div className="min-h-screen bg-reader-bg" onClick={handleScreenTap}>
        {/* Top controls */}
        {showControls && (
          <div className="fixed top-0 left-0 w-full bg-background/95 backdrop-blur-sm z-40 transition-all duration-300 py-3 px-4 border-b border-border">
            <div className="flex justify-between items-center max-w-screen-md mx-auto">
              <button 
                className="flex items-center text-muted-foreground"
                onClick={handleExitReading}
              >
                <ChevronLeft size={20} />
                <span className="ml-1 line-clamp-1 text-sm font-medium">{book.title}</span>
              </button>
              <div className="flex items-center space-x-3">
                <button 
                  className="text-muted-foreground p-1.5 hover:text-foreground transition-colors"
                  onClick={toggleAnnotationSidebar}
                >
                  <List size={18} />
                </button>
                <button className="text-muted-foreground p-1.5 hover:text-foreground transition-colors">
                  <BookmarkCheck size={18} />
                </button>
                <button className="text-muted-foreground p-1.5 hover:text-foreground transition-colors">
                  <X size={18} onClick={handleExitReading} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reading content */}
        <ReaderContent
          book={book}
          readingMode={readingMode}
          contentRef={contentRef}
          showAnnotations={!showAnnotationSidebar}
          annotations={annotations}
          communityHighlights={communityHighlights}
          visibilityFilter={visibilityFilter}
          handleTextSelection={handleTextSelection}
        />

        {/* Reading mode switcher */}
        <ReadingModeSwitcher 
          currentMode={readingMode}
          onModeChange={setReadingMode}
        />
        
        {/* Selection toolbar - only appears when text is selected in focus mode */}
        {readingMode === "focus" && (
          <SelectionBubble
            selectedText={selectedText}
            selectionPosition={selectionPosition}
            onHighlight={handleHighlightText}
            onAddNote={handleAddNote}
            onShare={handleShare}
            onGetInsights={handleGetInsights}
            onClose={() => {
              setSelectedText("");
              setSelectionPosition(null);
            }}
          />
        )}

        {/* Comments dialog */}
        <CommentDialog 
          isOpen={showCommentDialog}
          onClose={() => setShowCommentDialog(false)}
          selectedText={selectedText}
          comments={comments}
          onAddComment={handleAddComment}
          onLikeComment={handleLikeComment}
        />
        
        {/* Annotations sidebar */}
        <AnnotationSidebar 
          isOpen={showAnnotationSidebar}
          onClose={() => setShowAnnotationSidebar(false)}
          annotations={annotations}
          highlights={[...userHighlights, ...communityHighlights]}
        />
      </div>
    );
  }

  return (
    <div className="container px-4 pt-16 pb-24">
      <Link to="/" className="flex items-center text-muted-foreground mb-4">
        <ChevronLeft size={16} />
        <span className="text-sm">Back</span>
      </Link>
      
      <div className="flex mb-6">
        <div 
          className="w-32 h-48 rounded-lg bg-cover bg-center shadow-md flex-shrink-0 cursor-pointer"
          style={{ backgroundImage: `url(${coverUrl})` }}
          onClick={handleStartReading}
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
            <Button className="flex-1" onClick={handleStartReading}>Start Reading</Button>
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
                        <MessageCircle size={12} className="mr-1" />
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
                <MessageCircle size={36} className="mx-auto text-muted-foreground mb-2" />
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
