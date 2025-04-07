
import { Home, Users, User, Search, BookOpen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Space for iOS status bar */}
      <div className="h-10 bg-background" />
      
      {/* Bottom Navigation Bar for Mobile */}
      <nav className="fixed bottom-0 left-0 w-full bg-background border-t border-border z-50 px-2 py-1">
        <div className="flex justify-around items-center">
          <NavItem to="/" label="Home" icon={<Home size={24} />} isActive={location.pathname === '/'} />
          <NavItem to="/social" label="Social" icon={<Users size={24} />} isActive={location.pathname === '/social'} />
          <NavItem to="/reader" label="Reader" icon={<BookOpen size={24} />} isActive={location.pathname.includes('/reader')} />
          <NavItem to="/search" label="Search" icon={<Search size={24} />} isActive={location.pathname === '/search'} />
          <NavItem to="/profile" label="Profile" icon={<User size={24} />} isActive={location.pathname === '/profile'} />
        </div>
      </nav>

      {/* Top Search Bar */}
      <div className={cn(
        "fixed top-10 left-0 w-full z-40 transition-all duration-200 px-4 py-3",
        isScrolled ? "bg-background/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">BookBloom</h1>
          <button 
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => {/* Open search modal */}}
          >
            <Search size={20} />
          </button>
        </div>
      </div>
      
      {/* Bottom Space (to compensate for the fixed navbar) */}
      <div className="h-16" />
    </>
  );
};

interface NavItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
}

const NavItem = ({ to, label, icon, isActive }: NavItemProps) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex flex-col items-center justify-center p-2 rounded-md transition-colors",
        isActive 
          ? "text-primary" 
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
};

export default Navbar;
