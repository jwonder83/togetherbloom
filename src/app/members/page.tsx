'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import { FaArrowLeft, FaSearch, FaTimes, FaFilter, FaUser, FaMapMarkerAlt, FaHeart, FaStar } from 'react-icons/fa';

// 회원 데이터
const allMembers = [
  {
    id: '1',
    name: '김민준',
    keywords: ['개발', '음악', '게임'],
    profileImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    role: '프론트엔드 개발자',
    location: '서울 강남구',
    temperature: 36.5,
    lastActive: '오늘',
    level: '싹수 좋은 멤버',
    follower: 125,
    posts: 24,
    description: '웹 개발과 음악을 좋아하는 개발자입니다.'
  },
  {
    id: '2',
    name: '이지현',
    keywords: ['요리', '여행', '독서'],
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    role: '푸드 블로거',
    location: '서울 마포구',
    temperature: 37.2,
    lastActive: '어제',
    level: '활발한 멤버',
    follower: 283,
    posts: 45,
    description: '음식을 만들고 여행하며 맛집을 탐방하는 것을 좋아합니다.'
  },
  {
    id: '3',
    name: '박준호',
    keywords: ['운동', '여행', '게임'],
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    role: '피트니스 트레이너',
    location: '서울 송파구',
    temperature: 36.8,
    lastActive: '2일 전',
    level: '열정적인 멤버',
    follower: 97,
    posts: 18,
    description: '헬스트레이너로 활동하고 있습니다. 운동, 건강 관련 정보 공유해요.'
  },
  {
    id: '4',
    name: '최서연',
    keywords: ['예술', '독서', '음악'],
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    role: '그래픽 디자이너',
    location: '서울 성동구',
    temperature: 37.5,
    lastActive: '오늘',
    level: '창의적인 멤버',
    follower: 165,
    posts: 31,
    description: '그래픽 디자이너로 일하고 있으며, 예술 전시회를 보러 다니는 것을 좋아합니다.'
  },
  {
    id: '5',
    name: '정현우',
    keywords: ['개발', '커리어', '독서'],
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    role: '백엔드 개발자',
    location: '경기 분당구',
    temperature: 36.9,
    lastActive: '어제',
    level: '성실한 멤버',
    follower: 112,
    posts: 15,
    description: '백엔드 개발자로 일하고 있으며, 새로운 기술 학습과 개발자 커뮤니티 활동에 관심이 많습니다.'
  },
  {
    id: '6',
    name: '강지원',
    keywords: ['여행', '음악', '요리'],
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    role: '여행 작가',
    location: '서울 종로구',
    temperature: 37.1,
    lastActive: '3일 전',
    level: '탐험적인 멤버',
    follower: 248,
    posts: 76,
    description: '세계 각국을 여행하며 블로그에 여행기를 작성하고 있습니다.'
  },
  {
    id: '7',
    name: '한소희',
    keywords: ['예술', '독서', '요리'],
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    role: '일러스트레이터',
    location: '서울 용산구',
    temperature: 37.3,
    lastActive: '오늘',
    level: '색다른 멤버',
    follower: 193,
    posts: 42,
    description: '일러스트레이터로 활동하며, 그림 그리기와 독서를 좋아합니다.'
  },
  {
    id: '8',
    name: '임재준',
    keywords: ['개발', '게임', '운동'],
    profileImage: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    role: '게임 개발자',
    location: '경기 판교',
    temperature: 36.7,
    lastActive: '어제',
    level: '게임 마스터',
    follower: 87,
    posts: 23,
    description: '게임 개발자로 일하고 있으며, 게임 플레이와 운동을 좋아합니다.'
  },
  {
    id: '9',
    name: '윤하은',
    keywords: ['음악', '댄스', '여행'],
    profileImage: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    role: '음악 강사',
    location: '서울 강서구',
    temperature: 37.4,
    lastActive: '오늘',
    level: '리듬 감각',
    follower: 156,
    posts: 28,
    description: '음악 강사로 활동하며 댄스와 여행을 좋아합니다.'
  },
  {
    id: '10',
    name: '전민석',
    keywords: ['운동', '헬스', '요리'],
    profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    role: '퍼스널 트레이너',
    location: '서울 강동구',
    temperature: 36.6,
    lastActive: '어제',
    level: '철저한 멤버',
    follower: 134,
    posts: 19,
    description: '퍼스널 트레이너로 활동하고 있으며, 헬스와 요리에 관심이 많습니다.'
  },
  {
    id: '11',
    name: '송유진',
    keywords: ['마케팅', '디자인', '여행'],
    profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    role: '마케팅 매니저',
    location: '서울 서초구',
    temperature: 37.0,
    lastActive: '오늘',
    level: '전략적인 멤버',
    follower: 178,
    posts: 33,
    description: '마케팅 매니저로 일하며 디자인과 여행에 관심이 많습니다.'
  },
  {
    id: '12',
    name: '오성민',
    keywords: ['사진', '여행', '카페'],
    profileImage: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    role: '사진작가',
    location: '서울 중구',
    temperature: 36.8,
    lastActive: '3일 전',
    level: '관찰력 높은 멤버',
    follower: 221,
    posts: 58,
    description: '사진작가로 활동하며 여행과 카페 탐방을 즐깁니다.'
  }
];

