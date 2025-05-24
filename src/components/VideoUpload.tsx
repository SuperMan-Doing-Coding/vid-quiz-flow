
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Upload, FileVideo, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { uploadVideo } from '../services/api';

interface VideoUploadProps {
  onUploadSuccess: (videoId: string) => void;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const uploadMutation = useMutation({
    mutationFn: uploadVideo,
    onSuccess: (data) => {
      if (data.success && data.videoId) {
        onUploadSuccess(data.videoId);
        setSelectedFile(null);
      }
    },
  });

  const handleFileSelect = (file: File) => {
    if (file.type === 'video/mp4') {
      setSelectedFile(file);
    } else {
      alert('Please select an MP4 file');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      uploadMutation.mutate(selectedFile);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Upload Lecture Video</h2>
            <p className="text-gray-300">Upload your MP4 lecture video to get started with transcription and MCQ generation</p>
          </div>

          <div
            className={`border-2 border-dashed rounded-lg p-8 transition-colors ${
              dragOver 
                ? 'border-blue-400 bg-blue-400/10' 
                : 'border-gray-600 hover:border-gray-500'
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
          >
            <div className="text-center">
              <FileVideo className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              
              {!selectedFile ? (
                <>
                  <p className="text-gray-300 mb-4">
                    Drag and drop your MP4 video here, or click to browse
                  </p>
                  <input
                    type="file"
                    accept="video/mp4"
                    onChange={handleFileChange}
                    className="hidden"
                    id="video-upload"
                  />
                  <label htmlFor="video-upload">
                    <Button variant="outline" className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600" asChild>
                      <span className="cursor-pointer">
                        <Upload className="mr-2 h-4 w-4" />
                        Browse Files
                      </span>
                    </Button>
                  </label>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-2 text-green-400">
                    <CheckCircle className="h-5 w-5" />
                    <span>File selected: {selectedFile.name}</span>
                  </div>
                  
                  <div className="flex space-x-3 justify-center">
                    <Button
                      onClick={handleUpload}
                      disabled={uploadMutation.isPending}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {uploadMutation.isPending ? 'Uploading...' : 'Upload Video'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedFile(null)}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {uploadMutation.isPending && (
            <div className="mt-4 p-4 bg-blue-900/30 border border-blue-700 rounded-lg">
              <div className="flex items-center space-x-2 text-blue-300">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                <span>Processing video... This may take a few minutes.</span>
              </div>
            </div>
          )}

          {uploadMutation.isError && (
            <div className="mt-4 p-4 bg-red-900/30 border border-red-700 rounded-lg">
              <div className="flex items-center space-x-2 text-red-300">
                <AlertCircle className="h-4 w-4" />
                <span>Upload failed. Please try again.</span>
              </div>
            </div>
          )}

          {uploadMutation.isSuccess && (
            <div className="mt-4 p-4 bg-green-900/30 border border-green-700 rounded-lg">
              <div className="flex items-center space-x-2 text-green-300">
                <CheckCircle className="h-4 w-4" />
                <span>Upload successful! Loading transcripts...</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoUpload;
