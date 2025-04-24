import { User } from './recommendationAlgorithm';

/**
 * 더미 사용자 데이터
 * 추천 시스템 테스트와 UI 개발에 사용
 */
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'user1@example.com',
    nickname: '김민준',
    avatar_url: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: '개발자로 일하고 있으며 React와 TypeScript에 관심이 많습니다. 새로운 기술을 배우는 것을 좋아해요.',
    interests: ['프로그래밍', 'React', 'TypeScript', '웹 개발', '오픈소스'],
    isOnline: true,
  },
  {
    id: '2',
    email: 'user2@example.com',
    nickname: '이서연',
    avatar_url: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'UX/UI 디자이너입니다. 사용자 중심 디자인에 관심이 많고 다양한 프로젝트에 참여하고 있어요.',
    interests: ['디자인', 'UI/UX', 'Figma', '웹 디자인', '그래픽 디자인'],
    isOnline: false,
  },
  {
    id: '3',
    email: 'user3@example.com',
    nickname: '박지훈',
    avatar_url: 'https://randomuser.me/api/portraits/men/46.jpg',
    bio: '백엔드 개발자로 Spring과 Node.js를 주로 사용합니다. 시스템 아키텍처와 클라우드 기술에 관심이 많아요.',
    interests: ['백엔드', 'Spring', 'Node.js', '클라우드', 'AWS'],
    isOnline: true,
  },
  {
    id: '4',
    email: 'user4@example.com',
    nickname: '최수아',
    avatar_url: 'https://randomuser.me/api/portraits/women/65.jpg',
    bio: '프리랜서 일러스트레이터로 활동 중입니다. 디지털 아트와 캐릭터 디자인을 주로 작업해요.',
    interests: ['일러스트', '디지털 아트', '그림', '캐릭터 디자인', '애니메이션'],
    isOnline: true,
  },
  {
    id: '5',
    email: 'user5@example.com',
    nickname: '정도현',
    avatar_url: 'https://randomuser.me/api/portraits/men/22.jpg',
    bio: '데이터 과학자로 ML과 AI 관련 연구를 하고 있습니다. 논문 작성과 기술 공유를 좋아해요.',
    interests: ['데이터 과학', '머신러닝', 'Python', '딥러닝', 'AI'],
    isOnline: false,
  },
  {
    id: '6',
    email: 'user6@example.com',
    nickname: '한지은',
    avatar_url: 'https://randomuser.me/api/portraits/women/90.jpg',
    bio: '프론트엔드 개발자입니다. Vue.js와 React를 주로 사용하며 인터랙티브한 웹 경험을 만드는 것을 좋아해요.',
    interests: ['프론트엔드', 'Vue.js', 'React', 'JavaScript', 'CSS'],
    isOnline: true,
  },
  {
    id: '7',
    email: 'user7@example.com',
    nickname: '송민수',
    avatar_url: 'https://randomuser.me/api/portraits/men/29.jpg',
    bio: '게임 개발자로 Unity를 사용하여 인디 게임을 만들고 있습니다. 게임 디자인과 메커니즘에 관심이 많아요.',
    interests: ['게임 개발', 'Unity', 'C#', '게임 디자인', '3D 모델링'],
    isOnline: false,
  },
  {
    id: '8',
    email: 'user8@example.com',
    nickname: '임하은',
    avatar_url: 'https://randomuser.me/api/portraits/women/10.jpg',
    bio: '제품 관리자로 일하고 있습니다. 사용자 피드백을 바탕으로 제품을 개선하는 과정을 좋아해요.',
    interests: ['제품 관리', 'UX 리서치', 'Agile', '프로덕트 디자인', '사용자 테스트'],
    isOnline: true,
  },
  {
    id: '9',
    email: 'user9@example.com',
    nickname: '윤태호',
    avatar_url: 'https://randomuser.me/api/portraits/men/85.jpg',
    bio: '모바일 앱 개발자로 iOS 애플리케이션을 주로 개발합니다. Swift와 SwiftUI에 관심이 많아요.',
    interests: ['iOS 개발', 'Swift', 'SwiftUI', '모바일 앱', 'Apple'],
    isOnline: true,
  },
  {
    id: '10',
    email: 'user10@example.com',
    nickname: '백서현',
    avatar_url: 'https://randomuser.me/api/portraits/women/31.jpg',
    bio: '마케팅 전문가로 디지털 마케팅과 브랜드 전략을 담당하고 있습니다. 데이터 기반 마케팅을 좋아해요.',
    interests: ['디지털 마케팅', 'SEO', '소셜 미디어', '콘텐츠 마케팅', '데이터 분석'],
    isOnline: false,
  },
  {
    id: '11',
    email: 'user11@example.com',
    nickname: '조현우',
    avatar_url: 'https://randomuser.me/api/portraits/men/55.jpg',
    bio: '블록체인 개발자로 스마트 컨트랙트와 DApp 개발을 하고 있습니다. 탈중앙화 기술에 관심이 많아요.',
    interests: ['블록체인', '이더리움', '스마트 컨트랙트', 'Web3', '암호화폐'],
    isOnline: true,
  },
  {
    id: '12',
    email: 'user12@example.com',
    nickname: '강유진',
    avatar_url: 'https://randomuser.me/api/portraits/women/42.jpg',
    bio: '프로젝트 매니저로 IT 프로젝트를 관리하고 있습니다. 팀워크와 효율적인 작업 프로세스에 관심이 많아요.',
    interests: ['프로젝트 관리', 'Scrum', 'JIRA', '팀 리더십', '애자일'],
    isOnline: false,
  },
  {
    id: '13',
    email: 'user13@example.com',
    nickname: '나준호',
    avatar_url: 'https://randomuser.me/api/portraits/men/77.jpg',
    bio: '네트워크 엔지니어로 클라우드 인프라와 네트워크 보안을 담당하고 있습니다. 새로운 기술 도입을 좋아해요.',
    interests: ['네트워크', '클라우드', '보안', 'DevOps', 'Kubernetes'],
    isOnline: true,
  },
  {
    id: '14',
    email: 'user14@example.com',
    nickname: '오민지',
    avatar_url: 'https://randomuser.me/api/portraits/women/24.jpg',
    bio: '콘텐츠 크리에이터로 활동 중입니다. 영상 제작과 편집, 스토리텔링에 관심이 많아요.',
    interests: ['콘텐츠 제작', '영상 편집', 'YouTube', '스토리텔링', '소셜 미디어'],
    isOnline: false,
  },
  {
    id: '15',
    email: 'user15@example.com',
    nickname: '권현수',
    avatar_url: 'https://randomuser.me/api/portraits/men/40.jpg',
    bio: 'QA 엔지니어로 소프트웨어 테스트와 품질 보증을 담당하고 있습니다. 자동화 테스트에 관심이 많아요.',
    interests: ['QA', '자동화 테스트', 'Selenium', 'Cypress', '품질 보증'],
    isOnline: true,
  },
  {
    id: '16',
    email: 'user16@example.com',
    nickname: '홍지영',
    avatar_url: 'https://randomuser.me/api/portraits/women/56.jpg',
    bio: '인공지능 연구원으로 자연어 처리와 컴퓨터 비전 분야에서 연구하고 있습니다. 최신 AI 기술에 관심이 많아요.',
    interests: ['AI', '자연어 처리', '컴퓨터 비전', 'PyTorch', 'TensorFlow'],
    isOnline: false,
  },
  {
    id: '17',
    email: 'user17@example.com',
    nickname: '이동훈',
    avatar_url: 'https://randomuser.me/api/portraits/men/15.jpg',
    bio: '풀스택 개발자로 다양한 웹 애플리케이션을 개발하고 있습니다. MERN 스택을 주로 사용해요.',
    interests: ['풀스택', 'MongoDB', 'Express', 'React', 'Node.js'],
    isOnline: true,
  },
  {
    id: '18',
    email: 'user18@example.com',
    nickname: '신지원',
    avatar_url: 'https://randomuser.me/api/portraits/women/76.jpg',
    bio: 'UX 연구원으로 사용자 리서치와 사용성 테스트를 진행하고 있습니다. 사용자 중심 디자인에 관심이 많아요.',
    interests: ['UX 리서치', '사용자 인터뷰', '사용성 테스트', '행동 분석', '서비스 디자인'],
    isOnline: false,
  },
  {
    id: '19',
    email: 'user19@example.com',
    nickname: '김태양',
    avatar_url: 'https://randomuser.me/api/portraits/men/33.jpg',
    bio: '임베디드 시스템 개발자로 IoT 기기와 펌웨어 개발을 하고 있습니다. 하드웨어와 소프트웨어의 결합에 관심이 많아요.',
    interests: ['임베디드 시스템', 'IoT', '펌웨어', 'Arduino', 'Raspberry Pi'],
    isOnline: true,
  },
  {
    id: '20',
    email: 'user20@example.com',
    nickname: '이하린',
    avatar_url: 'https://randomuser.me/api/portraits/women/89.jpg',
    bio: '데이터 분석가로 비즈니스 인텔리전스와 데이터 시각화를 담당하고 있습니다. 의미 있는 인사이트 도출을 좋아해요.',
    interests: ['데이터 분석', '데이터 시각화', 'SQL', 'Tableau', 'Power BI'],
    isOnline: false,
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
    description: '리액트를 사용하는 개발자들의 모임입니다. 매주 새로운 기술과 트렌드에 대해 논의하고 프로젝트를 함께 진행합니다.',
    nextMeeting: '2023-06-15'
  },
  {
    id: '2',
    name: 'UX/UI 디자이너 네트워크',
    keywords: ['디자인', 'UI/UX', 'Figma', '웹 디자인', '그래픽 디자인'],
    participants: 38,
    image: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    location: '서울 성동구',
    rating: 4.6,
    description: '사용자 경험을 중심으로 디자인하는 디자이너들의 모임입니다. 포트폴리오 리뷰와 최신 디자인 트렌드를 공유합니다.',
    nextMeeting: '2023-06-10'
  },
  {
    id: '3',
    name: '클라우드 & DevOps 스터디',
    keywords: ['클라우드', 'AWS', 'DevOps', 'Kubernetes', '백엔드'],
    participants: 29,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    location: '서울 서초구',
    rating: 4.7,
    description: '클라우드 기술과 DevOps 방법론을 학습하는 스터디 그룹입니다. AWS, Kubernetes 등의 기술을 함께 익히고 공유합니다.',
    nextMeeting: '2023-06-20'
  },
  {
    id: '4',
    name: '디지털 아티스트 커뮤니티',
    keywords: ['디지털 아트', '일러스트', '그림', '캐릭터 디자인', '애니메이션'],
    participants: 45,
    image: 'https://images.unsplash.com/photo-1547333590-47fae5f58d21?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    location: '서울 마포구',
    rating: 4.9,
    description: '디지털 아트를 사랑하는 아티스트들의 모임입니다. 작품 피드백과 함께 협업 프로젝트를 진행합니다.',
    nextMeeting: '2023-06-18'
  },
  {
    id: '5',
    name: '인공지능 연구소',
    keywords: ['AI', '머신러닝', '딥러닝', 'Python', '데이터 과학'],
    participants: 32,
    image: 'https://images.unsplash.com/photo-1677442135136-760c813ecff9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    location: '서울 관악구',
    rating: 4.5,
    description: '인공지능과 머신러닝을 연구하는 그룹입니다. 최신 논문 리뷰와 실습 세션을 통해 함께 성장합니다.',
    nextMeeting: '2023-06-25'
  },
  {
    id: '6',
    name: '모바일 앱 개발자 클럽',
    keywords: ['모바일 앱', 'iOS 개발', 'Android', 'Swift', 'Kotlin'],
    participants: 36,
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    location: '서울 송파구',
    rating: 4.4,
    description: '모바일 애플리케이션 개발에 관심 있는 개발자들의 모임입니다. iOS와 Android 플랫폼 모두 다룹니다.',
    nextMeeting: '2023-06-12'
  },
  {
    id: '7',
    name: '블록체인 혁신 그룹',
    keywords: ['블록체인', '이더리움', '스마트 컨트랙트', 'Web3', '암호화폐'],
    participants: 27,
    image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    location: '서울 영등포구',
    rating: 4.3,
    description: '블록체인 기술과 암호화폐에 관심 있는 개발자와 애호가들의 모임입니다. 최신 트렌드와 기술을 공유합니다.',
    nextMeeting: '2023-06-30'
  },
  {
    id: '8',
    name: '콘텐츠 크리에이터 연합',
    keywords: ['콘텐츠 제작', '영상 편집', 'YouTube', '스토리텔링', '소셜 미디어'],
    participants: 51,
    image: 'https://images.unsplash.com/photo-1616469832301-a960ee135c16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    location: '서울 용산구',
    rating: 4.7,
    description: '영상 제작과 콘텐츠 창작에 관심 있는 크리에이터들의 모임입니다. 함께 성장하고 협업합니다.',
    nextMeeting: '2023-06-08'
  },
  {
    id: '9',
    name: '프로젝트 관리 전문가 그룹',
    keywords: ['프로젝트 관리', 'Scrum', 'Agile', '팀 리더십', 'JIRA'],
    participants: 33,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    location: '서울 종로구',
    rating: 4.6,
    description: 'IT 프로젝트 관리와 애자일 방법론에 관심 있는 PM들의 모임입니다. 실전 경험과 노하우를 공유합니다.',
    nextMeeting: '2023-06-22'
  },
  {
    id: '10',
    name: '임베디드 & IoT 개발자 모임',
    keywords: ['임베디드 시스템', 'IoT', '펌웨어', 'Arduino', 'Raspberry Pi'],
    participants: 24,
    image: 'https://images.unsplash.com/photo-1625895197185-efcec01cffe0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    location: '서울 동대문구',
    rating: 4.5,
    description: '임베디드 시스템과 IoT 기기 개발에 관심 있는 개발자들의 모임입니다. 하드웨어와 소프트웨어를 함께 다룹니다.',
    nextMeeting: '2023-06-28'
  }
];

