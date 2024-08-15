import React, {useEffect, useRef, useState} from "react"
import SirenModal from "./SirenModal"

const SelectIcon = ({currentUserId, userId, onDelete}) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false)
  const popoverRef = useRef(null)
  const profileRef = useRef(null)
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }
  const handleOptionIconClick = () => {
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
    <>
      <button
        ref={profileRef}
        className="relative cursor-pointer border-none bg-transparent p-0"
        onClick={handleOptionIconClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleOptionIconClick()
          }
        }}
        aria-haspopup="true"
        aria-expanded={isPopoverVisible}
      >
        <img src="/icons/icon-option.svg" alt="more option" />
        {Number(currentUserId) === Number(userId) ? (
          <div
            ref={popoverRef}
            className={`absolute right-0 top-8 z-40 mt-2 w-28 rounded-md border border-gray-300 bg-white shadow-lg ${isPopoverVisible ? "block" : "hidden"}`}
            role="dialog"
            aria-labelledby="popover-label"
          >
            <button
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={onDelete}
            >
              삭제
            </button>
          </div>
        ) : (
          <div
            ref={popoverRef}
            className={`absolute right-0 top-8 z-40 mt-2 w-28 rounded-md border border-gray-300 bg-white shadow-lg ${isPopoverVisible ? "block" : "hidden"}`}
            role="dialog"
            aria-labelledby="popover-label"
          >
            <button
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => openModal()}
            >
              신고하기
            </button>
            <button
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => alert("채팅하기 클릭됨")}
            >
              채팅하기
            </button>
          </div>
        )}
      </button>
      <SirenModal
        isOpen={modalOpen}
        onClose={closeModal}
        reportType={"USER"}
        reportId={userId}
      />
    </>
  )
}

export default SelectIcon
