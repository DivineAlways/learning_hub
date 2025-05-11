"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950">
      <div className="text-center max-w-md p-6 bg-gray-900 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Something went wrong!</h2>
        <p className="text-gray-400 mb-6">
          We couldn't process your referral link. Please try again or contact support.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
          >
            Try again
          </button>
          <Link href="/" className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors">
            Go to homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
