
import { BookClub } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CalendarIcon, Users } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { MOCK_BOOKS } from "@/data/mockData";

interface BookClubCardProps {
  bookClub: BookClub;
}

const BookClubCard = ({ bookClub }: BookClubCardProps) => {
  const { id, name, bookId, description, members, schedule } = bookClub;
  const nextEvent = schedule.length > 0 ? schedule[0] : null;
  const book = MOCK_BOOKS.find(b => b.id === bookId);

  return (
    <Link to={`/book-club/${id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">
                Reading: {book?.title}
              </p>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Users size={16} className="mr-1" />
              <span className="text-xs">{members.length}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-sm line-clamp-2 mb-2">{description}</p>
          {nextEvent && (
            <div className="flex items-center text-sm text-muted-foreground mt-2">
              <CalendarIcon size={14} className="mr-1" />
              <span className="text-xs">
                Next: {nextEvent.title} • {format(new Date(nextEvent.date), "MMM d, h:mm a")}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default BookClubCard;
