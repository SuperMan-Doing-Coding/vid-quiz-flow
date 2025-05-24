
export interface TranscriptSegment {
  id: string;
  text: string;
  startTime: number;
  endTime: number;
  timeRange: string;
}

export interface MCQOption {
  id: string;
  text: string;
}

export interface MCQ {
  id: string;
  question: string;
  options: MCQOption[];
  correctAnswer: string;
  segmentId: string;
}

export interface UploadResponse {
  success: boolean;
  message: string;
  videoId?: string;
}

export interface TranscriptResponse {
  segments: TranscriptSegment[];
}

export interface MCQResponse {
  questions: MCQ[];
}
