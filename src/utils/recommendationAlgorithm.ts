/**
 * 추천 시스템 알고리즘
 * 사용자 관심사 기반 유사도 계산 및 추천 시스템
 */

export interface User {
  id: string;
  name: string;
  introduction: string;
  profileImage: string;
  interests: string[];
  location: string;
  lastActive: string;
  isOnline: boolean;
  languages: string[];
  ageGroup: string;
  occupation: string;
  education: string;
  compatibilityScore?: number;
}

export interface MatchedUser extends User {
  compatibilityScore: number;
}

/**
 * 사용자 관심사 기반 유사도 점수 계산
 * @param userInterests 현재 사용자의 관심사 배열
 * @param otherUserInterests 다른 사용자의 관심사 배열
 * @returns 유사도 점수 (0-100)
 */
export function calculateInterestSimilarity(userInterests: string[], otherUserInterests: string[]): number {
  // 공통 관심사 개수
  const commonInterests = userInterests.filter(interest => 
    otherUserInterests.includes(interest)
  );
  
  // 고유 관심사 총 개수 (중복 제거)
  const uniqueInterests = new Set([...userInterests, ...otherUserInterests]);
  
  // 자카드 유사도 계산: 교집합 크기 / 합집합 크기
  const similarity = commonInterests.length / uniqueInterests.size;
  
  // 백분율로 변환 (소수점 반올림)
  return Math.round(similarity * 100);
}

/**
 * 위치 기반 근접도 점수 계산 (위치 데이터가 있는 경우)
 * @param userLocation 현재 사용자의 위치
 * @param otherUserLocation 다른 사용자의 위치
 * @returns 근접도 점수 (0-100)
 */
export function calculateLocationProximity(userLocation?: string, otherUserLocation?: string): number {
  // 위치 정보가 없는 경우 기본값 반환
  if (!userLocation || !otherUserLocation) {
    return 50; // 중간 점수
  }
  
  // 간단한 문자열 비교 (실제 앱에서는 좌표 기반 거리 계산 필요)
  if (userLocation === otherUserLocation) {
    return 100; // 같은 지역
  } else {
    // 지역별 근접도 매핑 (예시)
    const regions: Record<string, string[]> = {
      '서울': ['경기', '인천'],
      '경기': ['서울', '인천', '강원'],
      '인천': ['서울', '경기'],
      // 다른 지역들도 추가 가능
    };
    
    // 인접 지역 확인
    const nearbyRegions = regions[userLocation] || [];
    if (nearbyRegions.includes(otherUserLocation)) {
      return 70; // 인접 지역
    }
    
    return 30; // 먼 지역
  }
}

/**
 * 활동성 점수 계산 (최근 활동 시간 기준)
 * @param lastActive 마지막 활동 시간
 * @returns 활동성 점수 (0-100)
 */
