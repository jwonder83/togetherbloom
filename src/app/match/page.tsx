import React from 'react';
import { Metadata } from 'next';
import { getRecommendedUsers } from '@/utils/recommendationAlgorithm';
import { currentUser, mockUsers } from '@/data/mockUsers';
import MatchClient from './MatchClient';

export const metadata: Metadata = {
  title: '매치 - 함께블룸',
  description: '관심사와 취향이 비슷한 사용자들을 만나보세요.',
};

interface MatchPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function MatchPage({ searchParams }: MatchPageProps) {
  // 추천 알고리즘을 사용하여 현재 사용자와 잘 맞는 사용자 목록 가져오기
  const recommendedUsers = getRecommendedUsers(currentUser, mockUsers);
  
  return <MatchClient users={recommendedUsers} searchParams={searchParams} />;
} 