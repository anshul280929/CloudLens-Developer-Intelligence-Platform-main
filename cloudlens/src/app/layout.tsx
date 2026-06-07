import type { Metadata } from "next";
import { DM_Mono, DM_Sans, Syne } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/SessionProvider";

const syne = Syne({
  variable: "--ff-d",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--ff-b",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--ff-m",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CloudLens — Developer Intelligence Platform",
  description:
    "Automatically detect, track, and monitor every cloud service across your GitHub repos. Get alerted on unused services, expiring free tiers, and cost spikes.",
  keywords: ["cloud services", "developer tools", "GitHub", "AWS", "infrastructure", "cost optimization"],
  authors: [{ name: "CloudLens" }],
  openGraph: {
    type: "website",
    title: "CloudLens — A Lens Into Every Cloud Service You Use",
    description:
      "Automatically detect, track, and monitor every cloud service across your GitHub repos. Get alerted on unused services, expiring free tiers, and cost spikes.",
    siteName: "CloudLens",
  },
  twitter: {
    card: "summary_large_image",
    title: "CloudLens — Developer Intelligence Platform",
    description:
      "Automatically detect, track, and monitor every cloud service across your GitHub repos.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
