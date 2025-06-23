import "./globals.css"
import Header from "../components/Header"
import { ClerkProvider } from "@clerk/nextjs"
import { ReactNode } from "react"

export default function RootLayout({ 
  children 
}: { 
  children: ReactNode 
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body suppressHydrationWarning={true}>
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}