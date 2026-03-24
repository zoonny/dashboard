// src/app/layout.tsx
import type { Metadata } from 'next';
import { IBM_Plex_Mono, IBM_Plex_Sans_KR } from 'next/font/google';
import './globals.css';

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
});

const ibmPlexSansKR = IBM_Plex_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: '시스템 전환 상황판',
  description: '전사 시스템 업무전환 현황 모니터링 대시보드',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${ibmPlexMono.variable} ${ibmPlexSansKR.variable}`}>
      <body className="bg-[#080c14] text-slate-100 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
