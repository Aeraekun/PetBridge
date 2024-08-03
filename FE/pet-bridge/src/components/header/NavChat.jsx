import ChatIcon from "assets/icons/icon-chat.svg"
import {setIsChatModalOpen} from "features/chat/chat-slice"
import {useDispatch} from "react-redux"

const NavChat = () => {
  const dispatch = useDispatch()

  // 클릭시 채팅 모달 열기
  const onClickIcon = () => {
    dispatch(setIsChatModalOpen())
  }

  return (
    // 채팅 모달 버튼 정의
    <button onClick={onClickIcon}>
      <img src={ChatIcon} alt="" className="size-8" />
    </button>
  )
}

export default NavChat
