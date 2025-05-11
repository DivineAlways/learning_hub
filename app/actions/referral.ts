"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { v4 as uuidv4 } from "uuid"

// Hardcode the website URL to ensure it's correct
const WEBSITE_URL = "https://lowperry.com"

// Get referrals by user ID
export async function getReferralLinks(userId: string) {
  const supabase = createServerSupabaseClient()

  try {
    const { data, error } = await supabase
      .from("lp_referrals")
      .select("*")
      .eq("referrer_email", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching referrals:", error)
      return { success: false, error: "Failed to fetch referral links" }
    }

    return { success: true, referrals: data }
  } catch (error) {
    console.error("Error fetching referral links:", error)
    return { success: false, error: "Server error" }
  }
}

// Delete a referral link
export async function deleteReferralLink(userId: string, id: string) {
  const supabase = createServerSupabaseClient()

  try {
    const { error } = await supabase.from("lp_referrals").delete().eq("id", id).eq("referrer_email", userId)

    if (error) {
      console.error("Error deleting referral:", error)
      return { success: false, error: "Failed to delete referral link" }
    }

    return { success: true }
  } catch (error) {
    console.error("Error deleting referral link:", error)
    return { success: false, error: "Server error" }
  }
}

// Generate a referral link
export async function generateReferralLink(referrerName: string, referrerEmail: string) {
  const supabase = createServerSupabaseClient()
  const referralCode = uuidv4().substring(0, 8) // Shorter code for better sharing
  const publicId = uuidv4()
  const defaultReferrerId = uuidv4() // Generate a UUID for referrer_id

  try {
    // Create a destination URL with tracking parameters
    const destinationUrl = `${WEBSITE_URL}?ref=${referralCode}`

    // Create a TinyURL for the referral with tracking parameters
    let tinyUrl = ""
    try {
      const tinyUrlResponse = await fetch(
        "https://tinyurl.com/api-create.php?url=" + encodeURIComponent(destinationUrl),
      )
      if (tinyUrlResponse.ok) {
        tinyUrl = await tinyUrlResponse.text()
      } else {
        // Fallback if TinyURL fails
        tinyUrl = destinationUrl
      }
    } catch (error) {
      console.error("Error creating TinyURL:", error)
      tinyUrl = destinationUrl
    }

    const { data, error } = await supabase
      .from("lp_referrals")
      .insert([
        {
          referrer_id: defaultReferrerId,
          referrer_name: referrerName,
          referrer_email: referrerEmail,
          referral_code: referralCode,
          referral_url: WEBSITE_URL,
          public_id: publicId,
          tiny_url: tinyUrl,
          clicks: 0,
          conversions: 0,
          paid: false,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error creating referral link:", error)
      return { success: false, error: "Failed to create referral link" }
    }

    return {
      success: true,
      publicId: publicId,
      referralUrl: tinyUrl,
    }
  } catch (error) {
    console.error("Error generating referral link:", error)
    return { success: false, error: "Server error" }
  }
}

// Get referrals by public ID
export async function getReferralsByPublicId(publicId: string) {
  const supabase = createServerSupabaseClient()

  try {
    const { data, error } = await supabase.from("lp_referrals").select("*").eq("public_id", publicId).single()

    if (error) {
      console.error("Error fetching referral by public ID:", error)
      return { success: false, error: "Referral not found" }
    }

    // Use the stored tiny_url if available
    const referral = {
      ...data,
      full_referral_url: data.tiny_url || `${WEBSITE_URL}?ref=${data.referral_code}`,
    }

    return { success: true, referral }
  } catch (error) {
    console.error("Error fetching referral by public ID:", error)
    return { success: false, error: "Server error" }
  }
}

// Get all referrals (Admin only)
export async function getAllReferrals() {
  const supabase = createServerSupabaseClient()

  try {
    const { data, error } = await supabase.from("lp_referrals").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching all referrals:", error)
      return { success: false, error: "Failed to load referrals" }
    }

    return { success: true, referrals: data }
  } catch (error) {
    console.error("Error fetching all referrals:", error)
    return { success: false, error: "Server error" }
  }
}

// Mark referral as paid (Admin only)
export async function markReferralAsPaid(referralId: string, paid: boolean) {
  const supabase = createServerSupabaseClient()

  try {
    const { error } = await supabase.from("lp_referrals").update({ paid: paid }).eq("id", referralId)

    if (error) {
      console.error("Error marking referral as paid:", error)
      return { success: false, error: "Failed to update payment status" }
    }

    return { success: true }
  } catch (error) {
    console.error("Error marking referral as paid:", error)
    return { success: false, error: "Server error" }
  }
}

// Track a referral click
export async function trackReferralClick(code: string) {
  if (!code) return { success: false, error: "No referral code provided" }

  const supabase = createServerSupabaseClient()

  try {
    const { data, error } = await supabase.from("lp_referrals").select("*").eq("referral_code", code).single()

    if (error || !data) {
      console.error("Error finding referral:", error)
      return { success: false, error: "Referral not found" }
    }

    // Update click count
    const { error: updateError } = await supabase
      .from("lp_referrals")
      .update({ clicks: data.clicks + 1 })
      .eq("id", data.id)

    if (updateError) {
      console.error("Error updating click count:", updateError)
      return { success: false, error: "Failed to update click count" }
    }

    return { success: true }
  } catch (error) {
    console.error("Error tracking referral click:", error)
    return { success: false, error: "Server error" }
  }
}
