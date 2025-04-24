export default function ChatLoading() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">채팅방을 불러오는 중...</p>
      </div>
    </div>
  );
} 