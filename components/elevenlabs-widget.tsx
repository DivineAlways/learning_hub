"use client"

import { useEffect } from "react"

export function ElevenLabsWidget() {
  useEffect(() => {
    // Load the ElevenLabs ConvAI script
    const script = document.createElement("script")
    script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed"
    script.async = true
    script.type = "text/javascript"

    // Add script to document head
    document.head.appendChild(script)

    // Cleanup function to remove script when component unmounts
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  return <elevenlabs-convai agent-id="5V3UCGiQ1CiIhAzzGM5h"></elevenlabs-convai>
}
