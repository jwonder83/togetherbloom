import Header from '@/components/Header';
import Link from 'next/link';
import CategorySelector from '@/components/CategorySelector';

export const metadata = {
  title: '카테고리 선택 - 함께 성장하는 커뮤니티',
  description: '관심 있는 카테고리를 선택하여 모임에 참여해보세요',
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          돌아가기
        </Link>
        
        <div className="bg-white shadow-sm rounded-xl p-8 mb-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-3xl font-bold mb-4">관심 카테고리 선택</h1>
            <p className="text-gray-600 text-lg">
              관심있는 카테고리를 선택하고 같은 관심사를 가진 커뮤니티 멤버들과 연결해보세요.
              다양한 카테고리에서 자유롭게 활동할 수 있습니다.
            </p>
          </div>
          
          <CategorySelector />
        </div>
        
        <div className="bg-white shadow-sm rounded-xl p-8">
          <h2 className="text-xl font-bold mb-4">카테고리 선택 Tip</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
              <div className="text-green-500 font-bold text-lg mb-2">다양한 선택</div>
              <p className="text-gray-600">여러 카테고리를 선택하면 더 많은 매칭 기회를 얻을 수 있어요.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
              <div className="text-blue-500 font-bold text-lg mb-2">활발한 카테고리</div>
              <p className="text-gray-600">참여자가 많은 카테고리에서 더 활발한 교류를 경험할 수 있어요.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
              <div className="text-purple-500 font-bold text-lg mb-2">새로운 시도</div>
              <p className="text-gray-600">익숙하지 않은 카테고리도 도전해보세요. 새로운 취미를 발견할 수 있어요.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 