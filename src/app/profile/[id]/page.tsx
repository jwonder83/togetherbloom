'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import { FaArrowLeft, FaUser, FaMapMarkerAlt, FaRegCalendarAlt, FaComment, FaUsers, FaHeart, FaShareAlt, FaStar, FaEllipsisH, FaRegBookmark, FaBell } from 'react-icons/fa';

// 샘플 회원 데이터
const members = [
  {
    id: '1',
    name: '김민준',
    keywords: ['개발', '음악', '게임'],
    profileImage: `https://i.pravatar.cc/300?img=1`,
    role: '프론트엔드 개발자',
    location: '서울 강남구',
    joinDate: '2023년 5월',
    bio: '안녕하세요! 웹 개발과 음악을 좋아하는 개발자입니다. 다양한 프로젝트와 취미 활동을 통해 새로운 인연을 만들고 싶어요.',
    groups: ['개발자 네트워킹', '음악 감상 모임'],
    temperature: 36.5,
    responseRate: 95,
    lastActive: '오늘',
    activityLevel: '매우 활발함',
    follower: 125,
    following: 78,
    posts: 24,
    reviewCount: 15,
    reviewScore: 4.8,
    level: '싹수 좋은 멤버'
  },
  {
    id: '2',
    name: '이지현',
    keywords: ['요리', '여행', '독서'],
    profileImage: `https://i.pravatar.cc/300?img=5`,
    role: '푸드 블로거',
    location: '서울 마포구',
    joinDate: '2023년 3월',
    bio: '음식을 만들고 여행하며 맛집을 탐방하는 것을 좋아합니다. 요리 레시피와 맛집 정보를 공유하고 싶어요!',
    groups: ['서울 맛집 탐방단', '요리 클래스']
  },
  {
    id: '3',
    name: '박준호',
    keywords: ['운동', '여행', '게임'],
    profileImage: `https://i.pravatar.cc/300?img=3`,
    role: '피트니스 트레이너',
    location: '서울 송파구',
    joinDate: '2023년 4월',
    bio: '헬스트레이너로 활동하고 있습니다. 운동, 건강, 여행에 관심이 많고 다양한 사람들과 소통하고 싶어요.',
    groups: ['헬스 동호회', '등산 모임']
  },
  {
    id: '4',
    name: '최서연',
    keywords: ['예술', '독서', '음악'],
    profileImage: `https://i.pravatar.cc/300?img=9`,
    role: '그래픽 디자이너',
    location: '서울 성동구',
    joinDate: '2023년 6월',
    bio: '그래픽 디자이너로 일하고 있으며, 예술 전시회를 보러 다니는 것을 좋아합니다. 창의적인 활동에 관심이 많아요.',
    groups: ['디자인 스터디', '미술관 투어']
  },
  {
    id: '5',
    name: '정현우',
    keywords: ['개발', '커리어', '독서'],
    profileImage: `https://i.pravatar.cc/300?img=7`,
    role: '백엔드 개발자',
    location: '경기 분당구',
    joinDate: '2023년 2월',
    bio: '백엔드 개발자로 일하고 있으며, 새로운 기술 학습과 개발자 커뮤니티 활동에 관심이 많습니다.',
    groups: ['백엔드 개발자 모임', '독서 토론']
  },
  {
    id: '6',
    name: '강지원',
    keywords: ['여행', '음악', '요리'],
    profileImage: `https://i.pravatar.cc/300?img=15`,
    role: '여행 작가',
    location: '서울 종로구',
    joinDate: '2023년 7월',
    bio: '세계 각국을 여행하며 블로그에 여행기를 작성하고 있습니다. 다양한 문화와 음식에 관심이 많아요.',
    groups: ['여행 동호회', '글쓰기 모임']
  },
  {
    id: '7',
    name: '한소희',
    keywords: ['예술', '독서', '요리'],
    profileImage: `https://i.pravatar.cc/300?img=8`,
    role: '일러스트레이터',
    location: '서울 용산구',
    joinDate: '2023년 5월',
    bio: '일러스트레이터로 활동하며, 그림 그리기와 독서를 좋아합니다. 창작 활동과 요리에 관심이 많아요.',
    groups: ['일러스트 스터디', '요리 교실']
  },
  {
    id: '8',
    name: '임재준',
    keywords: ['개발', '게임', '운동'],
    profileImage: `https://i.pravatar.cc/300?img=12`,
    role: '게임 개발자',
    location: '경기 판교',
    joinDate: '2023년 1월',
    bio: '게임 개발자로 일하고 있으며, 게임 플레이와 운동을 좋아합니다. 개발 관련 정보 공유와 네트워킹에 관심이 있어요.',
    groups: ['게임 개발자 모임', '농구 동호회']
  }
];

