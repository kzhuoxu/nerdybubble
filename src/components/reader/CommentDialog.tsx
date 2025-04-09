
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Comment } from "@/types";
import UserAvatar from "@/components/UserAvatar";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { MOCK_USERS, CURRENT_USER } from "@/data/mockData";

interface CommentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedText: string;
  comments: Comment[];
  onAddComment: (text: string) => void;
  onLikeComment: (commentId: string) => void;
}

const CommentDialog = ({
  isOpen,
  onClose,
  selectedText,
  comments,
  onAddComment,
  onLikeComment,
}: CommentDialogProps) => {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Comments</DialogTitle>
        </DialogHeader>
        
        {selectedText && (
          <div className="bg-muted p-3 rounded-md mb-4">
            <p className="text-sm italic">"{selectedText}"</p>
          </div>
        )}
        
        <div className="mb-4 max-h-64 overflow-y-auto space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => {
              const user = MOCK_USERS.find(u => u.id === comment.userId);
              return (
                <div key={comment.id} className="flex space-x-3">
                  <UserAvatar user={user!} size="sm" />
                  <div className="flex-1">
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-sm">{user?.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm">{comment.text}</p>
                    </div>
                    <div className="flex items-center mt-1 space-x-4">
                      <button 
                        className="text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground"
                        onClick={() => onLikeComment(comment.id)}
                      >
                        <ThumbsUp size={12} className={comment.likes > 0 ? "text-primary" : ""} />
                        <span>{comment.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              <MessageCircle className="mx-auto h-8 w-8 mb-2 opacity-50" />
              <p>No comments yet</p>
              <p className="text-sm">Be the first to comment on this highlight</p>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <Textarea
            placeholder="Add your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="resize-none min-h-[80px]"
          />
          <div className="flex justify-end">
            <Button onClick={handleAddComment}>Comment</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
