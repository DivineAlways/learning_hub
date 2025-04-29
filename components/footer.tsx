import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-400 mb-6">
            Email:{" "}
            <a href="mailto:onlyweb3.0@gmail.com" className="text-purple-400 hover:text-purple-300">
              onlyweb3.0@gmail.com
            </a>
          </p>

          <div className="border-t border-gray-800 w-full pt-8 mt-4 text-center">
            <Link href="/" className="text-2xl font-bold text-purple-400 block mb-2">
              Low Perry
            </Link>
            <p className="text-gray-400 mb-4">Digital Visions, Pixel Perfect</p>
            <p className="text-gray-500 text-sm">&copy; {currentYear} Low Perry. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
