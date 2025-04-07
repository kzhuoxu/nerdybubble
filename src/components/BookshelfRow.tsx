
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import BookCard from "@/components/BookCard";
import { Book } from "@/types";

interface BookshelfRowProps {
  title: string;
  books: Book[];
  size?: "small" | "medium" | "large";
  action?: React.ReactNode;
}

const BookshelfRow = ({ title, books, size = "medium", action }: BookshelfRowProps) => {
  if (!books || books.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-medium">{title}</h2>
        {action}
      </div>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4 pb-2">
          {books.map((book) => (
            <div key={book.id} className="shrink-0">
              <BookCard book={book} size={size} />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default BookshelfRow;
