import { Button } from "@/components/ui/button";
import BookshelfRow from "@/components/BookshelfRow";
import { MOCK_BOOKS, MOCK_BOOK_CLUBS, CURRENT_USER } from "@/data/mockData";
import { RefreshCw } from "lucide-react";
import BookClubCard from "@/components/BookClubCard";
const Home = () => {
  const featuredBooks = MOCK_BOOKS.slice(0, 3);
  const recommendedBooks = [...MOCK_BOOKS].sort(() => 0.5 - Math.random()).slice(0, 4);
  return <div className="container px-4 pt-20 pb-24 mx-0 py-[20px]">
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">For You</h2>
          <Button variant="outline" size="sm" className="gap-1">
            <RefreshCw size={16} />
            <span>New Batch</span>
          </Button>
        </div>
        <BookshelfRow title="Featured Books" books={featuredBooks} size="large" />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium mb-3">Continue Reading</h2>
        {CURRENT_USER.currentlyReading && <BookshelfRow title="" books={CURRENT_USER.currentlyReading} size="medium" />}
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium mb-3">Recommended for You</h2>
        <BookshelfRow title="" books={recommendedBooks} size="medium" />
      </section>

      <section>
        <h2 className="text-xl font-medium mb-3">Book Clubs</h2>
        <div className="grid grid-cols-1 gap-4">
          {MOCK_BOOK_CLUBS.map(club => <BookClubCard key={club.id} bookClub={club} />)}
        </div>
      </section>
    </div>;
};
export default Home;