'use client';

import { useState } from 'react';
import { FaPaperPlane, FaSmile, FaImage } from 'react-icons/fa';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white">
      <div className="flex items-center">
        <button 
          type="button" 
          className="text-gray-500 p-2"
          aria-label="이모티콘"
        >
          <FaSmile size={22} />
        </button>
        <button 
          type="button" 
          className="text-gray-500 p-2 mr-2"
          aria-label="이미지 첨부"
        >
          <FaImage size={22} />
        </button>
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지를 입력하세요..."
            className="w-full py-2 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button
          type="submit"
          className="ml-2 p-2 bg-primary text-white rounded-full disabled:opacity-50"
          disabled={!message.trim()}
          aria-label="메시지 보내기"
        >
          <FaPaperPlane size={18} />
        </button>
      </div>
    </form>
  );
} 