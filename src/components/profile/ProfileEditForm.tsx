'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { TbUpload, TbX } from 'react-icons/tb';
import { UserProfile } from './ProfileCard';

interface ProfileEditFormProps {
  profile: UserProfile;
  onSubmit: (updatedProfile: Partial<UserProfile>) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
  profile,
  onSubmit,
  onCancel,
  isLoading = false
}) => {
  const [formData, setFormData] = useState({
    first_name: profile.first_name || '',
    last_name: profile.last_name || '',
    username: profile.username,
    description: profile.description || '',
    // We don't allow editing email directly for security reasons
  });
  
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(profile.avatar);
  
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(profile.cover_image);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        if (e.target?.result) {
          setAvatarPreview(e.target.result as string);
        }
      };
      fileReader.readAsDataURL(file);
    }
  };
  
  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        if (e.target?.result) {
          setCoverPreview(e.target.result as string);
        }
      };
      fileReader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, you'd use FormData to handle file uploads
    // For simplicity, we're just passing the updated profile data
    await onSubmit({
      ...formData,
      // In a real implementation, you would handle file uploads separately
      avatar: avatarPreview,
      cover_image: coverPreview,
    });
  };
  
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Cover Image Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
          <div className="relative h-40 bg-gray-100 rounded-lg overflow-hidden">
            {coverPreview && (
              <div className="absolute inset-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={coverPreview} 
                  alt="Cover preview" 
                  className="w-full h-full object-cover" 
                />
                <button 
                  type="button"
                  onClick={() => {
                    setCoverPreview(null);
                    setCoverFile(null);
                  }}
                  className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full"
                  aria-label="Remove cover image"
                >
                  <TbX size={18} />
                </button>
              </div>
            )}
            
            <label className={`flex flex-col items-center justify-center h-full cursor-pointer ${coverPreview ? 'opacity-0 hover:opacity-70 bg-black/30 transition-opacity' : ''}`}>
              <TbUpload size={24} className="mb-2" />
              <span className="text-sm">Click to upload cover image</span>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleCoverChange} 
                className="hidden" 
              />
            </label>
          </div>
        </div>
        
        {/* Avatar Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
          <div className="flex items-center gap-4">
            <div className="relative h-24 w-24 rounded-full bg-gray-100 overflow-hidden">
              {avatarPreview ? (
                <div className="absolute inset-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={avatarPreview} 
                    alt="Avatar preview" 
                    className="w-full h-full object-cover" 
                  />
                  <button 
                    type="button"
                    onClick={() => {
                      setAvatarPreview(null);
                      setAvatarFile(null);
                    }}
                    className="absolute top-0 right-0 bg-black/50 text-white p-1 rounded-full"
                    aria-label="Remove avatar"
                  >
                    <TbX size={14} />
                  </button>
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-gray-400 text-2xl">?</span>
                </div>
              )}
              
              <label className={`flex flex-col items-center justify-center h-full cursor-pointer ${avatarPreview ? 'opacity-0 hover:opacity-70 bg-black/30 transition-opacity' : ''}`}>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleAvatarChange} 
                  className="hidden" 
                />
              </label>
            </div>
            
            <div>
              <label className="inline-block px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                <TbUpload size={16} className="inline mr-2" />
                <span>Upload photo</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleAvatarChange}
                  className="hidden" 
                />
              </label>
              <p className="text-xs text-gray-500 mt-1">JPG or PNG. Max size 1MB.</p>
            </div>
          </div>
        </div>
        
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <Input
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="First Name"
            />
          </div>
          
          <div>
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <Input
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Last Name"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <Input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={profile.email}
            onChange={() => {}} // No-op handler for disabled input
            disabled
            className="bg-gray-50 cursor-not-allowed"
          />
          <p className="text-xs text-gray-500 mt-1">Contact support to change your email address</p>
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Bio
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write a short bio about yourself..."
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#22a861] focus:border-transparent"
            rows={3}
          />
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Card>
  );
};
