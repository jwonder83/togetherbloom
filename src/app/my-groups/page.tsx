'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaUsers, FaCalendarAlt, FaMapMarkerAlt, FaCrown, FaStar, FaPlus, FaChevronRight } from 'react-icons/fa';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import CreateGroupButton from '@/components/CreateGroupButton';

// 더미 그룹 데이터 - 실제로는 DB에서 가져와야 함
const myGroups = [
  {
    id: '1',
    name: '서울 맛집 탐방단',
    description: '서울의 숨겨진 맛집을 함께 탐방하는 모임입니다.',
    keywords: ['맛집', '서울', '음식'],
    participants: 24,
    meetingDays: '매주 토요일',
    location: '서울 전역',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    isOwner: true, // 내가 만든 그룹
    lastActive: '2023-11-29T14:30:00'
  },
  {
    id: '3',
    name: '주말 등산 모임',
    description: '서울 근교의 산을 함께 등반하며 건강을 챙기는 모임입니다.',
    keywords: ['등산', '아웃도어', '건강'],
    participants: 18,
    meetingDays: '매주 일요일 오전',
    location: '서울 근교',
    image: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    isOwner: false, // 참여 중인 그룹
    lastActive: '2023-11-28T09:15:00'
  },
  {
    id: '5',
    name: '영어 회화 스터디',
    description: '영어 실력 향상을 위한 회화 중심 스터디 그룹입니다.',
    keywords: ['영어', '회화', '스터디'],
    participants: 15,
    meetingDays: '매주 화, 목요일',
    location: '홍대 스터디 카페',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    isOwner: false, // 참여 중인 그룹
    lastActive: '2023-11-27T18:45:00'
  },
  {
    id: '7',
    name: '사진 촬영 동호회',
    description: '다양한 장소에서 사진 촬영을 즐기는 동호회입니다.',
    keywords: ['사진', '촬영', '카메라'],
    participants: 22,
    meetingDays: '격주 토요일',
    location: '서울 전역',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1464&auto=format&fit=crop',
    isOwner: true, // 내가 만든 그룹
    lastActive: '2023-11-25T10:00:00'
  }
];

// 고급 UI 스타일 정의
const styles = {
  navy: '#23395B',
  gold: '#FFD700',
  darkNavy: '#152238',
  lightGold: '#FFE566',
  lightBg: '#F7F9FC',
  darkText: '#1A2A3A',
  lightText: '#EAEEF3',
  gradient: 'linear-gradient(135deg, #23395B, #345689)',
  cardShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
  hoverShadow: '0 12px 40px rgba(0, 0, 0, 0.18)',
  buttonShadow: '0 4px 12px rgba(35, 57, 91, 0.3)',
  animation: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out'
};