export function calculateActivityScore(lastActive?: string): number {
  if (!lastActive) return 50;
  
  const now = new Date();
  const lastActiveDate = new Date(lastActive);
  const daysDifference = Math.floor((now.getTime() - lastActiveDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // 최근 활동 일수에 따른 점수 계산
  if (daysDifference < 1) return 100; // 오늘 활동
  if (daysDifference < 3) return 90; // 3일 이내
  if (daysDifference < 7) return 80; // 일주일 이내
  if (daysDifference < 14) return 70; // 2주 이내
  if (daysDifference < 30) return 60; // 한 달 이내
  
  return 50; // 오래된 활동
}

/**
 * 종합 호환성 점수 계산
 * @param currentUser 현재 사용자
 * @param otherUser 비교 대상 사용자
 * @returns 종합 호환성 점수 (0-100)
 */
export function calculateCompatibilityScore(currentUser: User, otherUser: User): number {
  // 관심사 유사도 (가중치: 60%)
  const interestScore = calculateInterestSimilarity(currentUser.interests, otherUser.interests);
  
  // 위치 근접도 (가중치: 20%)
  const locationScore = calculateLocationProximity(currentUser.location, otherUser.location);
  
  // 활동성 점수 (가중치: 20%)
  const activityScore = calculateActivityScore(otherUser.lastActive);
  
  // 가중치를 적용한 종합 점수 계산
  const weightedScore = (
    (interestScore * 0.6) +
    (locationScore * 0.2) +
    (activityScore * 0.2)
  );
  
  return Math.round(weightedScore);
}

/**
 * 현재 사용자와 다른 사용자들 간의 유사도를 계산하여 추천 목록을 반환합니다.
 * 
 * @param currentUser 현재 로그인한 사용자
 * @param potentialMatches 추천 대상 사용자 목록
 * @param options 추천 알고리즘 옵션
 * @returns 호환성 점수가 계산된 사용자 목록 (높은 점수 순으로 정렬됨)
 */
export function getRecommendedUsers(
  currentUser: User,
  potentialMatches: User[],
  options: {
    interestsWeight?: number;
    locationWeight?: number;
    ageGroupWeight?: number;
    educationWeight?: number;
    occupationWeight?: number;
    languagesWeight?: number;
  } = {}
): User[] {
  // 기본 가중치 설정
  const weights = {
    interests: options.interestsWeight ?? 0.4,    // 관심사는 가장 높은 가중치
    location: options.locationWeight ?? 0.2,      // 위치는 중간 가중치
    ageGroup: options.ageGroupWeight ?? 0.15,     // 나이대는 중간 가중치
    education: options.educationWeight ?? 0.1,    // 교육은 낮은 가중치
    occupation: options.occupationWeight ?? 0.1,  // 직업은 낮은 가중치
    languages: options.languagesWeight ?? 0.05,   // 언어는 가장 낮은 가중치
  };

  // 각 사용자에 대한 호환성 점수 계산
  const recommendedUsers = potentialMatches.map(user => {
    // 1. 관심사 유사도 계산 (교집합/합집합)
    const commonInterests = currentUser.interests.filter(interest => 
      user.interests.includes(interest)
    );
    const uniqueInterests = [...new Set([...currentUser.interests, ...user.interests])];
    const interestScore = commonInterests.length / uniqueInterests.length;

    // 2. 위치 유사도 계산 (일치 여부)
    const locationScore = currentUser.location === user.location ? 1 : 0;

    // 3. 나이대 유사도 계산 (일치 여부)
    const ageGroupScore = currentUser.ageGroup === user.ageGroup ? 1 : 0;

    // 4. 교육 유사도 계산 (일치 여부)
    const educationScore = currentUser.education === user.education ? 1 : 0;

    // 5. 직업 유사도 계산 (일치 여부)
    const occupationScore = currentUser.occupation === user.occupation ? 1 : 0;

    // 6. 언어 유사도 계산 (교집합/합집합)
    const commonLanguages = currentUser.languages.filter(lang => 
      user.languages.includes(lang)
    );
    const uniqueLanguages = [...new Set([...currentUser.languages, ...user.languages])];
    const languageScore = commonLanguages.length / uniqueLanguages.length;

    // 7. 종합 호환성 점수 계산 (0-100 점수로 변환)
    const compatibilityScore = Math.round(
      (interestScore * weights.interests +
      locationScore * weights.location +
      ageGroupScore * weights.ageGroup +
      educationScore * weights.education +
      occupationScore * weights.occupation +
      languageScore * weights.languages) * 100
    );

    // 8. 호환성 점수가 추가된 사용자 반환
    return {
      ...user,
      compatibilityScore
    };
  });

  // 호환성 점수가 높은 순으로 정렬
  return recommendedUsers.sort((a, b) => 
    (b.compatibilityScore ?? 0) - (a.compatibilityScore ?? 0)
  );
}

// 더미 사용자 데이터 (테스트용)
export const mockUsers: User[] = [
  {
    id: 'user1',
    name: '김민준',
    introduction: '안녕하세요! 개발과 디자인에 관심이 많은 풀스택 개발자입니다.',
    profileImage: 'https://randomuser.me/api/portraits/men/33.jpg',
    interests: ['프로그래밍', '웹개발', 'UX/UI', '독서', '여행'],
    location: '서울',
    lastActive: '2023-08-10T14:30:00',
    isOnline: true,
    languages: ['한국어', '영어'],
    ageGroup: '20대',
    occupation: '웹 개발자',
    education: '서울대학교 컴퓨터공학',
    compatibilityScore: 85
  },
  {
    id: 'user2',
    name: '이서연',
    introduction: '디자인 전공, UX/UI 디자이너로 일하고 있어요. 새로운 협업 기회를 찾고 있습니다!',
    profileImage: 'https://randomuser.me/api/portraits/women/42.jpg',
    interests: ['UX/UI', '그래픽디자인', '사용자경험', '웹개발', '아트'],
    location: '서울',
    lastActive: '2023-08-09T09:15:00',
    isOnline: false,
    languages: ['한국어', '영어'],
    ageGroup: '20대',
    occupation: 'UX 디자이너',
    education: '홍익대학교 디자인학과',
    compatibilityScore: 75
  },
  {
    id: 'user3',
    name: '박지훈',
    introduction: '백엔드 개발자입니다. 시스템 아키텍처와 데이터베이스 설계에 관심이 많아요.',
    profileImage: 'https://randomuser.me/api/portraits/men/46.jpg',
    interests: ['백엔드개발', '데이터베이스', '클라우드', '알고리즘', '오픈소스'],
    location: '부산',
    lastActive: '2023-08-10T11:45:00',
    isOnline: true,
    languages: ['한국어', '영어'],
    ageGroup: '30대',
    occupation: '백엔드 개발자',
    education: '한국과학기술원 전산학',
    compatibilityScore: 70
  },
  {
    id: 'user4',
    name: '최수아',
    introduction: '프론트엔드 개발자로 일하고 있어요. 사용자 친화적인 인터페이스 개발에 관심이 많습니다.',
    profileImage: 'https://randomuser.me/api/portraits/women/65.jpg',
    interests: ['프론트엔드', 'JavaScript', 'React', '애니메이션', '접근성'],
    location: '경기',
    lastActive: '2023-08-10T16:20:00',
    isOnline: true,
    languages: ['한국어', '영어'],
    ageGroup: '20대',
    occupation: '프론트엔드 개발자',
    education: '연세대학교 정보통신공학',
    compatibilityScore: 70
  },
  {
    id: 'user5',
    name: '정도윤',
    introduction: '모바일 앱 개발자입니다. 안드로이드와 iOS 둘 다 개발 가능해요.',
    profileImage: 'https://randomuser.me/api/portraits/men/22.jpg',
    interests: ['모바일앱', 'Android', 'iOS', 'Flutter', '크로스플랫폼'],
    location: '대전',
    lastActive: '2023-08-08T13:10:00',
    isOnline: false,
    languages: ['한국어', '영어'],
    ageGroup: '20대',
    occupation: '모바일 개발자',
    education: '카이스트 전산학',
    compatibilityScore: 65
  },
  {
    id: 'user6',
    name: '한지은',
    introduction: '데이터 사이언티스트입니다. 머신러닝과 AI에 관심이 많아요.',
    profileImage: 'https://randomuser.me/api/portraits/women/90.jpg',
    interests: ['데이터사이언스', '머신러닝', 'AI', '통계', '파이썬'],
    location: '서울',
    lastActive: '2023-08-10T10:05:00',
    isOnline: true,
    languages: ['한국어', '영어'],
    ageGroup: '20대',
    occupation: '데이터 사이언티스트',
    education: '포항공과대학교 컴퓨터공학',
    compatibilityScore: 60
  },
  {
    id: 'user7',
    name: '윤준호',
    introduction: '게임 개발자입니다. 유니티와 언리얼 엔진으로 개발해요.',
    profileImage: 'https://randomuser.me/api/portraits/men/28.jpg',
    interests: ['게임개발', 'Unity', '언리얼엔진', '3D모델링', 'C++'],
    location: '경기',
    lastActive: '2023-08-07T18:30:00',
    isOnline: false,
    languages: ['한국어', '영어'],
    ageGroup: '20대',
    occupation: '게임 개발자',
    education: '한양대학교 게임컨텐츠학',
    compatibilityScore: 55
  },
  {
    id: 'user8',
    name: '송하은',
    introduction: 'UI/UX 디자이너입니다. 미니멀리즘 디자인을 좋아해요.',
    profileImage: 'https://randomuser.me/api/portraits/women/10.jpg',
    interests: ['UI디자인', 'UX리서치', '미니멀리즘', '타이포그래피', '모바일디자인'],
    location: '서울',
    lastActive: '2023-08-10T15:45:00',
    isOnline: true,
    languages: ['한국어', '영어'],
    ageGroup: '20대',
    occupation: 'UI/UX 디자이너',
    education: '이화여자대학교 디지털미디어디자인',
    compatibilityScore: 50
  },
  {
    id: 'user9',
    name: '임재현',
    introduction: '보안 전문가입니다. 네트워크 보안과 암호화에 관심이 많아요.',
    profileImage: 'https://randomuser.me/api/portraits/men/85.jpg',
    interests: ['사이버보안', '암호학', '네트워크보안', '해킹방어', '블록체인'],
    location: '인천',
    lastActive: '2023-08-09T12:20:00',
    isOnline: false,
    languages: ['한국어', '영어'],
    ageGroup: '30대',
    occupation: '정보보안 전문가',
    education: '고려대학교 정보보호학',
    compatibilityScore: 45
  },
  {
    id: 'user10',
    name: '강미나',
    introduction: '프로덕트 매니저로 일하고 있어요. 사용자 중심 제품 개발에 관심이 많습니다.',
    profileImage: 'https://randomuser.me/api/portraits/women/31.jpg',
    interests: ['프로덕트관리', '애자일', '사용자경험', '시장조사', '비즈니스전략'],
    location: '서울',
    lastActive: '2023-08-10T17:05:00',
    isOnline: true,
    languages: ['한국어', '영어'],
    ageGroup: '20대',
    occupation: '프로덕트 매니저',
    education: '서울대학교 경영학',
    compatibilityScore: 40
  }
]; 