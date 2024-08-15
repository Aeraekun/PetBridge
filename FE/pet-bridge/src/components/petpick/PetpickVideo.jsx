import React, {useState, useEffect} from "react"
import ReactPlayer from "react-player"

const PetpickVideo = ({title, content, videoURL, isPlaying}) => {
  const [showOverlay, setShowOverlay] = useState(true)

  useEffect(() => {
    let timer

    if (isPlaying) {
      // 동영상이 시작될 때 3초 후에 오버레이를 숨깁니다.
      timer = setTimeout(() => {
        setShowOverlay(false)
      }, 3000) // 3초 후에 overlay 숨기기
    } else {
      // 동영상이 일시정지되거나 멈추면 오버레이를 다시 표시합니다.
      setShowOverlay(true)
    }

    return () => clearTimeout(timer) // 컴포넌트 언마운트 시 타이머 클리어
  }, [isPlaying]) // isPlaying이 변경될 때마다 useEffect가 실행됩니다.

  return (
    <div className="group relative min-h-[600px] min-w-[200px] max-w-[350px] overflow-hidden rounded-2xl bg-black hover:opacity-100">
      <ReactPlayer
        url={videoURL}
        controls={true}
        playing={isPlaying}
        width="100%"
        height="100%"
      />
      <div
        className={`absolute bottom-[80px] left-0 z-40 h-[100px] w-full p-4 transition-opacity duration-300 ease-in-out ${
          showOverlay ? "opacity-100" : "opacity-0"
        } bg-gradient-to-t to-transparent group-hover:opacity-100`}
      >
        <div
          className={`transition-max-height text-white duration-300 ease-in-out ${
            showOverlay ? "max-h-[100px]" : "max-h-0"
          } overflow-hidden`}
        >
          <div className="absolute ">
            <h2 className="mb-1 truncate text-lg font-bold">{title}</h2>
            <p className="truncate text-sm">{content}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PetpickVideo
