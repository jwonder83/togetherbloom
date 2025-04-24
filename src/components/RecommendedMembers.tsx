'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaUser, FaArrowRight, FaCode, FaUtensils, FaRunning, FaPalette, FaServer, FaPlane, FaMusic, FaGamepad } from 'react-icons/fa';

// 회원 데이터 타입 정의
interface Member {
  id: string;
  name: string;
  keywords: string[];
  profileImage: string;
  role?: string;
  bgColor?: string;
}

// 샘플 회원 데이터 (확실히 작동하는 Unsplash 이미지로 업데이트)
const members: Member[] = [
  {
    id: '1',
    name: '김민준',
    keywords: ['개발', '음악', '게임'],
    profileImage: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5',
    role: '프론트엔드 개발자',
    bgColor: '#007AFF' // 애플 블루
  },
  {
    id: '2',
    name: '이지현',
    keywords: ['요리', '여행', '독서'],
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
    role: '푸드 블로거',
    bgColor: '#FF9500' // 애플 오렌지
  },
  {
    id: '3',
    name: '박준호',
    keywords: ['운동', '여행', '게임'],
    profileImage: 'https://images.unsplash.com/photo-1552058544-f2b08422138a',
    role: '피트니스 트레이너',
    bgColor: '#34C759' // 애플 그린
  },
  {
    id: '4',
    name: '최서연',
    keywords: ['예술', '독서', '음악'],
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    role: '그래픽 디자이너',
    bgColor: '#FF2D55' // 애플 핑크
  },
  {
    id: '5',
    name: '정현우',
    keywords: ['개발', '커리어', '독서'],
    profileImage: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c',
    role: '백엔드 개발자',
    bgColor: '#5856D6' // 애플 퍼플
  },
  {
    id: '6',
    name: '강지원',
    keywords: ['여행', '음악', '요리'],
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
    role: '여행 작가',
    bgColor: '#5AC8FA' // 애플 라이트 블루
  },
  {
    id: '7',
    name: '한소희',
    keywords: ['예술', '독서', '요리'],
    profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
    role: '일러스트레이터',
    bgColor: '#AF52DE' // 애플 퍼플
  },
  {
    id: '8',
    name: '임재준',
    keywords: ['개발', '게임', '운동'],
    profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
    role: '게임 개발자',
    bgColor: '#FF3B30' // 애플 레드
  }
];

// 사용자 키워드에 따른 아이콘 매핑
const keywordIcons = {
  '개발': <FaCode />,
  '요리': <FaUtensils />,
  '운동': <FaRunning />,
  '예술': <FaPalette />,
  '백엔드': <FaServer />,
  '여행': <FaPlane />,
  '음악': <FaMusic />,
  '게임': <FaGamepad />
};

export default function RecommendedMembers() {
  // 키워드에 따른 아이콘 반환
  const getIconForKeyword = (keyword: string) => {
    return keywordIcons[keyword as keyof typeof keywordIcons] || <FaUser />;
  };

  return (
    <div className="bg-card py-6 px-4 mt-2">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-text-primary tracking-tight">추천 회원</h2>
        <Link href="/members" className="text-primary text-sm flex items-center font-medium hover:underline">
          더보기 <FaArrowRight className="ml-1 text-xs" />
        </Link>
      </div>
      
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-4">
        {members.map((member) => (
          <Link 
            key={member.id}
            href={`/profile/${member.id}`}
            className="flex flex-col items-center group"
          >
            <div 
              className="avatar-apple w-16 h-16 group-hover:border-primary transition-all transform group-hover:scale-105 overflow-hidden"
              style={{ backgroundColor: member.bgColor }}
            >
              <Image
                src={member.profileImage}
                alt={member.name}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </div>
            <span className="text-sm font-medium mt-2 text-center text-text-primary">{member.name}</span>
            <span className="text-xs text-text-tertiary mt-0.5 text-center">{member.keywords[0]}</span>
          </Link>
        ))}
      </div>
      
      <div className="mt-6 bg-moduleBg rounded-apple p-4">
        <h3 className="text-sm font-medium text-text-primary mb-2">나의 관심사와 비슷한 회원을 찾아보세요</h3>
        <Link href="/match" className="btn-apple-pill text-sm inline-flex">
          매칭하러 가기
        </Link>
      </div>
    </div>
  );
} 