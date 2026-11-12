import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#8FD0D4",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://global-visang.com"),
  title: {
    default:
      "인천대 글로벌정경대학 기호 1번 비상(飛上) | 2027학년도 학생회 총선거",
    template: "%s | 인천대 글정경 기호 1번 비상(飛上)",
  },
  description:
    "비상: 함께 더 높이, 더 멀리 — 2027년도 인천대학교 글로벌정경대학(글정경) 학생회 총선거 기호 1번 비상(飛上) 선거운동본부 공식 홈페이지. 정후보 최우헌 · 부후보 손정현의 약력과 4대 부문 27개 핵심 공약을 확인하세요.",
  keywords: [
    // 1. 학교·단과대 줄임말 & 학생회/선거 검색어
    "인천대 글정경",
    "인천대학교 글로벌정경대학",
    "인천대 글로벌정경대학",
    "인천대 글정",
    "글정경",
    "글로벌정경대학",
    "인천대 글정경 학생회",
    "글로벌정경대학 학생회",
    "글로벌정경대학 학생회 선거",
    "2027 인천대 총선거",
    "2027년도 학생회 총선거",
    "인천대 기호 1번",
    "글정경 기호 1번",
    "글정경 선거",
    "인천대학교 총선거",
    // 2. 선거운동본부 이름 (비상 / 飛上) 관련 검색어
    "인천대 비상",
    "글정경 비상",
    "글로벌정경대학 비상",
    "비상 선거운동본부",
    "선본 비상",
    "기호 1번 비상",
    "인천대 飛上",
    "글정경 飛上",
    "비상 함께 더 높이 더 멀리",
    "함께 더 높이 더 멀리",
    // 후보자 및 소속 학과 연관 검색어
    "최우헌",
    "손정현",
    "인천대 경제학과",
    "인천대 정치외교학과",
    "인천대 행정학과",
    "인천대 소비자학과",
    "인천대 GTS학부",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/images/inu-emblem.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "2027 인천대학교 글로벌정경대학 기호 1번 비상(飛上)",
    description:
      "비상: 함께 더 높이, 더 멀리 | 정후보 최우헌 · 부후보 손정현 — 글정경 4대 부문 27개 핵심 공약 안내 (투표일: 11월 24일 ~ 11월 26일)",
    url: "https://global-visang.com",
    siteName: "인천대학교 글로벌정경대학 기호 1번 비상(飛上)",
    type: "website",
    locale: "ko_KR",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "2027년도 인천대학교 글로벌정경대학 학생회 총선거 기호 1번 비상(飛上) 공식 포스터",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "2027 인천대학교 글로벌정경대학 기호 1번 비상(飛上)",
    description:
      "비상: 함께 더 높이, 더 멀리 | 정후보 최우헌 · 부후보 손정현 — 4대 부문 27개 핵심 공약 확인하기",
    images: ["/og-image.jpg"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "글정경 기호 1번 비상",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-[100dvh] bg-[#F2F9FA] text-[#111827] antialiased selection:bg-[#8FD0D4] selection:text-[#111827] break-keep">
        {children}
      </body>
    </html>
  );
}