// 카테고리 필터 옵션
const categories = [
  '전체', '개발', '디자인', '음악', '요리', '여행', '운동', 
  '독서', '게임', '예술', '마케팅', '사진'
];

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [showFilter, setShowFilter] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // 검색어와 카테고리에 따라 회원 필터링
  const filteredMembers = allMembers.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === '전체' || 
      member.keywords.includes(selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-1 max-w-6xl mx-auto w-full">
        {/* 상단 검색바 */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex justify-between items-center mb-3">
            <Link href="/" className="text-gray-700">
              <FaArrowLeft size={18} />
            </Link>
            <h1 className="text-xl font-bold">회원 목록</h1>
            <div className="flex items-center space-x-2">
              <button 
                className={`w-8 h-8 flex items-center justify-center rounded ${viewMode === 'grid' ? 'bg-blue-50 text-primary' : 'text-gray-500'}`}
                onClick={() => setViewMode('grid')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </button>
              <button 
                className={`w-8 h-8 flex items-center justify-center rounded ${viewMode === 'list' ? 'bg-blue-50 text-primary' : 'text-gray-500'}`}
                onClick={() => setViewMode('list')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-12 py-3 bg-gray-100 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="이름, 역할, 지역, 소개 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                className="absolute inset-y-0 right-12 flex items-center text-gray-400"
                onClick={() => setSearchQuery('')}
              >
                <FaTimes />
              </button>
            )}
            <button 
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              onClick={() => setShowFilter(!showFilter)}
            >
              <FaFilter size={18} />
            </button>
          </div>
        </div>
        
        {/* 필터 영역 */}
        {showFilter && (
          <div className="bg-white border-b border-gray-200 px-4 py-3">
            <h3 className="font-medium mb-3">관심사 필터</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  className={`px-3 py-1.5 rounded-full text-sm ${
                    selectedCategory === category 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* 필터 결과 요약 */}
        {(selectedCategory !== '전체' || searchQuery) && (
          <div className="sticky top-16 z-5 bg-gray-50 px-4 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {filteredMembers.length}명의 회원
                {selectedCategory !== '전체' && <span> · {selectedCategory}</span>}
                {searchQuery && <span> · "{searchQuery}"</span>}
              </span>
              <button 
                className="text-primary text-sm font-medium"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('전체');
                }}
              >
                필터 초기화
              </button>
            </div>
          </div>
        )}
        
        {/* 회원 리스트 */}
        {filteredMembers.length > 0 ? (
          <div className={`p-4 ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}`}>
            {filteredMembers.map(member => (
              <Link
                key={member.id}
                href={`/profile/${member.id}`}
                className={`block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow ${viewMode === 'list' ? 'p-4' : ''}`}
              >
                {viewMode === 'grid' ? (
                  <div className="overflow-hidden">
                    <div className="relative w-full pb-[100%]">
                      <Image
                        src={member.profileImage}
                        alt={member.name}
                        fill
                        className="object-cover absolute inset-0"
                      />
                      <div className="absolute top-3 right-3 bg-white rounded-full p-1.5">
                        <FaHeart className="text-gray-400 hover:text-red-500" size={16} />
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h2 className="font-bold">{member.name}</h2>
                          <p className="text-gray-500 text-sm">{member.level}</p>
                        </div>
                        <div className="flex items-center text-primary">
                          <FaStar className="mr-1" size={14} />
                          <span className="font-medium">{member.temperature}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm mb-2 line-clamp-2">{member.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-xs text-gray-500">
                          <FaMapMarkerAlt className="mr-1" size={12} />
                          <span>{member.location}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          <span>팔로워 {member.follower}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden">
                      <Image
                        src={member.profileImage}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="font-bold">{member.name}</h2>
                          <p className="text-gray-500 text-sm">{member.level}</p>
                        </div>
                        <div className="flex items-center text-primary">
                          <FaStar className="mr-1" size={14} />
                          <span className="font-medium">{member.temperature}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm my-1 line-clamp-1">{member.description}</p>
                      <div className="flex justify-between items-center mt-1">
                        <div className="flex items-center text-xs text-gray-500">
                          <FaMapMarkerAlt className="mr-1" size={12} />
                          <span>{member.location}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          <span>게시글 {member.posts}</span>
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {member.keywords.map(keyword => (
                          <span 
                            key={keyword} 
                            className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-4">
            <div className="py-16 text-center bg-white rounded-lg">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUser className="text-gray-400" size={24} />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">검색 결과가 없습니다</h3>
              <p className="text-gray-500 mb-6">다른 검색어나 필터 조건을 사용해보세요</p>
              <button 
                className="px-4 py-2 bg-primary text-white rounded-md"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('전체');
                }}
              >
                필터 초기화
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 