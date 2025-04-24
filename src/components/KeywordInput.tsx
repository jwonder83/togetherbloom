'use client';

import { useState } from 'react';
import { FaTimes, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

interface KeywordInputProps {
  category: {
    id: string;
    name: string;
  };
}

export default function KeywordInput({ category }: KeywordInputProps) {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddKeyword = () => {
    if (inputValue.trim() && !keywords.includes(inputValue.trim())) {
      setKeywords([...keywords, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    setKeywords(keywords.filter(keyword => keyword !== keywordToRemove));
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <Link href="/" className="text-gray-600 mr-4">
          <FaArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold">{category.name}</h1>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="관심사를 입력해주세요!"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm"
            onClick={handleAddKeyword}
          >
            추가
          </button>
        </div>

        {keywords.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {keywords.map((keyword, index) => (
              <div
                key={index}
                className="flex items-center bg-moduleBg rounded-full px-3 py-1"
              >
                <span className="text-sm">{keyword}</span>
                <button
                  className="ml-2 text-gray-500"
                  onClick={() => removeKeyword(keyword)}
                >
                  <FaTimes size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {keywords.length > 0 && (
        <Link
          href={`/match?category=${category.id}&keywords=${keywords.join(',')}`}
          className="btn-primary w-full flex justify-center"
        >
          매칭 시작하기
        </Link>
      )}
    </div>
  );
} 