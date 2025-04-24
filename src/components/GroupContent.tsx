'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaUsers, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

interface Member {
  id: string;
  name: string;
  image: string;
}

interface Group {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  participants: number;
  meetingDays: string;
  location: string;
  image: string;
  members: Member[];
}

interface GroupContentProps {
  group: Group;
  allGroups: Group[];
}

export default function GroupContent({ group, allGroups }: GroupContentProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-between items-center p-4 border-b border-gray-200">
        <div className="flex items-center">
          <Link href="/" className="text-gray-600 mr-4">
            <FaArrowLeft size={20} />
          </Link>
          <h1 className="text-lg font-bold">모임 상세</h1>
        </div>
      </header>

      <div className="p-4">
        {/* 그룹 헤더 */}
        <div className="mb-6">
          <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden mb-4 relative">
            <Image
              src={group.image}
              alt={group.name}
              fill
              className="object-cover"
              priority
              quality={85}
              unoptimized={false}
            />
          </div>
          <h2 className="text-xl font-bold mb-2">{group.name}</h2>
          <p className="text-gray-700 mb-4">{group.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {group.keywords.map((keyword, idx) => (
              <span key={idx} className="keyword-tag">
                {keyword}
              </span>
            ))}
          </div>
          
          <div className="flex flex-col space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <FaUsers className="mr-2" />
              <span>참여자 {group.participants}명</span>
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2" />
              <span>모임 일정: {group.meetingDays}</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              <span>모임 장소: {group.location}</span>
            </div>
          </div>
        </div>

        {/* 참여 버튼 */}
        <button className="btn-primary w-full mb-6">모임 참여하기</button>

        {/* 멤버 목록 */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3">모임 멤버</h3>
          <div className="grid grid-cols-3 gap-3">
            {group.members.map((member) => (
              <Link key={member.id} href={`/chat/${member.id}`} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden relative mb-2">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="object-cover"
                    quality={85}
                  />
                </div>
                <span className="text-sm text-center">{member.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* 유사한 모임 추천 */}
        <div>
          <h3 className="text-lg font-bold mb-3">유사한 모임</h3>
          <div className="space-y-6">
            {allGroups
              .filter(g => g.id !== group.id && g.keywords.some(k => group.keywords.includes(k)))
              .slice(0, 2)
              .map(similarGroup => (
                <Link key={similarGroup.id} href={`/group/${similarGroup.id}`}>
                  <div className="card flex items-center hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden relative">
                      <Image
                        src={similarGroup.image}
                        alt={similarGroup.name}
                        width={128}
                        height={128}
                        className="object-cover"
                        quality={85}
                      />
                    </div>
                    <div className="ml-5 flex-1">
                      <h4 className="font-bold text-lg mb-2">{similarGroup.name}</h4>
                      <div className="flex flex-wrap gap-2">
                        {similarGroup.keywords.map((keyword, idx) => (
                          <span key={idx} className="keyword-tag">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
} 