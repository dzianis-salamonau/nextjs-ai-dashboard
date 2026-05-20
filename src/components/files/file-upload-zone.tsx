"use client";

import { useCallback, useEffect, useState } from "react";
import { FileText, Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatBytes } from "@/lib/utils";

type UploadedFile = {
  id: string;
  name: string;
  size: number;
  url: string;
  uploadedAt: string;
};

export function FileUploadZone() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadFiles() {
      try {
        const res = await fetch("/api/upload");
        if (!res.ok) throw new Error("Failed to load files");
        const data = (await res.json()) as UploadedFile[];
        if (!cancelled) setFiles(data);
      } catch {
        if (!cancelled) toast.error("Could not load uploaded files");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadFiles();
    return () => {
      cancelled = true;
    };
  }, []);

  const uploadFile = async (file: File) => {
    setUploading(true);
    setProgress(10);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const interval = setInterval(() => {
        setProgress((p) => Math.min(p + 12, 90));
      }, 120);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      clearInterval(interval);
      setProgress(100);

      if (!res.ok) throw new Error("Upload failed");

      const data = (await res.json()) as UploadedFile;
      setFiles((prev) => [data, ...prev]);
      toast.success(`${file.name} uploaded`);
    } catch {
      toast.error("Upload failed. Please try again.");
    } finally {
      setTimeout(() => {
        setUploading(false);
        setProgress(0);
      }, 400);
    }
  };

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList?.length || uploading) return;
      const file = fileList[0];
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Max file size is 5 MB");
        return;
      }
      uploadFile(file);
    },
    [uploading]
  );

  const removeFile = async (id: string) => {
    try {
      await fetch(`/api/upload?id=${id}`, { method: "DELETE" });
      setFiles((prev) => prev.filter((f) => f.id !== id));
      toast.success("File removed");
    } catch {
      toast.error("Could not remove file");
    }
  };

  return (
    <div className="space-y-6">
      <Card
        className={`border-2 border-dashed transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border/60 bg-card/40"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
      >
        <CardContent className="flex flex-col items-center justify-center gap-4 py-16">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Upload className="h-7 w-7 text-primary" />
          </div>
          <div className="text-center">
            <p className="font-medium">Drop files here or browse</p>
            <p className="mt-1 text-sm text-muted-foreground">
              TXT, MD, JSON, CSV — up to 5 MB
            </p>
          </div>
          <input
            id="file-upload-input"
            type="file"
            className="hidden"
            accept=".txt,.md,.json,.csv"
            disabled={uploading}
            onChange={(e) => handleFiles(e.target.files)}
          />
          <Button variant="outline" disabled={uploading} asChild>
            <label htmlFor="file-upload-input" className="cursor-pointer">
              Choose file
            </label>
          </Button>
          {uploading && (
            <div className="w-full max-w-xs space-y-2">
              <Progress value={progress} />
              <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Loader2 className="h-3 w-3 animate-spin" />
                Uploading...
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {(loading || files.length > 0) && (
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-base">Uploaded files</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {loading ? (
              <p className="flex items-center gap-2 py-4 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading files...
              </p>
            ) : (
            files.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-3 rounded-lg border bg-muted/20 px-4 py-3"
              >
                <FileText className="h-5 w-5 shrink-0 text-primary" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatBytes(file.size)} ·{" "}
                    {new Date(file.uploadedAt).toLocaleString()}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 text-muted-foreground hover:text-destructive"
                  onClick={() => removeFile(file.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
