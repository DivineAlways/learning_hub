import { Code, Globe, Database, Server } from "lucide-react"

export function Services() {
  const services = [
    {
      icon: <Globe className="h-10 w-10 text-purple-400" />,
      title: "Custom Website Design",
      description: "Unique, responsive websites tailored to your brand and business needs.",
    },
    {
      icon: <Code className="h-10 w-10 text-purple-400" />,
      title: "Web Development",
      description: "Clean, efficient code that brings your design to life with seamless functionality.",
    },
    {
      icon: <Database className="h-10 w-10 text-purple-400" />,
      title: "Free Database Integration",
      description: "Powerful database solutions included at no extra cost when your project requires it.",
    },
    {
      icon: <Server className="h-10 w-10 text-purple-400" />,
      title: "Free Hosting",
      description: "Worry-free hosting included with every website, ensuring your site stays fast and reliable.",
    },
  ]

  return (
    <section id="services" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What I Offer</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Comprehensive web solutions from concept to launch, with everything you need included.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
