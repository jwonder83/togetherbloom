import { mockUsers } from '../../../utils/mockUsers';
import ChatRoomClient from './ChatRoomClient';

// 빈 배열을 반환하도록 수정하여 동적 라우팅을 사용
export async function generateStaticParams() {
  return [];
}

export default function ChatRoomPage({ params }: { params: { id: string } }) {
  return <ChatRoomClient params={params} />;
} 