export default function ProfilePage({ params }: { params: { id: string } }) {
  const userId = params.id;
  const member = members.find(m => m.id === userId);
  const [activeTab, setActiveTab] = useState<'info' | 'groups' | 'reviews'>('info');

  // 회원을 찾을 수 없는 경우
  if (!member) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-4">
            <h2 className="text-xl font-bold mb-2">회원을 찾을 수 없습니다.</h2>
            <Link href="/" className="text-primary">
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-1 max-w-4xl mx-auto w-full bg-white shadow-sm">
        {/* 상단 네비게이션 */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <Link href="/members" className="text-gray-700 mr-4">
              <FaArrowLeft size={18} />
            </Link>
            <h1 className="text-lg font-medium">프로필</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button className="text-gray-500 hover:text-gray-700">
              <FaRegBookmark size={20} />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <FaBell size={20} />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <FaEllipsisH size={20} />
            </button>
          </div>
        </div>
        
        {/* 프로필 헤더 */}
        <div className="px-4 py-6 border-b border-gray-200">
          <div className="flex items-start">
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md">
                <Image
                  src={member.profileImage}
                  alt={member.name}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs shadow-md">
                <FaStar size={12} />
              </div>
            </div>
            
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-xl font-bold">{member.name}</h1>
                  <p className="text-gray-500 text-sm">{member.level}</p>
                </div>
                <button className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition-colors">
                  팔로우
                </button>
              </div>
              
              <div className="flex mt-4 space-x-4 text-center">
                <div>
                  <p className="font-bold">{member.posts}</p>
                  <p className="text-xs text-gray-500">게시글</p>
                </div>
                <div>
                  <p className="font-bold">{member.follower}</p>
                  <p className="text-xs text-gray-500">팔로워</p>
                </div>
                <div>
                  <p className="font-bold">{member.following}</p>
                  <p className="text-xs text-gray-500">팔로잉</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-gray-800 text-sm leading-relaxed">{member.bio}</p>
          </div>
          
          <div className="mt-4 flex justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <FaMapMarkerAlt className="mr-1" size={14} />
              <span>{member.location}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <FaRegCalendarAlt className="mr-1" size={14} />
              <span>{member.joinDate} 가입</span>
            </div>
          </div>
          
          <div className="mt-4 flex">
            <button className="flex-1 bg-primary text-white py-2.5 rounded-md text-sm font-medium hover:bg-primary-dark transition-colors mr-2">
              <FaComment className="inline mr-2" size={14} />
              메시지 보내기
            </button>
            <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50">
              <FaShareAlt size={16} />
            </button>
          </div>
        </div>
        
        {/* 탭 메뉴 */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button 
              className={`px-4 py-3 text-center flex-1 font-medium border-b-2 ${
                activeTab === 'info' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('info')}
            >
              정보
            </button>
            <button 
              className={`px-4 py-3 text-center flex-1 font-medium border-b-2 ${
                activeTab === 'groups' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('groups')}
            >
              참여 모임
            </button>
            <button 
              className={`px-4 py-3 text-center flex-1 font-medium border-b-2 ${
                activeTab === 'reviews' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              후기 ({member.reviewCount})
            </button>
          </div>
        </div>
        
        {/* 탭 내용 */}
        <div className="p-4">
          {activeTab === 'info' && (
            <div>
              <div className="border rounded-lg mb-4 overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h3 className="font-medium">회원 정보</h3>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">활동 온도</span>
                    <span className="font-medium text-primary">{member.temperature}°C</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">응답률</span>
                    <span className="font-medium">{member.responseRate}%</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">최근 활동</span>
                    <span className="font-medium">{member.lastActive}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-500">활동 수준</span>
                    <span className="font-medium">{member.activityLevel}</span>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h3 className="font-medium">관심 키워드</h3>
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {member.keywords.map(keyword => (
                      <span 
                        key={keyword} 
                        className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-xs font-medium"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'groups' && (
            <div>
              {member.groups.length > 0 ? (
                <ul className="space-y-3">
                  {member.groups.map((group, index) => (
                    <li key={index} className="border rounded-lg overflow-hidden">
                      <Link 
                        href={`/group/${index + 1}`} 
                        className="block"
                      >
                        <div className="p-4">
                          <div className="flex items-center">
                            <div className="w-14 h-14 bg-blue-100 rounded-md flex items-center justify-center text-blue-500 mr-3">
                              <FaUsers size={24} />
                            </div>
                            <div>
                              <h3 className="font-medium">{group}</h3>
                              <p className="text-sm text-gray-500 mt-1">활동 중</p>
                            </div>
                          </div>
                          <p className="mt-3 text-sm text-gray-600">
                            함께하는 멤버들과 다양한 활동을 공유하고 있습니다.
                          </p>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex justify-between items-center">
                          <span className="text-xs text-gray-500">최근 활동: 오늘</span>
                          <span className="text-primary text-sm">자세히 보기</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaUsers className="text-gray-400" size={24} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">참여 중인 모임이 없습니다</h3>
                  <p className="text-gray-500 mb-6">새로운 모임에 참여해보세요!</p>
                  <Link 
                    href="/groups" 
                    className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition-colors"
                  >
                    모임 찾아보기
                  </Link>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="text-3xl font-bold text-primary mr-3">{member.reviewScore || 0}</div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} size={16} className={i < Math.floor(member.reviewScore || 0) ? 'text-yellow-400' : 'text-gray-300'} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-500">총 {member.reviewCount}개의 후기</p>
              </div>
              
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                          <Image
                            src={`https://i.pravatar.cc/300?img=${10 + index}`}
                            alt="리뷰어"
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">사용자{index + 1}</p>
                          <div className="flex text-yellow-400 mt-0.5">
                            {[...Array(5)].map((_, i) => (
                              <FaStar key={i} size={12} className={i < 5 - index ? 'text-yellow-400' : 'text-gray-300'} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">{index + 1}주 전</p>
                    </div>
                    <p className="text-gray-700 text-sm">
                      {index === 0 && '아주 친절하고 전문적인 멤버입니다. 많은 도움을 받았어요!'}
                      {index === 1 && '모임에서 항상 좋은 에너지를 전달해주셔서 감사합니다.'}
                      {index === 2 && '약속 시간을 잘 지키고 소통도 원활했습니다.'}
                    </p>
                  </div>
                ))}
                {member.reviewCount > 3 && (
                  <button className="w-full py-3 text-center border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
                    더 보기 ({member.reviewCount - 3})
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 