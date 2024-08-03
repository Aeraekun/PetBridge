import {
  selectIsChatModalOpen,
  setIsChatModalOpen,
} from "features/chat/chat-slice"
import Draggable from "react-draggable"
import {useDispatch, useSelector} from "react-redux"

const ChatModal = () => {
  const isOpen = useSelector(selectIsChatModalOpen)
  const dispatch = useDispatch()
  const onClickXHandler = () => {
    dispatch(setIsChatModalOpen())
  }

  return (
    <div>
      {isOpen ? (
        <div className="fixed right-10 top-20">
          <Draggable className="fixed right-10 top-20" handle=".bg-stroke">
            {/* 전체 틀 */}
            <div className="flex h-[450px] w-[700px] flex-col divide-y overflow-hidden rounded-2xl border bg-white">
              {/* 채팅 헤더 */}
              <div className="flex h-10 flex-row-reverse bg-stroke px-5">
                <button onClick={onClickXHandler} className="hover:text-alert">
                  X
                </button>
              </div>
              {/*  */}
              <div></div>
            </div>
          </Draggable>
        </div>
      ) : null}
    </div>
  )
}

export default ChatModal
