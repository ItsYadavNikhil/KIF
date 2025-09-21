import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, Eye, Filter, Star, Calendar } from "lucide-react";

interface Note {
  id: string;
  title: string;
  subject: string;
  author: string;
  uploadDate: string;
  downloads: number;
  rating: number;
  pages: number;
  fileSize: string;
  thumbnail?: string;
}

interface NotesGalleryProps {
  notes?: Note[];
  onDownload?: (noteId: string) => void;
  onPreview?: (noteId: string) => void;
}

const subjects = [
  "All Subjects",
  "Mathematics", 
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Engineering",
  "Economics",
  "Literature",
  "History"
];

export default function NotesGallery({ notes = [], onDownload, onPreview }: NotesGalleryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [sortBy, setSortBy] = useState("latest");

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === "All Subjects" || note.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    switch (sortBy) {
      case "downloads":
        return b.downloads - a.downloads;
      case "rating":
        return b.rating - a.rating;
      case "title":
        return a.title.localeCompare(b.title);
      default: // latest
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
    }
  });

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
        <h1 className="text-3xl font-bold mb-2" data-testid="title-gallery">Study Notes Gallery</h1>
        <p className="text-muted-foreground">Discover and download study materials shared by verified students</p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notes, subjects, authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                  data-testid="input-search-notes"
                />
              </div>
            </div>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-48" data-testid="select-subject-filter">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-36" data-testid="select-sort">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="downloads">Most Downloaded</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="title">Title A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-muted-foreground" data-testid="results-count">
          {sortedNotes.length} notes found
        </p>
      </div>

      {/* Notes Grid */}
      {sortedNotes.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="font-medium mb-2">No notes found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedNotes.map((note) => (
            <Card key={note.id} className="hover-elevate" data-testid={`note-card-${note.id}`}>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2" data-testid={`note-title-${note.id}`}>
                      {note.title}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      by {note.author}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" data-testid={`note-subject-${note.id}`}>
                    {note.subject}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Rating and Stats */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      {renderStars(note.rating)}
                      <span data-testid={`note-rating-${note.id}`}>({note.rating})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      <span data-testid={`note-downloads-${note.id}`}>{note.downloads}</span>
                    </div>
                  </div>

                  {/* File Info */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{note.pages} pages</span>
                    <span>{note.fileSize}</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{note.uploadDate}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => onPreview?.(note.id)}
                      data-testid={`button-preview-${note.id}`}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => onDownload?.(note.id)}
                      data-testid={`button-download-${note.id}`}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}