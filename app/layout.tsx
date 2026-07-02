import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "다함 건축사사무소",
  description: "다함 건축사사무소 공식 웹사이트",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon-32.png",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
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
        <link
          rel="icon"
          href="/favicon-32.png?v=3"
          type="image/png"
          sizes="32x32"
        />
        <link
          rel="icon"
          href="/icon-192.png?v=3"
          type="image/png"
          sizes="192x192"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png?v=3"
          sizes="180x180"
        />
      </head>
      <body className="min-h-full bg-[#f7f7f7]">{children}</body>
    </html>
  );
}
