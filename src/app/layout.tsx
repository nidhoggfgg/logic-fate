import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fate Terminal",
  description: "A cyberpunk fate-reading MVP with ritualized multi-step immersion."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
