import { Check, Clock, Database, Server } from "lucide-react"
import Link from "next/link"

export function Pricing() {
  const features = [
    { icon: <Check className="h-5 w-5 text-green-400" />, text: "Custom Design & Development" },
    { icon: <Check className="h-5 w-5 text-green-400" />, text: "Mobile Responsive" },
    { icon: <Check className="h-5 w-5 text-green-400" />, text: "SEO Basics" },
    { icon: <Server className="h-5 w-5 text-purple-400" />, text: "Free Hosting Included" },
    { icon: <Database className="h-5 w-5 text-purple-400" />, text: "Free Database (if needed)" },
    { icon: <Clock className="h-5 w-5 text-blue-400" />, text: "2 Weeks or Less Delivery" },
  ]

  return (
    <section id="pricing" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            One flat rate with everything included. No hidden fees or surprises.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-purple-500/30 shadow-xl shadow-purple-900/10">
            <div className="text-center mb-8">
              <div className="text-5xl font-bold mb-4">
                <span className="text-purple-400">$250</span>
              </div>
              <p className="text-gray-400">Complete website package</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  {feature.icon}
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="bg-gray-800/50 p-4 rounded-lg mb-8">
              <h3 className="font-semibold mb-2 text-purple-400">What's included:</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Up to 5 pages of custom content</li>
                <li>• Contact form integration</li>
                <li>• Basic SEO optimization</li>
                <li>• Social media integration</li>
                <li>• 1 round of revisions</li>
              </ul>
            </div>

            <Link
              href="#contact"
              className="block w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium transition-colors text-center"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
