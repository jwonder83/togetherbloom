'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaPaperPlane, FaUser } from 'react-icons/fa';
import supabase from '../../../utils/supabase';
import { useAuth } from '../../../contexts/AuthContext';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { mockUsers, generateMockMessages, generateVirtualUserResponse } from '../../../utils/mockUsers';

type Message = {
  id: string;
  sender_id: string;
  message: string;
  created_at: string;
  is_read: boolean;
};

type OtherUser = {
    id: string;
  nickname: string;
  avatar_url: string | null;
};

export default function ChatRoomPage({ params }: { params: { id: string } }) {
  // 디버깅을 위한 로그
  console.log("Received params:", params);
  
  const roomId = params.id;
  console.log("Initial Room ID:", roomId);
  
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [otherUser, setOtherUser] = useState<OtherUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVirtual, setIsVirtual] = useState(false);
  const [virtualUserId, setVirtualUserId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  // 스크롤을 최신 메시지 위치로 이동
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
    if (!user) return; // 사용자가 없으면 대기
    
    // roomId 처리 수정 - 직접 URL에서 추출
    const idFromUrl = window.location.pathname.split('/').pop();
    console.log("1. URL에서 추출한 ID:", idFromUrl);
    console.log("2. params에서 가져온 ID:", roomId);
    
    // 최종 ID 결정 (URL 우선)
    const currentRoomId = idFromUrl || roomId;
    console.log("3. 최종 사용할 ID:", currentRoomId);
    
    if (!currentRoomId) {
      console.error("채팅방 ID를 찾을 수 없습니다.");
      window.location.href = '/chat';
      return;
    }
    
    let isMounted = true;
    setIsLoading(true);
    
    const fetchChatRoomData = async () => {
      try {
        console.log("Fetching data for room:", currentRoomId);
        
        // 가상 사용자와의 채팅인지 확인 - 로직 개선
        if (currentRoomId.includes('virtual-user')) {
          // ID에서 virtual-user-N 패턴 찾기
          const match = currentRoomId.match(/virtual-user-\d+/);
          const virtualId = match ? match[0] : null;
          
          console.log("추출된 가상 사용자 ID:", virtualId);
          
          if (virtualId) {
            const virtualUser = mockUsers.find(u => u.id === virtualId);
            
            if (virtualUser && isMounted) {
              console.log("가상 사용자 찾음:", virtualUser.nickname);
              setIsVirtual(true);
              setVirtualUserId(virtualId);
              setOtherUser({
                id: virtualUser.id,
                nickname: virtualUser.nickname,
                avatar_url: virtualUser.avatar_url
              });
              
              // 가상 대화 메시지 가져오기
              const mockMessages = generateMockMessages(user.id, virtualUser.id);
              setMessages(mockMessages);
              setIsLoading(false);
              return;
            } else {
              console.error("가상 사용자를 찾을 수 없음:", virtualId);
            }
          }
        }

        // 실제 채팅방 처리
        // 채팅방 존재 여부 확인 및 권한 확인
        const { data: participantCheck, error: participantError } = await supabase
          .from('chat_participants')
          .select('*')
          .eq('room_id', currentRoomId)
          .eq('profile_id', user.id)
          .single();

        if (participantError) {
          console.error('권한이 없거나 존재하지 않는 채팅방입니다:', participantError);
          if (isMounted) {
            router.push('/chat');
          }
          return;
        }

        // 상대방 정보 가져오기
        const { data: otherParticipant, error: otherParticipantError } = await supabase
          .from('chat_participants')
          .select('profile_id')
          .eq('room_id', currentRoomId)
          .neq('profile_id', user.id)
          .single();

        if (otherParticipantError) {
          console.error('상대방 정보를 가져오는 중 오류가 발생했습니다:', otherParticipantError);
          return;
        }

        // 상대방 프로필 정보 가져오기
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('id, nickname, avatar_url')
          .eq('id', otherParticipant.profile_id)
          .single();

        if (profileError) {
          console.error('프로필 정보를 가져오는 중 오류가 발생했습니다:', profileError);
          return;
        }

        if (isMounted) {
          setOtherUser(profile);
        }

        // 이전 메시지 불러오기
        const { data: messageData, error: messageError } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('room_id', currentRoomId)
          .order('created_at', { ascending: true });

        if (messageError) {
          console.error('메시지를 불러오는 중 오류가 발생했습니다:', messageError);
          return;
        }

        if (isMounted) {
          setMessages(messageData || []);
        }

        // 안 읽은 메시지 읽음 처리
        await supabase
          .from('chat_participants')
          .update({ is_read: true, unread_count: 0 })
          .eq('room_id', currentRoomId)
          .eq('profile_id', user.id);

        // 상대방이 보낸 메시지 읽음 처리
        await supabase
          .from('chat_messages')
          .update({ is_read: true })
          .eq('room_id', currentRoomId)
          .neq('sender_id', user.id)
          .eq('is_read', false);

      } catch (error) {
        console.error('채팅방 정보를 불러오는 중 오류가 발생했습니다:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchChatRoomData();

    // 실제 채팅방인 경우에만 실시간 메시지 구독
    let subscription;
    
    if (currentRoomId && !currentRoomId.startsWith('room-')) {
      subscription = supabase
        .channel(`chat_room:${currentRoomId}`)
        .on('postgres_changes', 
          {
            event: 'INSERT',
            schema: 'public',
            table: 'chat_messages',
            filter: `room_id=eq.${currentRoomId}`
          },
          async (payload) => {
            const newMessage = payload.new as Message;
            
            // 새 메시지 추가
            if (isMounted) {
              setMessages(prev => [...prev, newMessage]);
            }
            
            // 상대방이 보낸 메시지인 경우 읽음 처리
            if (newMessage.sender_id !== user.id) {
              // 참가자 정보 업데이트
              await supabase
                .from('chat_participants')
                .update({ is_read: true, unread_count: 0 })
                .eq('room_id', currentRoomId)
                .eq('profile_id', user.id);
                
              // 메시지 읽음 처리
              await supabase
                .from('chat_messages')
                .update({ is_read: true })
                .eq('id', newMessage.id);
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
  }, [roomId, user, authLoading, router]);

  // 메시지 목록이 업데이트될 때마다 스크롤 맨 아래로 이동
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 가상 사용자 응답 생성
  const generateVirtualResponse = async () => {
    if (!isVirtual || !virtualUserId || !user) return;
    
    // 타이핑 효과를 위한 delay
    setTimeout(() => {
      const response = generateVirtualUserResponse(virtualUserId, message);
      
      const newMessage: Message = {
        id: `virtual-msg-${Date.now()}`,
        sender_id: virtualUserId,
        message: response,
        created_at: new Date().toISOString(),
        is_read: true
      };
      
      setMessages(prev => [...prev, newMessage]);
    }, 1000 + Math.random() * 2000); // 1~3초 사이의 랜덤한 지연 시간
  };

  // 메시지 전송 함수
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !message.trim()) return;
    
    // URL에서 현재 roomId 가져오기
    const pathname = window.location.pathname;
    const pathSegments = pathname.split('/');
    const currentRoomId = pathSegments[pathSegments.length - 1];
    
    console.log("Sending message to room:", currentRoomId);
    
    try {
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
        sender_id: user.id,
        message: message.trim(),
        created_at: new Date().toISOString(),
        is_read: true
      };
      
      // 가상 사용자와의 채팅 - isVirtual 상태 변수 사용
      if (isVirtual && virtualUserId) {
        console.log("가상 사용자에게 메시지 전송:", virtualUserId);
        setMessages(prev => [...prev, newMsg]);
        generateVirtualResponse();
      } else {
        // 실제 DB에 메시지 저장
        const { error } = await supabase
          .from('chat_messages')
          .insert({
            room_id: currentRoomId,
            sender_id: user.id,
            message: message.trim()
          });

        if (error) throw error;
      }
      
      // 입력창 초기화
      setMessage('');
    } catch (error) {
      console.error('메시지 전송 중 오류가 발생했습니다:', error);
      alert('메시지를 전송하는 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  // 메시지 시간 포맷팅
  const formatMessageTime = (timestamp: string) => {
    try {
      return format(new Date(timestamp), 'a h:mm', { locale: ko });
    } catch (error) {
      return '';
    }
  };

  // 메시지 날짜 그룹 표시용 날짜 포맷팅
  const formatMessageDate = (timestamp: string) => {
    try {
      return format(new Date(timestamp), 'yyyy년 M월 d일 EEEE', { locale: ko });
    } catch (error) {
      return '';
    }
  };

  // 메시지 그룹화 (날짜별)
  const groupMessagesByDate = () => {
    const groups: { date: string; messages: Message[] }[] = [];
    
    messages.forEach(message => {
      const messageDate = formatMessageDate(message.created_at);
      const existingGroup = groups.find(group => group.date === messageDate);
      
      if (existingGroup) {
        existingGroup.messages.push(message);
      } else {
        groups.push({
          date: messageDate,
          messages: [message]
        });
      }
    });
    
    return groups;
  };

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
    <div className="flex flex-col h-screen">
      {/* 헤더 */}
      <header className="flex justify-between items-center p-4 border-b border-gray-200">
        <div className="flex items-center">
          <Link href="/chat" className="text-gray-600 mr-4">
          <FaArrowLeft size={18} />
        </Link>
          {isLoading ? (
            <div className="w-36 h-6 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <div className="flex items-center">
              <div className="relative w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                {otherUser?.avatar_url ? (
                  <img 
                    src={otherUser.avatar_url} 
                    alt={otherUser.nickname}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUser className="text-gray-400" size={20} />
                )}
                {isVirtual && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
          </div>
          <div className="ml-3">
                <h1 className="text-lg font-semibold">
                  {otherUser?.nickname}
                  {isVirtual && (
                    <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      AI
                    </span>
                  )}
                </h1>
              </div>
          </div>
          )}
        </div>
      </header>

      {/* 메시지 영역 */}
      <div 
        ref={messageContainerRef}
        className="flex-1 overflow-y-auto p-4 bg-gray-50"
      >
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <p>메시지를 불러오는 중...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">새로운 대화를 시작해보세요.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {groupMessagesByDate().map((group, groupIndex) => (
              <div key={groupIndex} className="space-y-4">
                <div className="text-center">
                  <span className="inline-block px-3 py-1 bg-gray-200 rounded-full text-xs text-gray-700">
                    {group.date}
                  </span>
                </div>
                
                {group.messages.map((msg, msgIndex) => {
                  const isMyMessage = msg.sender_id === user.id;
                  return (
                    <div 
                      key={msg.id} 
                      className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] ${isMyMessage ? 'order-2' : 'order-1'}`}>
                        {/* 상대방 프로필 (내 메시지가 아닐 때만 표시) */}
                        {!isMyMessage && (
                          <div className="flex items-center mb-1">
                            <div className="relative w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                              {otherUser?.avatar_url ? (
                                <img 
                                  src={otherUser.avatar_url} 
                                  alt={otherUser.nickname}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <FaUser className="text-gray-400" size={12} />
                              )}
                              {isVirtual && (
                                <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-1 border-white"></div>
                              )}
                            </div>
                            <span className="text-xs text-gray-700 ml-1">
                              {otherUser?.nickname}
                            </span>
                          </div>
                        )}
                        
                        {/* 메시지 내용 */}
                <div className="flex items-end">
                          {isMyMessage && (
                            <span className="text-xs text-gray-500 mr-2">
                              {msg.is_read ? '읽음' : '안읽음'}
                            </span>
                          )}
                          
                          <div 
                            className={`rounded-2xl px-4 py-2 break-words ${
                              isMyMessage 
                        ? 'bg-primary text-white rounded-tr-none' 
                              : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                            }`}
                          >
                            <p>{msg.message}</p>
                          </div>
                          
                          {!isMyMessage && (
                            <span className="text-xs text-gray-500 ml-2">
                              {formatMessageTime(msg.created_at)}
                            </span>
                          )}
                        </div>
                        
                        {/* 시간 표시 (내 메시지일 때) */}
                        {isMyMessage && (
                          <div className="flex justify-end">
                            <span className="text-xs text-gray-500 mt-1">
                              {formatMessageTime(msg.created_at)}
                            </span>
                  </div>
                  )}
                </div>
                    </div>
                  );
                })}
            </div>
          ))}
            <div ref={messagesEndRef} />
        </div>
        )}
      </div>
      
      {/* 메시지 입력 영역 */}
      <form onSubmit={sendMessage} className="border-t border-gray-200 p-4 bg-white">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="메시지 입력..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoComplete="off"
          />
          <button 
            type="submit"
            disabled={!message.trim()}
            className="ml-2 w-10 h-10 flex items-center justify-center bg-primary text-white rounded-full disabled:opacity-50"
          >
            <FaPaperPlane size={16} />
          </button>
        </div>
        </form>
    </div>
  );
} 