import type React from "react"
import type { Metadata } from "next"
import { mavenPro, inter } from "./fonts"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"

// MongoDB initialization for server components
import { initMongoDB } from "@/lib/mongodb"

// Attempt to initialize MongoDB connection at app startup
// This is only executed on the server during build/SSR
const mongoPromise = 
  typeof window === 'undefined' && 
  process.env.STORAGE_DRIVE === 'MONGODB' ? 
  initMongoDB().catch(error => {
    console.error('MongoDB initialization error (non-fatal):', error);
    // We catch the error here to prevent it from crashing the app
    // The app will fall back to JSON data if MongoDB connection fails
  }) : 
  Promise.resolve();

export const metadata: Metadata = {
  title: {
    template: "%s | HyberHost",
    default: "HyberHost - Premium Web Hosting Services",
  },
  description: "Professional VPS and dedicated server hosting solutions for businesses of all sizes",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${mavenPro.variable} ${inter.variable}`}>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}