import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom" // react-router-dom의 Link 컴포넌트 임포트
import scrolldownIcon from "../../assets/icons/icon-scrolldown.gif" // 이름이 잘못된 듯하여 수정

// 슬라이드쇼에 사용할 이미지 배열 및 URL
const images = [
  {src: "/images/Slideshow-animal.png", path: "/shelter/0"},
  {src: "/images/Slideshow-petpick.png", path: "/petpick"},
  {src: "/images/Slideshow-community.png", path: "/communities"},
  {src: "/images/Slideshow-ai.png", path: "/ai"},
  {src: "/images/Slideshow-lostandfound.png", path: "/lost-and-found"},
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
    <div className="relative overflow-hidden ">
      <Link to={images[currentImageIndex].path}>
        <img
          src={images[currentImageIndex].src}
          alt="Slideshow"
          className="h-auto w-full object-contain"
          onError={(e) => {
            e.target.onerror = null // prevent infinite loop
          }}
        />
      </Link>
      <div className="absolute right-2 top-2 flex space-x-2">
        <button
          onClick={goToPrevious}
          className="rounded-full bg-white p-2 shadow-md transition duration-200 hover:bg-gray-100"
        >
          <img src={leftArrow} alt="Previous" className="size-6" />
        </button>
        <button
          onClick={goToNext}
          className="rounded-full bg-white p-2 shadow-md transition duration-200 hover:bg-gray-100"
        >
          <img src={rightArrow} alt="Next" className="size-6" />
        </button>
        <button
          onClick={togglePause}
          className="rounded-full bg-white p-2 shadow-md transition duration-200 hover:bg-gray-100"
        >
          <img
            src={isPaused ? playIcon : pauseIcon}
            alt={isPaused ? "Play" : "Pause"}
            className="size-6"
          />
        </button>
      </div>
      <div className="mt-6 flex justify-center">
        <img src={scrolldownIcon} alt="Scroll down" className="size-8" />
      </div>
    </div>
  )
}

export default MainSlideshow
