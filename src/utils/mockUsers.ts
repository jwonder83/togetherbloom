import { User } from './recommendationAlgorithm';

/**
 * 가상 사용자 데이터
 * 추천 시스템 테스트와 UI 개발에 사용
 */
export const mockUsers: User[] = [
  {
    id: '1',
    name: '김민준',
    introduction: '개발자로 일하고 있으며 React와 TypeScript에 관심이 많습니다. 새로운 기술을 배우는 것을 좋아해요.',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    interests: ['프로그래밍', 'React', 'TypeScript', '웹 개발', '오픈소스'],
    location: '서울',
    lastActive: new Date().toISOString(),
    isOnline: true,
    languages: ['한국어', '영어'],
    ageGroup: '20대',
    occupation: '프론트엔드 개발자',
    education: '서울대학교 컴퓨터공학'
  },
  {
    id: '2',
    name: '이서연',
    introduction: 'UX/UI 디자이너입니다. 사용자 중심 디자인에 관심이 많고 다양한 프로젝트에 참여하고 있어요.',
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    interests: ['디자인', 'UI/UX', 'Figma', '웹 디자인', '그래픽 디자인'],
    location: '서울',
    lastActive: new Date().toISOString(),
    isOnline: false,
    languages: ['한국어', '영어'],
    ageGroup: '20대',
    occupation: 'UX 디자이너',
    education: '홍익대학교 디자인학과'
  },
  {
    id: '3',
    name: '박지훈',
    introduction: '백엔드 개발자로 Spring과 Node.js를 주로 사용합니다. 시스템 아키텍처와 클라우드 기술에 관심이 많아요.',
    profileImage: 'https://randomuser.me/api/portraits/men/46.jpg',
    interests: ['백엔드', 'Spring', 'Node.js', '클라우드', 'AWS'],
    location: '경기',
    lastActive: new Date().toISOString(),
    isOnline: true,
    languages: ['한국어', '영어'],
    ageGroup: '30대',
    occupation: '백엔드 개발자',
    education: '고려대학교 컴퓨터공학'
  },
  {
    id: '4',
    name: '최수아',
    introduction: '프리랜서 일러스트레이터로 활동 중입니다. 디지털 아트와 캐릭터 디자인을 주로 작업해요.',
    profileImage: 'https://randomuser.me/api/portraits/women/65.jpg',
    interests: ['일러스트', '디지털 아트', '그림', '캐릭터 디자인', '애니메이션'],
    location: '서울',
    lastActive: new Date().toISOString(),
    isOnline: true,
    languages: ['한국어'],
    ageGroup: '20대',
    occupation: '일러스트레이터',
    education: '서울예술대학교 시각디자인'
  },
  {
    id: '5',
    name: '정도현',
    introduction: '데이터 과학자로 ML과 AI 관련 연구를 하고 있습니다. 논문 작성과 기술 공유를 좋아해요.',
    profileImage: 'https://randomuser.me/api/portraits/men/22.jpg',
    interests: ['데이터 과학', '머신러닝', 'Python', '딥러닝', 'AI'],
    location: '대전',
    lastActive: new Date().toISOString(),
    isOnline: false,
    languages: ['한국어', '영어'],
    ageGroup: '30대',
    occupation: '데이터 사이언티스트',
    education: 'KAIST 컴퓨터공학'
  }
];

/**
 * 더미 그룹 데이터
 */
export const mockGroups = [
  {
    id: '1',
    name: '리액트 개발자 모임',
    keywords: ['프로그래밍', 'React', 'JavaScript', '웹 개발', '프론트엔드'],
    participants: 42,
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    location: '서울 강남구',
    rating: 4.8,
    description: '리액트와 관련 기술을 함께 공부하고 토론하는 모임입니다. 매주 새로운 프로젝트를 진행하며 함께 성장해요.',
    nextMeeting: '매주 화요일 오후 7시'
  },
  {
    id: '2',
    name: '디자인 스터디',
    keywords: ['디자인', 'UI/UX', 'Figma', '그래픽 디자인'],
    participants: 28,
    image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    location: '서울 홍대',
    rating: 4.5,
    description: 'UI/UX 디자인과 관련된 다양한 주제를 다루는 스터디 그룹입니다. 포트폴리오 리뷰와 피드백을 주고받아요.',
    nextMeeting: '매주 토요일 오후 2시'
  }
];

