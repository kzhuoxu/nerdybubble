
import { Highlight } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import UserAvatar from "@/components/UserAvatar";
import { MessageSquare, Heart } from "lucide-react";
import { MOCK_USERS, MOCK_BOOKS } from "@/data/mockData";
import { formatDistanceToNow } from "date-fns";

interface HighlightCardProps {
  highlight: Highlight;
  showBook?: boolean;
}

const HighlightCard = ({ highlight, showBook = false }: HighlightCardProps) => {
  const { userId, bookId, text, createdAt, likes, comments, aiImage } = highlight;
  const user = MOCK_USERS.find(u => u.id === userId);
  const book = MOCK_BOOKS.find(b => b.id === bookId);

  if (!user || !book) return null;

  return (
    <Card className="overflow-hidden mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            <UserAvatar user={user} size="sm" />
            <div className="ml-2">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
          {showBook && (
            <div className="text-xs text-muted-foreground">
              from <span className="font-medium">{book.title}</span>
            </div>
          )}
        </div>

        <blockquote className="border-l-2 border-primary pl-3 italic text-sm mb-3">
          {text}
        </blockquote>

        {aiImage && (
          <div className="mt-2 mb-3">
            <img 
              src={aiImage} 
              alt="AI generated visualization" 
              className="rounded-md w-full h-auto max-h-48 object-cover"
            />
            <p className="text-xs text-muted-foreground mt-1">AI visualization</p>
          </div>
        )}

        <div className="flex items-center justify-between mt-3">
          <button className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Heart size={16} className="mr-1" />
            <span>{likes}</span>
          </button>
          <button className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
            <MessageSquare size={16} className="mr-1" />
            <span>{comments?.length || 0}</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HighlightCard;
