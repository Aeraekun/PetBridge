import {useEffect, useRef, useState} from "react"

import OptionIcon from "./OptionIcon"
const Comment = ({data}) => {
  const [isFixedSize, setIsFixedSize] = useState(true)
  // console.log(isFixedSize)
  const handleToggleSize = () => {
    setIsFixedSize(!isFixedSize)
  }

  const [showReadMore, setShowReadMore] = useState(false)
  const contentRef = useRef(null)

  useEffect(() => {
    // 댓글이 지정된 높이를 초과할 때 "더보기" 버튼을 표시
    if (contentRef.current) {
      setShowReadMore(contentRef.current.scrollHeight > 64)
    }
  }, [])

  return (
    <>
      <div className="flex space-x-2.5 px-5 py-2.5">
        <div className="mt-3 h-fit w-12  overflow-hidden rounded-full">
          <img src={data.userImage} alt="profile" className="" />
          {/* <Image imageName={Siren.png}></Image> */}
        </div>
        <div className="w-full ">
          <div className="flex  h-7 items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="  text-base  ">{data.userNickname}</div>
              <div className="  text-sm  ">{data.registTime.split("T")[0]}</div>
            </div>
            <OptionIcon></OptionIcon>
          </div>
          <div className="flex flex-col ">
            <div
              ref={contentRef}
              className={`transition-height w-full pr-3 text-base  duration-300 ease-in-out ${isFixedSize ? "h-12 overflow-hidden" : "h-fit"}`}
            >
              {data.content}
            </div>
            {showReadMore && (
              <button
                className="text-stroke mr-3 mt-1 flex justify-end rounded text-base hover:text-black"
                onClick={handleToggleSize}
              >
                {isFixedSize ? "더보기" : "닫기"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Comment
