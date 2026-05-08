import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import GlobalProviders from "./_components/GlobalProviders";
import PageWrapper from "@/components/ui/PageWrapper";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { Search } from "@/features/search";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Youtube Mp3 Dowloader",
  description: "Download and convert youtube videos to mp3.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pt-4">
        <GlobalProviders>
          <Navbar />
          <Search />
          <PageWrapper>{children}</PageWrapper>
          <Footer />
        </GlobalProviders>
      </body>
    </html>
  );
}
