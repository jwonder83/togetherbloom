'use client';

import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

// 네이비-골드 스타일 정의
const styles = {
  navy: '#23395B',
  gold: '#FFD700',
  gradient: 'linear-gradient(135deg, #23395B, #345689)',
  buttonShadow: '0 6px 16px rgba(35, 57, 91, 0.3)'
};

export default function CreateGroupButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <Link 
        href="/create-group" 
        className="flex items-center justify-center rounded-full p-3 w-14 h-14 transform hover:scale-[1.05] active:scale-[0.98] transition-all duration-300 text-white"
        style={{
          background: styles.gradient,
          boxShadow: styles.buttonShadow
        }}
      >
        <FaPlus size={22} />
        <span className="sr-only">모임 개설하기</span>
      </Link>
      
      {/* 모바일에서 버튼 설명 툴팁 */}
      <div 
        className="absolute -top-10 right-0 text-xs px-3 py-1.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-white"
        style={{
          background: styles.navy,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
        }}
      >
        모임 개설하기
      </div>
    </div>
  );
} 