import { ReferralForm } from "@/components/referral-form"

export default function ReferralPage() {
  return (
    <div className="min-h-screen bg-gray-950 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Earn with Referrals</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Refer clients to Low Perry and earn a commission when they purchase a website. It's that simple!
            </p>
          </div>

          <ReferralForm />

          <div className="mt-8 bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">How it works</h2>
            <ol className="space-y-4">
              <li className="flex gap-3">
                <div className="bg-purple-600 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <p className="font-medium">Create your unique referral link</p>
                  <p className="text-gray-400">Fill out the form above with your name and email.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="bg-purple-600 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <p className="font-medium">Share your link</p>
                  <p className="text-gray-400">
                    Send your referral link to potential clients via email, social media, or messaging.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="bg-purple-600 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <p className="font-medium">Get paid for successful referrals</p>
                  <p className="text-gray-400">
                    When someone uses your link and becomes a client, you earn a $50 commission.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
