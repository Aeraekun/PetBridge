import React, {useRef, useState} from "react"
import image from "../../assets/image/Mainslide2.jpg" // 배경 이미지
import petVideo1 from "../../assets/petpick/main1.mp4"
import playIcon from "../../assets/icons/icon-play.png"
import pauseIcon from "../../assets/icons/icon-stop.png"

const MainUccComponent = () => {
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
    <div
      className="flex h-screen w-screen flex-col items-center justify-start bg-cover bg-center bg-no-repeat pt-16 text-white"
      style={{backgroundImage: `url(${image})`}}
    >
      <div className="mx-auto flex w-full max-w-[1000px] flex-col items-start text-left">
        <p className="mb-5 text-4xl font-bold text-black">
          Team 오작교가 `견우와 직묘` 프로젝트를 소개합니다
        </p>
        <div className="relative mb-5 flex h-[400px] w-[1000px] items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            src={petVideo1}
            muted
            className="size-full rounded-lg object-cover"
          />
          <button
            onClick={togglePlayPause}
            className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center justify-center rounded-full border-none bg-white p-3"
          >
            <img
              src={isPlaying ? pauseIcon : playIcon}
              alt={isPlaying ? "Pause" : "Play"}
              className="size-6"
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default MainUccComponent
