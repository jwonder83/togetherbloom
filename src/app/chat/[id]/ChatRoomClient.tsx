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
import { toast } from 'react-hot-toast';

type Message = {
  id: string;
  sender_id: string;
  message: string;
  created_at: string;
  is_read: boolean;
  room_id?: string;
};

type OtherUser = {
  id: string;
  nickname: string;
  avatar_url: string | null;
};

export default function ChatRoomClient({ params }: { params: { id: string } }) {
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
  const [error, setError] = useState<string | null>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 스크롤을 메시지 목록 하단으로 이동시키는 함수
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
    
    // 클라이언트 사이드에서만 실행되도록 마운트 여부를 확인
    let isMounted = true;
    setIsLoading(true);
    
    // roomId 처리 수정 - 클라이언트 사이드에서만 window 객체 접근
    const fetchChatRoomData = async () => {
      try {
        // 클라이언트에서만 window 객체에 접근
        let currentRoomId = roomId;
        
        if (typeof window !== 'undefined') {
          const idFromUrl = window.location.pathname.split('/').pop();
          console.log("1. URL에서 추출한 ID:", idFromUrl);
          console.log("2. params에서 가져온 ID:", roomId);
          
          // 최종 ID 결정 (URL 우선)
          currentRoomId = idFromUrl || roomId;
          console.log("3. 최종 사용할 ID:", currentRoomId);
        }
        
        if (!currentRoomId) {
          console.error("채팅방 ID를 찾을 수 없습니다.");
          if (typeof window !== 'undefined') {
            window.location.href = '/chat';
          } else {
            router.push('/chat');
          }
          return;
        }
        
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

        if (participantError || !participantCheck) {
          console.error("참여자 정보를 찾을 수 없음 - 권한이 없거나 채팅방이 존재하지 않습니다:", participantError);
          if (isMounted) {
            setError("이 채팅방에 접근할 수 없습니다.");
            setIsLoading(false);
          }
          return;
        }

        // 다른 참여자 정보 가져오기
        const { data: participants, error: participantsError } = await supabase
          .from('chat_participants')
          .select(`
            profile_id,
            profiles:profile_id (
              id,
              nickname,
              avatar_url
            )
          `)
          .eq('room_id', currentRoomId)
          .neq('profile_id', user.id);

        if (participantsError) {
          console.error("참여자 정보 가져오기 실패:", participantsError);
          if (isMounted) {
            setError("채팅 상대 정보를 불러올 수 없습니다.");
            setIsLoading(false);
          }
          return;
        }

        const otherParticipant = participants?.[0]?.profiles;
        
        if (otherParticipant && isMounted) {
          setOtherUser({
            id: otherParticipant.id,
            nickname: otherParticipant.nickname,
            avatar_url: otherParticipant.avatar_url
          });
        }

        // 메시지 가져오기
        const { data: messageData, error: messageError } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('room_id', currentRoomId)
          .order('created_at', { ascending: true });

        if (messageError) {
          console.error("메시지 가져오기 실패:", messageError);
          if (isMounted) {
            setError("메시지를 불러올 수 없습니다.");
            setIsLoading(false);
          }
          return;
        }

        if (isMounted) {
          setMessages(messageData || []);
          setIsLoading(false);
        }

        // 실시간 메시지 구독
        const subscription = supabase
          .channel(`room_${currentRoomId}`)
          .on('postgres_changes', {
            event: 'INSERT',
            schema: 'public',
            table: 'chat_messages',
            filter: `room_id=eq.${currentRoomId}`
          }, (payload) => {
            const newMessage = payload.new as Message;
            if (isMounted) {
              setMessages(prevMessages => [...prevMessages, newMessage]);
              // 스크롤 최하단으로 이동
              scrollToBottom();
            }
          })
          .subscribe();

        // 가상 사용자인 경우 응답 생성 기능 추가
        if (isVirtual && virtualUserId) {
          console.log("가상 응답 생성 설정 완료");
        }

        return () => {
          isMounted = false;
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error("채팅방 데이터 로드 중 오류 발생:", error);
        if (isMounted) {
          setError("채팅방 데이터를 불러올 수 없습니다.");
          setIsLoading(false);
        }
      }
    };

    fetchChatRoomData();

    return () => {
      isMounted = false;
    };
  }, [user, authLoading, roomId, router]);

  // 메시지가 업데이트될 때마다 스크롤을 하단으로 이동
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 채팅방 렌더링 후 스크롤 최하단으로 이동
  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      scrollToBottom();
    }
  }, [isLoading, messages.length]);

  // 가상 사용자 응답 생성 함수
  const generateVirtualResponse = (virtualId: string, userMessage: string): Message | null => {
    if (!userMessage) return null;
    
    // 소문자로 변환하여 키워드 검색이 용이하게 함
    const lowerCaseMessage = userMessage.toLowerCase();
    let response = '';
    
    // 인사말 관련 키워드 체크
    if (lowerCaseMessage.includes('안녕') || 
        lowerCaseMessage.includes('반가워') || 
        lowerCaseMessage.includes('hi') || 
        lowerCaseMessage.includes('hello')) {
      const greetings = [
        "안녕하세요! 반가워요 😊",
        "안녕! 오늘 기분이 어때요?",
        "반갑습니다! 저와 대화하게 되어 기쁘네요.",
        "안녕하세요! 오늘 날씨가 어떤가요?"
      ];
      response = greetings[Math.floor(Math.random() * greetings.length)];
    } 
    // 취미 관련 키워드 체크
    else if (lowerCaseMessage.includes('취미') || 
             lowerCaseMessage.includes('좋아하는 것') || 
             lowerCaseMessage.includes('관심사')) {
      const hobbies = [
        "저는 독서, 여행, 그리고 새로운 요리를 시도하는 것을 좋아해요.",
        "음악 감상과 영화 보는 걸 좋아해요. 어떤 영화를 좋아하세요?",
        "저는 프로그래밍과 디자인에 관심이 많아요. 당신은 어떤 취미가 있으세요?",
        "운동하는 걸 좋아해요, 특히 요가와 등산이요. 당신은 어떤 운동을 좋아하세요?"
      ];
      response = hobbies[Math.floor(Math.random() * hobbies.length)];
    } 
    // 나이 관련 키워드 체크
    else if (lowerCaseMessage.includes('나이') || 
             lowerCaseMessage.includes('몇 살')) {
      const ages = [
        "저는 20대 중반이에요. 당신은요?",
        "나이는 그냥 숫자에 불과하죠. 하지만 저는 27살이에요.",
        "저는 25살이에요. 나이를 물어봐 주셔서 감사해요!",
        "저는 29살입니다. 당신은 몇 살인가요?"
      ];
      response = ages[Math.floor(Math.random() * ages.length)];
    } 
    // 지역 관련 키워드 체크
    else if (lowerCaseMessage.includes('어디') || 
             lowerCaseMessage.includes('지역') || 
             lowerCaseMessage.includes('사는 곳')) {
      const locations = [
        "저는 서울에 살고 있어요. 특히 강남 지역을 좋아해요.",
        "저는 부산 해운대 근처에 살아요. 바다가 보이는 곳이 좋더라고요.",
        "서울 홍대 근처에서 살고 있어요. 문화생활하기 좋은 곳이죠.",
        "제주도에서 살고 있어요. 자연이 정말 아름다워요."
      ];
      response = locations[Math.floor(Math.random() * locations.length)];
    } 
    // 직업 관련 키워드 체크
    else if (lowerCaseMessage.includes('직업') || 
             lowerCaseMessage.includes('일') || 
             lowerCaseMessage.includes('뭐 해')) {
      const jobs = [
        "저는 웹 개발자로 일하고 있어요. 프론트엔드 쪽을 주로 해요.",
        "디자인 회사에서 UX 디자이너로 일하고 있어요.",
        "저는 마케팅 분야에서 일하고 있어요. 소셜 미디어 마케팅을 주로 담당하죠.",
        "프리랜서 작가로 활동하고 있어요. 주로 기술 관련 글을 씁니다."
      ];
      response = jobs[Math.floor(Math.random() * jobs.length)];
    } 
    // 기본 응답
    else {
      const defaultResponses = [
        "흥미로운 이야기네요!",
        "더 자세히 말씀해 주실래요?",
        "같이 이야기하게 되어 반가워요.",
        "그렇군요. 잘 이해했어요.",
        "계속 말씀해 주세요. 관심있게 듣고 있어요.",
        "저도 비슷한 경험이 있어요.",
        "오늘 날씨가 어때요?",
        "아주 좋은 질문이네요."
      ];
      response = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
    
    return {
      id: `virtual-msg-${Date.now()}`,
      sender_id: virtualId,
      message: response,
      created_at: new Date().toISOString(),
      is_read: true,
      room_id: roomId
    };
  };

  // 메시지 전송 함수
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !user) return;
    
    try {
      // 사용자 메시지 객체 생성
      const userMessage: Message = {
        id: `user-msg-${Date.now()}`,
        sender_id: user.id,
        message: message.trim(),
        created_at: new Date().toISOString(),
        is_read: true,
        room_id: roomId
      };
      
      // 메시지 목록에 사용자 메시지 추가
      setMessages(prev => [...prev, userMessage]);
      
      // 입력 필드 초기화
      setMessage('');
      
      // 현재 채팅방이 가상 사용자와의 대화라면
      if (isVirtual && virtualUserId) {
        setTimeout(() => {
          // 가상 응답 생성
          const virtualResponse = generateVirtualResponse(virtualUserId, message);
          
          if (virtualResponse) {
            // 가상 응답 메시지를 메시지 목록에 추가
            setMessages(prev => [...prev, virtualResponse]);
          }
        }, 1000 + Math.random() * 2000); // 1-3초 사이의 랜덤한 지연시간
      } else {
        // 실제 API 호출이 필요한 경우 여기에 구현
      }
    } catch (error) {
      console.error('메시지 전송 오류:', error);
      toast.error('메시지 전송에 실패했습니다.');
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
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="flex justify-between items-center p-4 border-b border-gray-200">
        <div className="flex items-center">
          <Link href="/chat" className="text-gray-600 mr-4" title="채팅 목록으로 돌아가기">
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
        id="message-container"
        ref={messageContainerRef}
        className="flex-1 p-4 overflow-y-auto"
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
            <div ref={messageEndRef} />
        </div>
        )}
      </div>
      
      {/* 메시지 입력 영역 */}
      <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4 bg-white">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="메시지 입력..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoComplete="off"
            ref={inputRef}
          />
          <button 
            type="submit"
            disabled={!message.trim()}
            className="ml-2 w-10 h-10 flex items-center justify-center bg-primary text-white rounded-full disabled:opacity-50"
            title="메시지 전송"
          >
            <FaPaperPlane size={16} />
          </button>
        </div>
        </form>
    </div>
  );
} 