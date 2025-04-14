import type React from "react"
import type { Metadata } from "next"
// Import the fonts
import { mavenPro, inter } from "./fonts"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Inter } from "next/font/google"

const interFont = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    template: "%s | HyberHost",
    default: "HyberHost - Premium Web Hosting Services",
  },
  description: "Professional VPS and dedicated server hosting solutions for businesses of all sizes",
    generator: 'v0.dev'
}

// Update the RootLayout to use the fonts
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${mavenPro.variable} ${inter.variable}`}>
      <body className={interFont.className}>
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


import './globals.css'