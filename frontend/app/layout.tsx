import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers";
import ThemeProvider from "./ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  manifest:"/manifest.json",
  title: "Kanban | Task Management System",
  description:
    "Kanban is an intuitive task management system that enhances productivity through visual work organization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} overflow-hidden`}
      >
        <Providers>
          <ThemeProvider>
            <main className="flex-1 overflow-auto">{children}</main>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
