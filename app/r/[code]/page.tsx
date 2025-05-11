import { redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase"

export default async function ReferralRedirect({ params }: { params: { code: string } }) {
  const { code } = params

  if (!code) {
    redirect("/")
  }

  try {
    const supabase = createServerSupabaseClient()

    // Find the referral by code
    const { data, error } = await supabase.from("lp_referrals").select("*").eq("referral_code", code).single()

    if (error || !data) {
      console.error("Error finding referral:", error)
      redirect("/")
    }

    // Update click count
    await supabase
      .from("lp_referrals")
      .update({ clicks: data.clicks + 1 })
      .eq("id", data.id)

    // Redirect to the homepage
    redirect("/")
  } catch (error) {
    console.error("Error processing referral:", error)
    redirect("/")
  }
}
