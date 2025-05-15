'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PredictionResultCard, PredictionResult } from '@/components/prediction/PredictionResult';
import { Button } from '@/components/ui/Button';
import { TbArrowLeft, TbHistory } from 'react-icons/tb';

export default function ResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const predictionId = searchParams.get('id');

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get the base URL for the backend API
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.plantcare.example';
  
  useEffect(() => {
    const fetchPredictionResult = async () => {
      if (!predictionId) {
        setError("Missing prediction ID");
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        
        // In a real implementation, you would call your API here
        // const response = await fetch(`${apiBaseUrl}/predictions/${predictionId}`);
        // if (!response.ok) throw new Error('Failed to fetch prediction result');
        // const data = await response.json();
        // setPrediction(data);
        
        // For demo purposes, we're using sample data
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Sample data
        setPrediction({
          "class_id": 8,
          "class_name": "Tomato___Septoria_leaf_spot",
          "confidence": 0.5770725011825562,
          "plant_type": "Tomato",
          "condition": "Septoria leaf spot",
          "display_name": "Tomato - Septoria leaf spot",
          "advice": "TREATMENT:\n**\n\nSeptoria leaf spot is a fungal disease, and early intervention is key to managing it.\n\n*   **Organic/Natural Remedies:**\n\n    *   **Pruning:** Immediately remove and destroy (burn or dispose of in the trash, *not* compost) any leaves showing signs of infection. This is crucial to reduce the fungal load. Prune lower leaves first, as they are often the first to be affected due to soil splash.\n    *   **Baking Soda Spray:** A baking soda solution can help raise the pH on the leaf surface, making it less hospitable to the fungus. Mix 1 tablespoon of baking soda with 1 teaspoon of liquid dish soap (not detergent) in 1 gallon of water. Spray thoroughly, covering all leaf surfaces, including the undersides. Apply every 7-10 days. *Note: Baking soda can sometimes cause leaf burn, so test on a small area first.*\n    *   **Copper Fungicides (Organic Options):** Copper-based fungicides are a common organic treatment. Look for products containing copper octanoate or copper sulfate. Follow the label instructions carefully for mixing and application rates. Examples include:\n        *   **Bonide Copper Fungicide:** (Contains copper octanoate)\n        *   **Monterey Liquid Copper Fungicide:** (Contains copper ammonium complex)\n    *   **Neem Oil:** While not a direct fungicide, neem oil can help prevent the spread of Septoria by disrupting the fungal life cycle and acting as a protectant. Use a cold-pressed neem oil and follow label instructions for dilution and application. Apply every 7-14 days.\n    *   **Compost Tea:** While not a cure, applying compost tea as a foliar spray can boost the plant's overall health and resistance. Make sure the compost tea is well-aerated and properly brewed to avoid introducing harmful bacteria.\n\n*   **Chemical Treatments (If Appropriate):**\n\n    *   **Chlorothalonil:** A broad-spectrum fungicide that is effective against Septoria leaf spot. Common commercial names include:\n        *   **Daconil:** (Active ingredient: Chlorothalonil)\n    *   **Mancozeb:** Another broad-spectrum fungicide.\n        *   **Dithane M-45:** (Active ingredient: Mancozeb)\n    *   **Azoxystrobin:** A systemic fungicide that can be absorbed by the plant.\n        *   **Quadris:** (Active ingredient: Azoxystrobin)\n    *   **Note:** *Always read and follow the label instructions on any chemical fungicide. Pay close attention to application rates, safety precautions, and pre-harvest intervals (the time you must wait between spraying and harvesting).*\n\n*   **Application Methods and Frequency:**\n\n    *   **Foliar Spray:** All treatments (organic and chemical) should be applied as a foliar spray, ensuring thorough coverage of all leaf surfaces, including the undersides. Use a sprayer that produces a fine mist for even distribution.\n    *   **Frequency:**\n        *   **Organic:** Apply every 7-10 days, or more frequently if disease pressure is high.\n        *   **Chemical:** Follow the label instructions, but typically every 7-14 days.\n    *   **Alternating Fungicides:** To prevent the fungus from developing resistance, consider alternating between different fungicides with different modes of action. For example, alternate between a copper fungicide and chlorothalonil.\n\n*   **When to Apply Treatments:**\n\n    *   **Time of Day:** Apply treatments in the early morning or late evening to avoid leaf burn from the sun.\n    *   **Weather Conditions:** Avoid spraying when rain is expected within 24 hours, as the treatment will be washed off. Choose a calm day with little wind to prevent drift.\n\n*   **How to Recognize When Treatment is Working:**\n\n    *   **Slowing of Disease Progression:** The most obvious sign is that the disease is no longer spreading rapidly. New lesions should appear less frequently.\n    *   **Healthy New Growth:** New leaves should be free of spots.\n    *   **Existing Lesions:** Existing lesions will not disappear, but they should not continue to enlarge rapidly.\n\n**\n\nPREVENTION:\n**\n\nPrevention is crucial to minimizing the impact of Septoria leaf spot.\n\n*   **Cultural Practices:**\n\n    *   **Crop Rotation:** Avoid planting tomatoes in the same location year after year. Rotate with non-solanaceous crops (e.g., beans, corn, squash) for at least 2-3 years.\n    *   **Spacing:** Provide adequate\n\nADDITIONAL INFORMATION:\nNo additional information was provided.",
          "user_id": "69647e40-60d4-4aca-b529-cef0f1ce9270",
          "prediction_id": "48815aa1-9805-4d8c-86b1-fbdfee638407",
          "timestamp": "2025-05-15T16:00:10.982057",
          "image_path": "6825ad254eeef8e8b3a822ce",
          "created_at": { "$date": "2025-05-15T09:00:21.477Z" },
          "storage_type": "gridfs",
          "_id": { "$oid": "6825ad254eeef8e8b3a822d0" }
        });
      } catch (err) {
        console.error('Error fetching prediction result:', err);
        setError('Failed to load the prediction result. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPredictionResult();
  }, [predictionId, apiBaseUrl]);
  
  // Generate a mock image URL based on prediction
  const getImageUrl = () => {
    if (!prediction) return '';
    
    // In a real app, you would construct this based on your storage method
    // For example: `${apiBaseUrl}/image/${prediction.image_path}`
    return `${apiBaseUrl}/mock-images/sample-tomato-disease.jpg`;
  };
  
  const handleSave = async () => {
    // In a real app, you would make an API call to save this to user's favorites or history
    alert('Result saved to your history!');
  };
  
  const handleShare = async () => {
    // In a real app, you'd implement share functionality
    if (navigator.share) {
      try {
        await navigator.share({
          title: prediction?.display_name || 'Plant Disease Diagnosis',
          text: `Check out this plant disease diagnosis: ${prediction?.display_name}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
        alert('Sharing failed. You can copy the URL manually to share this result.');
      }
    } else {
      // Fallback for browsers that don't support navigator.share
      alert('Share functionality is not supported in your browser. You can copy the URL manually to share this result.');
    }
  };
  
  const handleClose = () => {
    router.push('/dashboard');
  };
  
  const handleViewHistory = () => {
    router.push('/dashboard/history');
  };
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 h-[80vh]">
        <div className="w-16 h-16 border-4 border-[#22a861] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Loading result...</p>
      </div>
    );
  }
  
  if (error || !prediction) {
    return (
      <div className="p-6">
        <div className="flex flex-col items-center justify-center p-8 max-w-md mx-auto bg-red-50 rounded-lg">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Result</h2>
          <p className="text-center text-gray-700 mb-6">{error || 'Result not found'}</p>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => router.back()}>
              <TbArrowLeft className="mr-2" />
              Go Back
            </Button>
            <Button onClick={() => router.push('/dashboard/scan')}>
              Try New Scan
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col p-4">
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" onClick={() => router.back()} className="flex items-center">
          <TbArrowLeft className="mr-2" />
          Back
        </Button>
        
        <Button variant="outline" onClick={handleViewHistory} className="flex items-center">
          <TbHistory className="mr-2" />
          View History
        </Button>
      </div>
      
      <div className="max-w-4xl mx-auto w-full">
        <PredictionResultCard
          prediction={prediction}
          imageUrl={getImageUrl()}
          onSave={handleSave}
          onShare={handleShare}
          onClose={handleClose}
        />
      </div>
    </div>
  );
}
