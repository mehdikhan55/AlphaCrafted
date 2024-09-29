import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { UserProvider } from '../context/userContext'
import MainContent from './MainContent'
import { Toaster } from "react-hot-toast";

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

export const metadata = {
  title: "Resume Builder",
  description: "Generate your resume with ease",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <UserProvider>
        <html lang="en" data-theme="light">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <MainContent children={children} />
            <Toaster />
          </body>
        </html>

      </UserProvider>
    </ClerkProvider>
  );
}


