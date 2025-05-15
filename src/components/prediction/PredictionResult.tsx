'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TbPlant2, TbAlertTriangle, TbInfoCircle, TbListCheck, TbChevronDown, TbChevronUp, TbClock } from 'react-icons/tb';

export interface PredictionResult {
  class_id: number;
  class_name: string;
  confidence: number;
  plant_type: string;
  condition: string;
  display_name: string;
  advice: string;
  user_id: string;
  prediction_id: string;
  timestamp: string;
  image_path: string;
  created_at: { $date: string };
  storage_type: string;
  _id: { $oid: string };
}

interface PredictionResultCardProps {
  prediction: PredictionResult;
  onSave?: () => void;
  onShare?: () => void;
  onClose?: () => void;
  imageUrl?: string; // URL to display the uploaded/scanned image
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatAdvice = (advice: string): { treatment: string, prevention: string, additional?: string } => {
  const sections: { treatment: string, prevention: string, additional?: string } = {
    treatment: '',
    prevention: '',
    additional: ''
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

export const PredictionResultCard: React.FC<PredictionResultCardProps> = ({
  prediction,
  onSave,
  onShare,
  onClose,
  imageUrl
}) => {
  const [activeTab, setActiveTab] = useState<'treatment' | 'prevention' | 'additional'>('treatment');
  const [isExpanded, setIsExpanded] = useState(true);
  
  const formattedDate = formatDate(prediction.timestamp);
  const adviceSections = formatAdvice(prediction.advice);
  const confidencePercent = Math.round(prediction.confidence * 100);
  
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.7) return 'text-green-600';
    if (confidence >= 0.5) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  const confidenceColor = getConfidenceColor(prediction.confidence);
  
  return (
    <Card className="overflow-hidden">
      <div className="bg-[#22a861] text-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center">
            <TbPlant2 className="mr-2" size={24} />
            Diagnosis Result
          </h2>
          <div className="flex gap-1">
            <button 
              onClick={() => setIsExpanded(!isExpanded)} 
              className="p-1 hover:bg-white/20 rounded-full"
              aria-label={isExpanded ? "Collapse result" : "Expand result"}
            >
              {isExpanded ? <TbChevronUp size={20} /> : <TbChevronDown size={20} />}
            </button>
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <>
          <div className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Image Section */}
              {imageUrl && (
                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                  <div className="relative rounded-lg overflow-hidden border border-gray-200 h-48 md:h-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={imageUrl} 
                      alt="Scanned plant" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
              
              {/* Result Info */}
              <div className={`${imageUrl ? 'w-full md:w-2/3' : 'w-full'}`}>
                <div className="mb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{prediction.display_name}</h3>
                      <div className="flex items-center mt-1">
                        <TbClock className="text-gray-500 mr-1" size={16} />
                        <span className="text-sm text-gray-500">{formattedDate}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className={`font-semibold ${confidenceColor}`}>
                        {confidencePercent}% confidence
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-xs text-gray-500 block">Plant Type</label>
                      <div className="font-medium">{prediction.plant_type}</div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block">Condition</label>
                      <div className="font-medium">{prediction.condition}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Advice Tabs */}
          <div className="px-4 border-t border-gray-200">
            <div className="flex overflow-x-auto space-x-2 py-2">
              <button 
                onClick={() => setActiveTab('treatment')}
                className={`px-4 py-2 whitespace-nowrap rounded-md ${
                  activeTab === 'treatment' 
                  ? 'bg-[#22a861] text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <TbListCheck className="inline mr-1" />
                Treatment
              </button>
              <button 
                onClick={() => setActiveTab('prevention')}
                className={`px-4 py-2 whitespace-nowrap rounded-md ${
                  activeTab === 'prevention' 
                  ? 'bg-[#22a861] text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <TbAlertTriangle className="inline mr-1" />
                Prevention
              </button>
              {adviceSections.additional && (
                <button 
                  onClick={() => setActiveTab('additional')}
                  className={`px-4 py-2 whitespace-nowrap rounded-md ${
                    activeTab === 'additional' 
                    ? 'bg-[#22a861] text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <TbInfoCircle className="inline mr-1" />
                  Additional Info
                </button>
              )}
            </div>
          </div>
          
          {/* Advice Content */}
          <div className="p-4 max-h-96 overflow-y-auto">
            {activeTab === 'treatment' && (
              <div className="prose max-w-none">
                {adviceSections.treatment.split('\n').map((line, i) => {
                  // Handle markdown-like formatting
                  if (line.startsWith('#')) {
                    return <h4 key={i} className="font-bold mt-3 mb-2">{line.replace(/^#+\s*/, '')}</h4>;
                  } else if (line.startsWith('*   ') || line.startsWith('-   ')) {
                    return <li key={i} className="ml-4">{line.replace(/^[*-]\s+/, '')}</li>;
                  } else if (line.startsWith('    *   ') || line.startsWith('    -   ')) {
                    return <li key={i} className="ml-8">{line.replace(/^\s+[*-]\s+/, '')}</li>;
                  } else if (line.startsWith('        *   ') || line.startsWith('        -   ')) {
                    return <li key={i} className="ml-12">{line.replace(/^\s+[*-]\s+/, '')}</li>;
                  } else if (line === '**') {
                    return <hr key={i} className="my-2 border-gray-200" />;
                  } else if (line.trim() === '') {
                    return <br key={i} />;
                  }
                  return <p key={i}>{line}</p>;
                })}
              </div>
            )}
            
            {activeTab === 'prevention' && (
              <div className="prose max-w-none">
                {adviceSections.prevention.split('\n').map((line, i) => {
                  // Handle markdown-like formatting (same logic as treatment)
                  if (line.startsWith('#')) {
                    return <h4 key={i} className="font-bold mt-3 mb-2">{line.replace(/^#+\s*/, '')}</h4>;
                  } else if (line.startsWith('*   ') || line.startsWith('-   ')) {
                    return <li key={i} className="ml-4">{line.replace(/^[*-]\s+/, '')}</li>;
                  } else if (line.startsWith('    *   ') || line.startsWith('    -   ')) {
                    return <li key={i} className="ml-8">{line.replace(/^\s+[*-]\s+/, '')}</li>;
                  } else if (line.startsWith('        *   ') || line.startsWith('        -   ')) {
                    return <li key={i} className="ml-12">{line.replace(/^\s+[*-]\s+/, '')}</li>;
                  } else if (line === '**') {
                    return <hr key={i} className="my-2 border-gray-200" />;
                  } else if (line.trim() === '') {
                    return <br key={i} />;
                  }
                  return <p key={i}>{line}</p>;
                })}
              </div>
            )}
            
            {activeTab === 'additional' && adviceSections.additional && (
              <div className="prose max-w-none">
                {adviceSections.additional.split('\n').map((line, i) => {
                  if (line.trim() === '') {
                    return <br key={i} />;
                  }
                  return <p key={i}>{line}</p>;
                })}
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end gap-2 p-4 border-t border-gray-200">
            {onSave && (
              <Button variant="outline" onClick={onSave}>
                Save Result
              </Button>
            )}
            {onShare && (
              <Button variant="outline" onClick={onShare}>
                Share
              </Button>
            )}
            {onClose && (
              <Button onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        </>
      )}
    </Card>
  );
};
