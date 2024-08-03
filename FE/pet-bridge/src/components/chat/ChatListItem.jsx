import {selectCurrentChatId, setCurrentChatId} from "features/chat/chat-slice"
import {useDispatch, useSelector} from "react-redux"

const ChatListItem = ({
  id,
  opponentImage,
  opponentId,
  opponentNickname,
  recentMessage,
}) => {
  const currentId = useSelector(selectCurrentChatId)
  const dispatch = useDispatch()

  //   클릭시 현재 클릭한 채팅창의 대상 id를 상태에 저장
  const onClickButton = () => {
    dispatch(setCurrentChatId(id))
  }
  return (
    <button
      onClick={onClickButton}
      className={`flex h-1/4 w-full px-2.5 hover:bg-point ${currentId === id ? "bg-mild" : null}`}
    >
      <img
        src={opponentImage}
        alt={opponentId}
        className="size-12 rounded-full"
      />
      <div className="truncate px-2">
        <p className="font-bold">{opponentNickname}</p>
        <p>{recentMessage}</p>
      </div>
    </button>
  )
}

export default ChatListItem
