import Notification from '@/components/Notification'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import QueryProvider from "@/components/QueryProvider";
import { ToastContainer } from "react-toastify";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Chizzy Restaurant",
  description: "Best Food in town!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <QueryProvider>
          <div>
        <Notification/>
        <Navbar/>
        {children}
        <Footer/>
        <ToastContainer position='bottom-right' theme="dark" autoClose={3000} />
        </div>
        </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
