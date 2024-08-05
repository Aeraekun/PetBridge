import React, {useState, useEffect} from "react"

// 슬라이드쇼에 사용할 이미지 배열
const images = [
  "/images/cat.jpg",
  "/images/dog.jpg",
  "/images/dog-illust.jpg",
  // 추가 이미지
]

// 버튼에 사용할 이미지 경로
const leftArrow = "/icons/icon-left.png"
const rightArrow = "/icons/icon-right.png"
const playIcon = "/icons/icon-play.png"
const pauseIcon = "/icons/icon-stop.png"

const MainSlideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
      }, 3000) // 3000ms마다 이미지 변경

      return () => clearInterval(interval) // 컴포넌트 언마운트 시 인터벌 정리
    }
  }, [isPaused])

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const togglePause = () => {
    setIsPaused((prev) => !prev)
  }

  return (
    <div className="relative h-[400px] w-[1000px] overflow-hidden">
      <img
        src={images[currentImageIndex]}
        alt="Slideshow"
        className="size-full object-contain"
        onError={(e) => {
          e.target.onerror = null // prevent infinite loop
        }}
      />
      <div className="absolute right-2 top-2 flex space-x-2">
        <button onClick={goToPrevious} className="bg-white p-2">
          <img src={leftArrow} alt="Previous" className="size-6" />
        </button>
        <button onClick={goToNext} className="bg-white p-2">
          <img src={rightArrow} alt="Next" className="size-6" />
        </button>
        <button onClick={togglePause} className="bg-white p-2">
          <img
            src={isPaused ? playIcon : pauseIcon}
            alt={isPaused ? "Play" : "Pause"}
            className="size-6"
          />
        </button>
      </div>
    </div>
  )
}

export default MainSlideshow
