import { DashboardHeader } from "@/components/dashboard/header";
import { FileUploadZone } from "@/components/files/file-upload-zone";

export const metadata = {
  title: "Files",
};

export default function FilesPage() {
  return (
    <>
      <DashboardHeader
        title="Files"
        description="Upload documents for AI context or storage."
      />
      <div className="flex-1 overflow-y-auto p-6">
        <FileUploadZone />
      </div>
    </>
  );
}
