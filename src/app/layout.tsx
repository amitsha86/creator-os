import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "CreatorOS — The Operating System for Creators",
  description: "Discover what to make, create it with an AI team, ship it everywhere, and run the business behind it.",
};

const clerkAppearance = {
  variables: {
    colorPrimary: "#6366f1",
    colorBackground: "#12141c",
    colorInputBackground: "#0e1016",
    colorInputText: "#e7e9ee",
    colorText: "#e7e9ee",
    colorTextSecondary: "#9aa1ad",
    colorNeutral: "#e7e9ee",
    borderRadius: "0.6rem",
  },
  elements: {
    card: "bg-bg-panel border border-line",
    socialButtonsBlockButton: "border-line",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider appearance={clerkAppearance}>
      <html lang="en" className="dark">
        <body className="font-sans antialiased">{children}</body>
      </html>
    </ClerkProvider>
  );
}
