import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")

    if (!code) {
      return NextResponse.json({ error: "Referral code is required" }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()

    // Find the referral by code
    const { data, error } = await supabase.from("lp_referrals").select("*").eq("referral_code", code).single()

    if (error || !data) {
      console.error("Error finding referral:", error)
      return NextResponse.json({ error: "Invalid referral code" }, { status: 404 })
    }

    // Update click count
    const { error: updateError } = await supabase
      .from("lp_referrals")
      .update({ clicks: data.clicks + 1 })
      .eq("id", data.id)

    if (updateError) {
      console.error("Error updating click count:", updateError)
      return NextResponse.json({ error: "Failed to update click count" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in track-click route:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
