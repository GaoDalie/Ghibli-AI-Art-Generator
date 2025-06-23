"use client"

import { UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link"

export default function Header() {
  const { isSignedIn, user } = useUser()

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <button
                onClick={scrollToTop}
                className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
              >
                Glorify
              </button>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/">
              <button className="text-gray-900 hover:text-blue-600 font-medium transition-colors">Home</button>
            </Link>
            <button
              onClick={() => scrollToSection("gallery-section")}
              className="text-gray-900 hover:text-blue-600 font-medium transition-colors"
            >
              AI images
            </button>
            <button
              onClick={() => scrollToSection("pricing-section")}
              className="text-gray-900 hover:text-blue-600 font-medium transition-colors"
            >
              Pricing
            </button>
            {isSignedIn && (
              <Link href="/generate">
                <button className="text-gray-900 hover:text-blue-600 font-medium transition-colors">Generate</button>
              </Link>
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isSignedIn ? (
              <>
                <Link href="/sign-in">
                  <button className="text-gray-900 hover:text-blue-600 font-medium transition-colors">Log In</button>
                </Link>
                <Link href="/sign-up">
                  <button
                    className="text-white px-6 py-2 rounded-lg font-medium transition-colors hover:opacity-90"
                    style={{ backgroundColor: "#405DE9" }}
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <span className="text-gray-700 font-medium">
                  {user?.firstName || user?.emailAddresses[0]?.emailAddress?.split("@")[0]}
                </span>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8",
                    },
                  }}
                />
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-900 hover:text-blue-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
