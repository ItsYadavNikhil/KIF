import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, FileText, Play, Star, Download, Eye, ExternalLink } from "lucide-react";

interface RecentNote {
  id: string;
  title: string;
  subject: string;
  author: string;
  searchedAt: string;
  rating: number;
  downloads: number;
}

interface RecentVideo {
  id: string;
  title: string;
  channel: string;
  watchedAt: string;
  duration: string;
  topic: string;
}

interface FeedProps {
  recentNotes?: RecentNote[];
  recentVideos?: RecentVideo[];
  onNoteClick?: (noteId: string) => void;
  onVideoClick?: (videoId: string) => void;
}

export default function Feed({ 
  recentNotes = [], 
  recentVideos = [], 
  onNoteClick, 
  onVideoClick 
}: FeedProps) {
  const [activeTab, setActiveTab] = useState("notes");

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" data-testid="title-feed">Your Activity Feed</h1>
        <p className="text-muted-foreground">Keep track of your recent searches and study activities</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2" data-testid="tabs-feed">
          <TabsTrigger value="notes" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Recent Notes ({recentNotes.length})
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Play className="h-4 w-4" />
            Recent Videos ({recentVideos.length})
          </TabsTrigger>
        </TabsList>

        {/* Recent Notes */}
        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Recently Searched Notes
              </CardTitle>
              <CardDescription>
                Notes you've recently viewed or searched for
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentNotes.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="font-medium mb-2">No recent activity</h3>
                  <p className="text-muted-foreground">Start searching for study notes to see your activity here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentNotes.map((note) => (
                    <Card key={note.id} className="hover-elevate cursor-pointer" data-testid={`recent-note-${note.id}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 
                              className="font-medium mb-1 hover:text-primary transition-colors"
                              onClick={() => onNoteClick?.(note.id)}
                              data-testid={`recent-note-title-${note.id}`}
                            >
                              {note.title}
                            </h3>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                              <Badge variant="outline">{note.subject}</Badge>
                              <span>by {note.author}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                {renderStars(note.rating)}
                                <span>({note.rating})</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Download className="h-3 w-3" />
                                <span>{note.downloads}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{note.searchedAt}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onNoteClick?.(note.id)}
                              data-testid={`button-view-recent-${note.id}`}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recent Videos */}
        <TabsContent value="videos">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Recently Watched Videos
              </CardTitle>
              <CardDescription>
                Educational videos you've recently played or searched for
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentVideos.length === 0 ? (
                <div className="text-center py-12">
                  <Play className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="font-medium mb-2">No recent videos</h3>
                  <p className="text-muted-foreground">Start watching educational videos to see your history here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentVideos.map((video) => (
                    <Card key={video.id} className="hover-elevate cursor-pointer" data-testid={`recent-video-${video.id}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex gap-4">
                            <div className="flex-shrink-0">
                              <div 
                                className="w-24 h-16 bg-gradient-to-br from-primary/20 to-primary/40 rounded flex items-center justify-center cursor-pointer group"
                                onClick={() => onVideoClick?.(video.id)}
                              >
                                <Play className="h-6 w-6 text-primary" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <h3 
                                className="font-medium mb-1 line-clamp-2 hover:text-primary transition-colors cursor-pointer"
                                onClick={() => onVideoClick?.(video.id)}
                                data-testid={`recent-video-title-${video.id}`}
                              >
                                {video.title}
                              </h3>
                              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                                <span>{video.channel}</span>
                                <Badge variant="outline">{video.topic}</Badge>
                              </div>
                              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <span>Duration: {video.duration}</span>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>Watched {video.watchedAt}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onVideoClick?.(video.id)}
                              data-testid={`button-play-recent-${video.id}`}
                            >
                              <Play className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => console.log('Open YouTube')}
                              data-testid={`button-youtube-recent-${video.id}`}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}