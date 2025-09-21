import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  MessageSquare, 
  UserPlus, 
  Search, 
  BookOpen, 
  Award, 
  MapPin,
  Calendar,
  TrendingUp,
  Hash
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  avatar?: string;
  university: string;
  major: string;
  year: string;
  subjects: string[];
  studyGroups: number;
  notesShared: number;
  isFollowing?: boolean;
  location: string;
}

interface StudyGroup {
  id: string;
  name: string;
  subject: string;
  description: string;
  members: number;
  maxMembers: number;
  creator: string;
  createdAt: string;
  nextMeeting?: string;
  isJoined?: boolean;
  tags: string[];
}

interface CommunityProps {
  students?: Student[];
  studyGroups?: StudyGroup[];
  onFollowStudent?: (studentId: string) => void;
  onJoinGroup?: (groupId: string) => void;
  onCreateGroup?: (groupData: any) => void;
  onMessageStudent?: (studentId: string) => void;
}

export default function Community({
  students = [],
  studyGroups = [],
  onFollowStudent,
  onJoinGroup,
  onCreateGroup,
  onMessageStudent
}: CommunityProps) {
  const [activeTab, setActiveTab] = useState("students");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: "",
    subject: "",
    description: "",
    maxMembers: 10
  });

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.major.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.subjects.some(subject => subject.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredGroups = studyGroups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCreateGroup = () => {
    if (newGroup.name && newGroup.subject) {
      onCreateGroup?.(newGroup);
      setNewGroup({ name: "", subject: "", description: "", maxMembers: 10 });
      setShowCreateGroup(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" data-testid="title-community">Student Community</h1>
        <p className="text-muted-foreground">Connect with fellow students and join study groups</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2" data-testid="tabs-community">
          <TabsTrigger value="students" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Students ({students.length})
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Study Groups ({studyGroups.length})
          </TabsTrigger>
        </TabsList>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={activeTab === "students" ? "Search students by name, university, or subject..." : "Search study groups..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
                data-testid="input-search-community"
              />
            </div>
          </CardContent>
        </Card>

        {/* Students Tab */}
        <TabsContent value="students">
          <div className="mb-4">
            <p className="text-muted-foreground" data-testid="students-count">
              {filteredStudents.length} students found
            </p>
          </div>

          {filteredStudents.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="font-medium mb-2">No students found</h3>
                <p className="text-muted-foreground">Try adjusting your search query</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudents.map((student) => (
                <Card key={student.id} className="hover-elevate" data-testid={`student-card-${student.id}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={student.avatar} alt={student.name} />
                        <AvatarFallback>
                          {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold" data-testid={`student-name-${student.id}`}>
                          {student.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {student.major} • {student.year}
                        </p>
                        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{student.university}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{student.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">{student.notesShared}</div>
                        <div className="text-xs text-muted-foreground">Notes Shared</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">{student.studyGroups}</div>
                        <div className="text-xs text-muted-foreground">Study Groups</div>
                      </div>
                    </div>

                    {/* Subjects */}
                    <div className="mb-4">
                      <div className="text-xs text-muted-foreground mb-2">Subjects</div>
                      <div className="flex flex-wrap gap-1">
                        {student.subjects.slice(0, 3).map((subject, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                        {student.subjects.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{student.subjects.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={student.isFollowing ? "secondary" : "default"}
                        className="flex-1"
                        onClick={() => onFollowStudent?.(student.id)}
                        data-testid={`button-follow-${student.id}`}
                      >
                        <UserPlus className="h-3 w-3 mr-1" />
                        {student.isFollowing ? "Following" : "Follow"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onMessageStudent?.(student.id)}
                        data-testid={`button-message-${student.id}`}
                      >
                        <MessageSquare className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Study Groups Tab */}
        <TabsContent value="groups">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-muted-foreground" data-testid="groups-count">
              {filteredGroups.length} study groups found
            </p>
            <Button
              onClick={() => setShowCreateGroup(!showCreateGroup)}
              data-testid="button-create-group"
            >
              Create Study Group
            </Button>
          </div>

          {/* Create Group Form */}
          {showCreateGroup && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Create New Study Group</CardTitle>
                <CardDescription>Start a study group and invite fellow students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Group Name</label>
                      <Input
                        placeholder="e.g., Calculus Study Group"
                        value={newGroup.name}
                        onChange={(e) => setNewGroup(prev => ({ ...prev, name: e.target.value }))}
                        data-testid="input-group-name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Subject</label>
                      <Input
                        placeholder="e.g., Mathematics"
                        value={newGroup.subject}
                        onChange={(e) => setNewGroup(prev => ({ ...prev, subject: e.target.value }))}
                        data-testid="input-group-subject"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Description</label>
                    <Textarea
                      placeholder="Describe what your study group will focus on..."
                      value={newGroup.description}
                      onChange={(e) => setNewGroup(prev => ({ ...prev, description: e.target.value }))}
                      data-testid="input-group-description"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      onClick={handleCreateGroup}
                      disabled={!newGroup.name || !newGroup.subject}
                      data-testid="button-submit-group"
                    >
                      Create Group
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setShowCreateGroup(false)}
                      data-testid="button-cancel-group"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Groups List */}
          {filteredGroups.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="font-medium mb-2">No study groups found</h3>
                <p className="text-muted-foreground">Try searching for different subjects or create a new group</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredGroups.map((group) => (
                <Card key={group.id} className="hover-elevate" data-testid={`group-card-${group.id}`}>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-semibold" data-testid={`group-name-${group.id}`}>
                          {group.name}
                        </h3>
                        <Badge variant="outline">{group.subject}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {group.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{group.members}/{group.maxMembers} members</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{group.createdAt}</span>
                        </div>
                      </div>
                    </div>

                    {group.nextMeeting && (
                      <div className="bg-muted/50 rounded-lg p-3 mb-4">
                        <div className="text-xs text-muted-foreground mb-1">Next Meeting</div>
                        <div className="text-sm font-medium">{group.nextMeeting}</div>
                      </div>
                    )}

                    {/* Tags */}
                    {group.tags.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {group.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              <Hash className="h-2 w-2 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="text-xs text-muted-foreground mb-4">
                      Created by {group.creator}
                    </div>

                    <Button
                      className="w-full"
                      variant={group.isJoined ? "secondary" : "default"}
                      onClick={() => onJoinGroup?.(group.id)}
                      disabled={group.members >= group.maxMembers && !group.isJoined}
                      data-testid={`button-join-${group.id}`}
                    >
                      {group.isJoined ? "Joined" : group.members >= group.maxMembers ? "Group Full" : "Join Group"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}