import { notFound } from 'next/navigation';
import GroupContent from '@/components/GroupContent';

// 더미 그룹 데이터
const groups = [
  {
    id: '1',
    name: '서울 맛집 탐방단',
    description: '서울의 숨겨진 맛집을 함께 탐방하는 모임입니다. 매주 새로운 맛집을 방문합니다.',
    keywords: ['맛집', '서울', '음식'],
    participants: 24,
    meetingDays: '매주 토요일',
    location: '서울 전역',
    image: 'https://images.unsplash.com/photo-1496412705862-e0088f16f791?q=80&w=1470&auto=format&fit=crop',
    members: [
      { id: '1', name: '김개발', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop' },
      { id: '2', name: '이디자인', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop' },
      { id: '3', name: '박기획', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1374&auto=format&fit=crop' },
    ],
  },
  {
    id: '2',
    name: '개발자 네트워킹',
    description: '개발자들이 모여 네트워킹하고 프로젝트를 함께 진행하는 모임입니다.',
    keywords: ['개발', '프로그래밍', '네트워킹'],
    participants: 45,
    meetingDays: '격주 수요일',
    location: '강남 코워킹 스페이스',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470&auto=format&fit=crop',
    members: [
      { id: '1', name: '김개발', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop' },
      { id: '5', name: '정데이터', image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1470&auto=format&fit=crop' },
    ],
  },
  {
    id: '3',
    name: '주말 등산 모임',
    description: '주말마다 다양한 산을 등반하는 등산 모임입니다. 초보자도 환영합니다.',
    keywords: ['등산', '아웃도어', '건강'],
    participants: 18,
    meetingDays: '매주 일요일',
    location: '수도권 근교 산',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1470&auto=format&fit=crop',
    members: [
      { id: '2', name: '이디자인', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop' },
      { id: '4', name: '최마케팅', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1374&auto=format&fit=crop' },
    ],
  },
  {
    id: '4',
    name: '독서토론 모임',
    description: '매달 한 권의 책을 선정하여 함께 읽고 토론하는 모임입니다.',
    keywords: ['독서', '토론', '문학'],
    participants: 12,
    meetingDays: '매월 마지막 토요일',
    location: '온라인/오프라인 병행',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop',
    members: [
      { id: '3', name: '박기획', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1374&auto=format&fit=crop' },
      { id: '5', name: '정데이터', image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1470&auto=format&fit=crop' },
    ],
  },
  {
    id: '7',
    name: '사진 촬영 동호회',
    description: '다양한 장소에서 사진 촬영을 즐기는 동호회입니다. 초보자도 환영합니다.',
    keywords: ['사진', '촬영', '카메라'],
    participants: 22,
    meetingDays: '격주 토요일',
    location: '서울 전역',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1464&auto=format&fit=crop',
    members: [
      { id: '3', name: '박기획', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1374&auto=format&fit=crop' },
      { id: '4', name: '최마케팅', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1374&auto=format&fit=crop' },
    ],
  },
];

// 정적 내보내기를 위한 경로 데이터 생성
export function generateStaticParams() {
  return groups.map((group) => ({
    id: group.id,
  }));
}

// 동적 메타데이터 생성
export async function generateMetadata({ params }: { params: { id: string } }) {
  const group = groups.find(g => g.id === params.id);
  return {
    title: group ? `${group.name} - 함께 성장하는 커뮤니티` : '그룹을 찾을 수 없습니다',
  };
}

export default function GroupPage({ params }: { params: { id: string } }) {
  const group = groups.find(g => g.id === params.id);

  if (!group) {
    notFound();
  }

  return <GroupContent group={group} allGroups={groups} />;
} 