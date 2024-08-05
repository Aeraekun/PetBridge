const MessageItem = ({isMyMessage, content, registTime}) => {
  const timeHMS = registTime.slice(11)
  // 내가 보낸 메세지와, 상대가 보낸 메세지를 구분 (isMyMessage)
  return (
    <div className={`flex space-x-2 ${isMyMessage && "flex-row-reverse"}`}>
      <div
        className={`max-w-xs rounded-2xl bg-mild p-3 ${isMyMessage && "bg-yellow"}`}
      >
        {content}
      </div>
      <div className="flex flex-col-reverse text-gray-300">{timeHMS}</div>
    </div>
  )
}

export default MessageItem
