import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/providers/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daily Newsletter - Personalized Content Delivery",
  description:
    "Get your daily dose of curated content including historical events, fun facts, quotes, jokes, and more. Customize your newsletter preferences and receive personalized updates.",
  keywords: [
    "daily newsletter",
    "personalized content",
    "daily updates",
    "custom newsletter",
    "history facts",
    "daily quotes",
    "daily jokes",
  ],
  authors: [{ name: "Yusha Kural" }],
  openGraph: {
    title: "Daily Newsletter - Personalized Content Delivery",
    description:
      "Get your daily dose of curated content including historical events, fun facts, quotes, jokes, and more.",
    url: "https://daily-newsletter.com",
    siteName: "Daily Newsletter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Newsletter - Personalized Content Delivery",
    description:
      "Get your daily dose of curated content including historical events, fun facts, quotes, jokes, and more.",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className={`min-h-screen antialiased ${inter.className}`}>
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
