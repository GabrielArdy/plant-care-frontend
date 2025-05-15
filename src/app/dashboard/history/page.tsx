'use client';

import React, { useState } from 'react';
import { TbCalendar, TbArrowRight, TbHistory, TbPlant2 } from 'react-icons/tb';
import { Card, CardContent } from '@/components/ui/Card';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { PredictionResult, PredictionResultCard } from '@/components/prediction/PredictionResult';

// Sample history data (in a real app, this would come from an API)
const mockHistory: PredictionResult[] = [
  {
    "class_id": 8,
    "class_name": "Tomato___Septoria_leaf_spot",
    "confidence": 0.5770725011825562,
    "plant_type": "Tomato",
    "condition": "Septoria leaf spot",
    "display_name": "Tomato - Septoria leaf spot",
    "advice": "TREATMENT:\n**\n\nSeptoria leaf spot is a fungal disease, and early intervention is key to managing it.\n\n*   **Pruning:** Immediately remove and destroy affected leaves.\n\nPREVENTION:\n**\n\nPrevention is crucial to minimizing the impact.\n\n*   **Crop Rotation:** Avoid planting tomatoes in the same location year after year.\n\nADDITIONAL INFORMATION:\nNo additional information was provided.",
    "user_id": "69647e40-60d4-4aca-b529-cef0f1ce9270",
    "prediction_id": "48815aa1-9805-4d8c-86b1-fbdfee638407",
    "timestamp": "2025-05-10T16:00:10.982057",
    "image_path": "6825ad254eeef8e8b3a822ce",
    "created_at": { "$date": "2025-05-10T09:00:21.477Z" },
    "storage_type": "gridfs",
    "_id": { "$oid": "6825ad254eeef8e8b3a822d0" }
  },
  {
    "class_id": 12,
    "class_name": "Pepper___Bacterial_spot",
    "confidence": 0.8923651278,
    "plant_type": "Pepper",
    "condition": "Bacterial spot",
    "display_name": "Pepper - Bacterial spot",
    "advice": "TREATMENT:\n**\n\nBacterial spot requires prompt treatment.\n\n*   **Copper Sprays:** Apply copper-based bactericides.\n\nPREVENTION:\n**\n\nPrevention is key for bacterial diseases.\n\n*   **Plant Resistant Varieties:** Choose resistant pepper varieties.\n\nADDITIONAL INFORMATION:\nNo additional information was provided.",
    "user_id": "69647e40-60d4-4aca-b529-cef0f1ce9270",
    "prediction_id": "58925aa1-1235-4d8c-86b1-fbdfee638407",
    "timestamp": "2025-05-13T10:30:22.982057",
    "image_path": "7825ad254eeef8e8b3a822cf",
    "created_at": { "$date": "2025-05-13T10:30:22.477Z" },
    "storage_type": "gridfs",
    "_id": { "$oid": "7825ad254eeef8e8b3a822d1" }
  },
  {
    "class_id": 3,
    "class_name": "Potato___Early_blight",
    "confidence": 0.7618651278,
    "plant_type": "Potato",
    "condition": "Early blight",
    "display_name": "Potato - Early blight",
    "advice": "TREATMENT:\n**\n\nEarly blight is a fungal disease that affects potato plants.\n\n*   **Fungicides:** Apply appropriate fungicides at first sign of disease.\n\nPREVENTION:\n**\n\nManaging early blight requires good practices.\n\n*   **Proper Spacing:** Ensure good air circulation between plants.\n\nADDITIONAL INFORMATION:\nNo additional information was provided.",
    "user_id": "69647e40-60d4-4aca-b529-cef0f1ce9270",
    "prediction_id": "68925aa1-6785-4d8c-86b1-fbdfee638407",
    "timestamp": "2025-05-14T16:45:10.982057",
    "image_path": "8825ad254eeef8e8b3a822cd",
    "created_at": { "$date": "2025-05-14T16:45:10.477Z" },
    "storage_type": "gridfs",
    "_id": { "$oid": "8825ad254eeef8e8b3a822d2" }
  }
];

export default function HistoryPage() {
  const [selectedPrediction, setSelectedPrediction] = useState<PredictionResult | null>(null);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.7) return 'bg-green-100 text-green-800';
    if (confidence >= 0.5) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };
  
  // In a real app, you would fetch history data from an API here
  
  return (
    <div className="flex flex-col p-4 pb-16">
      <h1 className="text-2xl font-bold mb-2">Scan History</h1>
      <p className="text-gray-600 mb-6">View your previous plant scans and diagnoses</p>
      
      {selectedPrediction ? (
        <div className="mb-6">
          <div className="mb-4">
            <Button 
              variant="outline" 
              onClick={() => setSelectedPrediction(null)}
              className="flex items-center"
            >
              <TbArrowRight className="rotate-180 mr-2" size={16} />
              Back to history
            </Button>
          </div>
          
          <div className="max-w-4xl mx-auto w-full">
            {/* Use the PredictionResultCard component to display details */}
            <PredictionResultCard
              prediction={selectedPrediction}
              imageUrl={`https://api.plantcare.example/mock-images/sample-plant-disease.jpg`}
              onClose={() => setSelectedPrediction(null)}
            />
          </div>
        </div>
      ) : mockHistory.length > 0 ? (
        <div className="space-y-4">
          {mockHistory.map((item, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex">
                <div className="w-24 h-24 bg-gray-100 flex-shrink-0 relative">
                  {/* In a real app, you would fetch the actual image from your backend */}
                  <div className="absolute inset-0 flex items-center justify-center bg-[#e6f7ef]">
                    <TbPlant2 size={30} className="text-[#22a861]" />
                  </div>
                </div>
                <CardContent className="py-3 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.display_name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getConfidenceColor(item.confidence)}`}>
                        {Math.round(item.confidence * 100)}%
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm">{item.condition}</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-400 flex items-center">
                      <TbCalendar size={14} className="mr-1" />
                      {formatDate(item.timestamp)}
                    </span>
                    <Button 
                      variant="outline" 
                      className="text-xs py-1 px-2"
                      onClick={() => setSelectedPrediction(item)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="bg-gray-100 rounded-full p-6 mb-4">
            <TbHistory size={48} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No scan history yet</h2>
          <p className="text-gray-500 text-center max-w-xs mb-6">
            When you scan plants, your history will appear here
          </p>
          
          <Link href="/dashboard/scan">
            <Button className="flex items-center">
              Scan Your First Plant
              <TbArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
