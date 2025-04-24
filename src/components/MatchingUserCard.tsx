'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaCircle } from 'react-icons/fa';
import styles from './MatchingUserCard.module.css';

interface MatchingUserCardProps {
  user: {
    id: string;
    name: string;
    introduction: string;
    profileImage: string;
    compatibilityScore: number;
  };
}

export default function MatchingUserCard({ user }: MatchingUserCardProps) {
  // 친밀도 점수에 따른 색상
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-primary';
    if (score >= 40) return 'text-yellow-500';
    return 'text-gray-400';
  };

  // 점수에 따른 적절한 CSS 클래스 선택
  const getScoreClass = (score: number) => {
    // 점수를 10단위로 반올림하여 해당하는 클래스 선택
    const roundedScore = Math.round(score / 10) * 10;
    return styles[`score${roundedScore}`] || styles.score0;
  };

  return (
    <div className="card flex flex-col">
      <div className="flex items-center">
        <div className="w-16 h-16 rounded-full overflow-hidden relative">
          <Image
            src={user.profileImage}
            alt={user.name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-5 flex-1">
          <h3 className="font-bold text-lg">{user.name}</h3>
          <p className="text-sm text-gray-600 truncate mt-1">{user.introduction}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-5">
        <div className="flex items-center">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <div className="w-full h-full rounded-full border-4 border-gray-200"></div>
            <div 
              className={`absolute top-0 left-0 w-full h-full rounded-full border-4 border-primary ${getScoreClass(user.compatibilityScore)}`}
            ></div>
            <span className={`absolute text-sm font-bold ${getScoreColor(user.compatibilityScore)}`}>
              {user.compatibilityScore}
            </span>
          </div>
          <span className="ml-3 text-sm">친밀도 점수</span>
        </div>

        <Link href={`/chat/${user.id}`} className="btn-primary text-sm px-5 py-2.5">
          채팅 시작
        </Link>
      </div>
    </div>
  );
} 