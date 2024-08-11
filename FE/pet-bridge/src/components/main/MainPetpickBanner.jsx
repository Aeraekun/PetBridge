import React, {useRef, useState, useEffect} from "react"
import petVideo1 from "../../assets/petpick/main1.mp4"
import petVideo2 from "../../assets/petpick/main2.mp4"
import petVideo3 from "../../assets/petpick/main3.mp4"

const MainPetpickBanner = () => {
  const [currentVideo, setCurrentVideo] = useState(0)
  const videoRefs = [useRef(null), useRef(null), useRef(null)]
  const videoSources = [petVideo1, petVideo2, petVideo3]

  const handleEnded = () => {
    setCurrentVideo((prevVideo) => (prevVideo + 1) % videoSources.length)
  }

  useEffect(() => {
    videoRefs.forEach((ref, index) => {
      if (ref.current) {
        ref.current.pause()
        if (index === currentVideo) {
          ref.current.play()
        }
      }
    })
  }, [currentVideo])

  return (
    <div className="mx-auto flex w-[1000px] items-center justify-center gap-12 overflow-hidden">
      {videoSources.map((source, index) => (
        <video
          key={index}
          ref={videoRefs[index]}
          src={source}
          autoPlay={index === 0}
          muted
          controls
          onEnded={handleEnded}
          className="h-auto w-[300px] rounded-lg object-contain"
        />
      ))}
    </div>
  )
}

export default MainPetpickBanner
