import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
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
        className={`${geistSans.variable} ${geistMono.variable} w-screen max-w-[1920px] max-h-screen antialiased text-title overflow-hidden m-auto bg-muted`}
      >
        <Providers>
          <ThemeProvider>
            <Navbar />
            <div className="flex justify-center w-full h-full">
              <div className="w-full mx-auto flex">
                <Sidebar />
                <main className="flex-1 overflow-auto">{children}</main>
              </div>
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
