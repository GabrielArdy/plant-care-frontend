'use client';

import { UserProfile } from '@/components/profile/ProfileCard';

interface ApiResponse<T> {
  message: string;
  data: T;
}

// Base API URL - should be configured from environment variables in a real app
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.plantcare.example';

/**
 * Fetch the current user's profile
 */
export async function fetchUserProfile(): Promise<UserProfile> {
  try {
    // In a real implementation, this would make an actual API call
    // For now, we'll simulate the API response
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock response data (for development)
    const mockResponse: ApiResponse<UserProfile> = {
      message: "Profile retrieved successfully",
      data: {
        user_id: "69647e40-60d4-4aca-b529-cef0f1ce9270",
        username: "johndoe",
        email: "john.doe@example.com",
        first_name: "John",
        last_name: "Doe",
        avatar: null,
        cover_image: null,
        description: "Plant enthusiast and hobbyist gardener. Looking to identify plant diseases and keep my garden healthy."
      }
    };
    
    return mockResponse.data;
    
    // Real implementation would be:
    // const response = await fetch(`${API_BASE_URL}/user/profile`, {
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //   },
    // });
    // 
    // if (!response.ok) {
    //   throw new Error('Failed to fetch profile');
    // }
    // 
    // const data: ApiResponse<UserProfile> = await response.json();
    // return data.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

/**
 * Update the current user's profile
 */
export async function updateUserProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock response - in a real app, the server would return the updated profile
    const mockResponse: ApiResponse<UserProfile> = {
      message: "Profile updated successfully",
      data: {
        user_id: "69647e40-60d4-4aca-b529-cef0f1ce9270",
        username: profile.username || "johndoe",
        email: "john.doe@example.com", // Email can't be changed via profile update
        first_name: profile.first_name || null,
        last_name: profile.last_name || null,
        avatar: profile.avatar || null,
        cover_image: profile.cover_image || null,
        description: profile.description || null
      }
    };
    
    return mockResponse.data;
    
    // Real implementation would be:
    // const response = await fetch(`${API_BASE_URL}/user/profile`, {
    //   method: 'PUT',
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(profile),
    // });
    // 
    // if (!response.ok) {
    //   throw new Error('Failed to update profile');
    // }
    // 
    // const data: ApiResponse<UserProfile> = await response.json();
    // return data.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

/**
 * Upload profile or cover image
 * In a real app, this would handle file uploads separately from profile data
 */
export async function uploadProfileImage(
  file: File, 
  type: 'avatar' | 'cover'
): Promise<string> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real implementation, this would upload the file to a server or cloud storage
    // and return the URL to the uploaded file
    
    // For now, we'll just return a fake URL
    const fakeUrl = `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/${type === 'avatar' ? '200/200' : '1000/300'}`;
    
    return fakeUrl;
    
    // Real implementation would use FormData:
    // const formData = new FormData();
    // formData.append('file', file);
    // formData.append('type', type);
    // 
    // const response = await fetch(`${API_BASE_URL}/user/upload-image`, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //   },
    //   body: formData,
    // });
    // 
    // if (!response.ok) {
    //   throw new Error('Failed to upload image');
    // }
    // 
    // const data = await response.json();
    // return data.url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}
