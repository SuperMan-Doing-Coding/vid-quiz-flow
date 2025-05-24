
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { HelpCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { fetchMCQs } from '../services/api';
import { MCQ } from '../types';

interface MCQDisplayProps {
  videoId: string;
  segmentId?: string;
}

const MCQDisplay: React.FC<MCQDisplayProps> = ({ videoId, segmentId }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['mcqs', videoId],
    queryFn: () => fetchMCQs(videoId),
    enabled: !!videoId,
  });

  if (isLoading) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 text-gray-300">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
            <span>Loading questions...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="text-red-300">Failed to load questions</div>
        </CardContent>
      </Card>
    );
  }

  const filteredQuestions = segmentId 
    ? data?.questions?.filter((mcq: MCQ) => mcq.segmentId === segmentId) || []
    : data?.questions || [];

  if (!filteredQuestions.length) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="text-gray-300">No questions available</div>
        </CardContent>
      </Card>
    );
  }

  const groupedQuestions = filteredQuestions.reduce((acc: Record<string, MCQ[]>, mcq: MCQ) => {
    if (!acc[mcq.segmentId]) {
      acc[mcq.segmentId] = [];
    }
    acc[mcq.segmentId].push(mcq);
    return acc;
  }, {});

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <HelpCircle className="h-5 w-5" />
          <span>Multiple Choice Questions</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {Object.entries(groupedQuestions).map(([segId, questions]) => (
          <div key={segId} className="space-y-4">
            <h3 className="text-blue-400 font-medium border-b border-gray-600 pb-2">
              Segment Questions
            </h3>
            {questions.map((mcq: MCQ, index: number) => (
              <div key={mcq.id} className="bg-gray-700 rounded-lg p-4">
                <div className="mb-4">
                  <h4 className="text-white font-medium mb-3">
                    {index + 1}. {mcq.question}
                  </h4>
                  <RadioGroup disabled className="space-y-2">
                    {mcq.options.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={option.id}
                          id={option.id}
                          className="border-gray-500"
                        />
                        <Label
                          htmlFor={option.id}
                          className={`text-gray-200 cursor-not-allowed ${
                            option.id === mcq.correctAnswer ? 'text-green-400' : ''
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <span>{option.text}</span>
                            {option.id === mcq.correctAnswer && (
                              <CheckCircle className="h-4 w-4" />
                            )}
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <div className="text-sm text-green-400 flex items-center space-x-1">
                  <CheckCircle className="h-3 w-3" />
                  <span>Correct answer highlighted above</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default MCQDisplay;
