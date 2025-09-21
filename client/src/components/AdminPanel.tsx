import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, XCircle, Clock, User, FileText, Eye, Download } from "lucide-react";

interface PendingStudent {
  id: string;
  name: string;
  mobile: string;
  registrationDate: string;
  studentIdImage: string;
  university?: string;
}

interface PendingNote {
  id: string;
  title: string;
  subject: string;
  author: string;
  uploadDate: string;
  fileSize: string;
  pages: number;
  description: string;
}

interface AdminPanelProps {
  pendingStudents?: PendingStudent[];
  pendingNotes?: PendingNote[];
  onApproveStudent?: (studentId: string) => void;
  onRejectStudent?: (studentId: string) => void;
  onApproveNote?: (noteId: string) => void;
  onRejectNote?: (noteId: string) => void;
  onPreviewNote?: (noteId: string) => void;
}

export default function AdminPanel({
  pendingStudents = [],
  pendingNotes = [],
  onApproveStudent,
  onRejectStudent,
  onApproveNote,
  onRejectNote,
  onPreviewNote
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState("students");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" data-testid="title-admin">Admin Panel</h1>
        <p className="text-muted-foreground">Review and approve student registrations and study notes</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2" data-testid="tabs-admin">
          <TabsTrigger value="students" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Student Verification ({pendingStudents.length})
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Note Approval ({pendingNotes.length})
          </TabsTrigger>
        </TabsList>

        {/* Student Verification */}
        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Pending Student Verifications
              </CardTitle>
              <CardDescription>
                Review student ID cards and approve or reject registrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pendingStudents.length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500 opacity-50" />
                  <h3 className="font-medium mb-2">All caught up!</h3>
                  <p className="text-muted-foreground">No pending student verifications</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {pendingStudents.map((student) => (
                    <Card key={student.id} className="border-l-4 border-l-yellow-500" data-testid={`student-card-${student.id}`}>
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row gap-6">
                          {/* Student Info */}
                          <div className="flex-1 space-y-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-lg font-semibold" data-testid={`student-name-${student.id}`}>
                                  {student.name}
                                </h3>
                                <p className="text-muted-foreground">
                                  {student.mobile}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">
                                    Registered {student.registrationDate}
                                  </span>
                                </div>
                              </div>
                              <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                                Pending Review
                              </Badge>
                            </div>
                            
                            <div className="flex gap-3">
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => onApproveStudent?.(student.id)}
                                data-testid={`button-approve-student-${student.id}`}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => onRejectStudent?.(student.id)}
                                data-testid={`button-reject-student-${student.id}`}
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                              </Button>
                            </div>
                          </div>

                          {/* Student ID Preview */}
                          <div className="lg:w-64">
                            <h4 className="text-sm font-medium mb-2">Student ID Card</h4>
                            <div className="border rounded-lg p-2 bg-muted/50">
                              <div 
                                className="w-full h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded flex items-center justify-center cursor-pointer hover:from-blue-200 hover:to-blue-300 transition-colors"
                                data-testid={`student-id-${student.id}`}
                              >
                                <div className="text-center">
                                  <User className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                                  <p className="text-xs text-blue-700">Click to view full image</p>
                                </div>
                              </div>
                            </div>
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

        {/* Note Approval */}
        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Pending Note Approvals
              </CardTitle>
              <CardDescription>
                Review uploaded study notes and approve for public sharing
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pendingNotes.length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500 opacity-50" />
                  <h3 className="font-medium mb-2">All caught up!</h3>
                  <p className="text-muted-foreground">No pending note approvals</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {pendingNotes.map((note) => (
                    <Card key={note.id} className="border-l-4 border-l-yellow-500" data-testid={`note-card-${note.id}`}>
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row gap-6">
                          {/* Note Info */}
                          <div className="flex-1 space-y-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-lg font-semibold" data-testid={`note-title-${note.id}`}>
                                  {note.title}
                                </h3>
                                <div className="flex items-center gap-4 mt-1">
                                  <Badge variant="outline">{note.subject}</Badge>
                                  <span className="text-sm text-muted-foreground">
                                    by {note.author}
                                  </span>
                                </div>
                                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {note.uploadDate}
                                  </div>
                                  <span>{note.pages} pages</span>
                                  <span>{note.fileSize}</span>
                                </div>
                              </div>
                              <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                                Pending Review
                              </Badge>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium mb-1">Description</h4>
                              <p className="text-sm text-muted-foreground">
                                {note.description || "No description provided"}
                              </p>
                            </div>
                            
                            <div className="flex gap-3">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onPreviewNote?.(note.id)}
                                data-testid={`button-preview-note-${note.id}`}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                Preview PDF
                              </Button>
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => onApproveNote?.(note.id)}
                                data-testid={`button-approve-note-${note.id}`}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => onRejectNote?.(note.id)}
                                data-testid={`button-reject-note-${note.id}`}
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                              </Button>
                            </div>
                          </div>

                          {/* PDF Preview */}
                          <div className="lg:w-48">
                            <h4 className="text-sm font-medium mb-2">PDF Preview</h4>
                            <div className="border rounded-lg p-3 bg-muted/50">
                              <div 
                                className="w-full h-32 bg-gradient-to-br from-red-100 to-red-200 rounded flex items-center justify-center cursor-pointer hover:from-red-200 hover:to-red-300 transition-colors"
                                onClick={() => onPreviewNote?.(note.id)}
                                data-testid={`pdf-preview-${note.id}`}
                              >
                                <div className="text-center">
                                  <FileText className="h-8 w-8 mx-auto mb-2 text-red-600" />
                                  <p className="text-xs text-red-700">Click to preview</p>
                                </div>
                              </div>
                            </div>
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