import { useState, useEffect } from "react";
import { Switch, Route, Link, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

// Components
import SplashScreen from "./components/SplashScreen";
import Header from "./components/Header";
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard";
import NotesGallery from "./components/NotesGallery";
import UploadPDF from "./components/UploadPDF";
import YouTubeSearch from "./components/YouTubeSearch";
import AdminPanel from "./components/AdminPanel";
import AIChat from "./components/AIChat";

// Pages
function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold" data-testid="title-homepage">
              Knowledge is Free
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Share and discover study notes with verified students. Join the community where education is accessible to all.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild data-testid="button-get-started">
              <Link href="/auth">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild data-testid="button-browse-notes">
              <Link href="/notes">Browse Notes</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Verified Students</h3>
              <p className="text-muted-foreground">
                All contributors are verified students with authentic academic credentials
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Content</h3>
              <p className="text-muted-foreground">
                Every note is reviewed and approved by our team before publication
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Access</h3>
              <p className="text-muted-foreground">
                All study materials are completely free for registered students
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-muted-foreground mb-8">Page not found</p>
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
}

function Router() {
  const [user, setUser] = useState<any>(null);
  const [location] = useLocation();

  // Mock user data for demo
  const mockUser = {
    name: "Alex Student",
    verified: true,
    status: "approved" as const,
    avatar: "/api/placeholder/32/32"
  };

  const mockStats = {
    uploaded: 12,
    approved: 8,
    pending: 4
  };

  const mockRecentNotes = [
    {
      id: "1",
      title: "Calculus Chapter 5 - Derivatives",
      subject: "Mathematics",
      status: "approved" as const,
      uploadDate: "2 days ago"
    },
    {
      id: "2", 
      title: "Physics Laws of Motion Notes",
      subject: "Physics",
      status: "pending" as const,
      uploadDate: "1 week ago"
    }
  ];

  const mockNotes = [
    {
      id: "1",
      title: "Calculus: Limits and Continuity - Complete Study Guide",
      subject: "Mathematics",
      author: "Sarah Chen",
      uploadDate: "2024-01-15",
      downloads: 1245,
      rating: 4.8,
      pages: 15,
      fileSize: "2.1 MB"
    },
    {
      id: "2",
      title: "Physics: Laws of Motion and Forces",
      subject: "Physics", 
      author: "Mike Rodriguez",
      uploadDate: "2024-01-12",
      downloads: 892,
      rating: 4.6,
      pages: 22,
      fileSize: "3.4 MB"
    }
  ];

  const handleAuth = (data: any) => {
    console.log('Auth data:', data);
    setUser(mockUser); // Mock login
    window.location.href = '/dashboard';
  };

  const isAdminRoute = location.startsWith('/admin');

  return (
    <div className="min-h-screen bg-background">
      {!isAdminRoute && (
        <Header 
          user={user}
          onAuthClick={() => window.location.href = '/auth'}
        />
      )}
      
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/auth">
          <AuthForm onSubmit={handleAuth} />
        </Route>
        <Route path="/dashboard">
          <Dashboard
            user={mockUser}
            stats={mockStats}
            recentNotes={mockRecentNotes}
            onUpload={() => window.location.href = '/upload'}
            onViewNote={(id) => console.log('View note:', id)}
          />
        </Route>
        <Route path="/notes">
          <NotesGallery
            notes={mockNotes}
            onDownload={(id) => console.log('Download note:', id)}
            onPreview={(id) => console.log('Preview note:', id)}
          />
        </Route>
        <Route path="/upload">
          <UploadPDF
            onUpload={(data) => {
              console.log('Upload data:', data);
              window.location.href = '/dashboard';
            }}
            onCancel={() => window.location.href = '/dashboard'}
          />
        </Route>
        <Route path="/videos">
          <YouTubeSearch
            onVideoClick={(id) => console.log('Play video:', id)}
            onExternalOpen={(url) => window.open(url, '_blank')}
          />
        </Route>
        <Route path="/admin">
          <AdminPanel
            pendingStudents={[
              {
                id: "1",
                name: "Sarah Johnson",
                mobile: "+1-555-0123",
                registrationDate: "2 hours ago",
                studentIdImage: "/api/placeholder/300/200"
              }
            ]}
            pendingNotes={[
              {
                id: "1",
                title: "Advanced Calculus: Integration Techniques",
                subject: "Mathematics",
                author: "Alex Kumar",
                uploadDate: "1 hour ago",
                fileSize: "3.2 MB",
                pages: 24,
                description: "Comprehensive notes covering advanced integration techniques."
              }
            ]}
            onApproveStudent={(id) => console.log('Approve student:', id)}
            onRejectStudent={(id) => console.log('Reject student:', id)}
            onApproveNote={(id) => console.log('Approve note:', id)}
            onRejectNote={(id) => console.log('Reject note:', id)}
            onPreviewNote={(id) => console.log('Preview note:', id)}
          />
        </Route>
        <Route component={NotFound} />
      </Switch>

      {!isAdminRoute && <AIChat />}
    </div>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {showSplash && (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        )}
        {!showSplash && <Router />}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}