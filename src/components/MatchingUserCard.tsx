'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaComment, FaCircle } from 'react-icons/fa';

interface User {
  id: string;
  nickname: string;
  avatar_url: string;
  bio: string;
  interests: string[];
  isOnline: boolean;
  compatibilityScore: number;
  lastActive?: string;
  location?: {
    city: string;
    region: string;
  };
  groups?: string[];
}

interface MatchingUserCardProps {
  user: User;
}

const MatchingUserCard: React.FC<MatchingUserCardProps> = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-start">
        {/* 프로필 이미지와 상태 표시 */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden relative">
            <Image 
              src={user.avatar_url || '/default-avatar.png'} 
              alt={`${user.nickname}의 프로필`}
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          {user.isOnline && (
            <span className="absolute bottom-0 right-0 flex items-center">
              <FaCircle className="text-green-500" size={10} />
              <span className="ml-1 text-xs text-green-500">온라인</span>
            </span>
          )}
          {!user.isOnline && user.lastActive && (
            <span className="absolute bottom-0 right-0 text-xs text-gray-500">
              {user.lastActive}
            </span>
          )}
        </div>

        {/* 사용자 정보 */}
        <div className="ml-4 flex-1">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-lg">{user.nickname}</h3>
            <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
              호환성 {Math.round(user.compatibilityScore)}%
            </div>
          </div>
          
          {user.location && (
            <div className="text-sm text-gray-500 mb-1">
              {user.location.city}, {user.location.region}
            </div>
          )}
          
          <p className="text-gray-700 text-sm mb-2 line-clamp-2">{user.bio}</p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {user.interests.slice(0, 3).map((interest, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 rounded-full px-2 py-1 text-xs">
                {interest}
              </span>
            ))}
            {user.interests.length > 3 && (
              <span className="text-gray-500 text-xs flex items-center">
                +{user.interests.length - 3}
              </span>
            )}
          </div>
          
          <div className="flex justify-end">
            <Link href={`/chat/${user.id}`} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-sm flex items-center">
              <FaComment className="mr-1" size={12} />
              채팅하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchingUserCard; 