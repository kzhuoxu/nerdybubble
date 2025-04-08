import { ScrollArea } from "@/components/ui/scroll-area";
import { CURRENT_USER } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { BookOpen, Settings, Users, UserCheck, Target, Medal } from "lucide-react";
import BookshelfRow from "@/components/BookshelfRow";
const Profile = () => {
  const {
    name,
    avatar,
    bio,
    booksRead,
    readingGoal,
    readingStreak,
    currentlyReading,
    bookshelf,
    friends
  } = CURRENT_USER;
  return <div className="container px-4 pt-20 pb-24">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center">
          <Avatar className="h-20 w-20">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>
              {name.split(" ").map(n => n[0]).join("").toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <h1 className="text-2xl font-semibold">{name}</h1>
            <p className="text-muted-foreground">{bio}</p>
          </div>
        </div>
        <button className="p-2 text-muted-foreground">
          <Settings size={20} />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="text-center p-2 bg-muted/30 rounded-lg">
          <span className="text-xl font-semibold block">{booksRead}</span>
          <span className="text-xs text-muted-foreground">Books Read</span>
        </div>
        <div className="text-center p-2 bg-muted/30 rounded-lg">
          <span className="text-xl font-semibold block">{readingStreak}</span>
          <span className="text-xs text-muted-foreground">Day Streak</span>
        </div>
        <div className="text-center p-2 bg-muted/30 rounded-lg">
          <span className="text-xl font-semibold block">{friends.length}</span>
          <span className="text-xs text-muted-foreground">Friends</span>
        </div>
      </div>

      <Tabs defaultValue="reading">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="reading" className="flex-1 gap-1">
            <BookOpen size={16} />
            <span>Reading</span>
          </TabsTrigger>
          <TabsTrigger value="friends" className="flex-1 gap-1">
            <Users size={16} />
            <span>Friends</span>
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex-1 gap-1">
            <Medal size={16} />
            <span>Achievements</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="reading" className="space-y-6">
          <div className="bg-primary/10 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Reading Goal</h3>
              <Target size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-sm">
                <span className="font-semibold">{booksRead}</span> of {readingGoal} books in 2025
              </p>
              <div className="w-full h-2 bg-muted rounded-full mt-2">
                <div className="h-2 bg-primary rounded-full" style={{
                width: `${booksRead / readingGoal! * 100}%`
              }}></div>
              </div>
            </div>
          </div>

          {currentlyReading && currentlyReading.length > 0 && <section>
              <h2 className="text-xl font-medium mb-3">Currently Reading</h2>
              <BookshelfRow title="" books={currentlyReading} size="medium" />
            </section>}

          {bookshelf && bookshelf.length > 0 && <section>
              <h2 className="text-xl font-medium mb-3">My Bookshelf</h2>
              <ScrollArea className="h-[400px] pr-4">
                <div className="grid grid-cols-2 gap-4">
                  {bookshelf.map(book => <div key={book.id} className="row-span-1">
                      <BookshelfRow title="" books={[book]} size="small" />
                    </div>)}
                </div>
              </ScrollArea>
            </section>}
        </TabsContent>

        <TabsContent value="friends">
          <div className="space-y-4">
            <div className="bg-muted/30 p-3 rounded-lg flex justify-between items-center">
              <div className="flex items-center">
                <UserCheck size={18} className="text-primary mr-2" />
                <h3 className="font-medium">{friends.length} Reading Friends</h3>
              </div>
              <button className="text-xs text-primary">Manage</button>
            </div>
            <p className="text-sm text-muted-foreground">
              Connect with more readers to see what they're highlighting and discussing.
            </p>
            <button className="w-full py-3 text-center text-sm text-primary border border-dashed border-primary rounded-md">
              + Find Friends
            </button>
          </div>
        </TabsContent>

        <TabsContent value="achievements">
          <div className="space-y-6">
            <div className="bg-yellow-500/10 rounded-lg p-4">
              <h3 className="font-medium mb-2 flex items-center">
                <Medal size={18} className="text-yellow-500 mr-2" />
                Reading Achievements
              </h3>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-background rounded-lg p-3 text-center border border-border">
                  <div className="bg-yellow-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2">
                    <Medal size={24} className="text-yellow-600" />
                  </div>
                  <h4 className="text-sm font-medium">Bookworm</h4>
                  <p className="text-xs text-muted-foreground">Finished 10 books</p>
                </div>
                
                <div className="bg-background rounded-lg p-3 text-center border border-border">
                  <div className="bg-app-blue-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2">
                    <BookOpen size={24} className="text-app-blue-600" />
                  </div>
                  <h4 className="text-sm font-medium">Night Owl</h4>
                  <p className="text-xs text-muted-foreground">Read after midnight</p>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="font-medium mb-2">Next Achievements</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium">Genre Explorer</h4>
                    <p className="text-xs text-muted-foreground">Read books from 5 different genres</p>
                  </div>
                  <div className="text-xs font-medium">3/5</div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium">Streak Master</h4>
                    <p className="text-xs text-muted-foreground">Maintain a 30-day reading streak</p>
                  </div>
                  <div className="text-xs font-medium">{readingStreak}/30</div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>;
};
export default Profile;