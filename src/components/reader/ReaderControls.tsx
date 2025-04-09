
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Settings, Bookmark, Share } from "lucide-react";

interface ReaderControlsProps {
  bookTitle: string;
  bookId: string;
  showControls: boolean;
}

const ReaderControls = ({ bookTitle, bookId, showControls }: ReaderControlsProps) => {
  const navigate = useNavigate();

  return (
    <>
      {showControls && (
        <div className="fixed top-0 left-0 w-full bg-background/95 backdrop-blur-sm z-40 transition-all duration-300 py-3 px-4 border-b border-border">
          <div className="flex justify-between items-center max-w-screen-md mx-auto">
            <button 
              className="flex items-center text-muted-foreground"
              onClick={() => navigate(`/book/${bookId}`)}
            >
              <ChevronLeft size={20} />
              <span className="ml-1 line-clamp-1 text-sm font-medium">{bookTitle}</span>
            </button>
            <div className="flex items-center space-x-3">
              <button className="text-muted-foreground p-1.5 hover:text-foreground transition-colors">
                <Bookmark size={18} />
              </button>
              <button className="text-muted-foreground p-1.5 hover:text-foreground transition-colors">
                <Share size={18} />
              </button>
              <button className="text-muted-foreground p-1.5 hover:text-foreground transition-colors">
                <Settings size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReaderControls;
