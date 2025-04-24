'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaCheckCircle, FaSearch } from 'react-icons/fa';
import styles from './CategorySelector.module.css';

// 카테고리 데이터
const categories = [
  { 
    id: '1', 
    name: '여행', 
    imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    colorClass: styles.categoryColor1 // CSS 모듈 클래스 참조
  },
  { 
    id: '2', 
    name: '요리', 
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    colorClass: styles.categoryColor2
  },
  { 
    id: '3', 
    name: '독서', 
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    colorClass: styles.categoryColor3
  },
  { 
    id: '4', 
    name: '음악', 
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    colorClass: styles.categoryColor4
  },
  { 
    id: '5', 
    name: '운동', 
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    colorClass: styles.categoryColor5
  },
  { 
    id: '6', 
    name: '개발', 
    imageUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    colorClass: styles.categoryColor6
  },
  { 
    id: '7', 
    name: '커리어', 
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
    colorClass: styles.categoryColor7
  },
  { 
    id: '8', 
    name: '예술', 
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1490&q=80',
    colorClass: styles.categoryColor8
  },
  { 
    id: '9', 
    name: '게임', 
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    colorClass: styles.categoryColor9
  },
];

export default function CategorySelector() {
  // 선택된 카테고리들을 관리
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  // 키워드 입력 관리
  const [keyword, setKeyword] = useState('');

  // 카테고리 선택/해제 핸들러
  const toggleCategory = (id: string) => {
    setSelectedCategories(prev => 
      prev.includes(id) 
        ? prev.filter(catId => catId !== id) 
        : [...prev, id]
    );
  };

  // 선택된 카테고리와 키워드 기반으로 URL 생성
  const getSearchUrl = () => {
    const params = new URLSearchParams();
    
    if (selectedCategories.length > 0) {
      params.append('keywords', selectedCategories.join(','));
    }
    
    if (keyword.trim()) {
      params.append('query', keyword.trim());
    }
    
    const queryString = params.toString();
    return queryString ? `/match?${queryString}` : '/match';
  };

  // 키워드 입력 핸들러
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  // 검색 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 기본 이벤트 방지 후 URL로 이동
    window.location.href = getSearchUrl();
  };

  return (
    <div className="bg-card py-6 px-4">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-text-primary tracking-tight">카테고리</h2>
        <Link href="/category" className="text-primary text-sm font-medium hover:underline">
          전체보기
        </Link>
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-4">
        {categories.map((category) => (
          <div 
            key={category.id}
            onClick={() => toggleCategory(category.id)}
            className="flex flex-col items-center cursor-pointer relative"
          >
            <div 
              className={`w-14 h-14 rounded-apple-lg flex items-center justify-center text-white mb-2 shadow-apple transition-transform overflow-hidden ${
                selectedCategories.includes(category.id) 
                  ? 'ring-2 ring-primary ring-offset-2 transform scale-105' 
                  : 'transform hover:scale-105'
              } ${category.colorClass}`}
            >
              <div className="relative w-full h-full">
                <Image 
                  src={category.imageUrl}
                  alt={category.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30" />
              </div>
              {selectedCategories.includes(category.id) && (
                <div className="absolute -top-1 -right-1 bg-primary rounded-full w-5 h-5 flex items-center justify-center shadow-apple z-10">
                  <FaCheckCircle className="text-white text-xs" />
                </div>
              )}
            </div>
            <span className="text-sm text-center text-text-primary font-medium">{category.name}</span>
          </div>
        ))}
      </div>

      {/* 키워드 검색 섹션 */}
      <div className="mt-7 pt-5">
        <div className="text-sm text-text-secondary mb-3 font-medium">키워드로 검색</div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <FaSearch className="text-text-quaternary" />
            </div>
            <input
              type="text"
              value={keyword}
              onChange={handleKeywordChange}
              placeholder="관심있는 키워드를 입력하세요"
              className="input-apple py-3 pl-10 pr-4 w-full"
            />
          </div>
          <button 
            type="submit"
            className="btn-apple-pill"
          >
            검색
          </button>
        </form>
      </div>

      {/* 선택된 카테고리로 검색 버튼 */}
      {selectedCategories.length > 0 && (
        <div className="flex justify-center mt-5">
          <Link 
            href={getSearchUrl()}
            className="btn-apple-pill flex items-center justify-center py-3 px-6"
          >
            {`${selectedCategories.length}개 카테고리로 검색`}
          </Link>
        </div>
      )}
      
      <div className="divider-apple mt-6"></div>
    </div>
  );
} 