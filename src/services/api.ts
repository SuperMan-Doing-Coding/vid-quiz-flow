
import axios from 'axios';
import { UploadResponse, TranscriptResponse, MCQResponse } from '../types';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

export const uploadVideo = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('video', file);
  
  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

export const fetchTranscripts = async (videoId: string): Promise<TranscriptResponse> => {
  const response = await api.get(`/transcribe/${videoId}`);
  return response.data;
};

export const fetchMCQs = async (videoId: string): Promise<MCQResponse> => {
  const response = await api.get(`/generate-questions/${videoId}`);
  return response.data;
};
