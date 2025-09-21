import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, X, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface UploadPDFProps {
  onUpload?: (data: UploadData) => void;
  onCancel?: () => void;
}

interface UploadData {
  file: File;
  title: string;
  subject: string;
  description: string;
}

const subjects = [
  "Mathematics",
  "Physics", 
  "Chemistry",
  "Biology",
  "Computer Science",
  "Engineering",
  "Economics",
  "Literature",
  "History",
  "Other"
];

export default function UploadPDF({ onUpload, onCancel }: UploadPDFProps) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File) => {
    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      return false;
    }
    if (file.size > 25 * 1024 * 1024) { // 25MB
      setError("File size must be less than 25MB");
      return false;
    }
    setError("");
    return true;
  };

  const handleFileSelect = (selectedFile: File) => {
    if (validateFile(selectedFile)) {
      setFile(selectedFile);
      if (!title) {
        setTitle(selectedFile.name.replace(".pdf", ""));
      }
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file || !title || !subject) {
      setError("Please fill all required fields");
      return;
    }

    setUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      onUpload?.({
        file,
        title,
        subject,
        description
      });
      console.log('PDF upload:', { file: file.name, title, subject, description });
      setUploading(false);
    }, 2000);
  };

  const removeFile = () => {
    setFile(null);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Study Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload Area */}
            <div>
              <Label>PDF File *</Label>
              <div
                className={`mt-2 border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:border-primary"
                } ${file ? "bg-muted/50" : ""}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                data-testid="dropzone-pdf"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileInput}
                  className="hidden"
                  data-testid="input-file"
                />
                
                {!file ? (
                  <div>
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg font-medium mb-2">
                      Drag and drop your PDF here
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      or click to browse files
                    </p>
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      data-testid="button-browse"
                    >
                      Browse Files
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      PDF only, max 25MB
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <FileText className="h-8 w-8 text-primary" />
                    <div className="text-left">
                      <p className="font-medium" data-testid="file-name">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / (1024 * 1024)).toFixed(1)} MB
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={removeFile}
                      data-testid="button-remove-file"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {error && (
              <Alert variant="destructive" data-testid="alert-error">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Form Fields */}
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Calculus Chapter 5 - Derivatives"
                required
                data-testid="input-title"
              />
            </div>

            <div>
              <Label htmlFor="subject">Subject *</Label>
              <Select value={subject} onValueChange={setSubject} required>
                <SelectTrigger data-testid="select-subject">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subj) => (
                    <SelectItem key={subj} value={subj} data-testid={`option-${subj.toLowerCase()}`}>
                      {subj}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the notes content..."
                className="min-h-20"
                data-testid="input-description"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={!file || !title || !subject || uploading}
                className="flex-1"
                data-testid="button-upload-submit"
              >
                {uploading ? "Uploading..." : "Upload Notes"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                data-testid="button-cancel"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}