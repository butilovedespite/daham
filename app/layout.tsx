import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "다함 건축사사무소",
  description: "다함 건축사사무소 공식 웹사이트",
  icons: {
    icon: "/다함파비콘.jpg",
    shortcut: "/다함파비콘.jpg",
    apple: "/다함파비콘.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased bg-[#f7f7f7]">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="min-h-full bg-[#f7f7f7]">{children}</body>
    </html>
  );
}
