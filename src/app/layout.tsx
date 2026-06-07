import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// import GDDevBadge from "@/components/GDDevBadge";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Garry's Developers' Team | AI, Software and Innovation Studio",
  description:
    "Garry's Developers' Team builds premium AI products, software platforms, automation systems, and futuristic web experiences for ambitious companies.",
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
      <body className="min-h-full bg-[#030407] text-white">
        {children}

        {/* {process.env.NODE_ENV === "development" && (
          // <GDDevBadge />
        )} */}
      </body>
    </html>
  );
}