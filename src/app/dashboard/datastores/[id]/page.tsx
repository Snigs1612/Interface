"use client";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogClose,
    DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { File } from "lucide-react";


export default function DatastoreDetailPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [uploadingFiles, setUploadingFiles] = useState<
        { name: string; progress: number; status: string }[]
    >([]);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            setSelectedFiles(filesArray);
        }
    };

    const removeFile = (fileName: string) => {
        setSelectedFiles((prevFiles) =>
            prevFiles.filter((file) => file.name !== fileName)
        );
    };

    const startUploading = () => {
        const filesWithProgress = selectedFiles.map((file) => ({
            name: file.name,
            progress: 0,
            status: "Uploading",
        }));
        setUploadingFiles(filesWithProgress);
        setSelectedFiles([]);

        filesWithProgress.forEach((file) => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                setUploadingFiles((prevUploads) =>
                    prevUploads.map((upload) =>
                        upload.name === file.name
                            ? {
                                  ...upload,
                                  progress,
                                  status: progress >= 100 ? "Processed" : "Uploading",
                              }
                            : upload
                    )
                );
                if (progress >= 100) clearInterval(interval);
            }, 500);
        });
    };

    return (
        <div className="p-6">
            <button
                onClick={() => router.back()}
                className="text-gray-500 hover:underline mb-4"
            >
                ← Back
            </button>
            <h1 className="text-2xl font-semibold flex items-center gap-2">
                📄 Datastore {id && ` - ${id}`}
            </h1>
            <p className="text-gray-500 mb-4">
                Manage documents used for retrieval in this agent
            </p>

            <div className="flex gap-6 border-b pb-2">
                <button className="font-medium text-gray-900 border-b-2 border-black">
                    Documents
                </button>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <button className="text-gray-500 hover:text-gray-900">
                            Ingest
                        </button>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogClose className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200">
                            ✕
                        </DialogClose>
                        <DialogTitle className="text-lg font-semibold mb-2">
                            Upload Documents
                        </DialogTitle>
                        <p className="text-sm text-gray-500 mb-4">
                            Only PDF and Parquet files are supported.
                        </p>
                        <input
                            type="file"
                            multiple
                            onChange={handleFileSelect}
                            className="mb-4 w-full border p-2 rounded-md"
                        />

                        {selectedFiles.length > 0 && (
                            <div className="mb-4 border border-gray-200 rounded-md p-2 bg-gray-50">
                                {selectedFiles.map((file) => (
                                    <div
                                        key={file.name}
                                        className="flex justify-between items-center p-1 text-sm"
                                    >
                                        <span className="text-gray-700">
                                            {file.name}
                                        </span>
                                        <button
                                            onClick={() => removeFile(file.name)}
                                            className="text-red-500 text-xs hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <button
                            onClick={startUploading}
                            disabled={selectedFiles.length === 0}
                            className="w-full bg-black text-white py-2 rounded-md disabled:bg-gray-300"
                        >
                            Start Uploading
                        </button>
                    </DialogContent>
                </Dialog>
            </div>

            {uploadingFiles.length > 0 && (
                <div className="mt-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
                    {uploadingFiles.map((file) => (
                        <div key={file.name} className="mb-2">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium text-gray-700">
                                    {file.name}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {file.status === "Processed"
                                        ? "Processed"
                                        : `${file.progress}%`}
                                </span>
                            </div>
                            {file.status !== "Processed" && (
                                <Progress value={file.progress} />
                            )}
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-6">
                {uploadingFiles.map(
                    (file) =>
                        file.status === "Processed" && (
                            <div
                                key={file.name}
                                className="flex items-center justify-between p-3 border rounded-md shadow-sm bg-white mt-2"
                            >
                                <div className="flex items-center gap-3">
                                    <File size={18} className="text-gray-600" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-green-500">
                                            Processed
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                )}
            </div>
        </div>
    );
}
