'use client';

import Link from 'next/link';

// 더미 데이터
const similarGroups = [
  {
    id: '101',
    name: '파이썬 개발자 그룹',
    description: '파이썬을 사용한 프로젝트를 함께 만들어요',
    keywords: ['개발', '파이썬', '코딩'],
    participants: 32,
  },
  {
    id: '102',
    name: '서울 IT 네트워킹',
    description: 'IT 업계에서 일하는 사람들의 네트워킹',
    keywords: ['IT', '네트워킹', '개발자'],
    participants: 65,
  },
  {
    id: '103',
    name: '주니어 개발자 모임',
    description: '경력 3년 미만 개발자들의 정보 공유 모임',
    keywords: ['개발', '주니어', '스터디'],
    participants: 48,
  },
];

interface SimilarGroupsProps {
  keywords: string[];
}

export default function SimilarGroups({ keywords }: SimilarGroupsProps) {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-bold mb-4">유사한 모임 추천</h2>
      <div className="space-y-6">
        {similarGroups.map((group) => (
          <Link key={group.id} href={`/group/${group.id}`}>
            <div className="card hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-lg mb-2">{group.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{group.description}</p>
              <div className="flex flex-wrap gap-2 my-3">
                {group.keywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className={`${
                      keywords.includes(keyword)
                        ? 'bg-primary text-white'
                        : 'bg-moduleBg'
                    } px-3 py-1.5 text-xs rounded-full`}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                참여자 {group.participants}명
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
} 