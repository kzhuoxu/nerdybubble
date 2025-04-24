
import { Book, BookClub } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import BookClubCard from "@/components/BookClubCard";

interface ClubsTabProps {
  bookClubs: BookClub[];
}

const ClubsTab = ({ bookClubs }: ClubsTabProps) => {
  return (
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
  );
};

export default ClubsTab;
