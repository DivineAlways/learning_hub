"use client"

import type React from "react"

import { useState } from "react"
import { generateReferralLink } from "@/app/actions/referral"
import { useRouter } from "next/navigation"
import { Copy, Check } from "lucide-react"

export function ReferralForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [referralUrl, setReferralUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!name || !email) {
      setError("Please enter your name and email")
      setLoading(false)
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      setLoading(false)
      return
    }

    try {
      const result = await generateReferralLink(name, email)
      setLoading(false)

      if (result.success) {
        // Show the referral URL directly on the page
        setReferralUrl(result.referralUrl)
        // Also redirect to the tracking page after a delay
        setTimeout(() => {
          router.push(`/referral/${result.publicId}`)
        }, 5000)
      } else {
        setError(result.error || "Failed to create referral link")
      }
    } catch (err) {
      console.error("Error creating referral:", err)
      setLoading(false)
      setError("An error occurred. Please try again.")
    }
  }

  function copyToClipboard() {
    if (referralUrl) {
      navigator.clipboard.writeText(referralUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Create Your Referral Link</h2>
      <p className="text-gray-400 mb-6">
        Earn commission by referring clients to Low Perry. You'll receive payment when your referral becomes a client.
      </p>

      {error && <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded mb-4">{error}</div>}

      {referralUrl ? (
        <div className="bg-green-900/30 border border-green-500 text-green-200 px-4 py-3 rounded mb-4">
          <p className="font-medium mb-2">Your referral link has been created!</p>
          <div className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded mb-2">
            <span className="truncate flex-1">{referralUrl}</span>
            <button
              onClick={copyToClipboard}
              className="text-gray-400 hover:text-white p-1 rounded-md transition-colors"
              aria-label="Copy to clipboard"
            >
              {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
          <p className="mt-2 text-sm">
            You'll be redirected to your tracking page in a few seconds. Make sure to bookmark that page to track your
            referrals!
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <p className="text-xs text-gray-500 mt-1">We'll use this to contact you when your referral converts.</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium transition-colors disabled:opacity-70"
            >
              {loading ? "Creating..." : "Create Referral Link"}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
