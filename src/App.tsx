
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Social from "./pages/Social";
import Profile from "./pages/Profile";
import BookDetail from "./pages/BookDetail";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import BookClubs from "./pages/BookClubs";
import BookClubDetail from "./pages/BookClubDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background text-foreground">
          <Routes>
            <Route path="/" element={<>
              <Navbar />
              <Index />
            </>} />
            <Route path="/home" element={<>
              <Navbar />
              <Home />
            </>} />
            <Route path="/social" element={<>
              <Navbar />
              <Social />
            </>} />
            <Route path="/profile" element={<>
              <Navbar />
              <Profile />
            </>} />
            <Route path="/book/:id" element={<>
              <Navbar />
              <BookDetail />
            </>} />
            <Route path="/search" element={<>
              <Navbar />
              <Search />
            </>} />
            <Route path="/book-clubs" element={<>
              <Navbar />
              <BookClubs />
            </>} />
            <Route path="/book-club/:id" element={<>
              <Navbar />
              <BookClubDetail />
            </>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
