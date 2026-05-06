import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Compass",
  description: "美术部门 AI 工具排行榜与实践案例索引",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
