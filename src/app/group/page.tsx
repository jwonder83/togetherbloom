'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaSearch, FaFilter, FaTimes, FaMapMarkerAlt, FaCalendarAlt, FaUsers } from 'react-icons/fa';
import Header from '@/components/Header';
import RecommendedGroups from '@/components/RecommendedGroups';
import CreateGroupButton from '@/components/CreateGroupButton';

// 더미 그룹 데이터
const allGroups = [
  {
    id: '1',
    name: '서울 맛집 탐방단',
    description: '서울의 숨겨진 맛집을 함께 탐방하는 모임입니다.',
    keywords: ['맛집', '서울', '음식'],
    participants: 24,
    meetingDays: '매주 토요일',
    location: '서울 전역',
    image: 'https://images.unsplash.com/photo-1496412705862-e0088f16f791?q=80&w=1470&auto=format&fit=crop'
  },
  {
    id: '2',
    name: '개발자 네트워킹',
    description: '개발자들이 모여 정보를 공유하고 네트워킹하는 모임입니다.',
    keywords: ['개발', '프로그래밍', '네트워킹'],
    participants: 45,
    meetingDays: '격주 수요일',
    location: '강남 코워킹스페이스',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470&auto=format&fit=crop'
  },
  {
    id: '3',
    name: '주말 등산 모임',
    description: '서울 근교의 산을 함께 등반하며 건강을 챙기는 모임입니다.',
    keywords: ['등산', '아웃도어', '건강'],
    participants: 18,
    meetingDays: '매주 일요일 오전',
    location: '서울 근교',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1470&auto=format&fit=crop'
  },
  {
    id: '4',
    name: '독서토론 모임',
    description: '다양한 장르의 책을 읽고 토론하는 모임입니다.',
    keywords: ['독서', '토론', '문학'],
    participants: 12,
    meetingDays: '매월 마지막 주 토요일',
    location: '강남 카페',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop'
  },
  {
    id: '5',
    name: '영어 회화 스터디',
    description: '영어 실력 향상을 위한 회화 중심 스터디 그룹입니다.',
    keywords: ['영어', '회화', '스터디'],
    participants: 15,
    meetingDays: '매주 화, 목요일',
    location: '홍대 스터디 카페',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1470&auto=format&fit=crop'
  },
  {
    id: '6',
    name: '주식 투자 모임',
    description: '주식 정보를 공유하고 투자 전략을 논의하는 모임입니다.',
    keywords: ['주식', '투자', '재테크'],
    participants: 30,
    meetingDays: '매주 월요일 저녁',
    location: '여의도',
    image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1470&auto=format&fit=crop'
  },
  {
    id: '7',
    name: '사진 촬영 동호회',
    description: '다양한 장소에서 사진 촬영을 즐기는 동호회입니다.',
    keywords: ['사진', '촬영', '카메라'],
    participants: 22,
    meetingDays: '격주 토요일',
    location: '서울 전역',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1464&auto=format&fit=crop'
  },
  {
    id: '8',
    name: '보드게임 모임',
    description: '다양한 보드게임을 즐기는 모임입니다.',
    keywords: ['보드게임', '게임', '친목'],
    participants: 16,
    meetingDays: '매주 금요일 저녁',
    location: '건대입구',
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=1431&auto=format&fit=crop'
  }
];

// 카테고리 데이터
const categories = ['전체', '맛집', '개발', '독서', '운동', '학습', '투자', '취미', '친목'];

export default function GroupsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  
  // 검색어와 카테고리로 필터링
  const filteredGroups = allGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === '전체' || 
                           group.keywords.some(keyword => keyword === selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-1">
        {/* 추천 모임 섹션 */}
        <RecommendedGroups />
        
        {/* 모임 검색 및 필터 */}
        <div className="px-4 py-2 bg-white sticky top-0 z-10 shadow-sm">
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="모임 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:border-primary focus:outline-none"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <FaTimes />
              </button>
            )}
          </div>
          
          {/* 카테고리 선택 */}
          <div className="flex overflow-x-auto no-scrollbar py-2 space-x-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-moduleBg text-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* 모든 모임 목록 */}
        <section className="px-4 py-6 bg-gray-50">
          <h2 className="text-lg font-bold mb-4">모든 모임</h2>
          
          {filteredGroups.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">검색 결과가 없습니다</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredGroups.map((group) => (
                <Link key={group.id} href={`/group/${group.id}`}>
                  <div className="bg-white rounded-xl shadow-sm p-4 flex hover:shadow-md transition-shadow">
                    <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden relative">
                      <Image 
                        src={group.image} 
                        alt={group.name} 
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                        priority={true}
                        quality={85}
                        unoptimized={false}
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-bold text-lg">{group.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mt-1">{group.description}</p>
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        {group.keywords.map((keyword, idx) => (
                          <span key={idx} className="text-xs bg-moduleBg rounded-full px-2 py-0.5">
                            {keyword}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center text-xs text-gray-500 mt-2 space-x-3">
                        <div className="flex items-center">
                          <FaUsers className="mr-1" />
                          <span>{group.participants}명</span>
                        </div>
                        <div className="flex items-center">
                          <FaCalendarAlt className="mr-1" />
                          <span>{group.meetingDays}</span>
                        </div>
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="mr-1" />
                          <span>{group.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      
      {/* 모임 생성 버튼 */}
      <CreateGroupButton />
    </div>
  );
} 