"use client"

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-[#FFF8F4] text-black py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Left side - Logo and tagline */}
          <div className="space-y-6">
            <div>
              <h2 className="text-6xl lg:text-7xl font-bold text-black opacity-80">Glorify</h2>
            </div>
            <div className="max-w-md">
              <p className="text-lg text-gray-700 leading-relaxed">
                AI-powered images designed to enhance your projects with endless creativity
              </p>
              <p className="text-gray-600 mt-4">©2025 Glorify</p>
            </div>
          </div>

          {/* Right side - Footer links */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-black">Contact</h3>
              <div className="space-y-3 text-gray-700">
                <p>contact@glorify.com</p>
                <p>Neon Palms Blvd 2201, LA</p>
                <p>+1 173 555-7862</p>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-black">Social Media</h3>
              <div className="space-y-3">
                <a href="https://www.linkedin.com/in/gao-dalie-%E9%AB%98%E9%81%94%E7%83%88-0a37481a9/" className="block text-gray-700 hover:text-black transition-colors">
                  LinkedIn
                </a>
                <a href="https://x.com/GaoDalie_AI" className="block text-gray-700 hover:text-black transition-colors">
                  Twitter
                </a>
              </div>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-black">Company</h3>
              <div className="space-y-3">
                <button
                  onClick={() => scrollToSection("pricing-section")}
                  className="block text-gray-700 hover:text-black transition-colors text-left"
                >
                  Pricing
                </button>
                <button
                  onClick={() => scrollToSection("gallery-section")}
                  className="block text-gray-700 hover:text-black transition-colors text-left"
                >
                  Glory Images
                </button>
              </div>
            </div>

            {/* Terms & Policy */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-black">Terms & Policy</h3>
              <div className="space-y-3">
                <a href="#" className="block text-gray-700 hover:text-black transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="block text-gray-700 hover:text-black transition-colors">
                  Terms of use
                </a>
                <a href="#" className="block text-gray-700 hover:text-black transition-colors">
                  Licence
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
