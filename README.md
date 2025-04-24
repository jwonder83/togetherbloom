# 함께 성장하는 커뮤니티

관심사 기반으로 모임을 만들고 친밀도 높은 소통을 즐길 수 있는 모바일 커뮤니티 플랫폼입니다.

## 주요 기능

1. **카테고리 기반 관심사 탐색**
   - 9개의 기본 카테고리(여행, 요리, 독서, 음악, 운동, 개발, 커리어, 예술, 게임) 제공
   - 직관적인 아이콘으로 카테고리 표현

2. **키워드 기반 매칭**
   - 관심 키워드 입력으로 유사한 모임 추천
   - 키워드 기반으로 관심사가 비슷한 사용자와 매칭

3. **친밀도 점수 시각화**
   - 사용자 간 관심사 유사도를 친밀도 점수(1~100)로 표현
   - 원형 게이지로 친밀도 시각화

4. **1:1 채팅**
   - 매칭된 사용자와 실시간 채팅
   - 텍스트, 이모티콘, 이미지 전송 기능

5. **개인 프로필 관리**
   - 사용자 관심 카테고리 관리
   - 참여 중인 모임과 매칭 히스토리 확인

## 기술 스택

- **프론트엔드**: Next.js, TypeScript, TailwindCSS, React Icons
- **상태 관리**: React Hooks
- **스타일**: Tailwind CSS
- **백엔드/데이터베이스**: Supabase

## 설치 및 실행 방법

1. 패키지 설치

```bash
npm install
```

2. 환경 변수 설정

`.env.local` 파일을 프로젝트 루트 디렉토리에 생성하고 다음 변수를 설정합니다:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_REDIRECT_URL=http://localhost:3000/auth/callback
```

3. 개발 서버 실행

```bash
npm run dev
```

4. 브라우저에서 확인

```text
http://localhost:3000
```

## Vercel 배포 방법

1. [Vercel](https://vercel.com)에 가입하고 GitHub 계정과 연결합니다.
2. 새 프로젝트를 생성하고 이 리포지토리를 선택합니다.
3. 환경 변수 설정:
   - `NEXT_PUBLIC_SUPABASE_URL`: Supabase 프로젝트 URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase 익명 키
   - `NEXT_PUBLIC_REDIRECT_URL`: 배포된 사이트의 콜백 URL (예: [https://your-app.vercel.app/auth/callback](https://your-app.vercel.app/auth/callback))
4. 배포를 시작합니다.

## 디자인 가이드

- **메인 컬러**: #5A9BF6 (밝고 활동적인 파란색)
- **서브 컬러**: #FFB74D (따뜻한 주황색)
- **배경색**: #FFFFFF (흰색)
- **모듈 배경색**: #F5F5F5 (연한 회색)
- **폰트**: Noto Sans 