// 가상 메시지 생성 함수
export const generateMockMessages = (userId: string, virtualUserId: string) => {
  const virtualUser = mockUsers.find(user => user.id === virtualUserId);
  if (!virtualUser) return [];

  const conversations = [
    {
      role: 'virtual',
      content: `안녕하세요! 저는 ${virtualUser.nickname}입니다. 반갑습니다!`
    },
    {
      role: 'user',
      content: '안녕하세요! 반갑습니다. 어떤 취미를 가지고 계신가요?'
    },
    {
      role: 'virtual',
      content: `저는 ${virtualUser.interests.join(', ')}에 관심이 있어요. 특히 ${virtualUser.interests[0]}을(를) 좋아합니다!`
    },
    {
      role: 'user',
      content: '저도 비슷한 취미가 있네요. 어떻게 그 취미를 시작하게 되셨나요?'
    },
    {
      role: 'virtual',
      content: `${virtualUser.interests[0]}는 학생 때부터 좋아했어요. ${virtualUser.bio}`
    }
  ];

  return conversations.map((conv, index) => ({
    id: `mock-message-${index}`,
    sender_id: conv.role === 'virtual' ? virtualUserId : userId,
    message: conv.content,
    created_at: new Date(Date.now() - (5 - index) * 60000).toISOString(),
    is_read: true
  }));
};

