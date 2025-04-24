'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaUsers, FaArrowRight, FaMapMarkerAlt, FaRegCalendarAlt, FaStar } from 'react-icons/fa';

// 더미 데이터 (실제 모임 이미지로 업데이트)
const recommendedGroups = [
  {
    id: '1',
    name: '서울 맛집 탐방단',
    keywords: ['맛집', '서울', '음식'],
    participants: 24,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    location: '서울 강남구',
    rating: 4.8,
    nextMeeting: '2023.05.22'
  },
  {
    id: '2',
    name: '개발자 네트워킹',
    keywords: ['개발', '프로그래밍', '네트워킹'],
    participants: 45,
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    location: '서울 서초구',
    rating: 4.9,
    nextMeeting: '2023.05.15'
  },
  {
    id: '3',
    name: '주말 등산 모임',
    keywords: ['등산', '아웃도어', '건강'],
    participants: 18,
    image: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    location: '경기 가평군',
    rating: 4.7,
    nextMeeting: '2023.05.28'
  },
  {
    id: '4',
    name: '보드게임 친목 모임',
    keywords: ['보드게임', '친목', '취미'],
    participants: 16,
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=1431&auto=format&fit=crop',
    location: '서울 마포구',
    rating: 4.9,
    nextMeeting: '2023.05.21'
  },
  {
    id: '7',
    name: '사진 촬영 동호회',
    keywords: ['사진', '촬영', '카메라'],
    participants: 22,
    location: '서울 전역',
    rating: 4.7,
    meetingDays: '격주 토요일',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1464&auto=format&fit=crop'
  }
];

export default function RecommendedGroups() {
  return (
    <section className="py-8 px-5 bg-card rounded-apple mt-2">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-text-primary tracking-tight">추천 모임</h2>
        <Link href="/group" className="text-primary text-sm flex items-center font-medium hover:underline">
          더보기 <FaArrowRight className="ml-1 text-xs" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {recommendedGroups.map((group) => (
          <Link key={group.id} href={`/group/${group.id}`} className="block">
            <div className="card-apple-interactive p-4 rounded-apple-lg bg-white hover:shadow-apple-lg transform transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center">
                <div className="w-20 h-20 bg-moduleBg rounded-apple-sm overflow-hidden relative shadow-apple flex-shrink-0">
                  <Image 
                    src={group.image} 
                    alt={group.name} 
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                    priority
                    quality={85}
                    unoptimized={false}
                  />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold text-text-primary text-base">{group.name}</h3>
                  
                  <div className="flex items-center mt-1 text-text-tertiary text-xs">
                    <FaMapMarkerAlt className="mr-1" />
                    <span>{group.location}</span>
                    <div className="flex items-center ml-3">
                      <FaStar className="text-yellow-500 mr-1" />
                      <span>{group.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {group.keywords.map((keyword, idx) => (
                      <span key={idx} className="tag-apple bg-moduleBg px-2 py-1 rounded-full text-xs">
                        {keyword}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-text-tertiary flex items-center">
                      <FaUsers className="mr-1 text-text-quaternary" size={12} />
                      참여자 {group.participants}명
                    </p>
                    <p className="text-xs text-primary flex items-center">
                      <FaRegCalendarAlt className="mr-1" size={12} />
                      {group.nextMeeting}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Link 
          href="/group" 
          className="btn-apple-pill text-sm px-6 py-2 inline-flex items-center justify-center"
        >
          더 많은 모임 보기
          <FaArrowRight className="ml-2" />
        </Link>
      </div>
    </section>
  );
} 