import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "다함 건축사사무소",
  description: "다함 건축사사무소 공식 웹사이트",
  icons: {
    icon: [{ url: "/icon.jpg", type: "image/jpeg", sizes: "any" }],
    shortcut: "/icon.jpg",
    apple: [{ url: "/apple-icon.jpg", type: "image/jpeg", sizes: "180x180" }],
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
        <link rel="icon" href="/icon.jpg?v=2" type="image/jpeg" sizes="any" />
        <link
          rel="apple-touch-icon"
          href="/apple-icon.jpg?v=2"
          sizes="180x180"
        />
      </head>
      <body className="min-h-full bg-[#f7f7f7]">{children}</body>
    </html>
  );
}
