
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown, ChevronRight, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { fetchTranscripts } from '../services/api';
import { TranscriptSegment } from '../types';

interface TranscriptDisplayProps {
  videoId: string;
}

const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({ videoId }) => {
  const [openSegments, setOpenSegments] = useState<Set<string>>(new Set());

  const { data, isLoading, error } = useQuery({
    queryKey: ['transcripts', videoId],
    queryFn: () => fetchTranscripts(videoId),
    enabled: !!videoId,
  });

  const toggleSegment = (segmentId: string) => {
    const newOpenSegments = new Set(openSegments);
    if (newOpenSegments.has(segmentId)) {
      newOpenSegments.delete(segmentId);
    } else {
      newOpenSegments.add(segmentId);
    }
    setOpenSegments(newOpenSegments);
  };

  if (isLoading) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 text-gray-300">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
            <span>Loading transcripts...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="text-red-300">Failed to load transcripts</div>
        </CardContent>
      </Card>
    );
  }

  if (!data?.segments?.length) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="text-gray-300">No transcripts available</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Clock className="h-5 w-5" />
          <span>Video Transcripts</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {data.segments.map((segment: TranscriptSegment) => (
          <Collapsible
            key={segment.id}
            open={openSegments.has(segment.id)}
            onOpenChange={() => toggleSegment(segment.id)}
          >
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  {openSegments.has(segment.id) ? (
                    <ChevronDown className="h-4 w-4 text-gray-300" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-300" />
                  )}
                  <span className="text-blue-400 font-medium">{segment.timeRange}</span>
                </div>
                <div className="text-gray-300 text-sm truncate max-w-md">
                  {segment.text.substring(0, 100)}...
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-2 p-4 bg-gray-900 rounded-lg border-l-4 border-blue-500">
                <p className="text-gray-200 leading-relaxed">{segment.text}</p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  );
};

export default TranscriptDisplay;
