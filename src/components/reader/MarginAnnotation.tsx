
import { useState } from "react";
import { User } from "@/types";
import UserAvatar from "@/components/UserAvatar";
import { CURRENT_USER } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { MessageCircle, ThumbsUp } from "lucide-react";

export interface Annotation {
  id: string;
  user: User;
  text: string;
  timestamp: string;
  likes: number;
  replies: number;
  isLiked?: boolean;
}

interface MarginAnnotationProps {
  annotation: Annotation;
  highlightColor?: string;
  onReply?: (annotation: Annotation) => void;
  onLike?: (annotation: Annotation) => void;
}

const MarginAnnotation = ({ 
  annotation,
  highlightColor = "bg-yellow-200",
  onReply,
  onLike
}: MarginAnnotationProps) => {
  const [isLiked, setIsLiked] = useState(annotation.isLiked || false);
  const [likeCount, setLikeCount] = useState(annotation.likes || 0);
  
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    if (onLike) {
      onLike(annotation);
    }
  };

  return (
    <div className="margin-annotation group relative mb-4">
      <div className={`absolute left-0 top-0 w-1 h-full ${highlightColor} rounded-sm`}></div>
      <div className="pl-3">
        <div className="flex items-center mb-1">
          <UserAvatar user={annotation.user} size="xs" />
          <div className="text-xs font-medium ml-1.5">{annotation.user.name}</div>
          <div className="text-xs text-muted-foreground ml-auto">{annotation.timestamp}</div>
        </div>
        <div className="text-sm mb-1.5">{annotation.text}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          <button 
            className={`flex items-center mr-4 ${isLiked ? 'text-app-blue-500' : ''}`}
            onClick={handleLike}
          >
            <ThumbsUp size={12} className="mr-1" />
            <span>{likeCount}</span>
          </button>
          {onReply && (
            <button 
              className="flex items-center"
              onClick={() => onReply(annotation)}
            >
              <MessageCircle size={12} className="mr-1" />
              <span>Reply{annotation.replies > 0 ? ` (${annotation.replies})` : ''}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarginAnnotation;
