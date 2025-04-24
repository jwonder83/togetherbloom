import { User } from '../utils/recommendationAlgorithm';

// 현재 로그인한 사용자 정보를 테스트 목적으로 제공하는 모의 데이터
export const currentUser: User = {
  id: 'current-user-123',
  name: '김서현',
  introduction: '개발과 독서를 좋아하는 대학생입니다. 새로운 친구를 만나고 싶어요!',
  profileImage: 'https://randomuser.me/api/portraits/women/12.jpg',
  interests: ['프로그래밍', '독서', '여행', '캠핑'],
  location: '서울,대한민국',
  lastActive: new Date().toISOString(),
  isOnline: true,
  languages: ['한국어', '영어'],
  ageGroup: '20-25',
  occupation: '학생',
  education: '대학교'
};

// 추천받을 수 있는 사용자 목록, 이미지 깨짐 수정을 위해 랜덤 이미지 URL 사용
export const mockUsers: User[] = [
  {
    id: 'user-456',
    name: '이준호',
    introduction: '창업을 준비중인 개발자입니다. 다양한 아이디어를 공유하고 싶어요.',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    interests: ['프로그래밍', '창업', '기술', '음악'],
    location: '서울,대한민국',
    lastActive: new Date().toISOString(),
    isOnline: true,
    languages: ['한국어', '영어'],
    ageGroup: '25-30',
    occupation: '개발자',
    education: '대학원'
  },
  {
    id: 'user-789',
    name: '박지민',
    introduction: '여행과 사진 찍는 것을 좋아하는 마케터입니다. 같이 여행 다닐 친구를 찾고 있어요!',
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    interests: ['여행', '사진', '마케팅', '언어'],
    location: '부산,대한민국',
    lastActive: new Date(Date.now() - 3600000).toISOString(), // 1시간 전
    isOnline: false,
    languages: ['한국어', '일본어'],
    ageGroup: '25-30',
    occupation: '마케터',
    education: '대학교'
  },
  {
    id: 'user-101',
    name: '최유진',
    introduction: '책 읽고 글쓰는 것을 좋아하는 작가입니다. 함께 독서모임 하실 분 환영해요.',
    profileImage: 'https://randomuser.me/api/portraits/women/65.jpg',
    interests: ['독서', '글쓰기', '철학', '영화'],
    location: '서울,대한민국',
    lastActive: new Date().toISOString(),
    isOnline: true,
    languages: ['한국어'],
    ageGroup: '30-35',
    occupation: '작가',
    education: '대학교'
  },
  {
    id: 'user-202',
    name: '정민수',
    introduction: '캠핑과 아웃도어 활동을 좋아하는 디자이너입니다. 같이 취미 공유해요!',
    profileImage: 'https://randomuser.me/api/portraits/men/22.jpg',
    interests: ['캠핑', '디자인', '그림', '등산'],
    location: '인천,대한민국',
    lastActive: new Date(Date.now() - 7200000).toISOString(), // 2시간 전
    isOnline: false,
    languages: ['한국어', '영어'],
    ageGroup: '25-30',
    occupation: '디자이너',
    education: '대학교'
  },
  {
    id: 'user-303',
    name: '한소희',
    introduction: '프로그래밍과 새로운 기술에 관심이 많은 학생입니다. 코딩 스터디 같이해요!',
    profileImage: 'https://randomuser.me/api/portraits/women/90.jpg',
    interests: ['프로그래밍', '인공지능', '게임', '음악'],
    location: '대전,대한민국',
    lastActive: new Date().toISOString(),
    isOnline: true,
    languages: ['한국어', '영어'],
    ageGroup: '20-25',
    occupation: '학생',
    education: '대학교'
  },
  {
    id: 'user-404',
    name: '김태현',
    introduction: '여행과 음식 탐방을 좋아하는 푸드 블로거입니다. 맛집 추천 환영합니다!',
    profileImage: 'https://randomuser.me/api/portraits/men/29.jpg',
    interests: ['요리', '여행', '사진', '맛집'],
    location: '광주,대한민국',
    lastActive: new Date(Date.now() - 86400000).toISOString(), // 1일 전
    isOnline: false,
    languages: ['한국어'],
    ageGroup: '25-30',
    occupation: '블로거',
    education: '대학교'
  }
];

// 모든 사용자를 포함한 배열 (현재 사용자 + 모의 사용자)
export const allUsers: User[] = [currentUser, ...mockUsers]; 