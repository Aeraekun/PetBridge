import React, {useState, useRef, useEffect} from "react"
import SirenModal from "./SirenModal"

const Profile = ({isMe, userId, nickname, image, size}) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false)
  const popoverRef = useRef(null)
  const profileRef = useRef(null)
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => {
    console.log(isMe)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }
  const handleProfileClick = () => {
    setIsPopoverVisible(!isPopoverVisible)
  }
  useEffect(() => {
    //밖을 클릭하면 없어짐
    const handleClickOutside = (event) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        !profileRef.current.contains(event.target)
      ) {
        setIsPopoverVisible(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative flex h-12 w-fit items-center justify-start space-x-2.5">
      <button
        ref={profileRef}
        className="cursor-pointer border-none bg-transparent p-0"
        onClick={handleProfileClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleProfileClick()
          }
        }}
        aria-haspopup="true"
        aria-expanded={isPopoverVisible}
      >
        <img
          src={image || "/images/profile.jpg"}
          alt="프로필사진"
          className={`${size === "small" ? "size-8" : "size-12"} rounded-full border`}
          onError={(e) => {
            e.target.src = "/images/profile.jpg" // 이미지 로드 실패 시 기본 이미지로 대체
          }}
        />
      </button>
      <div className="relative flex-1">
        <button
          className={`${size === "small" ? "" : "text-lg font-semibold"} `}
          ref={profileRef}
          onClick={handleProfileClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleProfileClick()
            }
          }}
        >
          {nickname}
        </button>
        {!isMe && (
          <div
            ref={popoverRef}
            className={`bottom-30 absolute left-0 z-40 mt-2 w-48 rounded-md border border-gray-300 bg-white shadow-lg ${isPopoverVisible ? "block" : "hidden"}`}
            role="dialog"
            aria-labelledby="popover-label"
          >
            <button
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => openModal()}
            >
              신고하기
            </button>
            <SirenModal
              isOpen={modalOpen}
              onClose={closeModal}
              reportType={"USER"}
              reportId={userId}
            />
            <button
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => alert("채팅하기 클릭됨")}
            >
              채팅하기
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
