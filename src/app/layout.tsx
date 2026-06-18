import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CreatorOS — The Operating System for Creators",
  description: "Discover what to make, create it with an AI team, ship it everywhere, and run the business behind it.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
