'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaSearch, FaUser, FaRobot } from 'react-icons/fa';
import supabase from '../../../utils/supabase';
import { useAuth } from '../../../contexts/AuthContext';
import { mockUsers } from '../../../utils/mockUsers';

type Profile = {
  id: string;
  nickname: string;
  avatar_url: string | null;
  is_virtual?: boolean;
};

export default function NewChatPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      if (!user) return;

      try {
        // 내 프로필을 제외한 모든 사용자 프로필 가져오기
        const { data, error } = await supabase
          .from('profiles')
          .select('id, nickname, avatar_url')
          .neq('id', user.id);

        if (error) throw error;

        // 실제 사용자 + 가상 사용자 
        const virtualProfiles = mockUsers.map(virtualUser => ({
          id: virtualUser.id,
          nickname: virtualUser.name,
          avatar_url: virtualUser.profileImage,
          is_virtual: true
        }));
        
        setProfiles([...virtualProfiles, ...(data || [])]);
      } catch (error) {
        console.error('프로필을 불러오는 중 오류가 발생했습니다:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, [user]);

  // 검색어로 사용자 필터링
  const filteredProfiles = profiles.filter(profile => 
    profile.nickname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 새로운 채팅방 생성
  const startChat = async (otherUserId: string, isVirtual = false) => {
    if (!user) return;

    try {
      // 가상 사용자와의 채팅
      if (isVirtual) {
        const roomId = `room-${user.id}-${otherUserId}`;
        router.push(`/chat/${roomId}`);
        return;
      }

      // 실제 사용자와의 채팅인 경우
      // 이미 존재하는 채팅방 확인 (A와 B 사이의 대화)
      const { data: existingParticipants, error: participantsError } = await supabase
        .from('chat_participants')
        .select('room_id')
        .eq('profile_id', user.id);

      if (participantsError) throw participantsError;

      if (existingParticipants && existingParticipants.length > 0) {
        const roomIds = existingParticipants.map(p => p.room_id);

        const { data: otherParticipants, error: otherError } = await supabase
          .from('chat_participants')
          .select('room_id')
          .eq('profile_id', otherUserId)
          .in('room_id', roomIds);

        if (otherError) throw otherError;

        // 이미 대화방이 있는 경우 해당 대화방으로 이동
        if (otherParticipants && otherParticipants.length > 0) {
          router.push(`/chat/${otherParticipants[0].room_id}`);
          return;
        }
      }

      // 새 채팅방 생성
      const { data: newRoom, error: roomError } = await supabase
        .from('chat_rooms')
        .insert({})
        .select();

      if (roomError) throw roomError;

      const roomId = newRoom[0].id;

      // 자신을 참가자로 추가
      const { error: myParticipantError } = await supabase
        .from('chat_participants')
        .insert({
          room_id: roomId,
          profile_id: user.id
        });

      if (myParticipantError) throw myParticipantError;

      // 상대방을 참가자로 추가
      const { error: otherParticipantError } = await supabase
        .from('chat_participants')
        .insert({
          room_id: roomId,
          profile_id: otherUserId
        });

      if (otherParticipantError) throw otherParticipantError;

      // 채팅방으로 이동
      router.push(`/chat/${roomId}`);
    } catch (error) {
      console.error('채팅방 생성 중 오류가 발생했습니다:', error);
      alert('채팅방을 생성하는 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
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
    <div className="flex flex-col min-h-screen">
      {/* 헤더 */}
      <header className="flex justify-between items-center p-4 border-b border-gray-200">
        <div className="flex items-center">
          <Link href="/chat" className="text-gray-600 mr-4">
            <FaArrowLeft size={18} />
          </Link>
          <h1 className="text-xl font-bold">새 대화</h1>
        </div>
      </header>

      {/* 검색창 */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="사용자 검색..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* 가상 사용자 섹션 */}
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-md font-semibold text-gray-700 mb-3">AI 대화상대</h2>
        <div className="grid grid-cols-1 gap-3">
          {filteredProfiles
            .filter(profile => profile.is_virtual)
            .map((profile) => (
              <button 
                key={profile.id}
                onClick={() => startChat(profile.id, true)}
                className="w-full text-left hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="flex items-center p-3">
                  <div className="relative w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    {profile.avatar_url ? (
                      <img 
                        src={profile.avatar_url} 
                        alt={profile.nickname}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaUser className="text-gray-400" size={24} />
                    )}
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center">
                      <h3 className="font-semibold">{profile.nickname}</h3>
                      <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">AI</span>
                    </div>
                    <p className="text-sm text-gray-500">가상 대화 상대</p>
                  </div>
                </div>
              </button>
            ))}
        </div>
      </div>

      {/* 실제 사용자 목록 */}
      <div className="p-4">
        <h2 className="text-md font-semibold text-gray-700 mb-3">사용자</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <p>사용자 목록을 불러오는 중...</p>
          </div>
        ) : filteredProfiles.filter(p => !p.is_virtual).length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {searchQuery ? '검색 결과가 없습니다.' : '대화할 수 있는 사용자가 없습니다.'}
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredProfiles
              .filter(profile => !profile.is_virtual)
              .map((profile) => (
                <li key={profile.id}>
                  <button 
                    onClick={() => startChat(profile.id)}
                    className="w-full text-left"
                  >
                    <div className="flex items-center p-4 hover:bg-gray-50">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                        {profile.avatar_url ? (
                          <img 
                            src={profile.avatar_url} 
                            alt={profile.nickname}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FaUser className="text-gray-400" size={24} />
                        )}
                      </div>
                      <div className="ml-4">
                        <h3 className="font-semibold">{profile.nickname}</h3>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
} 