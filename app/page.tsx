import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Portfolio } from "@/components/portfolio"
import { Pricing } from "@/components/pricing"
import { Services } from "@/components/services"
import { trackReferralClick } from "@/app/actions/referral"

// This is a Server Component that can run server-side code
export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Check if there's a referral code in the URL
  const refCode = searchParams.ref as string

  if (refCode) {
    // Track the click server-side
    await trackReferralClick(refCode)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Header />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Pricing />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
