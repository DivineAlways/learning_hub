"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Users } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-purple-400">
          Low Perry
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLinks />
        </nav>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-gray-900 border-b border-gray-800">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <NavLinks mobile onClick={() => setIsMenuOpen(false)} />
          </nav>
        </div>
      )}
    </header>
  )
}

function NavLinks({ mobile = false, onClick }: { mobile?: boolean; onClick?: () => void }) {
  const links = [
    { href: "#services", label: "Services" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#pricing", label: "Pricing" },
    { href: "#contact", label: "Contact" },
    {
      href: "/referral",
      label: "Referrals",
      highlight: true,
      icon: <Users className="h-4 w-4" />,
    },
  ]

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`
            ${mobile ? "block py-2" : ""} 
            ${
              link.highlight
                ? "text-purple-400 hover:text-purple-300 flex items-center gap-1"
                : "text-gray-300 hover:text-purple-400"
            } 
            transition-colors
          `}
          onClick={onClick}
        >
          {link.icon && link.icon}
          {link.label}
          {link.highlight && (
            <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full ml-1">Earn $50</span>
          )}
        </Link>
      ))}
    </>
  )
}
