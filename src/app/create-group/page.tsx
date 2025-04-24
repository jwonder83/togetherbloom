'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { FaArrowLeft, FaCamera } from 'react-icons/fa';

export default function CreateGroupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    keywords: '',
    maxParticipants: 10
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기서 API 호출 등을 통해 모임 생성 처리
    console.log('모임 생성 데이터:', formData);
    
    // 성공 후 모임 목록 페이지로 이동
    alert('모임이 성공적으로 생성되었습니다!');
    router.push('/');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <div className="flex items-center mb-6">
          <Link href="/" className="text-gray-600 mr-4">
            <FaArrowLeft />
          </Link>
          <h1 className="text-2xl font-bold">모임 개설하기</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 모임 이미지 업로드 */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer relative overflow-hidden">
              <FaCamera size={24} className="text-gray-500" />
              <input 
                type="file" 
                className="absolute inset-0 opacity-0 cursor-pointer" 
                accept="image/*"
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">모임 대표 이미지 (선택사항)</p>
          </div>
          
          {/* 모임명 */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              모임명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="모임의 이름을 입력해주세요"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          {/* 모임 소개 */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              모임 소개 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="모임에 대한 소개를 작성해주세요"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-32"
            />
          </div>
          
          {/* 키워드 */}
          <div>
            <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-1">
              키워드 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="keywords"
              name="keywords"
              value={formData.keywords}
              onChange={handleChange}
              required
              placeholder="쉼표로 구분하여 입력 (예: 여행,음악,독서)"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-gray-500 mt-1">관련 키워드를 쉼표(,)로 구분하여 입력해주세요.</p>
          </div>
          
          {/* 최대 참여 인원 */}
          <div>
            <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700 mb-1">
              최대 참여 인원
            </label>
            <select
              id="maxParticipants"
              name="maxParticipants"
              value={formData.maxParticipants}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {[5, 10, 15, 20, 30, 50, 100].map(num => (
                <option key={num} value={num}>{num}명</option>
              ))}
              <option value={0}>제한 없음</option>
            </select>
          </div>
          
          {/* 제출 버튼 */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary-dark transition-colors font-medium"
            >
              모임 개설하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 