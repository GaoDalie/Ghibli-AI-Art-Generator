"use client"

import { useState, useRef } from "react"
import { Upload, Download, Zap } from "lucide-react"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"
import Image from "next/image"

export default function GeneratePage() {
  const { isLoaded, isSignedIn } = useUser()
  const [uploadedImage, setUploadedImage] = useState(null)
  const [generatedImage, setGeneratedImage] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [aspectRatio, setAspectRatio] = useState("1:1")
  const [noWatermark, setNoWatermark] = useState(true)
  const [isPrivate, setIsPrivate] = useState(true)
  const [otherIdeas, setOtherIdeas] = useState("")
  const [credits, setCredits] = useState(5)
  const [isDragging, setIsDragging] = useState(false)
  const [sliderPosition, setSliderPosition] = useState(50)
  const fileInputRef = useRef(null)

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target.result
        if (typeof result === "string") {
          setUploadedImage(result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

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

    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target.result
        if (typeof result === "string") {
          setUploadedImage(result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUploadDragOver = (e) => {
    e.preventDefault()
  }

  const handleUploadDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target.result
        if (typeof result === "string") {
          setUploadedImage(result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSliderChange = (e) => {
    setSliderPosition(Number(e.target.value))
  }

  const generateImage = async () => {
    if (!uploadedImage) return

    setIsGenerating(true)
    setGeneratedImage(null)
    
    try {
      console.log('Starting image generation...')
      
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: uploadedImage,
          prompt: otherIdeas.trim() || "Studio Ghibli style anime art",
          aspectRatio: aspectRatio
        })
      })
      
      console.log('Response status:', response.status)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error || 'Unknown error'}`)
      }
      
      const result = await response.json()
      console.log('Generation successful:', result)
      
      setGeneratedImage(result.imageUrl)
      setCredits(credits - 1)
      
    } catch (error) {
      console.error('Generation failed:', error)
      alert(`Failed to generate image: ${error.message}`)
    } finally {
      setIsGenerating(false)
    }
  }

  // Show loading while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FFF8F4" }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Show sign-in prompt if not authenticated
  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FFF8F4" }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h1>
          <p className="text-gray-600 mb-6">You need to be signed in to generate images.</p>
          <Link href="/sign-in">
            <button
              className="text-white px-6 py-2 rounded-lg font-medium transition-colors hover:opacity-90"
              style={{ backgroundColor: "#405DE9" }}
            >
              Sign In
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#FFF8F4" }}>
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <Link href="/">
            <h1 className="text-2xl font-bold text-gray-900">Glorify</h1>
          </Link>
        </div>

        {/* Style Selection */}
        <div className="flex-1 p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Style</h3>
          <div className="space-y-2">
            <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 mr-3"></div>
              <span className="font-medium text-gray-900">Ghibli</span>
            </div>
          </div>
        </div>

        {/* Credits */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Credits</span>
            <span className="text-lg font-bold text-gray-900">{credits}</span>
          </div>
          <button
            className="w-full text-white py-2 px-4 rounded-lg font-medium text-sm"
            style={{ backgroundColor: "#405DE9" }}
          >
            Upgrade
          </button>
        </div>

        {/* Footer Links */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
            <span>Feedback</span>
          </button>
          <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
            <span>English</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Create Your Ghibli-Style Artwork</h2>
            <p className="text-lg text-gray-600">
              Upload your photo and transform it into stunning Studio Ghibli-style art
            </p>
          </div>

          {/* Upload Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Upload Your Photo</h3>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors cursor-pointer"
              onDragOver={handleUploadDragOver}
              onDrop={handleUploadDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              {uploadedImage ? (
                <div className="max-w-xs mx-auto">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={uploadedImage || "/placeholder.svg"}
                    alt="Uploaded"
                    className="rounded-lg max-w-full h-auto"
                  />
                </div>
              ) : (
                <div>
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">PNG, JPG, or WEBP</p>
                </div>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </div>
          </div>

          {/* Settings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Left Column - Settings */}
            <div className="space-y-6">
              {/* Other Ideas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Other Ideas (Optional)</label>
                <textarea
                  value={otherIdeas}
                  onChange={(e) => setOtherIdeas(e.target.value)}
                  placeholder="Other ideas about how to edit your image"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  maxLength={200}
                />
                <p className="text-xs text-gray-500 mt-1">{otherIdeas.length}/200</p>
              </div>

              {/* Aspect Ratio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Aspect Ratio</label>
                <div className="flex space-x-3">
                  {["3:2", "2:3", "1:1"].map((ratio) => (
                    <button
                      key={ratio}
                      onClick={() => setAspectRatio(ratio)}
                      className={`px-4 py-2 rounded-lg border font-medium ${
                        aspectRatio === ratio
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>

              {/* Settings Toggles */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">No Watermark</span>
                  <button
                    onClick={() => setNoWatermark(!noWatermark)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      noWatermark ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        noWatermark ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Private</span>
                  <button
                    onClick={() => setIsPrivate(!isPrivate)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isPrivate ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isPrivate ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Before/After Comparison with Drag */}
            <div className="relative flex items-center justify-center">
              <div className="w-full max-w-md relative">
                {/* Before/After Labels */}
                <div className="absolute top-3 left-3 z-20">
                  <span className="bg-black/50 text-white px-3 py-1 rounded-lg text-sm font-medium">Original</span>
                </div>
                <div className="absolute top-3 right-3 z-20">
                  <span className="bg-black/50 text-white px-3 py-1 rounded-lg text-sm font-medium">Ghibli Style</span>
                </div>

                <div
                  className={`relative aspect-square rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${
                    isDragging ? "ring-4 ring-purple-400 scale-105" : "hover:shadow-xl"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {/* Background (Ghibli) Image */}
                  <img src={generatedImage || "/image5.jpg"} alt="Ghibli Style" className="absolute inset-0 w-full h-full object-cover" />

                  {/* Foreground (Original) Image with clip */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
                    }}
                  >
                    <img src={uploadedImage || "/original.jpg"} alt="Original" className="w-full h-full object-cover" />
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

                  {/* Drag Overlay */}
                  {isDragging && (
                    <div className="absolute inset-0 bg-purple-500 bg-opacity-70 flex items-center justify-center z-30">
                      <div className="text-center">
                        <Upload className="w-12 h-12 text-white mx-auto mb-4 animate-bounce" />
                        <p className="text-white font-semibold text-lg">Drop to transform!</p>
                        <p className="text-white/80 text-sm">Your photo will replace the original</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Click to Upload Hint */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-sm text-gray-600 hover:text-gray-800 underline"
                  >
                    Click here to upload instead
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section (when image is uploaded) */}
          {uploadedImage && (
            <div className="mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  {/* Original */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Original</p>
                    <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Original"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Generated */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Ghibli Style</p>
                    <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                      {generatedImage ? (
                        <Image
                          src={generatedImage || "/placeholder.svg"}
                          alt="Generated"
                          width={400}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          {isGenerating ? (
                            <div className="text-center">
                              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
                              <p className="text-xs text-gray-600">Generating...</p>
                            </div>
                          ) : (
                            <p className="text-xs text-gray-500 text-center px-2">Generated image will appear here</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Generate Button */}
          <div className="text-center mb-12">
            <button
              onClick={generateImage}
              disabled={!uploadedImage || isGenerating || credits === 0}
              className="px-8 py-4 rounded-lg font-semibold text-white text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto"
              style={{ backgroundColor: "#405DE9" }}
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Generating Ghibli Image...
                </>
              ) : (
                <>
                  Generate Ghibli Image
                  <Zap className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
            {credits > 0 && <p className="text-sm text-gray-600 mt-2">⭐ {credits} credits remaining</p>}
          </div>

          {/* Generated Images Section */}
          {generatedImage && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Your Generated Images</h2>
                <p className="text-sm text-gray-600">Images saved for 7 days. Upgrade to keep forever!</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <div className="w-full mb-3">
                    <Image
                      src={generatedImage || "/placeholder.svg"}
                      alt="Generated"
                      width={400}
                      height={400}
                      className="rounded-lg"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Ghibli Style</span>
                    <button className="text-blue-600 hover:text-blue-700">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}