'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaUser, FaBell, FaBars, FaTimes, FaHome, FaList, 
  FaComments, FaUsers, FaSignOutAlt, FaSignInAlt, 
  FaUserPlus, FaSearch, FaPlus 
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import supabase from '../utils/supabase';

// 스타일 정의
const styles = {
  navy: '#23395B',
  gold: '#FFD700',
  darkNavy: '#152238',
  lightGold: '#FFE566',
  lightBg: '#F7F9FC',
  darkText: '#1A2A3A',
  lightText: '#EAEEF3',
  gradient: 'linear-gradient(135deg, #23395B, #345689)',
  logoGradient: 'linear-gradient(to right, #23395B, #3066BE, #FFD700)',
  cardShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
  menuShadow: '0 0 40px rgba(0, 0, 0, 0.15)'
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasNotifications, setHasNotifications] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const { user, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  // 스크롤 감지하여 헤더 스타일 변경
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 메뉴 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      
      // 검색 버튼 클릭은 무시하고, 검색창 외부 클릭 시에만 닫기
      const searchButton = document.querySelector('.search-button');
      const isSearchButtonClick = searchButton && searchButton.contains(event.target as Node);
      
      if (searchRef.current && !searchRef.current.contains(event.target as Node) && !isSearchButtonClick) {
        setIsSearchOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 가상의 알림 데이터 가져오기 (실제로는 API 호출)
  useEffect(() => {
    if (user) {
      // 예시: 새 알림이 있는지 확인
      const checkNotifications = async () => {
        try {
          const { data } = await supabase
            .from('notifications')
            .select('*')
            .eq('user_id', user.id)
            .eq('is_read', false)
            .limit(1);
          
          setHasNotifications(!!data && data.length > 0);
        } catch (error) {
          console.error('알림 정보 가져오기 실패:', error);
          // 테스트를 위해 임시로 랜덤하게 알림 표시
          setHasNotifications(Math.random() > 0.5);
        }
      };
      
      checkNotifications();
    }
  }, [user]);

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          const { data: profiles } = await supabase
            .from('profiles')
            .select('nickname, avatar_url')
            .eq('id', user.id)
            .single();
          
          if (profiles) {
            setNickname(profiles.nickname);
            setProfileImage(profiles.avatar_url);
          }
        } catch (error) {
          console.error('프로필 정보 가져오기 실패:', error);
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  // 사이드 메뉴 열기/닫기 토글
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  // 검색창 토글
  const toggleSearch = () => {
    if (isSearchOpen) {
      setIsSearchOpen(false);
    } else {
      // 메뉴 닫고 검색창 열기
      setIsMenuOpen(false);
      setIsSearchOpen(true);
      
      // 검색창에 포커스 주기 위해 약간의 지연 추가
      setTimeout(() => {
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (searchInput) searchInput.focus();
      }, 100);
    }
  };

  // 검색 처리
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  // 로그아웃 처리
  const handleLogout = async () => {
    await signOut();
    setIsMenuOpen(false);
    router.push('/');
  };

  return (
    <>
      <header 
        className={`flex justify-between items-center py-3 px-4 lg:px-8 border-b sticky top-0 z-20 transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-3'
        }`}
        style={{ 
          background: 'white',
          borderColor: 'rgba(35, 57, 91, 0.1)',
          boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.08)' : '0 2px 10px rgba(0, 0, 0, 0.05)'
        }}
      >
        <div className="flex items-center">
          <div className="text-xl font-bold tracking-tight mr-6">
            <Link href="/" className="flex items-center">
              <span
                className="relative inline-block font-extrabold text-transparent bg-clip-text animate-pulse"
                style={{ 
                  backgroundImage: styles.logoGradient,
                  animationDuration: '3s'
                }}
              >
                Together
              </span>
              <span
                className="text-navy font-black"
                style={{ color: styles.navy }}
              >
                Bloom
              </span>
              <span className="ml-1 w-2 h-2 rounded-full bg-gold animate-ping hidden sm:inline-block"
                style={{ backgroundColor: styles.gold }}
              ></span>
            </Link>
          </div>
          
          {/* 데스크톱 네비게이션 메뉴 */}
          <nav className="hidden md:flex space-x-1">
            <Link 
              href="/" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                pathname === '/' ? 'bg-opacity-10 font-semibold' : 'hover:bg-opacity-5'
              }`}
              style={{ 
                color: styles.navy,
                backgroundColor: pathname === '/' ? `${styles.navy}10` : 'transparent'
              }}
            >
              홈
            </Link>
            <Link 
              href="/category" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                pathname === '/category' ? 'bg-opacity-10 font-semibold' : 'hover:bg-opacity-5'
              }`}
              style={{ 
                color: styles.navy,
                backgroundColor: pathname === '/category' ? `${styles.navy}10` : 'transparent'
              }}
            >
              카테고리
            </Link>
            <Link 
              href="/match" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                pathname === '/match' ? 'bg-opacity-10 font-semibold' : 'hover:bg-opacity-5'
              }`}
              style={{ 
                color: styles.navy,
                backgroundColor: pathname === '/match' ? `${styles.navy}10` : 'transparent'
              }}
            >
              매칭
            </Link>
            <Link 
              href="/group" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                pathname === '/group' ? 'bg-opacity-10 font-semibold' : 'hover:bg-opacity-5'
              }`}
              style={{ 
                color: styles.navy,
                backgroundColor: pathname === '/group' ? `${styles.navy}10` : 'transparent'
              }}
            >
              모임
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* 검색 버튼 */}
          <button 
            className="search-button flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:bg-opacity-10 md:mr-1 hover:bg-gray-200"
            aria-label="검색"
            onClick={toggleSearch}
            style={{
              color: styles.navy
            }}
          >
            <FaSearch size={16} />
          </button>
          
          {/* 새 모임 생성 버튼 (로그인 시에만) */}
          {user && (
            <Link
              href="/create-group"
              className="hidden md:flex items-center justify-center h-9 px-4 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                background: styles.gradient,
                color: 'white',
              }}
            >
              <FaPlus size={12} className="mr-2" />
              새 모임
            </Link>
          )}
          
          {/* 알림 버튼 (로그인 시에만) */}
          {user && (
            <Link 
              href="/notifications" 
              className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:bg-opacity-10 hover:bg-gray-200 relative"
              aria-label="알림"
              style={{
                color: styles.navy
              }}
            >
              <FaBell size={18} />
              {hasNotifications && (
                <span 
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-white text-xs animate-pulse"
                  style={{ backgroundColor: '#FF3B30' }}
                ></span>
              )}
            </Link>
          )}
          
          {/* 프로필 버튼 (로그인 시에만) */}
          {user ? (
            <button 
              className="relative flex items-center justify-center w-10 h-10 rounded-full overflow-hidden transition-all duration-200 hover:opacity-90 border-2"
              aria-label="프로필 메뉴"
              onClick={toggleMenu}
              style={{
                borderColor: hasNotifications ? styles.gold : 'transparent',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
              }}
            >
              {profileImage ? (
                <Image 
                  src={profileImage} 
                  alt="프로필 이미지" 
                  width={40}
                  height={40}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center"
                  style={{ background: styles.gradient }}
                >
                  <FaUser size={16} className="text-white" />
                </div>
              )}
            </button>
          ) : (
            <button 
              className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:bg-opacity-10 hover:bg-gray-200"
              aria-label="메뉴"
              onClick={toggleMenu}
              style={{
                color: styles.navy
              }}
            >
              <FaBars size={18} />
            </button>
          )}
        </div>
      </header>

      {/* 검색창 */}
      {isSearchOpen && (
        <div 
          ref={searchRef}
          className="fixed top-16 left-0 right-0 z-30 px-4 md:px-0 md:absolute md:top-16 md:right-4 md:left-auto md:w-full md:max-w-md transform transition-all duration-300"
          style={{
            animation: 'fadeInDown 0.3s ease-out'
          }}
        >
          <form 
            onSubmit={handleSearch}
            className="bg-white rounded-xl shadow-lg overflow-hidden p-1"
            style={{ boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)' }}
          >
            <div className="flex items-center">
              <input
                type="text"
                placeholder="검색어를 입력하세요..."
                className="flex-grow py-3 px-4 outline-none text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button 
                type="submit"
                className="p-3 m-1 rounded-lg transition-all duration-200"
                style={{
                  backgroundColor: styles.navy,
                  color: 'white'
                }}
              >
                <FaSearch size={14} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 사이드 메뉴 (햄버거 메뉴) */}
      <div 
        ref={menuRef}
        className={`fixed top-0 right-0 z-50 h-full w-72 lg:w-80 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ 
          background: 'white',
          boxShadow: styles.menuShadow
        }}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold" style={{ color: styles.navy }}>메뉴</h2>
            <button 
              className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-gray-200"
              onClick={() => setIsMenuOpen(false)}
              style={{
                color: styles.navy
              }}
            >
              <FaTimes size={18} />
            </button>
          </div>

          {user ? (
            <div className="mb-6 p-4 rounded-xl" style={{ 
              backgroundColor: styles.lightBg,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              backgroundImage: 'linear-gradient(135deg, #F7F9FC, #EDF2F7)'
            }}>
              <div className="flex items-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-white overflow-hidden"
                  style={{ 
                    background: styles.gradient,
                    boxShadow: '0 4px 10px rgba(35, 57, 91, 0.2)' 
                  }}>
                  {profileImage ? (
                    <Image 
                      src={profileImage} 
                      alt="프로필 이미지" 
                      width={56}
                      height={56}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <FaUser className="text-lg" />
                  )}
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-lg" style={{ color: styles.darkText }}>
                    {nickname || user.email?.split('@')[0]}
                  </p>
                  <Link 
                    href="/profile" 
                    className="text-sm hover:underline inline-flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                    style={{ color: styles.navy }}
                  >
                    <span>프로필 보기</span>
                    <span className="ml-1 text-xs">➔</span>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-8 flex flex-col gap-3">
              <Link 
                href="/login" 
                className="flex items-center justify-center font-medium py-3 px-4 rounded-xl transition-all duration-200 w-full"
                onClick={() => setIsMenuOpen(false)}
                style={{ 
                  background: styles.gradient,
                  color: 'white',
                  boxShadow: '0 4px 10px rgba(35, 57, 91, 0.2)' 
                }}
              >
                <FaSignInAlt className="mr-2" size={16} />
                로그인
              </Link>
              <Link 
                href="/register" 
                className="flex items-center justify-center font-medium py-3 px-4 rounded-xl border transition-all duration-200 w-full hover:bg-blue-50"
                onClick={() => setIsMenuOpen(false)}
                style={{ 
                  color: styles.navy,
                  borderColor: styles.navy
                }}
              >
                <FaUserPlus className="mr-2" size={16} />
                회원가입
              </Link>
            </div>
          )}

          <nav className="flex-grow">
            <ul className="space-y-1">
              <li>
                <Link 
                  href="/" 
                  className={`flex items-center py-3 px-4 rounded-xl my-1 transition-all duration-200 hover:bg-gray-100 ${
                    pathname === '/' ? 'bg-opacity-15 font-medium' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ 
                    color: styles.darkText,
                    backgroundColor: pathname === '/' ? `${styles.navy}10` : 'transparent'
                  }}
                >
                  <FaHome className="mr-3" style={{ color: styles.navy }} />
                  <span>홈</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/category" 
                  className={`flex items-center py-3 px-4 rounded-xl my-1 transition-all duration-200 hover:bg-gray-100 ${
                    pathname === '/category' ? 'bg-opacity-15 font-medium' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ 
                    color: styles.darkText,
                    backgroundColor: pathname === '/category' ? `${styles.navy}10` : 'transparent'
                  }}
                >
                  <FaList className="mr-3" style={{ color: styles.navy }} />
                  <span>카테고리</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/chat" 
                  className={`flex items-center py-3 px-4 rounded-xl my-1 transition-all duration-200 hover:bg-gray-100 ${
                    pathname === '/chat' ? 'bg-opacity-15 font-medium' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ 
                    color: styles.darkText,
                    backgroundColor: pathname === '/chat' ? `${styles.navy}10` : 'transparent'
                  }}
                >
                  <FaComments className="mr-3" style={{ color: styles.navy }} />
                  <span>채팅</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/match" 
                  className={`flex items-center py-3 px-4 rounded-xl my-1 transition-all duration-200 hover:bg-gray-100 ${
                    pathname === '/match' ? 'bg-opacity-15 font-medium' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ 
                    color: styles.darkText,
                    backgroundColor: pathname === '/match' ? `${styles.navy}10` : 'transparent'
                  }}
                >
                  <FaUsers className="mr-3" style={{ color: styles.navy }} />
                  <span>매칭</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/group" 
                  className={`flex items-center py-3 px-4 rounded-xl my-1 transition-all duration-200 hover:bg-gray-100 ${
                    pathname === '/group' ? 'bg-opacity-15 font-medium' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ 
                    color: styles.darkText,
                    backgroundColor: pathname === '/group' ? `${styles.navy}10` : 'transparent'
                  }}
                >
                  <FaUsers className="mr-3" style={{ color: styles.navy }} />
                  <span>모임</span>
                </Link>
              </li>
              {user && (
                <li>
                  <Link 
                    href="/my-groups" 
                    className={`flex items-center py-3 px-4 rounded-xl my-1 transition-all duration-200 hover:bg-yellow-100 ${
                      pathname === '/my-groups' ? 'bg-opacity-25 font-medium' : ''
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                    style={{ 
                      color: styles.darkText,
                      backgroundColor: pathname === '/my-groups' 
                        ? `${styles.gold}30` 
                        : `${styles.gold}15`,
                      border: `1px solid ${styles.gold}`
                    }}
                  >
                    <FaUsers className="mr-3" style={{ color: styles.gold }} />
                    <span className="font-medium">내 모임</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          {user && (
            <div className="mt-auto pt-4">
              <button 
                className="flex items-center py-3 px-4 rounded-lg hover:bg-red-50 transition-all duration-200 w-full text-left"
                onClick={handleLogout}
                style={{
                  color: styles.red,
                  marginTop: 'auto'
                }}
              >
                <FaSignOutAlt className="mr-3" size={18} />
                <span>로그아웃</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 배경 오버레이 (메뉴가 열려있을 때만 표시) */}
      {(isMenuOpen || isSearchOpen) && (
        <div 
          className={`fixed inset-0 z-40 transition-opacity duration-300 ${isMenuOpen ? 'backdrop-filter backdrop-blur-sm' : ''}`}
          style={{ 
            backgroundColor: isMenuOpen ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)',
            animation: 'fadeIn 0.3s ease-out'
          }}
          onClick={() => {
            setIsMenuOpen(false);
            setIsSearchOpen(false);
          }}
        />
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
} 