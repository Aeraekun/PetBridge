import {
  selectCurrentChatId,
  setCurrentChatId,
  setOpponentInfo,
} from "features/chat/chat-slice"
import {useDispatch, useSelector} from "react-redux"
import DefaultUserImage from "assets/image/default_user_150.png"
import {useEffect, useState} from "react"

const ChatListItem = ({
  id,
  opponentImage,
  opponentId,
  opponentNickname,
  recentMessage,
  recentTime,
}) => {
  const currentChatId = useSelector(selectCurrentChatId)
  const dispatch = useDispatch()
  const [timeAgo, setTimeAgo] = useState("")

  const formatDate = (dateString) => {
    const dateArray = dateString.splice(0, 10).split("-")

    const formattedDateString = `${dateArray[0]}년 ${dateArray[1]}월 ${dateArray[2]}일`

    return formattedDateString
  }

  useEffect(() => {
    const computeTime = (recentTime) => {
      const timeNow = new Date()
      const timeRecent = new Date(recentTime)
      const diffTime = Math.abs(timeNow - timeRecent)
      const diffMins = Math.floor(diffTime / (1000 * 60))
      const diffHrs = Math.floor(diffMins / 60)

      if (diffHrs < 1) {
        return diffMins < 1 ? "방금 전" : `${diffMins}분 전`
      } else if (diffHrs < 24) {
        return `${diffHrs}시간 전`
      } else {
        const diffDays = Math.floor(diffHrs / 24)
        if (diffDays < 7) {
          return `${diffDays}일 전`
        } else {
          const diffWeeks = Math.floor(diffDays / 7)
          if (diffWeeks < 4) {
            return `${diffWeeks}주 전`
          } else {
            return formatDate(recentTime)
          }
        }
      }
    }

    if (recentTime) {
      setTimeAgo(computeTime(recentTime))
    }
  }, [recentTime])

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
      className={`flex h-1/4 w-60 p-2.5 transition-all hover:bg-point ${currentChatId === id ? "bg-mild" : null}`}
    >
      <img
        src={opponentImage ? opponentImage : DefaultUserImage}
        alt={opponentId}
        className="size-12 rounded-full"
        onError={(e) => {
          e.target.src = "/images/profile.jpg" // 이미지 로드 실패 시 기본 이미지로 대체
        }}
      />
      <div className="flex grow flex-col truncate px-2 text-left">
        <div className="flex justify-between">
          <span className="mt-2.5 text-left font-bold">{opponentNickname}</span>
          <span className="text-right text-gray-500">{timeAgo}</span>
        </div>
        <p className="mt-3">{recentMessage}</p>
      </div>
    </button>
  )
}

export default ChatListItem
