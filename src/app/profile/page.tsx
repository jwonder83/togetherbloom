'use client';

import Header from '@/components/Header';
import Link from 'next/link';
import Image from 'next/image';
import { FaUser, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

// 더미 데이터
const myProfile = {
  name: '홍길동',
  age: 28,
  location: '서울특별시',
  profileImage: 'https://robohash.org/myprofile?set=set3',
  interests: [
    { id: '1', name: '여행' },
    { id: '6', name: '개발' },
    { id: '4', name: '음악' },
  ],
};

const myGroups = [
  {
    id: '1',
    name: '서울 개발자 모임',
    keywords: ['개발', '네트워킹', '프로젝트'],
    members: 45,
  },
  {
    id: '2',
    name: '주말 음악 감상회',
    keywords: ['음악', '클래식', '감상'],
    members: 18,
  },
];

const recentMatches = [
  {
    id: '1',
    name: '김개발',
    matchDate: '2023-04-15',
    compatibilityScore: 95,
    profileImage: 'https://robohash.org/user1?set=set3',
  },
  {
    id: '2',
    name: '이디자인',
    matchDate: '2023-04-12',
    compatibilityScore: 85,
    profileImage: 'https://robohash.org/user2?set=set3',
  },
];

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="p-4">
        {/* 프로필 헤더 */}
        <div className="flex items-center mb-6">
          <div className="w-20 h-20 rounded-full overflow-hidden relative">
            <Image
              src={myProfile.profileImage}
              alt={myProfile.name}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-4">
            <h1 className="text-xl font-bold">{myProfile.name}</h1>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <FaCalendarAlt className="mr-1" size={14} />
              <span>{myProfile.age}세</span>
              <span className="mx-2">•</span>
              <FaMapMarkerAlt className="mr-1" size={14} />
              <span>{myProfile.location}</span>
            </div>
          </div>
        </div>

        {/* 관심 카테고리 */}
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3">나의 관심 카테고리</h2>
          <div className="flex flex-wrap gap-2">
            {myProfile.interests.map((interest) => (
              <Link key={interest.id} href={`/category/${interest.id}`}>
                <div className="bg-primary text-white rounded-full px-4 py-2 text-sm">
                  {interest.name}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 내 모임 */}
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3">내 모임</h2>
          <div className="space-y-3">
            {myGroups.map((group) => (
              <Link key={group.id} href={`/group/${group.id}`}>
                <div className="card hover:shadow-lg transition-shadow">
                  <h3 className="font-bold">{group.name}</h3>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {group.keywords.map((keyword, idx) => (
                      <span key={idx} className="text-xs bg-moduleBg rounded-full px-2 py-1">
                        {keyword}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    멤버 {group.members}명
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 최근 매칭 히스토리 */}
        <section>
          <h2 className="text-lg font-bold mb-3">최근 매칭 히스토리</h2>
          <div className="space-y-3">
            {recentMatches.map((match) => (
              <Link key={match.id} href={`/chat/${match.id}`}>
                <div className="card flex items-center hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative">
                    <Image
                      src={match.profileImage}
                      alt={match.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="font-bold">{match.name}</h3>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-500">
                        {new Date(match.matchDate).toLocaleDateString('ko-KR')}
                      </span>
                      <span className="text-xs text-primary font-semibold">
                        친밀도 {match.compatibilityScore}%
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
} 