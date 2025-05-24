
import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import VideoUpload from '../components/VideoUpload';
import TranscriptDisplay from '../components/TranscriptDisplay';
import MCQDisplay from '../components/MCQDisplay';

const Index = () => {
  const [videoId, setVideoId] = useState<string | null>(null);

  const handleUploadSuccess = (id: string) => {
    console.log('Video uploaded successfully:', id);
    setVideoId(id);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-8 w-8 text-blue-400" />
            <h1 className="text-2xl font-bold text-white">LectureLearn AI</h1>
            <span className="text-gray-400">|</span>
            <p className="text-gray-300">AI-Powered Video Learning Platform</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {!videoId ? (
          /* Hero Section with Upload */
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-white">
                Transform Your Lectures into
                <span className="text-blue-400"> Interactive Learning</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Upload your lecture videos and get instant transcriptions with automatically generated 
                multiple-choice questions for each segment. Perfect for students and educators.
              </p>
            </div>

            <VideoUpload onUploadSuccess={handleUploadSuccess} />

            {/* Features Preview */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="text-blue-400 text-2xl mb-3">📹</div>
                <h3 className="text-white font-semibold mb-2">Video Upload</h3>
                <p className="text-gray-300 text-sm">
                  Upload MP4 lecture videos up to 60 minutes long with automatic processing
                </p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="text-blue-400 text-2xl mb-3">📝</div>
                <h3 className="text-white font-semibold mb-2">Smart Transcription</h3>
                <p className="text-gray-300 text-sm">
                  Get accurate transcripts segmented into 5-minute intervals for easy navigation
                </p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="text-blue-400 text-2xl mb-3">🧠</div>
                <h3 className="text-white font-semibold mb-2">Auto-Generated MCQs</h3>
                <p className="text-gray-300 text-sm">
                  AI-powered multiple choice questions for each segment to test comprehension
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Content Display Section */
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white">Your Learning Content</h2>
              <p className="text-gray-300">
                Review the transcripts and test your understanding with auto-generated questions
              </p>
              <button
                onClick={() => setVideoId(null)}
                className="text-blue-400 hover:text-blue-300 underline text-sm"
              >
                ← Upload another video
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <TranscriptDisplay videoId={videoId} />
              </div>
              
              <div className="space-y-6">
                <MCQDisplay videoId={videoId} />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center text-gray-400 text-sm">
            <p>© 2025 LectureLearn AI - Transforming Education with AI</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
