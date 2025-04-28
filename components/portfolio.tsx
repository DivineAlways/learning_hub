import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

export function Portfolio() {
  const projects = [
    {
      title: "Artisan Bakery",
      description:
        "An e-commerce website for a local bakery featuring online ordering, product catalog, and customer reviews.",
      image: "/dark-bakery-modern.png",
      link: "https://bakery-example.com",
      tags: ["E-commerce", "Food & Beverage"],
    },
    {
      title: "Fitness Studio",
      description:
        "Membership portal for a fitness studio with class scheduling, trainer profiles, and integrated payment system.",
      image: "/dark-purple-fitness.png",
      link: "https://fitness-example.com",
      tags: ["Membership", "Health & Wellness"],
    },
    {
      title: "Legal Consultant",
      description:
        "Professional website for a law firm with service information, team profiles, and appointment booking functionality.",
      image: "/elegant-law-firm.png",
      link: "https://legal-example.com",
      tags: ["Professional Services", "Booking System"],
    },
    {
      title: "Tech Startup",
      description: "Dynamic website for a SaaS company featuring product demos, pricing plans, and user testimonials.",
      image: "/neon-cityscape-interface.png",
      link: "https://tech-example.com",
      tags: ["SaaS", "Technology"],
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
