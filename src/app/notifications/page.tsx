'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaTrash, FaUser, FaUsers, FaComment, FaHeart } from 'react-icons/fa';
import supabase from '../../utils/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

type Notification = {
  id: string;
  type: 'follow' | 'like' | 'comment' | 'match' | 'group_invite' | 'message';
  content: string;
  is_read: boolean;
  created_at: string;
  related_id?: string;
  related_type?: string;
  sender?: {
    id: string;
    nickname: string;
    avatar_url: string | null;
  };
};

export default function NotificationsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user) return;

      try {
        // 실제 데이터베이스에서 알림을 가져오는 코드
        // 지금은 가상의 알림 데이터를 사용
        const mockNotifications: Notification[] = [
          {
            id: '1',
            type: 'follow',
            content: '홍길동님이 회원님을 팔로우했습니다.',
            is_read: false,
            created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
            sender: {
              id: 'user1',
              nickname: '홍길동',
              avatar_url: null
            }
          },
          {
            id: '2',
            type: 'like',
            content: '김철수님이 회원님의 게시글에 좋아요를 눌렀습니다.',
            is_read: true,
            created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
            related_id: 'post1',
            related_type: 'post',
            sender: {
              id: 'user2',
              nickname: '김철수',
              avatar_url: null
            }
          },
          {
            id: '3',
            type: 'comment',
            content: '이영희님이 회원님의 게시글에 댓글을 남겼습니다: "정말 좋은 글이네요!"',
            is_read: false,
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
            related_id: 'post2',
            related_type: 'post',
            sender: {
              id: 'user3',
              nickname: '이영희',
              avatar_url: null
            }
          },
          {
            id: '4',
            type: 'group_invite',
            content: '서울 맛집 탐방 모임에 초대되었습니다.',
            is_read: false,
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
            related_id: 'group1',
            related_type: 'group'
          },
          {
            id: '5',
            type: 'message',
            content: '박민수님이 새로운 메시지를 보냈습니다.',
            is_read: true,
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
            related_id: 'chat1',
            related_type: 'chat',
            sender: {
              id: 'user4',
              nickname: '박민수',
              avatar_url: null
            }
          }
        ];

        setNotifications(mockNotifications);
      } catch (error) {
        console.error('알림을 불러오는 중 오류가 발생했습니다:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, [user]);

  // 알림 읽음 처리
  const markAsRead = async (notificationId: string) => {
    // 실제 구현에서는 DB에 상태 업데이트 필요
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, is_read: true } 
          : notification
      )
    );
  };

  // 알림 모두 읽음 처리
  const markAllAsRead = async () => {
    // 실제 구현에서는 DB에 상태 업데이트 필요
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, is_read: true }))
    );
  };

  // 알림 삭제
  const deleteNotification = async (notificationId: string) => {
    // 실제 구현에서는 DB에서 삭제 필요
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  // 알림 클릭 처리
  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    
    if (notification.related_type && notification.related_id) {
      switch (notification.related_type) {
        case 'post':
          router.push(`/post/${notification.related_id}`);
          break;
        case 'group':
          router.push(`/group/${notification.related_id}`);
          break;
        case 'chat':
          router.push(`/chat/${notification.related_id}`);
          break;
        default:
          break;
      }
    } else if (notification.sender) {
      router.push(`/profile/${notification.sender.id}`);
    }
  };

  // 알림 아이콘 결정
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'follow':
        return <FaUser className="text-blue-500" size={20} />;
      case 'like':
        return <FaHeart className="text-red-500" size={20} />;
      case 'comment':
        return <FaComment className="text-green-500" size={20} />;
      case 'group_invite':
        return <FaUsers className="text-purple-500" size={20} />;
      case 'message':
        return <FaComment className="text-primary" size={20} />;
      default:
        return <FaUser className="text-gray-500" size={20} />;
    }
  };

  // 시간 형식화
  const formatTime = (timestamp: string) => {
    try {
      // timestamp가 유효한지 확인
      if (!timestamp) return '';
      
      const date = new Date(timestamp);
      // 유효한 날짜인지 확인
      if (isNaN(date.getTime())) return '';
      
      return formatDistanceToNow(date, { 
        addSuffix: true,
        locale: ko
      });
    } catch (error) {
      return '';
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <p className="text-lg text-center mb-4">알림을 확인하려면 로그인이 필요합니다.</p>
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
          <h1 className="text-xl font-bold">알림</h1>
        </div>
        {notifications.some(notification => !notification.is_read) && (
          <button 
            onClick={markAllAsRead}
            className="text-sm text-primary"
          >
            모두 읽음으로 표시
          </button>
        )}
      </header>

      {/* 알림 목록 */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <p>알림을 불러오는 중...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96">
            <p className="text-gray-500">새로운 알림이 없습니다.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <li key={notification.id} className={`${notification.is_read ? 'bg-white' : 'bg-blue-50'}`}>
                <div 
                  className="p-4 flex items-start hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex-shrink-0 mr-3">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{notification.content}</p>
                    <p className="text-xs text-gray-500 mt-1">{formatTime(notification.created_at)}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notification.id);
                    }}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 