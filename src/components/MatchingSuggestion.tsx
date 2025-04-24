'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaStarHalf, FaRegStar, FaCircle, FaCommentDots } from 'react-icons/fa';
import { User } from '@/utils/recommendationAlgorithm';
import { 
  getRecommendedUsers, 
  calculateCompatibilityScore 
} from '@/utils/recommendationAlgorithm';
import { mockUsers } from '@/utils/mockUsers';

interface MatchingSuggestionProps {
  currentUserId: string;
  filterKeywords?: string[];
  limit?: number;
}

export default function MatchingSuggestion({ 
  currentUserId, 
  filterKeywords = [], 
  limit = 6 
}: MatchingSuggestionProps) {
  const [recommendedUsers, setRecommendedUsers] = useState<Array<User & { compatibilityScore: number }>>([]);
  const [filterType, setFilterType] = useState<'all' | 'online' | 'high-compatibility'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendedUsers = async () => {
      setIsLoading(true);
      
      // 실제 구현에서는 API 호출을 통해 데이터를 가져오지만
      // 현재는 mock 데이터와 알고리즘을 사용
      try {
        // 현재 사용자 찾기
        const currentUser = mockUsers.find(user => user.id === currentUserId);
        
        if (!currentUser) {
          throw new Error('현재 사용자를 찾을 수 없습니다');
        }
        
        // 현재 사용자를 제외한 사용자 목록
        const otherUsers = mockUsers.filter(user => user.id !== currentUserId);
        
        // 각 사용자와의 호환성 점수 계산
        const usersWithScore = otherUsers.map(user => {
          const compatibilityScore = calculateCompatibilityScore(currentUser, user);
          return { ...user, compatibilityScore };
        });
        
        // 호환성 점수에 따라 정렬
        let sortedUsers = [...usersWithScore].sort((a, b) => b.compatibilityScore - a.compatibilityScore);
        
        // 키워드 필터링이 있는 경우 적용
        if (filterKeywords.length > 0) {
          sortedUsers = sortedUsers.filter(user => 
            user.interests.some(interest => 
              filterKeywords.includes(interest.toLowerCase())
            )
          );
        }
        
        // 현재 필터 타입에 따라 필터링
        let filteredUsers = sortedUsers;
        
        if (filterType === 'online') {
          filteredUsers = sortedUsers.filter(user => user.isOnline);
        } else if (filterType === 'high-compatibility') {
          filteredUsers = sortedUsers.filter(user => user.compatibilityScore >= 0.6);
        }
        
        // 결과 설정
        setRecommendedUsers(filteredUsers.slice(0, limit));
      } catch (error) {
        console.error('추천 사용자를 가져오는 중 오류 발생:', error);
        setRecommendedUsers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendedUsers();
  }, [currentUserId, filterKeywords, filterType, limit]);

  // 호환성 점수를 별점으로 변환
  const getStarRating = (score: number) => {
    // 0-1 점수를 0-5 별점으로 변환
    const starScore = score * 5;
    const fullStars = Math.floor(starScore);
    const hasHalfStar = starScore - fullStars >= 0.5;
    
    const stars = [];
    
    // 꽉 찬 별
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }
    
    // 반 별
    if (hasHalfStar) {
      stars.push(<FaStarHalf key="half" className="text-yellow-400" />);
    }
    
    // 빈 별
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
    }
    
    return stars;
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">추천 친구</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-full text-sm ${
              filterType === 'all' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            전체
          </button>
          <button
            onClick={() => setFilterType('online')}
            className={`px-4 py-2 rounded-full text-sm ${
              filterType === 'online' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            온라인
          </button>
          <button
            onClick={() => setFilterType('high-compatibility')}
            className={`px-4 py-2 rounded-full text-sm ${
              filterType === 'high-compatibility' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            높은 호환성
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : recommendedUsers.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500">조건에 맞는 추천 사용자가 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedUsers.map((user) => (
            <div 
              key={user.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="relative">
                    <Image 
                      src={user.avatar_url} 
                      alt={user.nickname}
                      width={60} 
                      height={60} 
                      className="rounded-full"
                    />
                    {user.isOnline && (
                      <div className="absolute bottom-0 right-0">
                        <FaCircle className="text-green-500 text-xs" />
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">{user.nickname}</h3>
                    <div className="flex mt-1">
                      {getStarRating(user.compatibilityScore)}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm line-clamp-2">{user.bio}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">관심사</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.interests.slice(0, 3).map((interest, index) => (
                      <span 
                        key={index} 
                        className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full"
                      >
                        {interest}
                      </span>
                    ))}
                    {user.interests.length > 3 && (
                      <span className="text-gray-500 text-xs px-2 py-1">
                        +{user.interests.length - 3}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <span 
                      className={`font-medium ${user.isOnline ? 'text-green-600' : 'text-gray-500'}`}
                    >
                      {user.isOnline ? '온라인' : '오프라인'}
                    </span>
                  </div>
                  <Link 
                    href={`/chat?userId=${user.id}`}
                    className="flex items-center text-indigo-600 hover:text-indigo-800"
                  >
                    <FaCommentDots className="mr-1" />
                    <span className="text-sm font-medium">채팅하기</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 