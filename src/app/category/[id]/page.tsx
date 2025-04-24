import KeywordInput from '@/components/KeywordInput';
import SimilarGroups from '@/components/SimilarGroups';
import { notFound } from 'next/navigation';

// 카테고리 데이터
const categories = [
  { id: '1', name: '여행' },
  { id: '2', name: '요리' },
  { id: '3', name: '독서' },
  { id: '4', name: '음악' },
  { id: '5', name: '운동' },
  { id: '6', name: '개발' },
  { id: '7', name: '커리어' },
  { id: '8', name: '예술' },
  { id: '9', name: '게임' },
];

// 정적 내보내기를 위해 생성할 경로 지정
export function generateStaticParams() {
  return categories.map((category) => ({
    id: category.id,
  }));
}

interface CategoryPageProps {
  params: {
    id: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find((c) => c.id === params.id);

  if (!category) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <KeywordInput category={category} />
      <div className="p-4">
        <SimilarGroups keywords={[category.name]} />
      </div>
    </div>
  );
} 