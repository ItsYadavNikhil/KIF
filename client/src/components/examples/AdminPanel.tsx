//todo: remove mock functionality
import AdminPanel from '../AdminPanel';

export default function AdminPanelExample() {
  const mockPendingStudents = [
    {
      id: "1",
      name: "Sarah Johnson",
      mobile: "+1-555-0123",
      registrationDate: "2 hours ago",
      studentIdImage: "/api/placeholder/300/200",
      university: "State University"
    },
    {
      id: "2", 
      name: "Mike Chen",
      mobile: "+1-555-0456",
      registrationDate: "1 day ago",
      studentIdImage: "/api/placeholder/300/200",
      university: "Tech Institute"
    },
    {
      id: "3",
      name: "Emily Rodriguez", 
      mobile: "+1-555-0789",
      registrationDate: "3 days ago",
      studentIdImage: "/api/placeholder/300/200",
      university: "Community College"
    }
  ];

  const mockPendingNotes = [
    {
      id: "1",
      title: "Advanced Calculus: Integration Techniques",
      subject: "Mathematics",
      author: "Alex Kumar",
      uploadDate: "1 hour ago",
      fileSize: "3.2 MB",
      pages: 24,
      description: "Comprehensive notes covering advanced integration techniques including integration by parts, partial fractions, and trigonometric substitutions."
    },
    {
      id: "2",
      title: "Quantum Physics: Wave-Particle Duality",
      subject: "Physics", 
      author: "Lisa Park",
      uploadDate: "4 hours ago",
      fileSize: "2.8 MB",
      pages: 18,
      description: "Detailed explanation of wave-particle duality with examples and mathematical derivations."
    },
    {
      id: "3",
      title: "Organic Chemistry Reaction Mechanisms",
      subject: "Chemistry",
      author: "David Wilson",
      uploadDate: "1 day ago", 
      fileSize: "4.1 MB",
      pages: 32,
      description: "Step-by-step reaction mechanisms for major organic chemistry reactions with electron pushing diagrams."
    }
  ];

  return (
    <AdminPanel 
      pendingStudents={mockPendingStudents}
      pendingNotes={mockPendingNotes}
      onApproveStudent={(id) => console.log('Approve student:', id)}
      onRejectStudent={(id) => console.log('Reject student:', id)}
      onApproveNote={(id) => console.log('Approve note:', id)}
      onRejectNote={(id) => console.log('Reject note:', id)}
      onPreviewNote={(id) => console.log('Preview note:', id)}
    />
  );
}