"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { ThreeDPhotoCarousel } from "../components/ui/3d-carousel"
import PricingSection from "../components/ui/PricingSection"
import Footer from "../components/Footer"

export default function Home() {
  const router = useRouter()
  const { isSignedIn } = useUser()
  const [isDragging, setIsDragging] = useState(false)
  const [sliderPosition, setSliderPosition] = useState(50)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleSliderChange = (e) => {
    setSliderPosition(Number(e.target.value))
  }

  const handleStartFreeTrial = () => {
    if (isSignedIn) {
      router.push("/generate")
    } else {
      router.push("/sign-up")
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFF8F4" }}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[60vh]">
          {/* Left Side - Content */}
          <div className="text-left">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              The Future of Photography
            </h1>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-8" style={{ color: "#a855f7" }}>
              with Glorify
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-xl">
              Shedding the AI vibe, Redefining the aesthetics of AI photography
            </p>
            <button
              onClick={handleStartFreeTrial}
              className="px-8 py-4 rounded-full text-white font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
              style={{ backgroundColor: "#405DE9" }}
            >
              {isSignedIn ? "Start Creating" : "Start Free Trial"}
            </button>
          </div>

          {/* Right Side - Image Transformer */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="w-full max-w-md mx-auto">
              {/* Before/After Slider Container */}
              <div className="relative">
                <div className="absolute top-3 left-3 z-20">
                  <span className="bg-black/30 text-white px-4 py-2 rounded-lg text-sm font-medium">Original</span>
                </div>
                <div className="absolute top-3 right-3 z-20">
                  <span className="bg-black/30 text-white px-4 py-2 rounded-lg text-sm font-medium">Ghibli Style</span>
                </div>

                <div
                  className={`relative aspect-square rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${
                    isDragging ? "ring-4 ring-purple-400 scale-105" : ""
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {/* Background (Ghibli) Image */}
                  <img src="/image5.jpg" alt="Ghibli Style" className="absolute inset-0 w-full h-full object-cover" />

                  {/* Foreground (Original) Image with clip */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
                    }}
                  >
                    <img src="/original.jpg" alt="Original" className="w-full h-full object-cover" />
                  </div>

                  {/* Slider Line */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    {/* Slider Handle */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer">
                      <div className="w-1 h-4 bg-gray-400 rounded"></div>
                      <div className="w-1 h-4 bg-gray-400 rounded ml-1"></div>
                    </div>
                  </div>

                  {/* Invisible Slider Input */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPosition}
                    onChange={handleSliderChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  />

                  {isDragging && (
                    <div className="absolute inset-0 bg-purple-500 bg-opacity-70 flex items-center justify-center z-30">
                      <p className="text-white font-semibold">Drop to transform!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Loading Effect */}
            {isDragging && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-white rounded-lg p-4 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                    <span className="text-sm text-gray-600">Processing...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      {/* User Trust Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">5000+ Users Trust Glorify</h3>

          {/* Avatar Row - Single Image */}
          <div className="flex justify-center items-center mb-8">
            <img src="/avatar.png" alt="10+ Users Trust Glorify" className="h-16 lg:h-20 w-auto" />
          </div>

          {/* Trust indicators */}
          <div className="flex justify-center items-center space-x-8 text-gray-500">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-medium">4.9/5 Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium">Trusted by Professionals</span>
            </div>
          </div>
        </div>
      </section>
      {/* 3D Photo Carousel Section */}
      <section id="gallery-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-12">Explore Our Gallery</h3>

          <div className="w-full max-w-4xl mx-auto">
            <div className="min-h-[500px] flex flex-col justify-center space-y-4">
              <div className="p-2">
                <ThreeDPhotoCarousel />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="min-h-screen bg-gradient-to-br" style={{ backgroundColor: "#FFF8F4" }}>
        <div className="max-w-6xl mx-auto space-y-20">
          {/* Step 1 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30">
                <span className="text-white-300 text-sm font-medium">STEP 1</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold">Upload your photo</h2>
              <p className="text-black-300 text-lg leading-relaxed">
                Please upload a clear photo showcasing your desired facial feature for optimal understanding and
                accurate results.
              </p>
            </div>

            {/* Phone mockup for Step 1 */}
            <div className="flex justify-center">
              <div className="relative w-64 h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2.5rem] p-2">
                  <div className="w-full h-full bg-black rounded-[2rem] overflow-hidden relative">
                    <img
                      src="/original.jpg"
                      alt="Upload photo interface"
                      width={240}
                      height={480}
                      className="w-full h-full object-cover"
                    />
                    {/* Upload button overlay */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              {/* Phone mockup for Step 2 */}
              <div className="relative w-64 h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2.5rem] p-2">
                  <div className="w-full h-full bg-black rounded-[2rem] overflow-hidden p-4">
                    {/* Single generated portrait */}
                    <div className="w-full h-full bg-gradient-to-br from-pink-400 to-purple-600 rounded-lg overflow-hidden">
                      <img src="/image5.jpg" alt="Generated portrait result" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30">
                <span className="text-white-300 text-sm font-medium">STEP 2</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold">Magic in progress</h2>
              <p className="text-black-300 text-lg leading-relaxed">
                In just about 1 to 5 sec, swiftly generate captivating personalized artistic portraits, faster than many
                other AI portrait generators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <div id="pricing-section">
        <PricingSection />
      </div>
      <Footer />

      <style>{`
       @keyframes fade-in {
         from { opacity: 0; transform: scale(0.9); }
         to { opacity: 1; transform: scale(1); }
       }
       .animate-fade-in {
         animation: fade-in 0.5s ease-out;
       }
     `}</style>
    </div>
  )
}
