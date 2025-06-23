import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    console.log('API endpoint hit')
    
    const { image, prompt } = await request.json()
    
    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }

    console.log('Converting image to Ghibli style with Replicate...')

    // Create prediction with Replicate using the better Ghibli model
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: "6c4785d791d08ec65ff2ca5e9a7a0c2b0ac4e07ffadfb367231aa16bc7a52cbb", // Better Ghibli model
        input: {
          seed: -1,
          prompt: prompt || "Ghibli Studio style, Charming hand-drawn anime-style illustration",
          input_image: image,
          lora_weight: 1,
          guidance_scale: 3.5,
          num_inference_steps: 25
        }
      })
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Replicate API error')
    }

    const prediction = await response.json()
    console.log('Prediction created:', prediction.id)

    // Poll for completion
    let result = prediction
    let attempts = 0
    const maxAttempts = 90 // 1.5 minute timeout

    while (result.status !== 'succeeded' && result.status !== 'failed' && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      attempts++
      
      const pollResponse = await fetch(`https://api.replicate.com/v1/predictions/${result.id}`, {
        headers: {
          'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
        }
      })
      
      if (!pollResponse.ok) {
        throw new Error('Failed to poll prediction status')
      }
      
      result = await pollResponse.json()
      console.log(`Polling attempt ${attempts}, status: ${result.status}`)
    }
    
    if (result.status === 'failed') {
      throw new Error(result.error || 'Image generation failed')
    }

    if (result.status !== 'succeeded') {
      throw new Error('Generation timed out')
    }

    console.log('Image conversion complete')

    return NextResponse.json({ 
      imageUrl: result.output
    })
    
  } catch (error) {
    console.error('Replicate API Error:', error)
    return NextResponse.json({ 
      error: `Image conversion failed: ${error.message}` 
    }, { status: 500 })
  }
}