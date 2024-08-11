import React from "react"
import slideImage from "../../assets/image/Mainslide1.png"
// 스크롤 아이콘 이미지 임포트
import scrollIcon from "../../assets/icons/icon-scrolldown.gif" // 이미지 경로 수정 필요

const MainComponent = () => {
  return (
    <div
      className="flex h-screen flex-col items-center justify-center bg-cover bg-center bg-no-repeat text-white"
      style={{backgroundImage: `url(${slideImage})`}}
    >
      <img
        src={scrollIcon}
        alt="Scroll Icon"
        className="absolute bottom-5 left-1/2 size-10 -translate-x-1/2 opacity-70"
      />
    </div>
  )
}

export default MainComponent
