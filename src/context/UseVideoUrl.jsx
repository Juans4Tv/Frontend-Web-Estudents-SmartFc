import { createContext, useState, useContext } from 'react'

export const videoUrlContext = createContext()

export const useVideoUrl = () => {
  const context = useContext(videoUrlContext)
  if (!context) throw new Error('There is no Info provider')
  return context
}

export function VideoUrlProvider({ children }) {
  const [videoUrl, setVideoUrl] = useState('')
  return (
    <videoUrlContext.Provider value={{ videoUrl, setVideoUrl }}>
      {children}
    </videoUrlContext.Provider>
  )
}