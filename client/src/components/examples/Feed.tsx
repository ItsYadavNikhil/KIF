//todo: remove mock functionality
import Feed from '../Feed';

export default function FeedExample() {
  const mockRecentNotes = [
    {
      id: "1",
      title: "Calculus: Limits and Continuity - Complete Study Guide", 
      subject: "Mathematics",
      author: "Sarah Chen",
      searchedAt: "2 hours ago",
      rating: 4.8,
      downloads: 1245
    },
    {
      id: "2",
      title: "Physics: Laws of Motion and Forces",
      subject: "Physics",
      author: "Mike Rodriguez", 
      searchedAt: "1 day ago",
      rating: 4.6,
      downloads: 892
    },
    {
      id: "3",
      title: "Data Structures and Algorithms Notes",
      subject: "Computer Science",
      author: "Alex Kumar",
      searchedAt: "3 days ago", 
      rating: 4.7,
      downloads: 1423
    }
  ];

  const mockRecentVideos = [
    {
      id: "1",
      title: "Calculus - Complete Tutorial for Beginners",
      channel: "EduChannel Pro",
      watchedAt: "1 hour ago",
      duration: "25:43",
      topic: "Mathematics"
    },
    {
      id: "2",
      title: "Advanced Physics Concepts Explained", 
      channel: "Study Masters",
      watchedAt: "Yesterday",
      duration: "18:32",
      topic: "Physics"
    },
    {
      id: "3",
      title: "Quick Review: Data Structures in 10 Minutes",
      channel: "Fast Learning",
      watchedAt: "2 days ago",
      duration: "10:28", 
      topic: "Computer Science"
    }
  ];

  return (
    <Feed 
      recentNotes={mockRecentNotes}
      recentVideos={mockRecentVideos}
      onNoteClick={(id) => console.log('View recent note:', id)}
      onVideoClick={(id) => console.log('Play recent video:', id)}
    />
  );
}