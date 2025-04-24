'use client';

import { useState } from 'react';
import { FaFilter, FaUserFriends, FaHeart, FaChevronRight, FaCircle } from 'react-icons/fa';
import Header from '@/components/Header';
import Link from 'next/link';
import { User } from '@/utils/recommendationAlgorithm';

interface MatchClientProps {
  users: User[];
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function MatchClient({ users, searchParams }: MatchClientProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'online' | 'compatibility'>('all');

  // 필터에 따라 사용자 목록 필터링
  const filteredUsers = users.filter(user => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'online') return user.isOnline;
    if (activeFilter === 'compatibility') return user.compatibilityScore && user.compatibilityScore >= 70;
    return true;
  });

  // 호환성 점수 기준으로 정렬
  const sortedUsers = [...filteredUsers].sort((a, b) => 
    (b.compatibilityScore || 0) - (a.compatibilityScore || 0)
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header title="맞춤 추천" />
      
      <div className="px-4 py-3 bg-white flex items-center gap-3 border-b">
        <FaFilter className="text-gray-500" />
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1 rounded-full text-sm ${
            activeFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          전체
        </button>
        <button
          onClick={() => setActiveFilter('online')}
          className={`px-3 py-1 rounded-full text-sm ${
            activeFilter === 'online' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          온라인
        </button>
        <button
          onClick={() => setActiveFilter('compatibility')}
          className={`px-3 py-1 rounded-full text-sm ${
            activeFilter === 'compatibility' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          높은 호환성
        </button>
      </div>

      <main className="flex-1 p-4">
        {sortedUsers.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            추천 사용자가 없습니다
          </div>
        ) : (
          <div className="grid gap-4">
            {sortedUsers.map((user) => (
              <div 
                key={user.id} 
                className="bg-white rounded-lg shadow p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    {user.isOnline && (
                      <FaCircle className="absolute bottom-0 right-0 text-green-500 text-xs" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-lg">{user.name}</h3>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {user.compatibilityScore}% 일치
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{user.introduction}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {user.interests.slice(0, 3).map((interest, index) => (
                        <span 
                          key={index} 
                          className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                        >
                          {interest}
                        </span>
                      ))}
                      {user.interests.length > 3 && (
                        <span className="text-gray-500 text-xs">+{user.interests.length - 3}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex justify-end">
                  <Link href={`/chat/${user.id}`} className="flex items-center text-blue-500 text-sm font-medium">
                    대화하기 <FaChevronRight className="ml-1 text-xs" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
} 