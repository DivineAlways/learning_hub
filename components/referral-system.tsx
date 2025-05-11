"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { generateReferralLink, getReferralLinks, deleteReferralLink } from "@/app/actions/referral"
import { Copy, Trash2, ExternalLink, Plus } from "lucide-react"

interface Referral {
  id: string
  referral_code: string
  referral_url: string
  clicks: number
  conversions: number
  created_at: string
}

export function ReferralSystem({ userId }: { userId: string }) {
  const [referrals, setReferrals] = useState<Referral[]>([])
  const [loading, setLoading] = useState(true)
  const [newUrl, setNewUrl] = useState("")
  const [creating, setCreating] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadReferrals()
  }, [])

  async function loadReferrals() {
    setLoading(true)
    const result = await getReferralLinks(userId)
    setLoading(false)

    if (result.success) {
      setReferrals(result.referrals)
    } else {
      setError(result.error || "Failed to load referral links")
    }
  }

  async function handleCreateReferral(e: React.FormEvent) {
    e.preventDefault()
    setCreating(true)
    setError(null)

    if (!newUrl) {
      setError("Please enter a destination URL")
      setCreating(false)
      return
    }

    // Ensure URL has protocol
    let formattedUrl = newUrl
    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = `https://${formattedUrl}`
    }

    const result = await generateReferralLink(userId, formattedUrl)
    setCreating(false)

    if (result.success) {
      setNewUrl("")
      loadReferrals()
    } else {
      setError(result.error || "Failed to create referral link")
    }
  }

  async function handleDeleteReferral(id: string) {
    const confirmed = window.confirm("Are you sure you want to delete this referral link?")
    if (!confirmed) return

    const result = await deleteReferralLink(userId, id)

    if (result.success) {
      setReferrals(referrals.filter((ref) => ref.id !== id))
    } else {
      setError(result.error || "Failed to delete referral link")
    }
  }

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Referral Links</h2>

      {error && <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleCreateReferral} className="mb-8">
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="Enter destination URL (e.g., your website)"
            className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={creating}
          />
          <button
            type="submit"
            disabled={creating}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {creating ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" /> Create Referral Link
              </>
            )}
          </button>
        </div>
      </form>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-2 text-gray-400">Loading referral links...</p>
        </div>
      ) : referrals.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p>You haven't created any referral links yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-4 py-2 text-left">Destination</th>
                <th className="px-4 py-2 text-left">Referral Link</th>
                <th className="px-4 py-2 text-center">Clicks</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((referral) => {
                const referralUrl = `${window.location.origin}/r/${referral.referral_code}`

                return (
                  <tr key={referral.id} className="border-b border-gray-700">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <a
                          href={referral.referral_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-400 hover:text-purple-300 truncate max-w-[200px] flex items-center gap-1"
                        >
                          {referral.referral_url}
                          <ExternalLink className="h-3 w-3 flex-shrink-0" />
                        </a>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="truncate max-w-[200px]">{referralUrl}</span>
                        <button
                          onClick={() => copyToClipboard(referralUrl, referral.id)}
                          className="text-gray-400 hover:text-white"
                          aria-label="Copy referral link"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        {copied === referral.id && <span className="text-xs text-green-400">Copied!</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">{referral.clicks}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleDeleteReferral(referral.id)}
                        className="text-red-400 hover:text-red-300"
                        aria-label="Delete referral link"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
