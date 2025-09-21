import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Menu, Search, User } from "lucide-react";
import kifLogo from "@assets/B_1758455614771.png";

interface HeaderProps {
  user?: {
    name: string;
    avatar?: string;
    verified?: boolean;
  };
  onAuthClick?: () => void;
  onMenuClick?: () => void;
}

export default function Header({ user, onAuthClick, onMenuClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={onMenuClick}
              data-testid="button-menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <img src={kifLogo} alt="KIF" className="w-8 h-8" data-testid="logo-header" />
              <span className="font-semibold text-lg hidden sm:inline">KIF</span>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search notes, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-muted rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                data-testid="input-search"
              />
            </div>
          </div>

          {/* Navigation Links - Only show when logged in */}
          
            <div className="hidden lg:flex items-center gap-1">
              <Button variant="ghost" size="sm" asChild>
                <a href="/feed" data-testid="nav-feed">Feed</a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="/notes" data-testid="nav-notes">Notes</a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="/videos" data-testid="nav-videos">Videos</a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="/community" data-testid="nav-community">Community</a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="/discounts" data-testid="nav-discounts">Discounts</a>
              </Button>
            </div>
          

          
        </div>
      </div>
    </header>
  );
}