'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import MatchingUserCard from '@/components/MatchingUserCard';
import { FaArrowLeft, FaUsers, FaStar, FaFilter } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

// 더미 매칭 데이터
const matchedUsers = [
  {
    id: '1',
    name: '김개발',
    introduction: '풀스택 개발자 / 여행 좋아함 / 독서 모임',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop',
    compatibilityScore: 95,
    interests: ['개발', '여행', '독서'],
    isOnline: true,
  },
  {
    id: '2',
    name: '이디자인',
    introduction: 'UX/UI 디자이너 4년차 / 음악, 미술 좋아해요',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop',
    compatibilityScore: 85,
    interests: ['디자인', '음악', '미술'],
    isOnline: false,
  },
  {
    id: '3',
    name: '박기획',
    introduction: '스타트업에서 기획자로 일하고 있어요 / 마케팅에 관심있음',
    profileImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1374&auto=format&fit=crop',
    compatibilityScore: 76,
    interests: ['기획', '마케팅', '창업'],
    isOnline: true,
  },
  {
    id: '4',
    name: '최마케팅',
    introduction: '디지털 마케팅 전문가 / 4년차 / 여행과 사진 찍기 좋아함',
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1376&auto=format&fit=crop',
    compatibilityScore: 68,
    interests: ['마케팅', '여행', '사진'],
    isOnline: true,
  },
  {
    id: '5',
    name: '정데이터',
    introduction: '데이터 분석가 / 통계학 전공 / 독서와 러닝을 즐김',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1528&auto=format&fit=crop',
    compatibilityScore: 54,
    interests: ['데이터', '통계', '독서', '운동'],
    isOnline: false,
  },
];

export default function MatchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [activeFilter, setActiveFilter] = useState('all');
  const category = typeof searchParams.category === 'string' ? searchParams.category : '';
  const keywordsParam = typeof searchParams.keywords === 'string' ? searchParams.keywords : '';
  const keywords = keywordsParam ? keywordsParam.split(',') : [];
  
  // 필터링된 사용자 목록
  const filteredUsers = activeFilter === 'all' 
    ? matchedUsers 
    : activeFilter === 'online' 
      ? matchedUsers.filter(user => user.isOnline)
      : matchedUsers.filter(user => user.compatibilityScore >= 80);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <div className="p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Link href={`/category/${category}`} className="text-text-tertiary mr-4 hover:text-text-primary transition-colors">
              <FaArrowLeft size={18} />
            </Link>
            <h1 className="text-xl font-bold text-text-primary">매칭 결과</h1>
          </div>
          
          <button className="btn-apple-secondary-small flex items-center">
            <FaFilter size={12} className="mr-1" />
            <span>상세 필터</span>
          </button>
        </div>
        
        {keywords.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {keywords.map((keyword, index) => (
              <span 
                key={index}
                className="tag-apple inline-flex items-center"
              >
                #{keyword}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center gap-2 mb-6">
          <div 
            className={`rounded-full px-4 py-2 text-sm font-medium cursor-pointer transition-colors ${
              activeFilter === 'all' 
                ? 'bg-primary text-white' 
                : 'bg-moduleBg text-text-secondary hover:bg-primary hover:bg-opacity-10'
            }`}
            onClick={() => setActiveFilter('all')}
          >
            전체 ({matchedUsers.length})
          </div>
          <div 
            className={`rounded-full px-4 py-2 text-sm font-medium cursor-pointer transition-colors ${
              activeFilter === 'online' 
                ? 'bg-primary text-white' 
                : 'bg-moduleBg text-text-secondary hover:bg-primary hover:bg-opacity-10'
            }`}
            onClick={() => setActiveFilter('online')}
          >
            현재 접속 중
          </div>
          <div 
            className={`rounded-full px-4 py-2 text-sm font-medium cursor-pointer transition-colors ${
              activeFilter === 'highScore' 
                ? 'bg-primary text-white' 
                : 'bg-moduleBg text-text-secondary hover:bg-primary hover:bg-opacity-10'
            }`}
            onClick={() => setActiveFilter('highScore')}
          >
            높은 친밀도
          </div>
        </div>

        <div className="p-4 mb-6 bg-moduleBg rounded-apple">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
              <FaUsers size={18} />
            </div>
            <div className="ml-3">
              <h2 className="text-lg font-bold text-text-primary">나와 비슷한 관심사를 가진 사람들</h2>
              <p className="text-sm text-text-tertiary">관심사와 성향이 비슷한 사람들을 만나보세요</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <div 
              key={user.id} 
              className="bg-card rounded-apple shadow-apple-sm overflow-hidden p-4 search-result-item"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={user.profileImage}
                      alt={user.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {user.isOnline && (
                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-success-color rounded-full border-2 border-white"></span>
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-text-primary text-lg">{user.name}</h3>
                    <div className="flex items-center bg-moduleBg px-2 py-1 rounded-full">
                      <FaStar size={12} className="text-yellow-500 mr-1" />
                      <span className="text-xs font-medium">{user.compatibilityScore}%</span>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary mt-1">{user.introduction}</p>
                  <div className="flex flex-wrap mt-2 gap-1">
                    {user.interests.map((interest, idx) => (
                      <span key={idx} className="text-xs bg-moduleBg text-text-tertiary px-2 py-0.5 rounded-full">#{interest}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end mt-4">
                <Link 
                  href={`/chat/${user.id}`} 
                  className="btn-apple-pill text-sm px-5 py-2"
                >
                  채팅하기
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 