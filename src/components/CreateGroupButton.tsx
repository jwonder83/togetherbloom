'use client';

import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

export default function CreateGroupButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <Link 
        href="/create-group" 
        className="flex items-center justify-center rounded-full p-3 w-14 h-14 transform hover:scale-[1.05] active:scale-[0.98] transition-all duration-300 text-white bg-gradient-to-br from-[#23395B] to-[#345689] shadow-lg"
      >
        <FaPlus size={22} />
        <span className="sr-only">모임 개설하기</span>
      </Link>
      
      {/* 모바일에서 버튼 설명 툴팁 */}
      <div 
        className="absolute -top-10 right-0 text-xs px-3 py-1.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-white bg-[#23395B] shadow-md"
      >
        모임 개설하기
      </div>
    </div>
  );
} 