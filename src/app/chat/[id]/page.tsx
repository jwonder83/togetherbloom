import { mockUsers } from '../../../utils/mockUsers';
import ChatRoomClient from './ChatRoomClient';

// 정적 내보내기를 위한 경로 데이터 생성
export function generateStaticParams() {
  // 단순 ID 경로 - "/chat/[id]" 자체를 위한 경로
  const simpleIdPath = [
    { id: '[id]' }
  ];
  
  // 사용자 ID 기반 경로
  const userPaths = mockUsers.map((user) => ({
    id: `virtual-user-${user.id}`,
  }));
  
  // 알려진 채팅방 ID 추가
  const roomPaths = [
    { id: 'room-d285e378-65a4-432b-9961-5a4efeaf7790-1' },
    // 필요에 따라 더 많은 룸 ID를 여기에 추가
  ];
  
  // 가상 사용자 ID 수동 정의 (next.config.js와 일치하도록)
  const manualPaths = [];
  for (let i = 1; i <= 20; i++) {
    manualPaths.push({ id: `virtual-user-${i}` });
  }
  
  // 모든 경로 합치기
  return [...simpleIdPath, ...userPaths, ...roomPaths, ...manualPaths];
}

export default function ChatRoomPage({ params }: { params: { id: string } }) {
  return <ChatRoomClient params={params} />;
} 