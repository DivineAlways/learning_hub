import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import { ReferralTrackingScript } from "@/components/referral-tracking-script"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Low Perry - Digital Visions, Pixel Perfect",
  description:
    "Professional web design and development services. Custom websites at a flat rate with free hosting and database included.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-950 font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <Suspense fallback={null}>
            <ReferralTrackingScript />
          </Suspense>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
