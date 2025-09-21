//todo: remove mock functionality  
import Community from '../Community';

export default function CommunityExample() {
  const mockStudents = [
    {
      id: "1",
      name: "Sarah Chen",
      avatar: "/api/placeholder/32/32", 
      university: "Stanford University",
      major: "Computer Science",
      year: "Junior",
      subjects: ["Data Structures", "Algorithms", "Machine Learning", "Statistics"],
      studyGroups: 3,
      notesShared: 15,
      isFollowing: false,
      location: "Palo Alto, CA"
    },
    {
      id: "2",
      name: "Mike Rodriguez", 
      university: "MIT",
      major: "Mechanical Engineering", 
      year: "Senior",
      subjects: ["Thermodynamics", "Fluid Mechanics", "Control Systems"],
      studyGroups: 2,
      notesShared: 22,
      isFollowing: true,
      location: "Cambridge, MA"
    },
    {
      id: "3",
      name: "Emily Watson",
      university: "UC Berkeley",
      major: "Chemistry",
      year: "Sophomore", 
      subjects: ["Organic Chemistry", "Physical Chemistry", "Biochemistry"],
      studyGroups: 4,
      notesShared: 8,
      isFollowing: false,
      location: "Berkeley, CA"
    },
    {
      id: "4",
      name: "David Park",
      university: "Carnegie Mellon", 
      major: "Business Administration",
      year: "Senior",
      subjects: ["Finance", "Marketing", "Operations Management"],
      studyGroups: 1,
      notesShared: 12,
      isFollowing: false,
      location: "Pittsburgh, PA"
    }
  ];

  const mockStudyGroups = [
    {
      id: "1",
      name: "Advanced Calculus Study Group",
      subject: "Mathematics", 
      description: "Weekly meetings to solve challenging calculus problems and prepare for exams together.",
      members: 8,
      maxMembers: 12,
      creator: "Alex Kumar",
      createdAt: "2 weeks ago",
      nextMeeting: "Tomorrow 7:00 PM",
      isJoined: false,
      tags: ["calculus", "problem-solving", "weekly"]
    },
    {
      id: "2",
      name: "Physics Lab Partners",
      subject: "Physics",
      description: "Group for physics lab discussions, sharing lab reports, and collaborating on experiments.",
      members: 6, 
      maxMembers: 8,
      creator: "Lisa Park",
      createdAt: "1 month ago",
      nextMeeting: "Friday 3:00 PM",
      isJoined: true,
      tags: ["lab", "experiments", "collaboration"]
    },
    {
      id: "3", 
      name: "Programming Interview Prep",
      subject: "Computer Science",
      description: "Practice coding interviews, discuss algorithms, and help each other land tech internships.",
      members: 15,
      maxMembers: 20,
      creator: "Jordan Smith",
      createdAt: "3 weeks ago", 
      nextMeeting: "Sunday 6:00 PM",
      isJoined: false,
      tags: ["interviews", "coding", "algorithms", "internships"]
    },
    {
      id: "4",
      name: "Organic Chemistry Mastery", 
      subject: "Chemistry",
      description: "Tackle organic chemistry mechanisms, reactions, and synthesis problems together.",
      members: 10,
      maxMembers: 10,
      creator: "Maria Garcia",
      createdAt: "1 week ago",
      isJoined: false,
      tags: ["organic", "mechanisms", "reactions"]
    },
    {
      id: "5",
      name: "Business Case Study Group",
      subject: "Business", 
      description: "Analyze business cases, practice presentations, and prepare for consulting interviews.",
      members: 7,
      maxMembers: 12,
      creator: "Robert Chen",
      createdAt: "4 days ago",
      nextMeeting: "Wednesday 8:00 PM",
      isJoined: true,
      tags: ["case-studies", "consulting", "presentations"]
    }
  ];

  return (
    <Community 
      students={mockStudents}
      studyGroups={mockStudyGroups}
      onFollowStudent={(id) => console.log('Follow student:', id)}
      onJoinGroup={(id) => console.log('Join group:', id)}
      onCreateGroup={(data) => console.log('Create group:', data)}
      onMessageStudent={(id) => console.log('Message student:', id)}
    />
  );
}