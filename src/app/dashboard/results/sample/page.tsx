'use client';

import React, { useState } from 'react';
import { PredictionResultCard, PredictionResult } from '@/components/prediction/PredictionResult';

export default function SampleResultPage() {
  // Sample prediction data matching the structure from the backend
  const [prediction] = useState<PredictionResult>({
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

  // Sample image URL (in a real app, you would construct this based on the backend URL and image path)
  const imageUrl = "https://example.com/plant-images/tomato_septoria.jpg";

  const handleSave = () => {
    console.log("Saving prediction result");
    alert("Result saved successfully!");
  };

  const handleShare = () => {
    console.log("Sharing prediction result");
    alert("Sharing functionality would open here");
  };

  const handleClose = () => {
    console.log("Closing prediction result");
    // In a real app, you might navigate back or clear the result
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Plant Disease Diagnosis</h1>
      
      <div className="max-w-4xl mx-auto">
        <PredictionResultCard
          prediction={prediction}
          imageUrl={imageUrl}
          onSave={handleSave}
          onShare={handleShare}
          onClose={handleClose}
        />
        
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-700">
            <strong>Note:</strong> This is a sample prediction result page. In a real application, 
            you would fetch the prediction result from the backend API and display it using 
            the PredictionResultCard component.
          </p>
        </div>
      </div>
    </div>
  );
}
