import React, {useState, useRef, useEffect} from "react"
import SirenModal from "./SirenModal"
import {useDispatch, useSelector} from "react-redux"
import Swal from "sweetalert2"
import {createChatRoom} from "api/chat-api"
import {selectId, selectIsAuthenticated} from "features/user/users-slice"
import {setCurrentChatId, setIsChatMinimized} from "features/chat/chat-slice"

const Profile = ({isMe, userId, nickname, image, size}) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false)
  const popoverRef = useRef(null)
  const profileRef = useRef(null)
  const [modalOpen, setModalOpen] = useState(false)

  const isAuthenticated = useSelector(selectIsAuthenticated)

  const myId = useSelector(selectId)

  const dispatch = useDispatch()

  const ClickChatHandler = async () => {
    if (!isAuthenticated) {
      openModal()
      return
    }

    const result = await Swal.fire({
      title: `${nickname} 님과의 채팅을 시작하시겠습니까?`,
      showCancelButton: true,
      confirmButtonText: "네",
      confirmButtonColor: "#fe85ac",
      cancelButtonText: "아니요",
      cancelButtonColor: "#a4a2a1",
      customClass: {
        confirmButton: "w-20 py-2 text-white font-semibold rounded-md",
        cancelButton: "w-20 py-2 text-white font-semibold rounded-md",
      },
    })

    if (result.isConfirmed) {
      try {
        const res = await createChatRoom(Number(myId), Number(userId))

        console.log(res)
        dispatch(setCurrentChatId(res.data))

        dispatch(setIsChatMinimized(false))
      } catch (error) {
        console.log(error)
      }
    }
  }

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
              onClick={ClickChatHandler}
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
