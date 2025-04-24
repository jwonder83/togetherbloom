import Header from '@/components/Header';
import CategorySelector from '@/components/CategorySelector';
import RecommendedGroups from '@/components/RecommendedGroups';
import RecommendedMembers from '@/components/RecommendedMembers';
import CreateGroupButton from '@/components/CreateGroupButton';
import Link from 'next/link';
import { FaSearch, FaArrowRight } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 to-tertiary/10 px-6 py-12 md:py-20">
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-tertiary/10 blur-3xl"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-4 leading-tight">
            관심사 기반 모임을 <br/><span className="text-primary">찾아보세요</span>
          </h1>
          
          <p className="text-text-tertiary mb-8 text-lg max-w-xl">
            다양한 카테고리에서 나에게 맞는 모임을 발견하고 새로운 인연을 만들어보세요
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-tertiary">
                <FaSearch />
              </div>
              <input 
                type="text" 
                placeholder="관심사, 모임명으로 검색하기" 
                className="input-apple w-full pl-12 shadow-apple-sm"
              />
            </div>
            <Link href="/search" className="btn-apple-pill flex items-center justify-center gap-2 px-6 py-3 whitespace-nowrap">
              모임 찾기
              <FaArrowRight className="text-sm" />
            </Link>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-moduleBg text-text-secondary hover:bg-moduleBg/80 transition-colors cursor-pointer">
              #개발자모임
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-moduleBg text-text-secondary hover:bg-moduleBg/80 transition-colors cursor-pointer">
              #취미
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-moduleBg text-text-secondary hover:bg-moduleBg/80 transition-colors cursor-pointer">
              #독서
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-moduleBg text-text-secondary hover:bg-moduleBg/80 transition-colors cursor-pointer">
              #운동
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-moduleBg text-text-secondary hover:bg-moduleBg/80 transition-colors cursor-pointer">
              #맛집탐방
            </span>
          </div>
        </div>
      </div>
      
      <CategorySelector />
      <RecommendedGroups />
      <RecommendedMembers />
      <CreateGroupButton />
      
      <div className="py-8 bg-card px-5 mt-5">
        <div className="bg-moduleBg rounded-apple p-5 text-center">
          <h3 className="font-semibold text-text-primary mb-2">TogetherBloom</h3>
          <p className="text-sm text-text-tertiary mb-4">
            모든 사람을 위한 커뮤니티 플랫폼
          </p>
          <p className="text-xs text-text-quaternary">© 2023 TogetherBloom. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
} 