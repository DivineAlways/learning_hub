"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

export function ReferralTrackingScript() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const refCode = searchParams.get("ref")

    if (refCode) {
      // Store the referral code in localStorage for conversion tracking later
      localStorage.setItem("referralCode", refCode)

      // Send a tracking request to the API
      fetch(`/api/track-click?code=${refCode}`).catch((error) => {
        console.error("Error tracking referral click:", error)
      })
    }
  }, [searchParams])

  // This component doesn't render anything
  return null
}
