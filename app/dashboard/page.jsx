"use client"

import { useUser } from "@clerk/nextjs"
import Link from "next/link"

export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser()

  // Show loading while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FFF8F4" }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Show sign-in prompt if not authenticated
  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FFF8F4" }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h1>
          <p className="text-gray-600 mb-6">You need to be signed in to access the dashboard.</p>
          <Link href="/sign-in">
            <button
              className="text-white px-6 py-2 rounded-lg font-medium transition-colors hover:opacity-90"
              style={{ backgroundColor: "#405DE9" }}
            >
              Sign In
            </button>
          </Link>
        </div>
      </div>
    )
  }

  // Show dashboard for authenticated users
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFF8F4" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome back, {user?.firstName || user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] || "User"}!
          </h1>
          <p className="text-xl text-gray-600 mb-12">Start creating amazing AI-powered images with Glorify</p>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#405DE9" }}
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Create Images</h3>
              <p className="text-gray-600 mb-4">Generate stunning AI images with our advanced tools</p>
              <Link href="/generate">
                <button
                  className="text-white px-6 py-2 rounded-lg font-medium transition-colors hover:opacity-90"
                  style={{ backgroundColor: "#405DE9" }}
                >
                  Start Creating
                </button>
              </Link>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#405DE9" }}
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">My Gallery</h3>
              <p className="text-gray-600 mb-4">View and manage your created images</p>
              <button
                className="text-white px-6 py-2 rounded-lg font-medium transition-colors hover:opacity-90"
                style={{ backgroundColor: "#405DE9" }}
              >
                View Gallery
              </button>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#405DE9" }}
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
              <p className="text-gray-600 mb-4">Manage your subscription and preferences</p>
              <button
                className="text-white px-6 py-2 rounded-lg font-medium transition-colors hover:opacity-90"
                style={{ backgroundColor: "#405DE9" }}
              >
                Settings
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-gray-900">5</div>
              <div className="text-sm text-gray-600">Credits Remaining</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-gray-900">0</div>
              <div className="text-sm text-gray-600">Images Generated</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-gray-900">Free</div>
              <div className="text-sm text-gray-600">Current Plan</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}