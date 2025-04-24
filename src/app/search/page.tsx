'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Link from 'next/link';
import Image from 'next/image';
import { FaSearch, FaTimes, FaFilter, FaUsers, FaStar, FaUserPlus } from 'react-icons/fa';

// 더미 검색 결과 데이터
const dummyGroups = [
  {
    id: '1',
    name: '서울 개발자 네트워킹',
    description: '서울에서 개발자들의 네트워킹과 기술 공유를 위한 모임입니다.',
    category: '개발',
    imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    memberCount: 245,
    rating: 4.8,
    tags: ['프로그래밍', '네트워킹', '기술', '서울'],
  },
  {
    id: '2',
    name: '주말 등산 모임',
    description: '주말마다 다양한 산을 함께 오르며 건강과 친목을 도모합니다.',
    category: '운동',
    imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    memberCount: 178,
    rating: 4.6,
    tags: ['등산', '아웃도어', '건강', '주말'],
  },
  {
    id: '3',
    name: '독서토론 클럽',
    description: '매월 한 권의 책을 선정하여 함께 읽고 토론하는 모임입니다.',
    category: '독서',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80',
    memberCount: 92,
    rating: 4.9,
    tags: ['독서', '토론', '문학', '지식'],
  },
  {
    id: '4',
    name: '맛집 탐방단',
    description: '서울과 경기 지역의 숨은 맛집을 찾아다니는 모임입니다.',
    category: '요리',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    memberCount: 156,
    rating: 4.7,
    tags: ['맛집', '음식', '탐방', '서울'],
  },
  {
    id: '5',
    name: '비기너 클래식 음악 감상',
    description: '클래식 음악을 처음 접하는 분들과 함께 다양한 작품을 감상합니다.',
    category: '음악',
    imageUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    memberCount: 68,
    rating: 4.5,
    tags: ['클래식', '음악감상', '입문', '문화'],
  },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(query);
  const [filters, setFilters] = useState({ category: '', minMembers: 0 });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchResults, setSearchResults] = useState(dummyGroups);

  // 검색어가 변경될 때 검색 결과 업데이트
  useEffect(() => {
    if (query) {
      performSearch(query);
    } else {
      setSearchResults(dummyGroups);
    }
  }, [query]);

  // 검색 실행 함수
  const performSearch = (term: string) => {
    // 실제 구현에서는 API 호출 등으로 대체
    const filtered = dummyGroups.filter(group => 
      group.name.toLowerCase().includes(term.toLowerCase()) || 
      group.description.toLowerCase().includes(term.toLowerCase()) ||
      group.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase()))
    );
    setSearchResults(filtered);
  };

  // 검색 제출 핸들러
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // URL 파라미터 업데이트
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  // 필터 적용 핸들러
  const applyFilters = () => {
    let filtered = [...dummyGroups];
    
    if (filters.category) {
      filtered = filtered.filter(group => 
        group.category.toLowerCase() === filters.category.toLowerCase()
      );
    }
    
    if (filters.minMembers > 0) {
      filtered = filtered.filter(group => group.memberCount >= filters.minMembers);
    }
    
    if (query) {
      filtered = filtered.filter(group => 
        group.name.toLowerCase().includes(query.toLowerCase()) || 
        group.description.toLowerCase().includes(query.toLowerCase()) ||
        group.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    }
    
    setSearchResults(filtered);
    setIsFilterOpen(false);
  };

  // 필터 초기화
  const resetFilters = () => {
    setFilters({ category: '', minMembers: 0 });
    setIsFilterOpen(false);
    if (query) {
      performSearch(query);
    } else {
      setSearchResults(dummyGroups);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary mb-2">검색</h1>
          <p className="text-text-secondary text-sm">
            {query 
              ? `'${query}' 검색 결과 (${searchResults.length}개)`
              : '모임 이름, 설명 또는 키워드로 검색하세요'
            }
          </p>
        </div>
        
        {/* 검색 폼 */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <FaSearch className="text-text-quaternary" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="모임 이름, 관심사 등으로 검색"
                className="input-apple py-3 pl-10 pr-4 w-full"
                autoFocus={!query}
              />
              {searchTerm && (
                <button 
                  type="button" 
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setSearchTerm('')}
                >
                  <FaTimes className="text-text-quaternary" />
                </button>
              )}
            </div>
            <button 
              type="submit"
              className="btn-apple-pill px-5"
            >
              검색
            </button>
            <button 
              type="button"
              className="btn-apple-secondary-pill flex items-center justify-center w-12"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              aria-label="필터"
            >
              <FaFilter />
            </button>
          </div>
        </form>
        
        {/* 필터 패널 */}
        {isFilterOpen && (
          <div className="bg-moduleBg rounded-xl p-4 mb-6 shadow-apple-sm">
            <h3 className="font-medium mb-3 text-text-primary">필터</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-text-secondary mb-1">카테고리</label>
                <select 
                  className="input-apple w-full"
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                >
                  <option value="">전체 카테고리</option>
                  <option value="개발">개발</option>
                  <option value="운동">운동</option>
                  <option value="독서">독서</option>
                  <option value="요리">요리</option>
                  <option value="음악">음악</option>
                  <option value="예술">예술</option>
                  <option value="여행">여행</option>
                  <option value="게임">게임</option>
                  <option value="커리어">커리어</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-text-secondary mb-1">최소 멤버 수</label>
                <input 
                  type="range" 
                  min="0" 
                  max="300" 
                  step="10"
                  value={filters.minMembers}
                  onChange={(e) => setFilters({...filters, minMembers: parseInt(e.target.value)})}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-text-tertiary">
                  <span>0</span>
                  <span>{filters.minMembers}명</span>
                  <span>300+</span>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button" 
                  className="btn-apple-secondary-pill px-4"
                  onClick={resetFilters}
                >
                  초기화
                </button>
                <button 
                  type="button" 
                  className="btn-apple-pill px-4"
                  onClick={applyFilters}
                >
                  적용하기
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* 검색 결과 목록 */}
        {searchResults.length > 0 ? (
          <div className="space-y-4">
            {searchResults.map((group, index) => (
              <Link href={`/group/${group.id}`} key={group.id} className="block search-result-item" style={{ opacity: 0 }}>
                <div className="bg-card rounded-xl overflow-hidden shadow-apple-sm hover:shadow-apple transition-shadow">
                  <div className="relative h-40 w-full">
                    <Image
                      src={group.imageUrl}
                      alt={group.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                      <div className="absolute bottom-2 left-3 bg-black/30 text-white text-xs px-2 py-1 rounded-full">
                        {group.category}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-text-primary text-lg mb-1">{group.name}</h3>
                    <p className="text-text-secondary text-sm mb-3 line-clamp-2">{group.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center text-text-tertiary text-sm">
                          <FaUsers className="mr-1 text-text-quaternary" />
                          <span>{group.memberCount}</span>
                        </div>
                        <div className="flex items-center text-text-tertiary text-sm">
                          <FaStar className="mr-1 text-yellow-500" />
                          <span>{group.rating}</span>
                        </div>
                      </div>
                      <button 
                        className="btn-apple-secondary-small flex items-center justify-center"
                        aria-label="모임 참여"
                      >
                        <FaUserPlus size={14} />
                        <span className="ml-1 text-xs">참여</span>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-moduleBg rounded-full mb-4">
              <FaSearch className="text-text-tertiary" size={24} />
            </div>
            <h3 className="text-text-primary font-medium mb-2">검색 결과가 없습니다</h3>
            <p className="text-text-secondary text-sm mb-4">다른 검색어나 필터 조건으로 시도해보세요</p>
            <button 
              onClick={resetFilters}
              className="btn-apple-secondary-pill px-4"
            >
              필터 초기화
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 