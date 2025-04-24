'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import { FaArrowLeft, FaUser, FaMapMarkerAlt, FaRegCalendarAlt, FaComment, FaUsers, FaHeart, FaShareAlt, FaStar, FaEllipsisH, FaRegBookmark, FaBell } from 'react-icons/fa';

// 클라이언트 컴포넌트
export function ProfileClient({ member }: { member: any }) {
  const [activeTab, setActiveTab] = useState<'info' | 'groups' | 'reviews'>('info');
  
  // 온도 게이지의 너비를 계산하여 적절한 Tailwind 클래스 반환
  const temperatureWidthClass = useMemo(() => {
    const percentage = (member.temperature / 40) * 100;
    if (percentage <= 10) return 'w-[10%]';
    else if (percentage <= 20) return 'w-[20%]';
    else if (percentage <= 30) return 'w-[30%]';
    else if (percentage <= 40) return 'w-[40%]';
    else if (percentage <= 50) return 'w-[50%]';
    else if (percentage <= 60) return 'w-[60%]';
    else if (percentage <= 70) return 'w-[70%]';
    else if (percentage <= 80) return 'w-[80%]';
    else if (percentage <= 90) return 'w-[90%]';
    else return 'w-full';
  }, [member.temperature]);

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
            <button className="text-gray-500 hover:text-gray-700" title="북마크">
              <FaRegBookmark size={20} />
            </button>
            <button className="text-gray-500 hover:text-gray-700" title="알림 설정">
              <FaBell size={20} />
            </button>
            <button className="text-gray-500 hover:text-gray-700" title="더보기">
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
            
          {/* 키워드 태그들 */}
          <div className="mt-4 flex flex-wrap">
            {member.keywords?.map((keyword: string, idx: number) => (
              <span key={idx} className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full mr-2 mb-2">
                {keyword}
              </span>
            ))}
          </div>
          
          {/* 소개글 */}
          <p className="mt-4 text-gray-700 text-sm">{member.bio}</p>
        </div>
        
        {/* 프로필 정보 탭 */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button 
              className={`flex-1 py-3 text-center font-medium text-sm ${activeTab === 'info' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
              onClick={() => setActiveTab('info')}
            >
              정보
            </button>
            <button 
              className={`flex-1 py-3 text-center font-medium text-sm ${activeTab === 'groups' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
              onClick={() => setActiveTab('groups')}
            >
              모임
            </button>
            <button 
              className={`flex-1 py-3 text-center font-medium text-sm ${activeTab === 'reviews' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
              onClick={() => setActiveTab('reviews')}
            >
              후기
            </button>
          </div>
        </div>
          
        {/* 탭 내용 */}
        <div className="p-4">
          {activeTab === 'info' && (
            <div className="space-y-4">
              <div className="flex items-center">
                <FaUser className="text-gray-400 mr-3" />
                <div>
                  <p className="text-gray-500 text-xs">역할</p>
                  <p className="text-sm">{member.role}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-gray-400 mr-3" />
                <div>
                  <p className="text-gray-500 text-xs">지역</p>
                  <p className="text-sm">{member.location}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <FaRegCalendarAlt className="text-gray-400 mr-3" />
                <div>
                  <p className="text-gray-500 text-xs">가입일</p>
                  <p className="text-sm">{member.joinDate}</p>
                </div>
              </div>
              
              {member.temperature && (
                <div className="bg-gray-50 p-4 rounded-lg mt-6">
                  <h3 className="text-sm font-medium mb-4">활동 정보</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500 text-xs mb-1">온도</p>
                      <div className="flex items-center">
                        <span className="text-primary font-medium">{member.temperature}°</span>
                        <div className="ml-2 w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-primary rounded-full ${temperatureWidthClass}`}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-gray-500 text-xs mb-1">응답률</p>
                      <p className="font-medium">{member.responseRate}%</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-500 text-xs mb-1">최근 활동</p>
                      <p className="font-medium">{member.lastActive}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-500 text-xs mb-1">활동도</p>
                      <p className="font-medium">{member.activityLevel}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {member.reviewCount && (
                <div className="bg-gray-50 p-4 rounded-lg mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-medium">회원 평가</h3>
                    <p className="text-xs text-gray-500">총 {member.reviewCount}개</p>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex items-center mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar 
                          key={star}
                          className={star <= Math.floor(member.reviewScore) ? "text-yellow-400" : "text-gray-300"}
                          size={16}
                        />
                      ))}
                    </div>
                    <p className="font-medium">{member.reviewScore}</p>
                  </div>
                  
                  <div className="space-y-3 mt-4">
                    <div className="bg-white p-3 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <p className="font-medium text-sm">매우 친절해요!</p>
                        <div className="flex text-yellow-400">
                          <FaStar size={12} />
                          <FaStar size={12} />
                          <FaStar size={12} />
                          <FaStar size={12} />
                          <FaStar size={12} />
                        </div>
                      </div>
                      <p className="text-gray-500 text-xs mb-2">김** | 2023.08.12</p>
                      <p className="text-sm">함께 활동하면서 항상 적극적이고 친절하게 대해주셔서 즐거웠어요!</p>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <p className="font-medium text-sm">정보 공유가 좋았어요</p>
                        <div className="flex text-yellow-400">
                          <FaStar size={12} />
                          <FaStar size={12} />
                          <FaStar size={12} />
                          <FaStar size={12} />
                          <FaStar className="text-gray-300" size={12} />
                        </div>
                      </div>
                      <p className="text-gray-500 text-xs mb-2">이** | 2023.07.25</p>
                      <p className="text-sm">모임에서 유용한 정보를 많이 공유해주셔서 도움이 많이 됐습니다.</p>
                    </div>
                  </div>
                  
                  <button className="w-full mt-3 py-2 text-sm text-primary border border-primary rounded-md hover:bg-primary hover:text-white transition-colors">
                    모든 리뷰 보기
                  </button>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'groups' && (
            <div>
              <h3 className="text-sm font-medium mb-4">참여중인 모임</h3>
              
              <div className="space-y-4">
                {member.groups?.map((group: string, idx: number) => (
                  <div key={idx} className="bg-white rounded-lg border border-gray-200 p-4">
                    <h4 className="font-medium">{group}</h4>
                    <p className="text-sm text-gray-500 mt-1">활발히 활동중</p>
                    <div className="flex justify-between mt-4">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                            <Image 
                              src={`https://i.pravatar.cc/100?img=${idx + i * 3}`}
                              alt="멤버"
                              width={32}
                              height={32}
                              className="object-cover"
                            />
                          </div>
                        ))}
                        <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-500">
                          +12
                        </div>
                      </div>
                      <button className="text-primary text-sm">보기</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium">모든 리뷰</h3>
                <p className="text-xs text-gray-500">총 {member.reviewCount || 0}개</p>
              </div>
              
              {member.reviewCount ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((id) => (
                    <div key={id} className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex items-start mb-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                          <Image 
                            src={`https://i.pravatar.cc/100?img=${id + 20}`}
                            alt="리뷰어"
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center">
                            <p className="font-medium text-sm">익명의 사용자</p>
                            <p className="text-gray-400 text-xs ml-2">2023.0{9-id}.1{id}</p>
                          </div>
                          <div className="flex text-yellow-400 mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FaStar 
                                key={star}
                                className={star <= 5 - id % 2 ? "text-yellow-400" : "text-gray-300"}
                                size={12}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm">
                        {id === 1 && "함께 활동하면서 항상 적극적이고 친절하게 대해주셔서 즐거웠어요!"}
                        {id === 2 && "모임에서 유용한 정보를 많이 공유해주셔서 도움이 많이 됐습니다."}
                        {id === 3 && "약속 시간을 잘 지키고 책임감 있게 활동해주셔서 감사합니다."}
                        {id === 4 && "의사소통이 원활하고 협력적인 태도로 함께 활동하기 좋았습니다."}
                        {id === 5 && "모임 분위기를 활기차게 만들어주셔서 즐거운 시간이었습니다."}
                      </p>
                      <div className="flex justify-between mt-3 pt-3 border-t border-gray-100">
                        <button className="flex items-center text-sm text-gray-500">
                          <FaHeart className="mr-1" size={14} />
                          <span>도움됨 {id * 2}</span>
                        </button>
                        <button className="flex items-center text-sm text-gray-500">
                          <FaComment className="mr-1" size={14} />
                          <span>댓글 {id > 3 ? 0 : id}</span>
                        </button>
                        <button className="flex items-center text-sm text-gray-500">
                          <FaShareAlt className="mr-1" size={14} />
                          <span>공유</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">아직 리뷰가 없습니다.</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* 하단 고정 버튼 */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
          <button className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors">
            채팅하기
          </button>
        </div>
      </main>
    </div>
  );
} 