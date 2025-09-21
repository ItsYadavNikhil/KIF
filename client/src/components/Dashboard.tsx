import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Clock, CheckCircle, XCircle, Eye } from "lucide-react";

interface DashboardProps {
  user: {
    name: string;
    verified: boolean;
    status: "pending" | "approved" | "rejected";
  };
  stats: {
    uploaded: number;
    approved: number;
    pending: number;
  };
  recentNotes: Array<{
    id: string;
    title: string;
    subject: string;
    status: "pending" | "approved" | "rejected";
    uploadDate: string;
  }>;
  onUpload?: () => void;
  onViewNote?: (id: string) => void;
}

export default function Dashboard({ user, stats, recentNotes, onUpload, onViewNote }: DashboardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejected": return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved": return <Badge variant="secondary" className="bg-green-100 text-green-700">Approved</Badge>;
      case "rejected": return <Badge variant="destructive">Rejected</Badge>;
      default: return <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Pending</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8" data-testid="dashboard">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" data-testid="title-welcome">
            Welcome back, {user.name}!
          </h1>
          <p className="text-muted-foreground mt-1">
            {user.verified ? "Your account is verified" : "Account verification pending"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {getStatusIcon(user.status)}
          {getStatusBadge(user.status)}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notes Uploaded</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="stat-uploaded">{stats.uploaded}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600" data-testid="stat-approved">{stats.approved}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600" data-testid="stat-pending">{stats.pending}</div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Notes</CardTitle>
          <CardDescription>
            Share your study materials with the community (PDF files only, max 25MB)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={onUpload}
            className="w-full sm:w-auto"
            data-testid="button-upload"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload PDF Notes
          </Button>
        </CardContent>
      </Card>

      {/* Recent Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Your Recent Notes</CardTitle>
          <CardDescription>Track the status of your uploaded study materials</CardDescription>
        </CardHeader>
        <CardContent>
          {recentNotes.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No notes uploaded yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentNotes.map((note) => (
                <div
                  key={note.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover-elevate"
                  data-testid={`note-item-${note.id}`}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium" data-testid={`note-title-${note.id}`}>
                        {note.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {note.subject} • {note.uploadDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(note.status)}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewNote?.(note.id)}
                      data-testid={`button-view-${note.id}`}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}