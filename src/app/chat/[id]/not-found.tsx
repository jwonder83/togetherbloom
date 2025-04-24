import Link from 'next/link';

export default function ChatNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">채팅방을 찾을 수 없습니다</h1>
      <p className="text-gray-600 mb-8">요청하신 채팅방이 존재하지 않거나 접근 권한이 없습니다.</p>
      <Link href="/chat" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
        채팅 목록으로 돌아가기
      </Link>
    </div>
  );
} 