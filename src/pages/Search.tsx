import { useState } from "react";
import { Input } from "@/components/ui/input";
import { MOCK_BOOKS, MOCK_USERS, MOCK_BOOK_CLUBS } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import BookCard from "@/components/BookCard";
import UserAvatar from "@/components/UserAvatar";
import BookClubCard from "@/components/BookClubCard";
import { Search as SearchIcon, Book, User, Users, Sparkles } from "lucide-react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("books");

  const filteredBooks = MOCK_BOOKS.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = MOCK_USERS.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBookClubs = MOCK_BOOK_CLUBS.filter(club => 
    club.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const aiRecommendations = [
    "If you enjoyed The Silent Echo, try The Midnight Algorithm",
    "For science enthusiasts, explore Quantum Horizons",
    "Looking for something emotional? Gardens of Memory is perfect",
  ];

  return (
    <div className="container px-4 pt-8 pb-24">
      <h1 className="text-2xl font-semibold mb-4">Search</h1>

      <div className="relative mb-6">
        <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input 
          type="text"
          placeholder="Search books, people, or book clubs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs 
        defaultValue="books" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="mb-6"
      >
        <TabsList className="w-full mb-4">
          <TabsTrigger value="books" className="flex-1 gap-1">
            <Book size={16} />
            <span>Books</span>
          </TabsTrigger>
          <TabsTrigger value="people" className="flex-1 gap-1">
            <User size={16} />
            <span>People</span>
          </TabsTrigger>
          <TabsTrigger value="clubs" className="flex-1 gap-1">
            <Users size={16} />
            <span>Book Clubs</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="books" className="mt-0">
          <ScrollArea className="h-[calc(100vh-270px)]">
            {searchTerm === "" ? (
              <div className="text-center py-8">
                <SearchIcon size={36} className="mx-auto text-muted-foreground mb-2" />
                <h3 className="font-medium">Search for books</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Enter a title or author to find books.
                </p>
              </div>
            ) : filteredBooks.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filteredBooks.map(book => (
                  <div key={book.id}>
                    <BookCard book={book} size="medium" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <h3 className="font-medium">No books found</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Try a different search term.
                </p>
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="people" className="mt-0">
          <ScrollArea className="h-[calc(100vh-270px)]">
            {searchTerm === "" ? (
              <div className="text-center py-8">
                <User size={36} className="mx-auto text-muted-foreground mb-2" />
                <h3 className="font-medium">Search for people</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Find readers to connect with.
                </p>
              </div>
            ) : filteredUsers.length > 0 ? (
              <div className="space-y-4">
                {filteredUsers.map(user => (
                  <div key={user.id} className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <UserAvatar user={user} size="md" showName={true} />
                      <button className="text-xs text-primary border border-primary rounded-full px-3 py-1">
                        Follow
                      </button>
                    </div>
                    {user.bio && (
                      <p className="text-sm text-muted-foreground mt-2">{user.bio}</p>
                    )}
                    {user.currentlyReading && user.currentlyReading.length > 0 && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Currently reading: {user.currentlyReading[0].title}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <h3 className="font-medium">No people found</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Try a different search term.
                </p>
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="clubs" className="mt-0">
          <ScrollArea className="h-[calc(100vh-270px)]">
            {searchTerm === "" ? (
              <div className="text-center py-8">
                <Users size={36} className="mx-auto text-muted-foreground mb-2" />
                <h3 className="font-medium">Search for book clubs</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Join reading communities.
                </p>
              </div>
            ) : filteredBookClubs.length > 0 ? (
              <div className="space-y-4">
                {filteredBookClubs.map(club => (
                  <BookClubCard key={club.id} bookClub={club} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <h3 className="font-medium">No book clubs found</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Try a different search term.
                </p>
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>

      {activeTab === "books" && searchTerm === "" && (
        <div className="bg-app-teal-500/10 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <Sparkles size={18} className="text-app-teal-500 mr-2" />
            <h3 className="font-medium">AI Recommendations</h3>
          </div>
          <ul className="space-y-3">
            {aiRecommendations.map((rec, index) => (
              <li key={index} className="text-sm flex items-center bg-background p-3 rounded-md">
                <span className="w-4 h-4 bg-app-teal-500/20 rounded-full text-app-teal-500 text-xs flex items-center justify-center mr-2">
                  {index + 1}
                </span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
