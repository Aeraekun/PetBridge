import React, {useRef, useState} from "react"
import petVideo1 from "../../assets/petpick/main1.mp4"
import playIcon from "../../assets/icons/icon-play.png"
import pauseIcon from "../../assets/icons/icon-stop.png"

const MainUccBanner = () => {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <>
      <p className="p-4 text-4xl font-bold">UCC가 담겨질 공간입니다.</p>
      <div className="relative mx-auto flex w-[1000px] items-center justify-center gap-2 overflow-hidden">
        <video
          ref={videoRef}
          src={petVideo1}
          muted
          className="h-auto w-[300px] rounded-lg object-contain"
        />
        <button
          onClick={togglePlayPause}
          className="absolute bottom-4 flex items-center justify-center rounded-full bg-white p-3"
          style={{left: "50%", transform: "translateX(-50%)"}}
        >
          <img
            src={isPlaying ? pauseIcon : playIcon}
            alt={isPlaying ? "Pause" : "Play"}
            className="size-6"
          />
        </button>
      </div>
    </>
  )
}

export default MainUccBanner
