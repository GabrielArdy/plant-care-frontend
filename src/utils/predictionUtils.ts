'use client';

import { PredictionResult } from '@/components/prediction/PredictionResult';

/**
 * Format a date from ISO string to a human readable format
 */
export const formatPredictionDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Get an appropriate color class for a confidence level
 */
export const getConfidenceColor = (confidence: number): string => {
  if (confidence >= 0.7) return 'text-green-600';
  if (confidence >= 0.5) return 'text-yellow-600';
  return 'text-red-600';
};

/**
 * Get a badge background color class for a confidence level
 */
export const getConfidenceBadgeColor = (confidence: number): string => {
  if (confidence >= 0.7) return 'bg-green-100 text-green-800';
  if (confidence >= 0.5) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
};

/**
 * Parse the advice text from a prediction result and return it in structured sections
 */
export const parseAdviceText = (advice: string): { treatment: string, prevention: string, additional?: string } => {
  const sections: { treatment: string, prevention: string, additional?: string } = {
    treatment: '',
    prevention: '',
  };

  // Extract treatment section
  const treatmentMatch = advice.match(/TREATMENT:[\s\S]*?(?=PREVENTION:|$)/);
  if (treatmentMatch) {
    sections.treatment = treatmentMatch[0].replace('TREATMENT:', '').trim();
  }

  // Extract prevention section
  const preventionMatch = advice.match(/PREVENTION:[\s\S]*?(?=ADDITIONAL INFORMATION:|$)/);
  if (preventionMatch) {
    sections.prevention = preventionMatch[0].replace('PREVENTION:', '').trim();
  }

  // Extract additional information section if it exists
  const additionalMatch = advice.match(/ADDITIONAL INFORMATION:[\s\S]*/);
  if (additionalMatch) {
    sections.additional = additionalMatch[0].replace('ADDITIONAL INFORMATION:', '').trim();
    // Remove "No additional information was provided" if that's all there is
    if (sections.additional.includes('No additional information was provided')) {
      delete sections.additional;
    }
  }

  return sections;
};

/**
 * Generate an API URL for a plant disease image based on the prediction result
 * This is a mock function for demonstration purposes
 */
export const getPlantImageUrl = (prediction: PredictionResult, apiBaseUrl?: string): string => {
  // In a real app, you would construct this based on your storage method
  // For example: `${apiBaseUrl}/image/${prediction.image_path}`
  const baseUrl = apiBaseUrl || process.env.NEXT_PUBLIC_API_URL || 'https://api.plantcare.example';
  
  // For demo purposes, we're returning a mock URL
  // In production, you would use the actual image path from the prediction
  return `${baseUrl}/images/${prediction.image_path}`;
};
