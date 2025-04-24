
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CommentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedText: string;
  onAddComment: (text: string) => void;
}

const CommentDialog = ({
  isOpen,
  onClose,
  selectedText,
  onAddComment,
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
