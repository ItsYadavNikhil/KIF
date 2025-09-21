import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Play, Clock, Eye, ExternalLink } from "lucide-react";

interface YouTubeVideo {
  id: string;
  title: string;
  channel: string;
  duration: string;
  views: string;
  publishedAt: string;
  thumbnail: string;
  description: string;
  url: string;
}

interface YouTubeSearchProps {
  onVideoClick?: (videoId: string) => void;
  onExternalOpen?: (url: string) => void;
}

export default function YouTubeSearch({ onVideoClick, onExternalOpen }: YouTubeSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Mock YouTube search results
  const mockSearch = (query: string): YouTubeVideo[] => {
    if (!query.trim()) return [];
    
    return [
      {
        id: "1",
        title: `${query} - Complete Tutorial for Beginners`,
        channel: "EduChannel Pro",
        duration: "25:43",
        views: "1.2M",
        publishedAt: "2 months ago",
        thumbnail: "/api/placeholder/320/180",
        description: `Comprehensive tutorial covering all aspects of ${query}. Perfect for students and beginners looking to master the fundamentals.`,
        url: `https://youtube.com/watch?v=example1`
      },
      {
        id: "2", 
        title: `Advanced ${query} Concepts Explained`,
        channel: "Study Masters",
        duration: "18:32",
        views: "856K",
        publishedAt: "3 weeks ago", 
        thumbnail: "/api/placeholder/320/180",
        description: `Deep dive into advanced concepts and problem-solving techniques in ${query}.`,
        url: `https://youtube.com/watch?v=example2`
      },
      {
        id: "3",
        title: `${query} Practice Problems & Solutions`,
        channel: "Academic Helper",
        duration: "32:15",
        views: "643K", 
        publishedAt: "1 month ago",
        thumbnail: "/api/placeholder/320/180",
        description: `Step-by-step solutions to common ${query} problems with detailed explanations.`,
        url: `https://youtube.com/watch?v=example3`
      },
      {
        id: "4",
        title: `Quick Review: ${query} in 10 Minutes`,
        channel: "Fast Learning",
        duration: "10:28",
        views: "2.1M",
        publishedAt: "1 week ago",
        thumbnail: "/api/placeholder/320/180", 
        description: `Rapid overview of key ${query} concepts for quick revision before exams.`,
        url: `https://youtube.com/watch?v=example4`
      },
      {
        id: "5",
        title: `Real-world Applications of ${query}`,
        channel: "Practical Science",
        duration: "22:11",
        views: "487K",
        publishedAt: "2 weeks ago",
        thumbnail: "/api/placeholder/320/180",
        description: `How ${query} is used in real-world scenarios and industry applications.`,
        url: `https://youtube.com/watch?v=example5`
      }
    ];
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setSearched(true);
    
    // Simulate API call
    setTimeout(() => {
      const results = mockSearch(searchQuery);
      setVideos(results);
      setLoading(false);
      console.log('YouTube search for:', searchQuery);
    }, 1000);
  };

  const formatDuration = (duration: string) => duration;
  const formatViews = (views: string) => views;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" data-testid="title-youtube">Educational Videos</h1>
        <p className="text-muted-foreground">Search for educational YouTube videos to supplement your studies</p>
      </div>

      {/* Search */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Search YouTube</CardTitle>
          <CardDescription>Find educational content related to your studies</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for educational videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                  data-testid="input-youtube-search"
                />
              </div>
            </div>
            <Button 
              type="submit" 
              disabled={loading || !searchQuery.trim()}
              data-testid="button-youtube-search"
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {searched && (
        <>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center gap-2 text-muted-foreground">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                Searching YouTube...
              </div>
            </div>
          ) : videos.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="font-medium mb-2">No videos found</h3>
                <p className="text-muted-foreground">Try searching for a different topic</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="mb-4">
                <p className="text-muted-foreground" data-testid="youtube-results-count">
                  Found {videos.length} educational videos for "{searchQuery}"
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {videos.map((video) => (
                  <Card key={video.id} className="hover-elevate" data-testid={`video-card-${video.id}`}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {/* Thumbnail */}
                        <div className="relative flex-shrink-0">
                          <div 
                            className="w-32 h-20 bg-muted rounded cursor-pointer group overflow-hidden"
                            onClick={() => onVideoClick?.(video.id)}
                            data-testid={`video-thumbnail-${video.id}`}
                          >
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/40 group-hover:from-primary/30 group-hover:to-primary/50 transition-colors">
                              <Play className="h-8 w-8 text-primary" />
                            </div>
                          </div>
                          <Badge 
                            variant="secondary" 
                            className="absolute bottom-1 right-1 text-xs bg-black/80 text-white"
                          >
                            {formatDuration(video.duration)}
                          </Badge>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 
                            className="font-medium line-clamp-2 cursor-pointer hover:text-primary transition-colors"
                            onClick={() => onVideoClick?.(video.id)}
                            data-testid={`video-title-${video.id}`}
                          >
                            {video.title}
                          </h3>
                          
                          <p className="text-sm text-muted-foreground mt-1" data-testid={`video-channel-${video.id}`}>
                            {video.channel}
                          </p>

                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              <span data-testid={`video-views-${video.id}`}>{formatViews(video.views)} views</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{video.publishedAt}</span>
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                            {video.description}
                          </p>

                          <div className="flex gap-2 mt-3">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onVideoClick?.(video.id)}
                              data-testid={`button-watch-${video.id}`}
                            >
                              <Play className="h-3 w-3 mr-1" />
                              Watch
                            </Button>
                            <Button
                              size="sm" 
                              variant="ghost"
                              onClick={() => onExternalOpen?.(video.url)}
                              data-testid={`button-external-${video.id}`}
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              YouTube
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </>
      )}

      {!searched && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="font-medium mb-2">Search for Educational Videos</h3>
            <p className="text-muted-foreground">Enter a topic to find relevant YouTube content</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}