'use client';

import React, { useState, useRef, useEffect } from 'react';
import { TbCamera, TbUpload, TbArrowRight, TbCameraOff, TbRefresh, TbCameraRotate } from 'react-icons/tb';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { PredictionResult, PredictionResultCard } from '@/components/prediction/PredictionResult';
import Image from 'next/image';

export default function ScanPage() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCameraSupported, setIsCameraSupported] = useState(true);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Check camera support on component mount
  // Hydration fix: Server and client initial state should match
  // We start with isCameraSupported = true, then check after mount
  useEffect(() => {
    // Only run this on the client side
    const checkCameraSupport = async () => {
      try {
        // Check if navigator.mediaDevices is supported
        if (typeof window !== 'undefined' && 
            (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia)) {
          setIsCameraSupported(false);
          setCameraError('Your browser does not support camera access');
          return;
        }
        
        // Try to get permission and check if cameras exist
        await navigator.mediaDevices.getUserMedia({ video: true });
        setIsCameraSupported(true);
      } catch (err) {
        console.error('Camera access error:', err);
        setIsCameraSupported(false);
        setCameraError('Camera access denied or no camera found');
      }
    };
    
    // Execute camera check after a short delay to avoid hydration issues
    const timer = setTimeout(() => {
      checkCameraSupport();
    }, 100);
    
    // Cleanup function to stop any camera stream on unmount
    return () => {
      clearTimeout(timer);
      
      // Ensure all camera resources are properly released
      if (streamRef.current) {
        console.log('Component unmounting: stopping all camera tracks');
        streamRef.current.getTracks().forEach(track => {
          track.stop();
          console.log(`Track ${track.id} stopped`);
        });
        streamRef.current = null;
      }
      
      setCameraActive(false);
    };
  }, []);
  
  // Connect stream to video element when camera becomes active
  useEffect(() => {
    // Only run this effect when the camera is active and we have a stream
    if (cameraActive && streamRef.current && videoRef.current) {
      console.log('Connecting stream to video element via effect');
      videoRef.current.srcObject = streamRef.current;
      
      // Ensure video plays
      videoRef.current.play().catch(err => {
        console.error('Error playing video in effect:', err);
      });
    }
    
    // Cleanup effect: ensure camera is stopped when component unmounts
    // or when cameraActive becomes false
    return () => {
      if (!cameraActive && streamRef.current) {
        console.log('Cleanup: stopping camera stream');
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    };
  }, [cameraActive]);

  // Start camera with specified facing mode
  const startCamera = async () => {
    try {
      // First, make sure we can find the video element before proceeding
      if (!videoRef.current) {
        console.warn('Video element not found in the DOM, setting camera active anyway');
        // Continue execution - the videoRef might be created during render
      }
      
      // Stop any existing stream first
      stopCamera();
      
      // Set loading state
      setCameraError(null);
      
      // Request camera access with specified facing mode
      // Note: For mobile devices, we want to use the environment-facing camera by default
      const constraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };
      
      console.log('Requesting camera access with constraints:', constraints);
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      console.log('Camera access granted, setting up video stream');
      streamRef.current = stream;
      
      // We'll set camera active now to trigger the render of the video element
      setCameraActive(true);
      
      // Wait a short moment for the video element to be created in the DOM
      setTimeout(() => {
        // Connect the stream to the video element if it exists now
        if (videoRef.current) {
          console.log('Video element found, connecting stream');
          videoRef.current.srcObject = stream;
          videoRef.current.muted = true; // Ensure muted to prevent feedback
        } else {
          console.warn('Video element still not available after timeout');
          // We won't throw an error here as the camera is technically active
        }
      }, 100);
    } catch (err) {
      console.error('Error accessing camera:', err);
      // More detailed error messages based on the specific error
      if (err instanceof DOMException) {
        if (err.name === 'NotAllowedError') {
          setCameraError('Camera access denied. Please grant permission in your browser settings.');
        } else if (err.name === 'NotFoundError') {
          setCameraError('No camera device found on this device.');
        } else if (err.name === 'NotReadableError') {
          setCameraError('Camera is already in use by another application.');
        } else {
          setCameraError(`Camera error: ${err.name}`);
        }
      } else {
        setCameraError('Could not access the camera. Make sure your device has a camera.');
      }
      setCameraActive(false);
    }
  };

  // Stop active camera
  const stopCamera = () => {
    console.log('Stopping camera stream');
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach(track => {
        console.log(`Stopping track: ${track.kind}`);
        track.stop();
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  // Switch camera between front and back
  const toggleCamera = () => {
    setFacingMode(prevMode => prevMode === 'environment' ? 'user' : 'environment');
    
    // Restart camera with new facing mode
    if (cameraActive) {
      startCamera();
    }
  };

  // Capture image from camera stream
  const captureFromCamera = () => {
    if (!videoRef.current || !canvasRef.current || !streamRef.current) {
      console.error('Missing required refs for capture');
      setCameraError('Could not capture image. Please try again.');
      return;
    }
    
    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Match canvas size to video dimensions for best quality
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      
      console.log(`Capturing frame at ${canvas.width}x${canvas.height}`);
      
      // Draw the current video frame to canvas
      const context = canvas.getContext('2d');
      if (!context) {
        throw new Error('Could not get canvas context');
      }
      
      // Handle selfie-mode mirroring if using front camera
      if (facingMode === 'user') {
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
      }
      
      // Draw video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Reset transformation if mirrored
      if (facingMode === 'user') {
        context.setTransform(1, 0, 0, 1, 0, 0);
      }
      
      // Convert canvas to data URL with good quality
      const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9);
      
      // Make sure we got a valid image
      if (!imageDataUrl || imageDataUrl === 'data:,') {
        throw new Error('Failed to capture image');
      }
      
      console.log('Image captured successfully');
      setCapturedImage(imageDataUrl);
      
      // Stop camera after successful capture
      stopCamera();
    } catch (err) {
      console.error('Error capturing image:', err);
      setCameraError('Failed to capture image. Please try again.');
    }
  };

  // Handle file upload (from gallery)
  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCapturedImage(imageUrl);
      
      // If camera was active, stop it
      if (cameraActive) {
        stopCamera();
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Handle analysis once image is captured
  const handleAnalyze = () => {
    if (capturedImage) {
      setIsAnalyzing(true);
      
      // In a real implementation, you would upload the image to your backend API
      // For example:
      // const formData = new FormData();
      // formData.append('image', capturedImage);
      // const response = await fetch('your-api-endpoint', { method: 'POST', body: formData });
      // const result = await response.json();
      
      // For now we're simulating an API call with a timer
      setTimeout(() => {
        const mockResult: PredictionResult = {
          "class_id": 8,
          "class_name": "Tomato___Septoria_leaf_spot",
          "confidence": 0.5770725011825562,
          "plant_type": "Tomato",
          "condition": "Septoria leaf spot",
          "display_name": "Tomato - Septoria leaf spot",
          "advice": "TREATMENT:\n**\n\nSeptoria leaf spot is a fungal disease, and early intervention is key to managing it.\n\n*   **Organic/Natural Remedies:**\n\n    *   **Pruning:** Immediately remove and destroy (burn or dispose of in the trash, *not* compost) any leaves showing signs of infection. This is crucial to reduce the fungal load. Prune lower leaves first, as they are often the first to be affected due to soil splash.\n    *   **Baking Soda Spray:** A baking soda solution can help raise the pH on the leaf surface, making it less hospitable to the fungus. Mix 1 tablespoon of baking soda with 1 teaspoon of liquid dish soap (not detergent) in 1 gallon of water. Spray thoroughly, covering all leaf surfaces, including the undersides. Apply every 7-10 days. *Note: Baking soda can sometimes cause leaf burn, so test on a small area first.*\n    *   **Copper Fungicides (Organic Options):** Copper-based fungicides are a common organic treatment. Look for products containing copper octanoate or copper sulfate. Follow the label instructions carefully for mixing and application rates.\n\n*   **Chemical Treatments (If Appropriate):**\n\n    *   **Chlorothalonil:** A broad-spectrum fungicide that is effective against Septoria leaf spot.\n    *   **Mancozeb:** Another broad-spectrum fungicide.\n\n**\n\nPREVENTION:\n**\n\nPrevention is crucial to minimizing the impact of Septoria leaf spot.\n\n*   **Crop Rotation:** Avoid planting tomatoes in the same location year after year.\n*   **Spacing:** Provide adequate spacing between plants for better air circulation.\n\nADDITIONAL INFORMATION:\nNo additional information was provided.",
          "user_id": "69647e40-60d4-4aca-b529-cef0f1ce9270",
          "prediction_id": "48815aa1-9805-4d8c-86b1-fbdfee638407",
          "timestamp": new Date().toISOString(),
          "image_path": "6825ad254eeef8e8b3a822ce",
          "created_at": { "$date": new Date().toISOString() },
          "storage_type": "gridfs",
          "_id": { "$oid": "6825ad254eeef8e8b3a822d0" }
        };
        
        setIsAnalyzing(false);
        setPredictionResult(mockResult);
        
        // In a real app with navigation, you might do:
        // router.push(`/dashboard/results?id=${mockResult.prediction_id}`);
      }, 3000);
    }
  };

  // Reset captured image and camera state
  const resetCapture = () => {
    // First stop camera before changing state
    stopCamera();
    setCapturedImage(null);
  };

  return (
    <div className="flex flex-col px-3 py-2">
      <div className="text-center mb-2">
        <h1 className="text-xl font-bold">Plant Scanner</h1>
        <p className="text-xs text-gray-600 mt-1">
          Take a clear photo of the affected part of your plant for analysis
        </p>
      </div>
      
      {/* Hidden canvas for capturing snapshots */}
      <canvas ref={canvasRef} className="hidden"></canvas>
      
      {/* Show prediction result if available */}
      {predictionResult ? (
        <div className="flex flex-col">
          <PredictionResultCard
            prediction={predictionResult}
            imageUrl={capturedImage || undefined}
            onSave={() => {
              alert("Result saved! In a real app, this would save to your history.");
              // In real app: await saveToHistory(predictionResult);
            }}
            onShare={() => {
              alert("Sharing functionality would open here");
              // In real app: Implement sharing via navigator.share or custom UI
            }}
            onClose={() => {
              // Reset everything to start over
              setPredictionResult(null);
              setCapturedImage(null);
            }}
          />
          
          <div className="flex justify-center mt-4">
            <Button 
              onClick={() => {
                setPredictionResult(null);
                setCapturedImage(null);
              }}
              className="mx-auto"
            >
              Scan Another Plant
            </Button>
          </div>
        </div>
      ) : capturedImage ? (
        <div className="flex flex-col items-center">
          {/* Image Preview */}
          <div className="w-full h-[65vh] max-h-[500px] relative mb-4 rounded-lg overflow-hidden shadow-lg border border-gray-200">
            <Image 
              src={capturedImage} 
              alt="Captured plant image" 
              fill
              className={`object-cover ${isAnalyzing ? 'opacity-80' : ''}`} 
              priority
            />
            
            {/* Scanning animation overlay when analyzing */}
            {isAnalyzing && (
              <>
                {/* Horizontal scanning line */}
                <div className="absolute inset-x-0 h-1 bg-[#22a861] shadow-lg z-10 animate-scan-vertical" />
                
                {/* Vertical scanning line */}
                <div className="absolute inset-y-0 w-1 bg-[#22a861] shadow-lg z-10 animate-scan-horizontal" />
                
                {/* Target focus points */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-[#22a861] rounded-lg opacity-60 animate-pulse" />
                
                {/* Scan effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#22a861]/5 to-transparent animate-pulse z-5" />
                
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjJhODYxIiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4yIj48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIC8+PC9nPjwvc3ZnPg==')] opacity-30" />
                
                {/* Text indicator at bottom */}
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <span className="bg-black/50 text-white text-xs px-3 py-1 rounded-full font-medium backdrop-blur-sm">
                    Analyzing plant...
                  </span>
                </div>
              </>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3 w-full">
            <Button 
              variant="outline" 
              onClick={resetCapture}
              className="flex-1 items-center justify-center py-3"
              disabled={isAnalyzing}
            >
              <TbRefresh className="mr-2" size={18} />
              Retake
            </Button>
            
            <Button 
              onClick={handleAnalyze}
              className={`flex-1 flex items-center justify-center py-3 ${isAnalyzing ? 'bg-[#1e8f53]' : 'bg-[#22a861]'} transition-colors duration-300`}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Scanning...
                </span>
              ) : (
                <>
                  Analyze <TbArrowRight className="ml-1" size={18} />
                </>
              )}
            </Button>
          </div>
        </div>
      ) : cameraActive ? (
        // Real-time camera preview UI
        <div className="flex flex-col items-center w-full">
          <div className="w-full h-[70vh] max-h-[550px] relative mb-2 rounded-lg overflow-hidden shadow-md border border-gray-200 bg-black">
            {/* Camera feed display */}
            <video 
              key={`camera-${facingMode}`}
              ref={videoRef}
              autoPlay 
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover" 
              style={{ transform: facingMode === 'user' ? 'scaleX(-1)' : 'none' }}
              onLoadedMetadata={(e) => {
                console.log("Video element loaded metadata");
                e.currentTarget.play().catch(err => {
                  console.error("Error playing video:", err);
                });
              }}
            />
            
            {/* Camera guidelines overlay */}
            <div className="absolute inset-0 pointer-events-none border-[30px] border-black/20 rounded-lg"></div>
            
            {/* Camera controls overlay */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-6 z-10">
              <button 
                type="button"
                onClick={toggleCamera}
                className="p-2 bg-white/95 backdrop-blur-sm rounded-full shadow-md focus:outline-none active:bg-gray-100"
                aria-label="Switch camera"
              >
                <TbCameraRotate size={22} className="text-[#22a861]" />
              </button>
              
              <button 
                type="button"
                onClick={captureFromCamera} 
                className="p-3 bg-white rounded-full shadow-md focus:outline-none active:bg-gray-100"
                aria-label="Take photo"
              >
                <div className="w-12 h-12 rounded-full border-4 border-[#22a861]"></div>
              </button>
              
              <button 
                type="button"
                onClick={() => {
                  stopCamera();
                  setCameraActive(false);
                }}
                className="p-2 bg-white/95 backdrop-blur-sm rounded-full shadow-md focus:outline-none active:bg-gray-100"
                aria-label="Close camera"
              >
                <TbCameraOff size={22} className="text-red-500" />
              </button>
            </div>
          </div>
          
          <p className="text-xs text-gray-500 italic">
            Position the plant in frame and tap the circle button to capture
          </p>
        </div>
      ) : (
        // Initial options UI - more compact with card layout
        <div className="flex flex-col gap-3 mt-2">
          {/* Camera option */}
          <Card className="p-4 shadow-sm border border-gray-100">
            <CardContent className="flex flex-col items-center justify-center py-4">
              <div className="bg-[#22a861]/10 rounded-full p-5 mb-3">
                <TbCamera size={40} className="text-[#22a861]" />
              </div>
              <h2 className="text-lg font-semibold mb-1">Use Camera</h2>
              <p className="text-gray-500 mb-4 text-center text-sm">
                Take a photo of your plant right now
              </p>
              
              <Button 
                onClick={() => startCamera()} 
                className="flex items-center w-full justify-center"
                disabled={!isCameraSupported}
              >
                <TbCamera className="mr-2" size={18} />
                Open Camera
              </Button>
              
              {cameraError && (
                <p className="text-red-500 text-xs mt-2">{cameraError}</p>
              )}
            </CardContent>
          </Card>
          
          <div className="text-center my-1">
            <span className="text-gray-400 text-xs">OR</span>
          </div>
          
          {/* File upload option */}
          <Card className="p-4 shadow-sm border border-gray-100">
            <CardContent className="flex flex-col items-center justify-center py-4">
              <div className="bg-[#e6f7ef] rounded-full p-5 mb-3">
                <TbUpload size={40} className="text-[#3b82f6]" />
              </div>
              <h2 className="text-lg font-semibold mb-1">Upload Image</h2>
              <p className="text-gray-500 mb-4 text-center text-sm">
                Select an existing photo from your device
              </p>
              
              <input
                type="file"
                accept="image/*"
                onChange={handleCapture}
                className="hidden"
                ref={fileInputRef}
              />
              
              <Button 
                variant="outline" 
                onClick={triggerFileInput} 
                className="flex items-center w-full justify-center"
              >
                <TbUpload className="mr-2" size={18} />
                Browse Gallery
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
