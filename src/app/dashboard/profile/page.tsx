'use client';

import React, { useEffect, useState } from 'react';
import { ProfileCard, UserProfile } from '@/components/profile/ProfileCard';
import { ProfileEditForm } from '@/components/profile/ProfileEditForm';
import { fetchUserProfile, updateUserProfile } from '@/services/profileService';
import { TbUser, TbSettings, TbLogout, TbBell, TbHelp, TbCreditCard } from 'react-icons/tb';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchUserProfile();
        setProfile(data);
      } catch (err) {
        console.error('Failed to load profile:', err);
        setError('Failed to load profile. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSubmit = async (updatedProfile: Partial<UserProfile>) => {
    if (!profile) return;
    
    try {
      setIsSaving(true);
      const updated = await updateUserProfile(updatedProfile);
      setProfile(updated);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update profile:', err);
      setError('Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-[#22a861] border-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="bg-red-100 p-4 rounded-lg mb-4">
            <p className="text-red-600">{error}</p>
          </div>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="flex flex-col px-3 py-2">
      <div className="text-center mb-3">
        <h1 className="text-xl font-bold">My Profile</h1>
        <p className="text-xs text-gray-600 mt-1">
          Manage your account information
        </p>
      </div>

      <div className="flex flex-col gap-4 max-w-2xl mx-auto w-full">
        {isEditing ? (
          <ProfileEditForm
            profile={profile}
            onSubmit={handleSubmit}
            onCancel={handleCancelEdit}
            isLoading={isSaving}
          />
        ) : (
          <>
            <ProfileCard 
              profile={profile} 
              isEditable={true} 
              onEditClick={handleEditClick} 
            />
            
            <div className="space-y-3 mt-2">
              <Card className="p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Account Settings</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
                    <TbSettings className="text-gray-500 mr-3" size={20} />
                    <span className="text-sm">Settings</span>
                  </button>
                  
                  <button className="w-full flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
                    <TbBell className="text-gray-500 mr-3" size={20} />
                    <span className="text-sm">Notification Preferences</span>
                  </button>
                  
                  <button className="w-full flex items-center p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors">
                    <TbLogout className="mr-3" size={20} />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              </Card>
              
              <Card className="p-4 mb-16">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Help & Support</h3>
                <div className="space-y-2">
                  <a href="#" className="w-full flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
                    <span className="text-sm text-[#22a861]">Contact Support</span>
                  </a>
                  <a href="#" className="w-full flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
                    <span className="text-sm text-[#22a861]">FAQs</span>
                  </a>
                </div>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
