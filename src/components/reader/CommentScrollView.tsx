
import { useState } from "react";
import UserAvatar from "@/components/UserAvatar";
import { Comment } from "@/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, MessageCircle, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { MOCK_USERS, CURRENT_USER } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import SelectionBubble from "@/components/reader/SelectionBubble";

interface CommentScrollViewProps {
  isOpen: boolean;
  onClose: () => void;
  selectedText: string;
  comments: Comment[];
  onAddComment: (text: string) => void;
  onLikeComment: (commentId: string) => void;
}

const CommentScrollView = ({
  isOpen,
  onClose,
  selectedText,
  comments,
  onAddComment,
  onLikeComment,
}: CommentScrollViewProps) => {
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();
  
  if (!isOpen) return null;
  
  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };
  
  const handleUserClick = (userId: string) => {
    navigate(`/profile/${userId}`);
  };
  
  const handleCommentClick = (commentId: string) => {
    navigate(`/comment/${commentId}`);
  };
  
  // Calculate virtual position for SelectionBubble
  const bubblePosition = { x: window.innerWidth / 2, y: 100 };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex flex-col">
      <div className="relative flex-1 overflow-y-auto">
        {/* Header with quote and close button */}
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10 py-4 px-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Comments</h3>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          
          {/* Quote of selected text */}
          <div className="bg-muted p-3 rounded-md mb-2">
            <p className="text-sm italic">"{selectedText}"</p>
          </div>
          
          {/* Selection bubble for actions */}
          <div className="flex justify-center my-2">
            <SelectionBubble
              selectedText={selectedText}
              selectionPosition={bubblePosition}
              onOpenComments={() => {}}
            />
          </div>
        </div>
        
        {/* Comments list */}
        <div className="p-4">
          {comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map((comment) => {
                const user = MOCK_USERS.find(u => u.id === comment.userId);
                return (
                  <div key={comment.id} className="bg-card rounded-lg shadow-sm">
                    <div className="p-3">
                      {/* Comment header */}
                      <div className="flex items-center justify-between mb-2">
                        <div 
                          className="flex items-center space-x-2 cursor-pointer" 
                          onClick={() => handleUserClick(comment.userId)}
                        >
                          <UserAvatar user={user!} size="sm" />
                          <div>
                            <p className="font-medium text-sm">{user?.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="h-7 text-xs">
                          Follow
                        </Button>
                      </div>
                      
                      {/* Comment text */}
                      <div 
                        className="text-sm cursor-pointer" 
                        onClick={() => handleCommentClick(comment.id)}
                      >
                        <p>{comment.text}</p>
                      </div>
                      
                      {/* Comment actions */}
                      <div className="flex items-center mt-3 space-x-4 text-muted-foreground">
                        <button 
                          className="flex items-center gap-1 hover:text-foreground"
                          onClick={() => onLikeComment(comment.id)}
                        >
                          <ThumbsUp size={14} className={comment.likes > 0 ? "text-primary" : ""} />
                          <span className="text-xs">{comment.likes}</span>
                        </button>
                        <button 
                          className="flex items-center gap-1 hover:text-foreground"
                          onClick={() => handleCommentClick(comment.id)}
                        >
                          <MessageCircle size={14} />
                          <span className="text-xs">Reply</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <MessageCircle className="mx-auto h-8 w-8 mb-2 opacity-50" />
              <p>No comments yet</p>
              <p className="text-sm">Be the first to comment on this highlight</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Add comment input */}
      <div className="border-t border-border p-4 bg-background/95 backdrop-blur-sm">
        <div className="flex space-x-3">
          <UserAvatar user={CURRENT_USER} size="sm" />
          <div className="flex-1 space-y-2">
            <Textarea
              placeholder="Add your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="resize-none min-h-[60px]"
            />
            <div className="flex justify-end">
              <Button onClick={handleAddComment}>Comment</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentScrollView;
