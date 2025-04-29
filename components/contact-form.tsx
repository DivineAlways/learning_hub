"use client"

import { Mail, ArrowRight } from "lucide-react"

export function ContactForm() {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ready to bring your website idea to life? Send me a message and I'll get back to you within 24 hours.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-800 p-8 rounded-lg text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/20 text-purple-400 mb-6">
              <Mail className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Contact Me</h3>
            <p className="text-gray-400 mb-8">
              Send me an email with your project details, and I'll get back to you as soon as possible to discuss how we
              can work together.
            </p>

            <a
              href="mailto:onlyweb3.0@gmail.com?subject=Website%20Project%20Inquiry"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium transition-colors"
            >
              Email Me Now <ArrowRight className="h-4 w-4" />
            </a>

            <p className="mt-6 text-gray-500">
              Or send an email directly to: <span className="text-purple-400">onlyweb3.0@gmail.com</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
