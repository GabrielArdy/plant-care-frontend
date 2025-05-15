'use client';

import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { TbEdit, TbUser, TbMail, TbFileText } from 'react-icons/tb';
import { Button } from '@/components/ui/Button';

export interface UserProfile {
  user_id: string;
  username: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  avatar: string | null;
  cover_image: string | null;
  description: string | null;
}

interface ProfileCardProps {
  profile: UserProfile;
  isEditable?: boolean;
  onEditClick?: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  isEditable = true,
  onEditClick
}) => {
  const fullName = profile.first_name && profile.last_name 
    ? `${profile.first_name} ${profile.last_name}`
    : profile.username;
  
  const avatarPlaceholder = '/profile-placeholder.svg';
  const coverPlaceholder = '/cover-placeholder.jpg';

  return (
    <Card className="overflow-hidden">
      {/* Cover Image */}
      <div className="relative h-40 w-full bg-gradient-to-r from-[#22a861]/30 to-[#4ade80]/30">
        {profile.cover_image && (
          <Image
            src={profile.cover_image}
            alt="Cover"
            fill
            className="object-cover"
            priority
          />
        )}
      </div>

      {/* Profile Info */}
      <div className="px-6 pb-6">
        {/* Avatar */}
        <div className="relative -mt-14 mb-4 flex justify-between">
          <div className="rounded-full border-4 border-white bg-white h-24 w-24 overflow-hidden shadow-md">
            {profile.avatar ? (
              <Image
                src={profile.avatar}
                alt={fullName}
                width={96}
                height={96}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-100">
                <TbUser size={36} className="text-gray-400" />
              </div>
            )}
          </div>

          {isEditable && (
            <Button 
              variant="outline" 
              onClick={onEditClick} 
              className="mt-auto flex items-center gap-1 py-2"
            >
              <TbEdit size={16} />
              <span>Edit Profile</span>
            </Button>
          )}
        </div>
        
        {/* Name and Info */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold">{fullName}</h2>
            <p className="text-sm text-gray-500">@{profile.username}</p>
          </div>
          
          {profile.description && (
            <div className="flex items-start gap-2">
              <TbFileText className="mt-0.5 text-gray-400 flex-shrink-0" />
              <p className="text-sm text-gray-600">{profile.description}</p>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <TbMail className="text-gray-400" />
            <span className="text-sm text-gray-600">{profile.email}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
