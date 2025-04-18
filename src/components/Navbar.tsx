
import { Home, Users, User, Search, BookOpen, Library } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CURRENT_USER } from "@/data/mockData";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle reader navigation - go to the first book the user is currently reading or the first book
  const handleReaderNavigation = () => {
    if (CURRENT_USER.currentlyReading && CURRENT_USER.currentlyReading.length > 0) {
      navigate(`/book/${CURRENT_USER.currentlyReading[0].id}`);
    } else if (CURRENT_USER.bookshelf && CURRENT_USER.bookshelf.length > 0) {
      navigate(`/book/${CURRENT_USER.bookshelf[0].id}`);
    }
  };
  
  return <>
      {/* Top Space for iOS status bar */}
      <div className="h-safe-top bg-background" />
      
      {/* Top Search Bar - Now scrolls with content */}
      <div className={cn("w-full z-40 transition-all duration-200 px-4 py-2", isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent")}>
        <div className="flex items-center justify-between max-w-screen-lg mx-auto">
          <h1 className="text-xl font-semibold">Nerdy Bubble</h1>
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors" onClick={() => {/* Open search modal */}}>
            <Search size={20} />
          </button>
        </div>
      </div>
      
      {/* Bottom Navigation Bar for Mobile */}
      <nav className="fixed bottom-0 left-0 w-full bg-background border-t border-border z-50 px-2 pb-safe-bottom">
        <div className="flex justify-around items-center max-w-screen-lg mx-auto">
          <NavItem to="/" label="Home" icon={<Home size={22} />} isActive={location.pathname === '/'} />
          <NavItem to="/social" label="Social" icon={<Users size={22} />} isActive={location.pathname === '/social'} />
          <NavButton label="Reader" icon={<BookOpen size={22} />} isActive={false} onClick={handleReaderNavigation} />
          <NavItem to="/book-clubs" label="Clubs" icon={<Library size={22} />} isActive={location.pathname === '/book-clubs' || location.pathname.startsWith('/book-club/')} />
          <NavItem to="/profile" label="Profile" icon={<User size={22} />} isActive={location.pathname === '/profile'} />
        </div>
      </nav>
      
      {/* Bottom Space (to compensate for the fixed bottom navbar) */}
      
    </>;
};

interface NavItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
}
const NavItem = ({
  to,
  label,
  icon,
  isActive
}: NavItemProps) => {
  return <Link to={to} className={cn("flex flex-col items-center justify-center p-2 rounded-md transition-colors", isActive ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </Link>;
};

interface NavButtonProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}
const NavButton = ({
  label,
  icon,
  isActive,
  onClick
}: NavButtonProps) => {
  return <button onClick={onClick} className={cn("flex flex-col items-center justify-center p-2 rounded-md transition-colors", isActive ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>;
};

export default Navbar;
