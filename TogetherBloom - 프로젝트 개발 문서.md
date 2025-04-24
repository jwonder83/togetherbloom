# TogetherBloom 프로젝트 개발 문서

## 1. 프로젝트 소개

TogetherBloom은 관심사 기반 모임을 찾고 소통할 수 있는 커뮤니티 플랫폼입니다. 사용자들은 자신의 관심사에 맞는 모임을 검색하고 참여하거나 직접 모임을 만들 수 있으며, 다른 회원들과 채팅을 통해 소통할 수 있습니다.

## 2. 기술 스택

### 프론트엔드
- Next.js 14.1.0
- React 18.2.0
- TypeScript
- TailwindCSS
- React Icons
- Framer Motion

### 백엔드
- Supabase (인증, 데이터베이스)
- Next.js API Routes

### 배포
- Vercel

## 3. 프로젝트 구조

```
src/
├── app/                  # Next.js 앱 라우터
│   ├── auth/             # 인증 관련 페이지
│   ├── chat/             # 채팅 페이지
│   ├── group/            # 모임 관련 페이지
│   ├── match/            # 매칭 페이지
│   ├── search/           # 검색 페이지
│   ├── profile/          # 프로필 페이지
│   └── ...
├── components/           # 재사용 가능한 컴포넌트
├── contexts/             # React Context
├── data/                 # 정적 데이터
└── utils/                # 유틸리티 함수
    ├── mockUsers.ts      # 가상 사용자 데이터
    ├── recommendationAlgorithm.ts  # 추천 알고리즘
    └── supabase.ts       # Supabase 클라이언트
```

## 4. 주요 기능

### 4.1 사용자 인증
- Supabase Auth를 활용한 로그인/회원가입 기능
- 사용자 세션 관리 및 인증 상태 유지

### 4.2 관심사 기반 추천 시스템
- 사용자의 관심사, 위치, 활동 시간 등을 분석하여 호환성 점수 계산
- 유사한 관심사를 가진 사용자 및 모임 추천
- `src/utils/recommendationAlgorithm.ts`에 구현된 알고리즘:
  - 관심사 유사도 계산 (자카드 유사도)
  - 위치 근접도 평가
  - 활동 시간 기반 활성도 점수

### 4.3 모임 탐색 및 검색
- 카테고리별 모임 필터링
- 검색어 기반 모임 검색
- 지역, 인원 수 등 다양한 필터 옵션
- 모임 상세 정보 조회

### 4.4 실시간 채팅
- 사용자 간 1:1 채팅 기능
- 가상 사용자와의 대화 지원 (데모 목적)
- 메시지 그룹화 및 날짜별 표시
- 읽음 확인 및 온라인 상태 표시

### 4.5 사용자 매칭
- 관심사 기반 사용자 매칭 알고리즘
- 호환성 점수에 따른 추천 사용자 정렬
- 매칭된 사용자와 채팅 시작 기능

### 4.6 모임 생성 및 관리
- 모임 생성 및 정보 설정
- 모임 참가자 관리
- 모임 일정 및 장소 관리

## 5. 구현 상세

### 5.1 추천 알고리즘 (recommendationAlgorithm.ts)

추천 시스템은 다음과 같은 가중치를 사용하여 사용자 간 호환성 점수를 계산합니다:

- 관심사 유사도: 60%
- 위치 근접도: 20%
- 활동성 점수: 20%

```typescript
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
```

### 5.2 채팅 시스템 (ChatRoomClient.tsx)

채팅 시스템은 실제 사용자 간 대화와 가상 사용자와의 대화를 모두 지원합니다:

- 실제 사용자와의 채팅: Supabase 실시간 구독을 활용한 메시지 동기화
- 가상 사용자와의 채팅: 미리 정의된 응답 패턴과 키워드 매칭으로 가상 응답 생성

```typescript
// 가상 사용자 응답 생성 함수
const generateVirtualResponse = (virtualId: string, userMessage: string): Message | null => {
  const response = generateVirtualUserResponse(userMessage, virtualId);
  if (!response) return null;

  return {
    id: `virtual-${Date.now()}`,
    sender_id: virtualId,
    message: response,
    created_at: new Date().toISOString(),
    is_read: true
  };
};
```

### 5.3 검색 기능 (search/page.tsx)

검색 페이지에서는 다양한 필터링 옵션을 제공합니다:

- 텍스트 기반 검색 (모임 이름, 설명, 키워드)
- 카테고리 필터링
- 회원 수 기준 필터링 (range input 활용)
- 검색 결과 실시간 업데이트

```typescript
// 필터 적용 핸들러
const applyFilters = () => {
  let filtered = [...dummyGroups];
  
  if (filters.category) {
    filtered = filtered.filter(group => 
      group.category.toLowerCase() === filters.category.toLowerCase()
    );
  }
  
  if (filters.minMembers > 0) {
    filtered = filtered.filter(group => group.memberCount >= filters.minMembers);
  }
  
  if (query) {
    filtered = filtered.filter(group => 
      group.name.toLowerCase().includes(query.toLowerCase()) || 
      group.description.toLowerCase().includes(query.toLowerCase()) ||
      group.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
  }
  
  setSearchResults(filtered);
  setIsFilterOpen(false);
};
```

### 5.4 모임 목록 (group/page.tsx)

모임 목록 페이지는 다양한 모임을 카테고리별로 필터링하여 보여줍니다:

- 카테고리 버튼으로 빠른 필터링
- 검색 기능으로 특정 모임 찾기
- 각 모임의 간략한 정보와 시각적 요소 표시

## 6. 접근성 개선

웹 접근성 표준을 준수하기 위해 다음과 같은 개선 사항을 적용했습니다:

- 스크린 리더 지원을 위한 적절한 ARIA 속성 추가
- 키보드 네비게이션 지원
- 색상 대비 최적화
- 의미 있는 HTML 구조 사용

예시:
```tsx
<button
  onClick={() => setSearchQuery('')}
  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
  aria-label="검색어 지우기"
>
  <FaTimes aria-hidden="true" />
  <span className="sr-only">검색어 지우기</span>
</button>
```

## 7. 배포 설정

### Next.js 설정 (next.config.js)

```js
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: '.next',
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'robohash.org',
        pathname: '**',
      },
      // ... 기타 이미지 도메인
    ],
    unoptimized: true
  },
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: []
  }
}
```

### Vercel 설정 (vercel.json)

```json
{
  "buildCommand": "NEXT_EXPORT=false npm run build",
  "devCommand": "npm run dev",
  "framework": "nextjs",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "build": {
    "env": {
      "NEXT_STATIC_EXPORT": "false",
      "NEXT_PUBLIC_ENABLE_DYNAMIC_ROUTES": "true"
    }
  },
  "routes": [
    { "src": "/chat/[id]", "dest": "/chat/[id]" }
  ]
}
```

## 8. 향후 개발 계획

- 실시간 알림 시스템 구현
- 모임 참가 신청 및 승인 프로세스 개선
- 사용자 피드백 시스템 추가
- 모바일 앱 버전 개발
- 성능 최적화 및 코드 리팩토링

## 9. 결론

TogetherBloom 프로젝트는 사용자들이 관심사를 기반으로 모임을 찾고 소통할 수 있는 플랫폼을 제공합니다. Next.js와 Supabase를 활용하여 현대적인 웹 애플리케이션을 구현했으며, 사용자 경험과 접근성을 중시하여 설계되었습니다. 추천 알고리즘과 실시간 채팅 기능을 통해 사용자들 간의 의미 있는 연결을 촉진하고자 합니다. 