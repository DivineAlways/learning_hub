import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950">
      <div className="text-center max-w-md p-6 bg-gray-900 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Referral Not Found</h2>
        <p className="text-gray-400 mb-6">
          The referral link you're trying to access doesn't exist or has been removed.
        </p>
        <Link href="/" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors">
          Go to homepage
        </Link>
      </div>
    </div>
  )
}
