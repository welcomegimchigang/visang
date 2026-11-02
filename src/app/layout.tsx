import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#0D2622",
};

export const metadata: Metadata = {
  title: "2027학년도 인천대학교 글로벌정경대학 학생회 선거운동본부 飛上 (비상)",
  description:
    "비상: 함께 더 높이, 더 멀리 - 2027학년도 인천대학교 글로벌정경대학 학생회 선거운동본부 飛上 공식 홍보 웹페이지",
  openGraph: {
    title: "2027학년도 인천대학교 글로벌정경대학 학생회 선거운동본부 飛上 (비상)",
    description: "비상: 함께 더 높이, 더 멀리 | 정후보 최우헌 · 부후보 손정현",
    type: "website",
    locale: "ko_KR",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "글로벌정경대학 飛上",
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
      <body className="min-h-[100dvh] bg-[#0D2622] text-white antialiased selection:bg-[#357F72] selection:text-white break-keep">
        {children}
      </body>
    </html>
  );
}
