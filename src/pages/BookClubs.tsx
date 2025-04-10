
import { useState } from "react";
import { MOCK_BOOK_CLUBS, CURRENT_USER, MOCK_BOOKS } from "@/data/mockData";
import BookClubCard from "@/components/BookClubCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, Users, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BookClubs = () => {
  const [activeTab, setActiveTab] = useState("my-clubs");
  
  // Filter book clubs for the active user
  const myBookClubs = MOCK_BOOK_CLUBS.filter(club => 
    club.members.includes(CURRENT_USER.id)
  );

  // Get all book clubs (for the discover tab)
  const allBookClubs = MOCK_BOOK_CLUBS.filter(club => 
    !club.members.includes(CURRENT_USER.id)
  );

  return (
    <div className="container px-4 pt-8 pb-24 mx-auto max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Book Clubs</h1>
        <Button className="gap-2">
          <PlusCircle size={18} />
          <span>Create Club</span>
        </Button>
      </div>

      <Tabs defaultValue="my-clubs" className="w-full mb-8" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-full mb-6">
          <TabsTrigger value="my-clubs">My Clubs</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
        </TabsList>

        <TabsContent value="my-clubs" className="space-y-4">
          {myBookClubs.length === 0 ? (
            <EmptyBookClubs />
          ) : (
            <div className="grid gap-4">
              {myBookClubs.map((club) => (
                <BookClubCard key={club.id} bookClub={club} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="discover" className="space-y-4">
          <div className="grid gap-4">
            {allBookClubs.map((club) => (
              <BookClubPreviewCard key={club.id} bookClub={club} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const EmptyBookClubs = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border border-dashed rounded-lg">
      <Users size={40} className="text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">No Book Clubs Yet</h3>
      <p className="text-muted-foreground mb-4 max-w-md">
        Join a book club to discuss books with other readers or create your own club to invite friends.
      </p>
      <div className="flex gap-3">
        <Button variant="outline">Discover Clubs</Button>
        <Button>Create a Club</Button>
      </div>
    </div>
  );
};

const BookClubPreviewCard = ({ bookClub }: { bookClub: typeof MOCK_BOOK_CLUBS[0] }) => {
  const book = MOCK_BOOKS.find(b => b.id === bookClub.bookId);
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="shrink-0">
            <div 
              className="w-16 h-24 bg-cover bg-center rounded-md"
              style={{ backgroundImage: `url(${book?.coverUrl})` }}
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
              <h3 className="font-semibold text-lg">{bookClub.name}</h3>
              <div className="flex items-center text-muted-foreground">
                <Users size={16} className="mr-1" />
                <span className="text-xs">{bookClub.members.length}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Reading: {book?.title}
            </p>
            <p className="text-sm line-clamp-2 mb-3">{bookClub.description}</p>
            <div className="flex justify-between items-center">
              <Badge variant="outline" className="gap-1">
                <BookOpen size={12} />
                <span>Chapter 3</span>
              </Badge>
              <Button size="sm">Join Club</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookClubs;
