import {
  selectCurrentChatId,
  setCurrentChatId,
  setOpponentInfo,
} from "features/chat/chat-slice"
import {useDispatch, useSelector} from "react-redux"
import DefaultUserImage from "assets/image/default_user_150.png"

const ChatListItem = ({
  id,
  opponentImage,
  opponentId,
  opponentNickname,
  recentMessage,
}) => {
  const currentChatId = useSelector(selectCurrentChatId)
  const dispatch = useDispatch()

  //   클릭시 현재 클릭한 채팅창의 대상 id를 상태에 저장
  const clickButtonHandler = () => {
    dispatch(setCurrentChatId(id))
    dispatch(
      setOpponentInfo({
        id: opponentId,
        img: opponentImage,
        nickname: opponentNickname,
      })
    )
  }

  return (
    <button
      onClick={clickButtonHandler}
      className={`hover:bg-point flex h-1/4 w-60 p-2.5 transition-all ${currentChatId === id ? "bg-mild" : null}`}
    >
      <img
        src={opponentImage ? opponentImage : DefaultUserImage}
        alt={opponentId}
        className="size-12 rounded-full"
      />
      <div className="flex grow flex-col truncate px-2 text-left">
        <p className="text-left font-bold">{opponentNickname}</p>
        <p>{recentMessage}</p>
      </div>
    </button>
  )
}

export default ChatListItem
