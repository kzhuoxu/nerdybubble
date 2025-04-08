import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MOCK_HIGHLIGHTS, MOCK_BOOK_CLUBS, MOCK_USERS, CURRENT_USER } from "@/data/mockData";
import HighlightCard from "@/components/HighlightCard";
import BookClubCard from "@/components/BookClubCard";
import UserAvatar from "@/components/UserAvatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Medal, Target } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const Social = () => {
  // Get highlights from friends
  const friendIds = CURRENT_USER.friends || [];
  const friendHighlights = MOCK_HIGHLIGHTS.filter(h => 
    friendIds.includes(h.userId)
  ).sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Get all book clubs
  const myBookClubs = MOCK_BOOK_CLUBS.filter(club => 
    club.members.includes(CURRENT_USER.id)
  );

  // Get all friends
  const friends = MOCK_USERS.filter(user => 
    friendIds.includes(user.id)
  );

  return (
    <div className="container px-4 pt-8 pb-24">
      <h1 className="text-2xl font-semibold mb-4">Social</h1>

      <Tabs defaultValue="activity" className="mb-8">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="activity" className="flex-1">Activity</TabsTrigger>
          <TabsTrigger value="book-clubs" className="flex-1">Book Clubs</TabsTrigger>
          <TabsTrigger value="challenges" className="flex-1">Challenges</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="mt-0">
          <div className="space-y-4">
            {friendHighlights.map((highlight) => (
              <HighlightCard 
                key={highlight.id} 
                highlight={highlight}
                showBook={true}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="book-clubs" className="mt-0">
          <div className="grid grid-cols-1 gap-4">
            {myBookClubs.map((club) => (
              <BookClubCard key={club.id} bookClub={club} />
            ))}
          </div>
          <button className="w-full py-3 mt-4 text-center text-sm text-primary border border-dashed border-primary rounded-md">
            + Create a new book club
          </button>
        </TabsContent>

        <TabsContent value="challenges" className="mt-0">
          <div className="space-y-6">
            <div className="bg-primary/10 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Target size={18} className="text-primary mr-2" />
                <h3 className="font-medium">Reading Goal</h3>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm">
                    <span className="font-semibold">{CURRENT_USER.booksRead}</span> of {CURRENT_USER.readingGoal} books
                  </p>
                  <div className="w-40 h-2 bg-muted rounded-full mt-1">
                    <div 
                      className="h-2 bg-primary rounded-full" 
                      style={{ width: `${(CURRENT_USER.booksRead / CURRENT_USER.readingGoal!) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <Badge variant="outline">2025 Goal</Badge>
              </div>
            </div>

            <div className="bg-app-teal-500/10 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <CalendarDays size={18} className="text-app-teal-500 mr-2" />
                <h3 className="font-medium">Reading Streak</h3>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm">
                  <span className="font-semibold">{CURRENT_USER.readingStreak} days</span> of continuous reading
                </p>
                <Badge variant="outline" className="text-app-teal-500 border-app-teal-500 bg-transparent">Active</Badge>
              </div>
            </div>

            <div className="bg-yellow-500/10 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Medal size={18} className="text-yellow-500 mr-2" />
                <h3 className="font-medium">Reading Achievements</h3>
              </div>
              <div className="flex flex-wrap gap-2 mt-1">
                <Badge variant="outline" className="bg-yellow-500/20 border-yellow-500/20 text-yellow-700">
                  Night Owl
                </Badge>
                <Badge variant="outline" className="bg-yellow-500/20 border-yellow-500/20 text-yellow-700">
                  Bookworm
                </Badge>
                <Badge variant="outline" className="bg-yellow-500/20 border-yellow-500/20 text-yellow-700">
                  Genre Explorer
                </Badge>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <section>
        <h2 className="text-xl font-medium mb-3">Friends</h2>
        <div className="grid grid-cols-2 gap-4">
          {friends.map((friend) => (
            <div key={friend.id} className="bg-muted/30 p-3 rounded-lg">
              <div className="flex items-start">
                <UserAvatar user={friend} size="md" />
                <div className="ml-2 overflow-hidden">
                  <p className="font-medium line-clamp-1">{friend.name}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {friend.currentlyReading && friend.currentlyReading.length > 0 
                      ? `Reading: ${friend.currentlyReading[0].title}`
                      : "Not reading currently"}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <button className="border border-dashed border-primary rounded-lg p-3 text-center text-primary text-sm">
            + Add Friends
          </button>
        </div>
      </section>
    </div>
  );
};

export default Social;
