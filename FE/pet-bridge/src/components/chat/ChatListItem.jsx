import {selectCurrentChatId, setCurrentChatId} from "features/chat/chat-slice"
import {useDispatch, useSelector} from "react-redux"

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
  }
  return (
    <button
      onClick={clickButtonHandler}
      className={`flex h-1/6 w-48 p-2.5 transition-all hover:scale-105 hover:bg-point ${currentChatId === id ? "bg-mild" : null}`}
    >
      <img
        src={opponentImage}
        alt={opponentId}
        className="size-12 rounded-full"
      />
      <div className="flex flex-col truncate px-2">
        <p className="font-bold">{opponentNickname}</p>
        <p>{recentMessage}</p>
      </div>
    </button>
  )
}

export default ChatListItem
