import Link from 'next/link';
import { ProfileClient } from './ProfileClient';

// 샘플 회원 데이터
const members = [
  {
    id: '1',
    name: '김민준',
    keywords: ['개발', '음악', '게임'],
    profileImage: `https://i.pravatar.cc/300?img=1`,
    role: '프론트엔드 개발자',
    location: '서울 강남구',
    joinDate: '2023년 5월',
    bio: '안녕하세요! 웹 개발과 음악을 좋아하는 개발자입니다. 다양한 프로젝트와 취미 활동을 통해 새로운 인연을 만들고 싶어요.',
    groups: ['개발자 네트워킹', '음악 감상 모임'],
    temperature: 36.5,
    responseRate: 95,
    lastActive: '오늘',
    activityLevel: '매우 활발함',
    follower: 125,
    following: 78,
    posts: 24,
    reviewCount: 15,
    reviewScore: 4.8,
    level: '싹수 좋은 멤버'
  },
  {
    id: '2',
    name: '이지현',
    keywords: ['요리', '여행', '독서'],
    profileImage: `https://i.pravatar.cc/300?img=5`,
    role: '푸드 블로거',
    location: '서울 마포구',
    joinDate: '2023년 3월',
    bio: '음식을 만들고 여행하며 맛집을 탐방하는 것을 좋아합니다. 요리 레시피와 맛집 정보를 공유하고 싶어요!',
    groups: ['서울 맛집 탐방단', '요리 클래스']
  },
  {
    id: '3',
    name: '박준호',
    keywords: ['운동', '여행', '게임'],
    profileImage: `https://i.pravatar.cc/300?img=3`,
    role: '피트니스 트레이너',
    location: '서울 송파구',
    joinDate: '2023년 4월',
    bio: '헬스트레이너로 활동하고 있습니다. 운동, 건강, 여행에 관심이 많고 다양한 사람들과 소통하고 싶어요.',
    groups: ['헬스 동호회', '등산 모임']
  },
  {
    id: '4',
    name: '최서연',
    keywords: ['예술', '독서', '음악'],
    profileImage: `https://i.pravatar.cc/300?img=9`,
    role: '그래픽 디자이너',
    location: '서울 성동구',
    joinDate: '2023년 6월',
    bio: '그래픽 디자이너로 일하고 있으며, 예술 전시회를 보러 다니는 것을 좋아합니다. 창의적인 활동에 관심이 많아요.',
    groups: ['디자인 스터디', '미술관 투어']
  },
  {
    id: '5',
    name: '정현우',
    keywords: ['개발', '커리어', '독서'],
    profileImage: `https://i.pravatar.cc/300?img=7`,
    role: '백엔드 개발자',
    location: '경기 분당구',
    joinDate: '2023년 2월',
    bio: '백엔드 개발자로 일하고 있으며, 새로운 기술 학습과 개발자 커뮤니티 활동에 관심이 많습니다.',
    groups: ['백엔드 개발자 모임', '독서 토론']
  },
  {
    id: '6',
    name: '강지원',
    keywords: ['여행', '음악', '요리'],
    profileImage: `https://i.pravatar.cc/300?img=15`,
    role: '여행 작가',
    location: '서울 종로구',
    joinDate: '2023년 7월',
    bio: '세계 각국을 여행하며 블로그에 여행기를 작성하고 있습니다. 다양한 문화와 음식에 관심이 많아요.',
    groups: ['여행 동호회', '글쓰기 모임']
  },
  {
    id: '7',
    name: '한소희',
    keywords: ['예술', '독서', '요리'],
    profileImage: `https://i.pravatar.cc/300?img=8`,
    role: '일러스트레이터',
    location: '서울 용산구',
    joinDate: '2023년 5월',
    bio: '일러스트레이터로 활동하며, 그림 그리기와 독서를 좋아합니다. 창작 활동과 요리에 관심이 많아요.',
    groups: ['일러스트 스터디', '요리 교실']
  },
  {
    id: '8',
    name: '임재준',
    keywords: ['개발', '게임', '운동'],
    profileImage: `https://i.pravatar.cc/300?img=12`,
    role: '게임 개발자',
    location: '경기 판교',
    joinDate: '2023년 1월',
    bio: '게임 개발자로 일하고 있으며, 게임 플레이와 운동을 좋아합니다. 개발 관련 정보 공유와 네트워킹에 관심이 있어요.',
    groups: ['게임 개발자 모임', '농구 동호회']
  }
];

// 정적 내보내기를 위해 생성할 경로 지정
export function generateStaticParams() {
  return members.map((member) => ({
    id: member.id,
  }));
}

function NotFound() {
  return (
    <div className="text-center p-4">
      <h2 className="text-xl font-bold mb-2">회원을 찾을 수 없습니다.</h2>
      <Link href="/" className="text-primary">
        홈으로 돌아가기
      </Link>
    </div>
  );
}

// 서버 컴포넌트
export default function ProfilePage({ params }: { params: { id: string } }) {
  const userId = params.id;
  const member = members.find(m => m.id === userId);

  // 회원을 찾을 수 없는 경우
  if (!member) {
    return <NotFound />;
  }

  return <ProfileClient member={member} />;
} 