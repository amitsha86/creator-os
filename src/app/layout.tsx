import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://creora.pro"),
  title: "Creora — AI Growth Copilot for Creators",
  description: "Know what to create next. Creora helps creators discover content ideas, generate scripts, repurpose content, and grow faster with AI.",
  openGraph: {
    title: "Creora — Know What To Create Next",
    description: "Analyze your channel, find content opportunities, generate scripts, and repurpose your content with AI.",
    url: "https://creora.pro",
    siteName: "Creora",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creora — Know What To Create Next",
    description: "Analyze your channel, find content opportunities, generate scripts, and repurpose your content with AI.",
  },
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
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="font-sans antialiased">{children}</body>
      </html>
    </ClerkProvider>
  );
}
