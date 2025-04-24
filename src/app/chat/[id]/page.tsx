import { mockUsers } from '../../../utils/mockUsers';
import ChatRoomClient from './ChatRoomClient';

// 가능한 모든 정적 경로 생성하기
export async function generateStaticParams() {
  // 1. 가상 사용자 ID
  const virtualUserPaths = mockUsers.map(user => ({
    id: user.id
  }));

  // 2. 가상 사용자 ID (virtual-user- 접두사 붙이기)
  const virtualUserPathsWithPrefix = mockUsers.map(user => ({
    id: `virtual-user-${user.id}`
  }));

  // 3. 채팅방 ID 형식 (room-{userId}-{virtualUserId})
  const roomPaths = [];
  // 1부터 20까지의 샘플 사용자 ID
  for (let userId = 1; userId <= 20; userId++) {
    // 1부터 20까지의 가상 사용자 ID
    for (let virtualId = 1; virtualId <= 20; virtualId++) {
      roomPaths.push({
        id: `room-${userId}-${virtualId}`
      });
    }
  }

  // 4. 명시적인 채팅방 ID 추가
  const specificRoomPaths = [
    { id: 'room-d285e378-65a4-432b-9961-5a4efeaf7790-1' },
    { id: 'room-1-2' },
    { id: 'room-2-3' }
    // 추가 필요한 ID들
  ];

  // 모든 경로 합치기
  return [
    ...virtualUserPaths,
    ...virtualUserPathsWithPrefix,
    ...roomPaths,
    ...specificRoomPaths
  ];
}

export default function ChatRoomPage({ params }: { params: { id: string } }) {
  return <ChatRoomClient params={params} />;
} 