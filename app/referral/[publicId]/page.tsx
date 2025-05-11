import type React from "react"
import { getReferralsByPublicId } from "@/app/actions/referral"
import { notFound } from "next/navigation"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { CopyButton } from "@/components/copy-button"

export default async function ReferralTrackingPage({ params }: { params: { publicId: string } }) {
  const { publicId } = params
  const result = await getReferralsByPublicId(publicId)

  if (!result.success || !result.referral) {
    notFound()
  }

  const referral = result.referral
  // Use the full_referral_url that's now included in the response
  const referralLink = referral.full_referral_url

  return (
    <div className="min-h-screen bg-gray-950 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Your Referral Link</h1>

          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Share this link</h2>
              <div className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-md">
                <span className="truncate flex-1">{referralLink}</span>
                <CopyButton textToCopy={referralLink} />
              </div>
              <p className="text-gray-400 text-sm mt-2">
                Share this link with potential clients. When they use your link, you'll earn commission!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <StatCard
                title="Link Clicks"
                value={referral.clicks}
                description="Total times your link has been clicked"
              />
              <StatCard title="Conversions" value={referral.conversions} description="People who signed up" />
              <StatCard
                title="Payment Status"
                value={referral.paid ? "Paid" : "Pending"}
                valueColor={referral.paid ? "text-green-400" : "text-yellow-400"}
                description="Commission payment status"
                icon={referral.paid ? <CheckCircle className="h-5 w-5 text-green-400" /> : null}
              />
            </div>

            <div className="border-t border-gray-700 pt-4">
              <p className="text-sm text-gray-400">
                <strong>Important:</strong> Bookmark this page to track your referral stats. You can return to this URL
                anytime to see your referral performance.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link href="/referral" className="text-purple-400 hover:text-purple-300 underline">
              Create another referral link
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: number | string
  valueColor?: string
  description: string
  icon?: React.ReactNode
}

function StatCard({ title, value, valueColor = "text-white", description, icon }: StatCardProps) {
  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      <h3 className="text-sm text-gray-400 mb-1">{title}</h3>
      <div className="flex items-center gap-2">
        <div className={`text-2xl font-bold ${valueColor}`}>{value}</div>
        {icon}
      </div>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </div>
  )
}
