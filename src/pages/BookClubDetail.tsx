
import { useParams } from "react-router-dom";
import { MOCK_BOOK_CLUBS, MOCK_USERS, MOCK_BOOKS, MOCK_HIGHLIGHTS, CURRENT_USER } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CalendarDays, MessageSquare, Users, BookOpen, Clock, Calendar, Share2 } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import UserAvatar from "@/components/UserAvatar";
import HighlightCard from "@/components/HighlightCard";

const BookClubDetail = () => {
  const { id } = useParams<{ id: string }>();
  const bookClub = MOCK_BOOK_CLUBS.find(club => club.id === id);
  
  if (!bookClub) {
    return <div className="p-8 text-center">Book club not found</div>;
  }
  
  const book = MOCK_BOOKS.find(b => b.id === bookClub.bookId);
  const members = MOCK_USERS.filter(user => bookClub.members.includes(user.id));
  const isMember = bookClub.members.includes(CURRENT_USER.id);
  
  // Get highlights from this book by club members
  const bookHighlights = MOCK_HIGHLIGHTS.filter(
    h => h.bookId === bookClub.bookId && bookClub.members.includes(h.userId)
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="container px-4 pt-8 pb-24 mx-auto max-w-4xl">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Book Cover & Info */}
        <div className="flex gap-4 md:w-2/3">
          <div className="shrink-0">
            {book && (
              <div 
                className="w-24 h-36 bg-cover bg-center rounded-md shadow-md"
                style={{ backgroundImage: `url(${book.coverUrl})` }}
              />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-semibold mb-1">{bookClub.name}</h1>
            <p className="text-muted-foreground mb-2">
              Reading: <span className="font-medium">{book?.title}</span> by {book?.author}
            </p>
            <p className="text-sm mb-3">{bookClub.description}</p>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline" className="gap-1">
                <Users size={14} />
                <span>{bookClub.members.length} members</span>
              </Badge>
              <Badge variant="outline" className="gap-1">
                <BookOpen size={14} />
                <span>Currently Chapter 3</span>
              </Badge>
              <Badge variant="outline" className="gap-1">
                <CalendarDays size={14} />
                <span>Since {format(new Date(bookClub.createdAt), "MMM yyyy")}</span>
              </Badge>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="md:w-1/3 flex flex-col gap-2 justify-end">
          {isMember ? (
            <>
              <Button className="w-full gap-2">
                <BookOpen size={16} />
                <span>Continue Reading</span>
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <Share2 size={16} />
                <span>Invite Friends</span>
              </Button>
            </>
          ) : (
            <Button className="w-full">Join Club</Button>
          )}
        </div>
      </div>
      
      <Tabs defaultValue="discussions" className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="discussions" className="flex-1 gap-2">
            <MessageSquare size={16} />
            <span>Discussions</span>
          </TabsTrigger>
          <TabsTrigger value="meetings" className="flex-1 gap-2">
            <Calendar size={16} />
            <span>Meetings</span>
          </TabsTrigger>
          <TabsTrigger value="members" className="flex-1 gap-2">
            <Users size={16} />
            <span>Members</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="discussions" className="space-y-6">
          <div className="space-y-4">
            {bookHighlights.map((highlight) => (
              <HighlightCard 
                key={highlight.id} 
                highlight={highlight}
                showBook={false}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="meetings" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Upcoming Meetings</h2>
            {isMember && (
              <Button variant="outline" size="sm">
                Schedule Meeting
              </Button>
            )}
          </div>
          
          {bookClub.schedule.length > 0 ? (
            <div className="space-y-3">
              {bookClub.schedule.map((event) => (
                <div key={event.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">{event.title}</h3>
                    <Badge>
                      {format(new Date(event.date), "MMM d")}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm">
                      <Clock size={14} className="mr-1" />
                      <span>{format(new Date(event.date), "h:mm a")}</span>
                    </div>
                    <Button size="sm">Join</Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 border border-dashed rounded-lg">
              <Calendar size={32} className="mx-auto mb-2 text-muted-foreground" />
              <h3 className="font-medium mb-1">No Scheduled Meetings</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {isMember 
                  ? "Schedule your first book club meeting." 
                  : "This club has no upcoming meetings."}
              </p>
              {isMember && <Button>Schedule Meeting</Button>}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="members" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Members ({members.length})</h2>
            {isMember && (
              <Button variant="outline" size="sm">
                Invite Members
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {members.map((member) => (
              <div key={member.id} className="flex items-center gap-3 p-3 rounded-lg border">
                <UserAvatar user={member} size="md" />
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {member.readingStreak ? `${member.readingStreak} day streak` : "New member"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookClubDetail;
