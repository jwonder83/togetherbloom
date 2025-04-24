// 가상의 사용자 정보
export const mockUsers = [
  {
    id: 'virtual-user-1',
    email: 'hongildong@example.com',
    nickname: '홍길동',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop',
    bio: '안녕하세요! 새로운 친구들을 만나고 싶어요.',
    interests: ['여행', '영화', '독서']
  },
  {
    id: 'virtual-user-2',
    email: 'kimcheolsu@example.com',
    nickname: '김철수',
    avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1374&auto=format&fit=crop',
    bio: '맛집 탐방과 여행을 좋아합니다.',
    interests: ['요리', '맛집', '여행']
  },
  {
    id: 'virtual-user-3',
    email: 'leeyounghee@example.com',
    nickname: '이영희',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop',
    bio: '게임과 IT에 관심이 많습니다.',
    interests: ['게임', 'IT', '프로그래밍']
  },
  {
    id: 'virtual-user-4',
    email: 'parkminsu@example.com',
    nickname: '박민수',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1374&auto=format&fit=crop',
    bio: '운동과 건강에 관심이 많습니다.',
    interests: ['운동', '헬스', '건강']
  },
  {
    id: 'virtual-user-5',
    email: 'jangsooyoung@example.com',
    nickname: '장수영',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1528&auto=format&fit=crop',
    bio: '음악과 공연에 관심이 많습니다.',
    interests: ['음악', '공연', '악기']
  }
];

// 가상 대화 메시지 생성 함수
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
    room_id: `room-${userId}-${virtualUserId}`,
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