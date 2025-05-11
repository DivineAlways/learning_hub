"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

export function ReferralTrackingScript() {
  // useSearchParams must be used within a Suspense boundary
  const searchParams = useSearchParams()

  useEffect(() => {
    // Only run if searchParams is available
    if (!searchParams) return

    const refCode = searchParams.get("ref")

    if (refCode) {
      // Store the referral code in localStorage for conversion tracking later
      try {
        localStorage.setItem("referralCode", refCode)
      } catch (error) {
        console.error("Error storing referral code:", error)
      }

      // Send a tracking request to the API
      fetch(`/api/track-click?code=${refCode}`).catch((error) => {
        console.error("Error tracking referral click:", error)
      })
    }
  }, [searchParams])

  // This component doesn't render anything
  return null
}
