"use client"

import { useState } from "react"
import { markReferralAsPaid } from "@/app/actions/referral"
import { useRouter } from "next/navigation"

interface AdminPaymentButtonProps {
  referralId: string
  isPaid: boolean
}

export function AdminPaymentButton({ referralId, isPaid }: AdminPaymentButtonProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleTogglePaid() {
    setLoading(true)

    try {
      const result = await markReferralAsPaid(referralId, !isPaid)

      if (result.success) {
        // Refresh the page data
        router.refresh()
      } else {
        alert(`Failed to update: ${result.error}`)
      }
    } catch (error) {
      console.error("Error updating payment status:", error)
      alert("An error occurred while updating payment status")
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleTogglePaid}
      disabled={loading}
      className={`px-3 py-1 rounded text-sm transition-colors ${
        isPaid ? "bg-red-900/50 hover:bg-red-900 text-white" : "bg-green-900/50 hover:bg-green-900 text-white"
      }`}
    >
      {loading ? "..." : isPaid ? "Mark Unpaid" : "Mark Paid"}
    </button>
  )
}
