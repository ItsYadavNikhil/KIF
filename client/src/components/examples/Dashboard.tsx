//todo: remove mock functionality
import Dashboard from '../Dashboard';

export default function DashboardExample() {
  const mockUser = {
    name: "Alex Student",
    verified: true,
    status: "approved" as const
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
    },
    {
      id: "3",
      title: "Chemistry Organic Compounds",
      subject: "Chemistry", 
      status: "rejected" as const,
      uploadDate: "3 days ago"
    }
  ];

  return (
    <Dashboard 
      user={mockUser}
      stats={mockStats}
      recentNotes={mockRecentNotes}
      onUpload={() => console.log('Upload clicked')}
      onViewNote={(id) => console.log('View note clicked:', id)}
    />
  );
}