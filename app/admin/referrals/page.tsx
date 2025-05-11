import { getAllReferrals } from "@/app/actions/referral"
import { CheckCircle, XCircle } from "lucide-react"
import { AdminPaymentButton } from "@/components/admin-payment-button"

export default async function AdminReferralsPage() {
  const result = await getAllReferrals()
  const referrals = result.success ? result.referrals : []

  return (
    <div className="min-h-screen bg-gray-950 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Admin: Manage Referrals</h1>

        {!result.success && (
          <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded mb-6">
            Error loading referrals: {result.error}
          </div>
        )}

        <div className="bg-gray-800 rounded-lg p-6 overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left px-4 py-3">Referrer</th>
                <th className="text-left px-4 py-3">Email</th>
                <th className="text-center px-4 py-3">Code</th>
                <th className="text-center px-4 py-3">Clicks</th>
                <th className="text-center px-4 py-3">Conversions</th>
                <th className="text-center px-4 py-3">Paid</th>
                <th className="text-center px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {referrals.length > 0 ? (
                referrals.map((referral) => (
                  <tr key={referral.id} className="border-b border-gray-700">
                    <td className="px-4 py-3">{referral.referrer_name || "Unknown"}</td>
                    <td className="px-4 py-3">{referral.referrer_email || "No email"}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="bg-gray-700 px-2 py-1 rounded text-sm">{referral.referral_code}</span>
                    </td>
                    <td className="px-4 py-3 text-center">{referral.clicks}</td>
                    <td className="px-4 py-3 text-center">{referral.conversions}</td>
                    <td className="px-4 py-3 text-center">
                      {referral.paid ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <AdminPaymentButton referralId={referral.id} isPaid={referral.paid} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    No referrals found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