export default function MyGroupsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'all' | 'created' | 'joined'>('all');
  
  // 로그인 상태 확인
  useEffect(() => {
    if (!isLoading && !user) {
      // 로그인되지 않은 경우 로그인 페이지로 리디렉션
      router.push('/login?redirect=/my-groups');
    }
  }, [user, isLoading, router]);

  // 필터링된 그룹 목록
  const filteredGroups = myGroups.filter(group => {
    if (activeTab === 'all') return true;
    if (activeTab === 'created') return group.isOwner;
    if (activeTab === 'joined') return !group.isOwner;
    return true;
  });

  // 로딩 중이거나 로그인되지 않은 경우
  if (isLoading || !user) {
    return (
      <div className="flex flex-col min-h-screen" style={{ background: styles.lightBg }}>
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full animate-pulse" style={{ background: `${styles.navy}` }}></div>
            <p className="text-lg animate-pulse" style={{ color: styles.darkText }}>잠시만 기다려주세요...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ background: styles.lightBg }}>
      <Header />
      
      <main className="flex-1">
        {/* 페이지 헤더 */}
        <div className="py-8 px-5" style={{ 
          background: styles.gradient,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
        }}>
          <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: styles.lightText }}>
            내 모임
          </h1>
          <p className="text-lg opacity-90" style={{ color: styles.lightText }}>
            내가 참여 중인 모임과 만든 모임을 확인하세요
          </p>
        </div>
        
        {/* 탭 메뉴 */}
        <div className="sticky top-0 z-10 px-4 py-1" style={{ 
          background: 'white', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}>
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('all')}
              className={`py-4 px-6 font-medium text-base relative transition-all duration-300 ease-in-out`}
              style={{ 
                color: activeTab === 'all' ? styles.navy : '#6B7280',
                fontWeight: activeTab === 'all' ? '600' : '500',
              }}
            >
              전체 모임
              {activeTab === 'all' && (
                <span className="absolute bottom-0 left-0 w-full h-1 rounded-t-md" style={{ 
                  background: styles.gold,
                  boxShadow: '0 0 8px rgba(255, 215, 0, 0.5)'
                }}></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('created')}
              className={`py-4 px-6 font-medium text-base relative transition-all duration-300 ease-in-out`}
              style={{ 
                color: activeTab === 'created' ? styles.navy : '#6B7280',
                fontWeight: activeTab === 'created' ? '600' : '500',
              }}
            >
              내가 만든 모임
              {activeTab === 'created' && (
                <span className="absolute bottom-0 left-0 w-full h-1 rounded-t-md" style={{ 
                  background: styles.gold,
                  boxShadow: '0 0 8px rgba(255, 215, 0, 0.5)'
                }}></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('joined')}
              className={`py-4 px-6 font-medium text-base relative transition-all duration-300 ease-in-out`}
              style={{ 
                color: activeTab === 'joined' ? styles.navy : '#6B7280',
                fontWeight: activeTab === 'joined' ? '600' : '500',
              }}
            >
              참여 중인 모임
              {activeTab === 'joined' && (
                <span className="absolute bottom-0 left-0 w-full h-1 rounded-t-md" style={{ 
                  background: styles.gold,
                  boxShadow: '0 0 8px rgba(255, 215, 0, 0.5)'
                }}></span>
              )}
            </button>
          </div>
        </div>
        
        {/* 모임 목록 */}
        <section className="px-5 py-8">
          {filteredGroups.length === 0 ? (
            <div className="py-16 flex flex-col items-center">
              <div className="w-20 h-20 flex items-center justify-center mb-6 rounded-full" 
                style={{ 
                  background: `linear-gradient(135deg, ${styles.navy}, #4A6FA5)`,
                  boxShadow: '0 8px 20px rgba(35, 57, 91, 0.25)'
                }}>
                <FaUsers size={32} color="white" />
              </div>
              <p className="text-xl font-semibold mb-3" style={{ color: styles.darkText }}>
                아직 {activeTab === 'created' ? '만든' : activeTab === 'joined' ? '참여한' : ''} 모임이 없어요
              </p>
              <p className="text-base text-center max-w-sm mb-8" style={{ color: '#6B7280' }}>
                {activeTab === 'created' 
                  ? '새로운 모임을 만들고 관심사가 비슷한 사람들과 함께하세요' 
                  : '관심 있는 모임에 참여하고 새로운 인연을 만들어보세요'}
              </p>
              <Link 
                href={activeTab === 'created' ? '/create-group' : '/group'} 
                className="py-3 px-6 rounded-full flex items-center text-white font-medium transition-transform hover:scale-105 active:scale-95"
                style={{ 
                  background: `linear-gradient(135deg, ${styles.navy}, #4A6FA5)`,
                  boxShadow: styles.buttonShadow
                }}
              >
                <FaPlus className="mr-2" size={14} />
                {activeTab === 'created' ? '모임 만들기' : '모임 찾아보기'}
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredGroups.map((group) => (
                <Link key={group.id} href={`/group/${group.id}`} className="block">
                  <div className="p-1 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: 'white',
                      boxShadow: styles.cardShadow,
                      transition: styles.animation
                    }}>
                    <div className="p-5 rounded-xl overflow-hidden flex items-start border border-gray-100">
                      <div className="w-20 h-20 rounded-xl overflow-hidden relative shadow-lg flex-shrink-0"
                        style={{ border: group.isOwner ? `2px solid ${styles.gold}` : '' }}>
                        <Image 
                          src={group.image} 
                          alt={group.name} 
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                        {group.isOwner && (
                          <div className="absolute top-0 right-0 p-1 rounded-bl-md"
                            style={{ background: styles.gold }}>
                            <FaCrown size={12} color={styles.darkNavy} />
                          </div>
                        )}
                      </div>
                      <div className="ml-5 flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-lg" style={{ color: styles.darkText }}>{group.name}</h3>
                          {group.isOwner ? (
                            <span className="text-sm font-semibold px-3 py-1 rounded-full"
                              style={{ 
                                color: styles.darkNavy,
                                background: `${styles.gold}4D`,
                                border: `1px solid ${styles.gold}`
                              }}>
                              관리자
                            </span>
                          ) : (
                            <span className="text-sm font-medium px-3 py-1 rounded-full"
                              style={{ 
                                color: styles.navy,
                                background: `${styles.navy}1A`,
                                border: `1px solid ${styles.navy}33`
                              }}>
                              멤버
                            </span>
                          )}
                        </div>
                        
                        <p className="text-sm mb-3 line-clamp-1" style={{ color: '#6B7280' }}>
                          {group.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {group.keywords.map((keyword, idx) => (
                            <span key={idx} className="text-xs px-3 py-1 rounded-full"
                              style={{
                                background: `${styles.navy}0D`,
                                color: styles.navy,
                                border: `1px solid ${styles.navy}26`
                              }}>
                              {keyword}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center" style={{ color: '#6B7280' }}>
                            <div className="flex items-center mr-4">
                              <FaUsers className="mr-1" size={12} />
                              <span>{group.participants}명</span>
                            </div>
                            <div className="flex items-center">
                              <FaMapMarkerAlt className="mr-1" size={12} />
                              <span>{group.location}</span>
                            </div>
                          </div>
                          <div className="flex items-center text-xs font-medium" style={{ color: styles.navy }}>
                            <span>자세히 보기</span>
                            <FaChevronRight size={10} className="ml-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      
      <CreateGroupButton />
    </div>
  );
} 