import './globals.css';
import type { Metadata } from 'next';
import { AuthProviderWrapper } from '../components/AuthProviderWrapper';

export const metadata: Metadata = {
  title: 'TogetherBloom',
  description: '관심사 기반으로 모임을 만들고 친밀도 높은 소통을 즐겨보세요',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <AuthProviderWrapper>
          <main className="max-w-md mx-auto bg-card min-h-screen shadow-apple-lg">
            {children}
          </main>
        </AuthProviderWrapper>
      </body>
    </html>
  );
} 