'use client';

interface ChatMessageProps {
  message: {
    id: number;
    text: string;
    sender: 'me' | 'other';
    timestamp: string;
  };
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isMyMessage = message.sender === 'me';

  return (
    <div className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
          isMyMessage 
            ? 'bg-primary text-white rounded-tr-none' 
            : 'bg-moduleBg text-gray-800 rounded-tl-none'
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <p className={`text-xs mt-1 ${isMyMessage ? 'text-blue-100' : 'text-gray-500'}`}>
          {message.timestamp}
        </p>
      </div>
    </div>
  );
} 