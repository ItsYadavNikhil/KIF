//todo: remove mock functionality
import NotesGallery from '../NotesGallery';

export default function NotesGalleryExample() {
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
    },
    {
      id: "3",
      title: "Organic Chemistry: Reaction Mechanisms",
      subject: "Chemistry",
      author: "Emily Watson",
      uploadDate: "2024-01-10",
      downloads: 567,
      rating: 4.9,
      pages: 18,
      fileSize: "2.8 MB"
    },
    {
      id: "4",
      title: "Data Structures and Algorithms Notes",
      subject: "Computer Science",
      author: "Alex Kumar",
      uploadDate: "2024-01-08",
      downloads: 1423,
      rating: 4.7,
      pages: 35,
      fileSize: "4.2 MB"
    },
    {
      id: "5",
      title: "Cell Biology: Mitosis and Meiosis",
      subject: "Biology",
      author: "Lisa Park",
      uploadDate: "2024-01-05",
      downloads: 734,
      rating: 4.5,
      pages: 12,
      fileSize: "1.9 MB"
    },
    {
      id: "6",
      title: "Macroeconomics: Supply and Demand Analysis",
      subject: "Economics",
      author: "David Thompson",
      uploadDate: "2024-01-03",
      downloads: 456,
      rating: 4.3,
      pages: 28,
      fileSize: "3.1 MB"
    }
  ];

  return (
    <NotesGallery 
      notes={mockNotes}
      onDownload={(id) => console.log('Download note:', id)}
      onPreview={(id) => console.log('Preview note:', id)}
    />
  );
}