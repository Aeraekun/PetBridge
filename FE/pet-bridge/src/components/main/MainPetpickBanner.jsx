import React, {useRef, useState, useEffect} from "react"
import petVideo1 from "../../assets/petpick/main1.mp4"
import petVideo2 from "../../assets/petpick/main2.mp4"
import petVideo3 from "../../assets/petpick/main3.mp4"
import {getRandomDetailPetPick} from "api/petpicks-api"

const MainPetpickBanner = () => {
  const [currentVideo, setCurrentVideo] = useState(0)
  const videoRefs = [useRef(null), useRef(null), useRef(null)]
  const [list, setList] = useState([]) // list: petpick

  const videoSources = [petVideo1, petVideo2, petVideo3]
  const fetchPetpickData = async () => {
    try {
      const petpicks = await getRandomDetailPetPick()
      if (petpicks) {
        return petpicks
      } else {
        console.error("펫픽비어있음")
      }
    } catch (error) {
      console.error("에러 발생:", error)
      alert("펫픽 데이터 로드 실패")
      return []
    }
  }

  // 초기값 로딩
  useEffect(() => {
    const data = fetchPetpickData()
    if (data) {
      setList(data)
    }
    console.log(list)
  }, [])

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