/**
 * 가상 채팅 메시지 생성
 */
export const generateMockMessages = (userId: string, virtualUserId: string) => {
  // 가상 사용자 정보 찾기
  const virtualUser = mockUsers.find(user => user.id === virtualUserId);
  
  if (!virtualUser) {
    return [];
  }
  
  // 현재 시간 기준 메시지 타임스탬프 생성
  const now = new Date();
  const hour = 3600 * 1000; // 1시간 (밀리초)
  
  return [
    {
      id: `msg-${Date.now()}-1`,
      sender_id: virtualUserId,
      message: `안녕하세요! 저는 ${virtualUser.name}입니다. 반갑습니다!`,
      created_at: new Date(now.getTime() - 24 * hour).toISOString(),
      is_read: true,
      room_id: `room-${userId}-${virtualUserId}`
    },
    {
      id: `msg-${Date.now()}-2`,
      sender_id: userId,
      message: '안녕하세요! 만나서 반가워요. 어떤 일을 하시나요?',
      created_at: new Date(now.getTime() - 23 * hour).toISOString(),
      is_read: true,
      room_id: `room-${userId}-${virtualUserId}`
    },
    {
      id: `msg-${Date.now()}-3`,
      sender_id: virtualUserId,
      message: `${virtualUser.interests[0]}에 관한 일을 하고 있어요. ${virtualUser.introduction}`,
      created_at: new Date(now.getTime() - 22 * hour).toISOString(),
      is_read: true,
      room_id: `room-${userId}-${virtualUserId}`
    }
  ];
};

/**
 * 가상 사용자 응답 생성 함수
 */
export function generateVirtualUserResponse(virtualUserId: string, userMessage: string): string {
  // 가상 사용자 정보 가져오기
  const virtualUser = mockUsers.find(user => user.id === virtualUserId);
  if (!virtualUser) return "죄송합니다, 응답을 생성할 수 없습니다.";
  
  const lowercaseMsg = userMessage.toLowerCase();
  
  // 인사에 대한 응답
  if (lowercaseMsg.includes('안녕') || lowercaseMsg.includes('반가워') || lowercaseMsg.includes('hi') || lowercaseMsg.includes('hello')) {
    return `안녕하세요! 반갑습니다. 오늘 기분이 어떠세요?`;
  }
  
  // 자기소개에 대한 응답
  if (lowercaseMsg.includes('자기소개') || lowercaseMsg.includes('소개') || lowercaseMsg.includes('누구')) {
    return `저는 ${virtualUser.name}입니다. ${virtualUser.introduction}`;
  }
  
  // 관심사에 대한 응답
  if (lowercaseMsg.includes('관심사') || lowercaseMsg.includes('취미') || lowercaseMsg.includes('좋아하는 것')) {
    return `저는 ${virtualUser.interests.join(', ')} 등에 관심이 많아요. 특히 ${virtualUser.interests[0]}에 대해 깊이 있게 공부하고 있습니다.`;
  }
  
  // 직업에 대한 응답
  if (lowercaseMsg.includes('직업') || lowercaseMsg.includes('일') || lowercaseMsg.includes('하는 일')) {
    return `저는 ${virtualUser.occupation}로 일하고 있어요. ${virtualUser.introduction}`;
  }
  
  // 위치에 대한 응답
  if (lowercaseMsg.includes('어디') || lowercaseMsg.includes('지역') || lowercaseMsg.includes('살아')) {
    return `저는 ${virtualUser.location}에 살고 있어요. 이 지역은 정말 살기 좋은 곳이에요.`;
  }
  
  // 기본 응답
  const defaultResponses = [
    "흥미로운 이야기네요!",
    "더 자세히 말씀해 주실래요?",
    "같이 이야기하게 되어 반가워요.",
    "그렇군요. 잘 이해했어요.",
    "계속 말씀해 주세요. 관심있게 듣고 있어요."
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
} 