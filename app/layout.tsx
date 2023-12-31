import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { ThemeProvider } from "./components/ThemeProvider";
import ClientProviders from "./components/ClientProviders";
import Footer from "./components/Footer";
import FirebaseAuthProvider from "./components/FirebaseAuthProvider";
import SubscriptionProvider from "./components/SubscriptionProvider";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Globe.chat",
  description: "Chat AI translation app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProviders>
      <html lang="en">
        <body className="font-inter flex flex-col min-h-screen dark:bg-gray-900">
          <FirebaseAuthProvider>
            <SubscriptionProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <NextTopLoader color="#4f46e5" />
                <Header />
                <div className="flex-1 flex flex-col">
                  {children}
                  <Footer />
                </div>
                <Toaster />
              </ThemeProvider>
            </SubscriptionProvider>
          </FirebaseAuthProvider>
        </body>
      </html>
    </ClientProviders>
  );
}
