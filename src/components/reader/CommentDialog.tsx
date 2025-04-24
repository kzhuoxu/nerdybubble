
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Comment } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface CommentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedText: string;
  onAddComment: (text: string) => void;
  comments?: Comment[];
  onLikeComment?: (commentId: string) => void;
}

const CommentDialog = ({
  isOpen,
  onClose,
  selectedText,
  onAddComment,
  comments = [],
  onLikeComment,
}: CommentDialogProps) => {
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
      toast({
        title: "Comment added",
        description: "Your comment was successfully added.",
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Add Comment</DialogTitle>
        </DialogHeader>
        
        {selectedText && (
          <div className="bg-muted p-3 rounded-md mb-4">
            <p className="text-sm italic">"{selectedText}"</p>
          </div>
        )}
        
        <div className="space-y-2">
          <Textarea
            placeholder="Add your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="resize-none min-h-[80px]"
            autoFocus
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
