"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { createClientSupabaseClient } from "@/lib/supabase"

export default function RedirectPage() {
  const params = useParams()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const code = params?.code as string

  useEffect(() => {
    async function processReferral() {
      if (!code) {
        router.push("/")
        return
      }

      try {
        const supabase = createClientSupabaseClient()

        // Find the referral by code
        const { data, error } = await supabase.from("lp_referrals").select("*").eq("referral_code", code).single()

        if (error || !data) {
          console.error("Error finding referral:", error)
          setError("Referral code not found")
          return
        }

        // Update click count
        await supabase
          .from("lp_referrals")
          .update({ clicks: data.clicks + 1 })
          .eq("id", data.id)

        // Redirect to the homepage
        router.push("/")
      } catch (err) {
        console.error("Error processing referral:", err)
        setError("An error occurred while processing your referral")
      }
    }

    processReferral()
  }, [code, router])

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950">
        <div className="text-center max-w-md p-6 bg-gray-900 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-4">Error</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
          >
            Go to homepage
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Processing your referral...</h1>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
      </div>
    </div>
  )
}
