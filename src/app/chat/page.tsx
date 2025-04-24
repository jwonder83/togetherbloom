'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaSearch, FaUser } from 'react-icons/fa';
import supabase from '../../utils/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { mockUsers } from '../../utils/mockUsers';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { RealtimeChannel } from '@supabase/supabase-js';

type ChatRoom = {
  id: string;
  last_message: string;
  last_message_time: string;
  other_user: {
    id: string;
    nickname: string;
    avatar_url: string | null;
  };
  unread_count: number;
  is_virtual?: boolean;
};

export default function ChatListPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 인증 상태 변경 감지
  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      console.log("사용자가 로그인되어 있지 않습니다. 로그인 페이지로 이동합니다.");
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // 채팅방 데이터 로드
  useEffect(() => {
    if (authLoading) return; // 인증 로딩 중이면 대기 
    if (!user) return; // 사용자가 없으면 대기 (위의 useEffect에서 리디렉션 처리)
    
    let isMounted = true;
    setIsLoading(true);

    const fetchChatRooms = async () => {
      try {
        // 내가 참여하고 있는 채팅방 조회
        const { data: participatingRooms, error: participatingError } = await supabase
          .from('chat_participants')
          .select('room_id, unread_count')
          .eq('profile_id', user.id);

        if (participatingError) throw participatingError;
        
        let roomsData: ChatRoom[] = [];
        
        // 실제 채팅방이 있는 경우 처리
        if (participatingRooms && participatingRooms.length > 0) {
          const roomIds = participatingRooms.map(room => room.room_id);

          // 채팅방 정보 가져오기
          const { data: rooms, error: roomError } = await supabase
            .from('chat_rooms')
            .select('*')
            .in('id', roomIds)
            .order('last_message_time', { ascending: false });

          if (roomError) throw roomError;

          // 각 채팅방별로 상대방 정보 가져오기
          roomsData = await Promise.all(
            rooms.map(async (room) => {
              const { data: participants, error: participantsError } = await supabase
                .from('chat_participants')
                .select('profile_id')
                .eq('room_id', room.id)
                .neq('profile_id', user.id);

              if (participantsError) throw participantsError;
              
              // 상대방 프로필 정보 가져오기
              const otherUserId = participants[0]?.profile_id;
              const { data: otherUserProfile, error: profileError } = await supabase
                .from('profiles')
                .select('id, nickname, avatar_url')
                .eq('id', otherUserId)
                .single();

              if (profileError) throw profileError;

              // 안 읽은 메시지 수 찾기
              const unreadCount = participatingRooms.find(
                p => p.room_id === room.id
              )?.unread_count || 0;

              return {
                id: room.id,
                last_message: room.last_message || '새로운 대화가 시작되었습니다.',
                last_message_time: room.last_message_time || room.created_at,
                other_user: otherUserProfile,
                unread_count: unreadCount
              };
            })
          );
        }
        
        // 가상 사용자와의 채팅방 추가
        const virtualRooms = mockUsers.map(virtualUser => {
          // 가상 사용자마다 생성된 채팅방의 고유 ID 생성
          const roomId = `room-${user.id}-${virtualUser.id}`;
          
          return {
            id: roomId,
            last_message: '안녕하세요! 반갑습니다!',
            last_message_time: new Date().toISOString(),
            other_user: {
              id: virtualUser.id,
              nickname: virtualUser.nickname,
              avatar_url: virtualUser.avatar_url
            },
            unread_count: 0,
            is_virtual: true
          };
        });
        
        // 실제 채팅방과 가상 채팅방 합치기
        if (isMounted) {
          setChatRooms([...roomsData, ...virtualRooms]);
        }
      } catch (error) {
        console.error('채팅방 목록을 불러오는 중 오류가 발생했습니다:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchChatRooms();

    // 실시간 메시지 구독
    let subscription: RealtimeChannel | undefined;
    if (user) {
      subscription = supabase
        .channel('chat_rooms_changes')
        .on('postgres_changes', 
          { 
            event: 'INSERT', 
            schema: 'public', 
            table: 'chat_messages',
            filter: `sender_id=neq.${user?.id}`
          }, 
          () => {
            if (isMounted) {
              fetchChatRooms();
            }
          }
        )
        .subscribe();
    }

    return () => {
      isMounted = false;
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [user, authLoading, router]);

  // 새 채팅방 생성 함수
  const createNewChat = () => {
    router.push('/chat/new');
  };

  // 채팅방 클릭 함수
  const goToChatRoom = (roomId: string) => {
    console.log(`채팅방으로 이동: /chat/${roomId}`);
    
    try {
      // URL 경로를 직접 구성하여 이동
      const fullPath = `${window.location.origin}/chat/${roomId}`;
      console.log("이동 URL:", fullPath);
      
      // 보다 직접적인 방법: 하드 리디렉션 적용
      // location.assign은 새 페이지를 로드하고 브라우저 기록에 추가함
      window.location.assign(fullPath);
    } catch (error) {
      console.error('이동 중 오류 발생:', error);
      
      // 백업 방법: 실패할 경우 replace 사용
      window.location.replace(`/chat/${roomId}`);
    }
  };

  // 시간 형식화 함수
  const formatTime = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { 
        addSuffix: true,
        locale: ko
      });
    } catch (error) {
      return '';
    }
  };

  // 로그인 상태 확인 중이면 로딩 표시
  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <p className="text-lg text-center mb-4">로딩 중...</p>
      </div>
    );
  }

  // 로그인되지 않은 경우 로그인 유도
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <p className="text-lg text-center mb-4">채팅을 사용하려면 로그인이 필요합니다.</p>
        <Link 
          href="/login" 
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          로그인하기
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* 헤더 */}
      <header className="flex justify-between items-center p-4 border-b border-gray-200">
        <div className="flex items-center">
          <Link href="/" className="text-gray-600 mr-4">
            <FaArrowLeft size={18} />
          </Link>
          <h1 className="text-xl font-bold">채팅</h1>
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-gray-600 p-2">
            <FaSearch size={18} />
          </button>
        </div>
      </header>

      {/* 채팅방 목록 */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <p>채팅방을 불러오는 중...</p>
          </div>
        ) : chatRooms.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96">
            <p className="text-gray-500 mb-4">아직 채팅방이 없습니다.</p>
            <button 
              onClick={createNewChat}
              className="px-4 py-2 bg-primary text-white rounded-md"
            >
              새 대화 시작하기
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {chatRooms.map((room) => (
              <li key={room.id} className="hover:bg-gray-50">
                <button 
                  onClick={() => goToChatRoom(room.id)}
                  className="flex items-center p-4 w-full text-left"
                >
                  <div className="relative w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    {room.other_user.avatar_url ? (
                      <img 
                        src={room.other_user.avatar_url} 
                        alt={room.other_user.nickname}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaUser className="text-gray-400" size={24} />
                    )}
                    {room.is_virtual && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">
                        {room.other_user.nickname}
                        {room.is_virtual && (
                          <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                            AI
                          </span>
                        )}
                      </h3>
                      <span className="text-xs text-gray-500">{formatTime(room.last_message_time)}</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-sm text-gray-600 truncate max-w-[200px]">{room.last_message}</p>
                      {room.unread_count > 0 && (
                        <span className="ml-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                          {room.unread_count}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 새 채팅 시작 버튼 */}
      <div className="p-4 border-t border-gray-200">
        <button 
          onClick={createNewChat}
          className="w-full py-3 bg-primary text-white rounded-md font-medium transition-colors hover:bg-primary-dark"
        >
          새 대화 시작하기
        </button>
      </div>
    </div>
  );
} 