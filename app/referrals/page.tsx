import { redirect } from "next/navigation"

export default function LegacyReferralsPage() {
  // Redirect to the new referrals page
  redirect("/referral")

  // This will never be rendered
  return null
}