// 메시지에 대한 가상 응답 생성 함수
export function generateVirtualUserResponse(virtualUserId: string, userMessage: string): string {
  const virtualUser = mockUsers.find(user => user.id === virtualUserId);
  if (!virtualUser) return '죄송합니다, 응답할 수 없습니다.';

  // 메시지에 특정 키워드가 포함되어 있는지 확인
  const lowercaseMsg = userMessage.toLowerCase();

  // 인사말에 대한 응답
  if (lowercaseMsg.includes('안녕') || lowercaseMsg.includes('반가워') || lowercaseMsg.includes('반갑') || lowercaseMsg.includes('hello') || lowercaseMsg.includes('hi')) {
    return `안녕하세요! 오늘 기분은 어떠신가요?`;
  }

  // 취미에 대한 응답
  if (lowercaseMsg.includes('취미') || lowercaseMsg.includes('관심사')) {
    return `제 취미는 ${virtualUser.interests.join(', ')}입니다. 특히 ${virtualUser.interests[0]}을(를) 정말 좋아해요! 혹시 ${virtualUser.interests[0]}에 관심 있으신가요?`;
  }

  // 자기소개에 대한 응답
  if (lowercaseMsg.includes('자기소개') || lowercaseMsg.includes('소개') || lowercaseMsg.includes('누구')) {
    return `저는 ${virtualUser.nickname}입니다. ${virtualUser.bio}`;
  }

  // 기분에 대한 응답
  if (lowercaseMsg.includes('기분') || lowercaseMsg.includes('어떠')) {
    return '오늘은 정말 기분이 좋아요! 당신은 어떠신가요?';
  }

  // 식사에 대한 응답
  if (lowercaseMsg.includes('밥') || lowercaseMsg.includes('식사') || lowercaseMsg.includes('먹') || lowercaseMsg.includes('음식')) {
    return '저는 한식을 정말 좋아해요. 특히 김치찌개와 비빔밥이 제일 좋아요. 당신은 어떤 음식을 좋아하세요?';
  }

  // 날씨에 대한 응답
  if (lowercaseMsg.includes('날씨') || lowercaseMsg.includes('더워') || lowercaseMsg.includes('추워')) {
    return '요즘 날씨가 정말 변덕스러운 것 같아요. 건강 조심하세요!';
  }

  // 주말 계획에 대한 응답
  if (lowercaseMsg.includes('주말') || lowercaseMsg.includes('계획') || lowercaseMsg.includes('뭐해')) {
    return `이번 주말에는 ${virtualUser.interests[0]}와(과) 관련된 활동을 할 계획이에요. 당신은 어떤 계획이 있으신가요?`;
  }

  // 일반적인 질문에 대한 응답
  if (lowercaseMsg.includes('?') || lowercaseMsg.includes('뭐') || lowercaseMsg.includes('어떻게') || lowercaseMsg.includes('왜')) {
    return '흥미로운 질문이네요! 조금 더 생각해보고 답변 드릴게요.';
  }

  // 기본 응답
  const defaultResponses = [
    '그렇군요, 정말 흥미로운 이야기네요.',
    '더 자세히 말씀해 주실 수 있나요?',
    '저도 비슷한 경험이 있어요!',
    '재미있는 대화 감사합니다.',
    `${virtualUser.interests[0]}에 대해 더 이야기해볼까요?`,
    '오늘 날씨가 정말 좋네요. 산책하기 좋은 날이에요.',
    '새로운 친구를 사귀게 되어 기쁩니다.',
    '당신의 이야기를 듣고 있으니 기분이 좋아지네요.'
  ];

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
} 