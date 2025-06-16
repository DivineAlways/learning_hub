import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

export function Portfolio() {
  const projects = [
    {
      title: "Linda Soul Catering",
      description:
        "A professional catering business website featuring service showcases, menu displays, event galleries, and integrated booking system for seamless customer experience.",
      image: "/linda-soul-catering.png",
      link: "https://v0-catering-business-website.vercel.app/",
      tags: ["Catering", "Business Website", "Event Services"],
    },
    {
      title: "Zena Gray Realty",
      description:
        "A comprehensive real estate search platform with property listings, advanced filtering options, and detailed property information for home buyers.",
      image: "/zena-gray-realty.png",
      link: "https://v0-fork-of-real-estate-alpha.vercel.app/",
      tags: ["Real Estate", "Search Platform", "Property Listings"],
    },
    {
      title: "Alexus Realty Funding",
      description:
        "A modern website for a real estate funding company showcasing various financing options including purchase loans, refinancing, and renovation loans.",
      image: "/alexus-realty-funding.png",
      link: "https://v0-alexus.vercel.app/",
      tags: ["Real Estate", "Funding Solutions", "Finance"],
    },
    {
      title: "Agnosia Blockchain/Crypto E-commerce",
      description:
        "A sleek e-commerce platform focused on blockchain and cryptocurrency products. Currently working on this project to implement advanced features and functionality.",
      image: "/blk-ecommerce.png",
      link: "https://v0-blk-e-commerce.vercel.app/",
      tags: ["E-commerce", "Blockchain", "Cryptocurrency"],
    },
    {
      title: "Crypto Learning Hub",
      description:
        "An educational platform about cryptocurrency with comprehensive guides, market information, and learning resources for beginners and experts.",
      image: "/crypto-learning.png",
      link: "https://crypto-learning.vercel.app/",
      tags: ["Cryptocurrency", "Education", "Finance"],
    },
  ]

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Portfolio</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A showcase of websites I've designed and developed for clients across various industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500 transition-all group"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                    aria-label={`Visit ${project.title} website`}
                  >
                    <ExternalLink className="h-5 w-5" />
                  </Link>
                </div>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
