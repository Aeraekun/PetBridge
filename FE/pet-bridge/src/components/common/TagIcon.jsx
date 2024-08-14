import React, {useEffect, useState} from "react"

const TagIcon = ({onClick}) => {
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowMessage((prev) => !prev) // 메시지 토글
    }, 3000) // 2초마다 토글

    return () => clearInterval(interval) // 컴포넌트 언마운트 시 타이머 클리어
  }, [])

  const handleClick = () => {
    onClick()
    console.log("click")
  }

  return (
    <>
      {/* <button onClick={handleClick} className=" ">
        <img src="/icons/icon-tag.svg" alt="Tag Icon" />
        
        {showMessage && (
          <div className="absolute bottom-4 left-1/2 w-64 -translate-x-1/2 rounded bg-gray-400 px-4 py-2 text-sm text-white opacity-80 shadow-lg transition-opacity duration-700">
          URL이 클립보드에 복사되었습니다!
          </div>
          )}
          </button> */}
      <button
        onClick={handleClick}
        className="relative flex items-center space-x-2"
      >
        <img src="/icons/icon-tag.svg" alt="Tag Icon" />
        <div
          className={`absolute left-1 w-[200px] transition-opacity duration-500 ease-in-out ${
            showMessage ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className=" bg-lime-100 text-lime-800 rounded-md px-2 py-1 text-sm">
            동물의 정보를 확인해보세요!
          </span>
        </div>
      </button>
    </>
  )
}

export default TagIcon
