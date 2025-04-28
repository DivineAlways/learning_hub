import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-950 to-gray-950"></div>

      {/* Animated dots pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, purple 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      <div className="container relative mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          Digital Visions, <span className="block">Pixel Perfect</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Transforming ideas into stunning websites that captivate and convert. Professional web design with a creative
          edge.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="#portfolio"
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium transition-colors"
          >
            View My Work
          </Link>
          <Link
            href="#contact"
            className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-md font-medium transition-colors flex items-center justify-center gap-2"
          >
            Get In Touch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
