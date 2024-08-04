// import Image from "./Image"
import Comment from "../common/Comment"
import React, {forwardRef, useEffect, useState} from "react"
// import dummydata from "./dummydata"
import {useDispatch, useSelector} from "react-redux"
import {selectIsAuthenticated} from "features/user/users-slice"
import PetpickIconContainer from "components/petpick/PetpickIconContainer"
import PetpickVideo from "./PetpickVideo"

import {
  // fetchPetpickList,
  setNowPetpick,
  // selectPetpickStatus,
  // selectPetpickError,
} from "features/petpick/petpick-slice"
import {useInView} from "react-intersection-observer"
import Profile from "components/common/Profile"

const CommentInput = ({boardId, onCommentAdded}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated)

  const [inputComment, setInputComment] = useState("")
  const sendMsg = async () => {
    console.log({inputComment})
    const newComment = {
      boardId: boardId,
      content: inputComment,
    }

    try {
      // await registPetPick(newComment)
      setInputComment("")
      onCommentAdded() //댓글 작성하면 콜백함수 호출
      alert("댓글 등록 완료", newComment)
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <div className="flex h-16 flex-col justify-between space-x-2.5 ">
      {isAuthenticated ? (
        <div className="flex items-center space-x-2.5">
          <input
            type="text"
            className="outline-stroke mx-2 h-10 w-full rounded-md  text-sm outline outline-1"
            placeholder="댓글을 남겨보세요"
            value={inputComment}
            onChange={(e) => setInputComment(e.target.value)}
          />
          <button className="h-10   w-12" onClick={sendMsg}>
            <img src="/icons/icon-send.svg" alt="sendIcon" />
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-2.5">
          <div className="text-stroke outline-stroke mx-2 h-10 w-full  content-center rounded-md text-sm outline outline-1">
            좋아요와 댓글을 남기려면 로그인하세요{" "}
          </div>
        </div>
      )}
    </div>
  )
}

const PetpickInfo = ({title, content}) => {
  return (
    <div className=" flex w-full flex-1 flex-col justify-between space-y-1 p-3 text-base    ">
      <div> {title}</div>
      <div className="text-sm"> {content}</div>
    </div>
  )
}

const PetpickComments = forwardRef(({pet, nowindex, onInView}, ref) => {
  const {ref: observerRef, inView} = useInView({
    threshold: 0.51, // Trigger when 20% of the item is visible
  })

  useEffect(() => {
    if (inView) {
      onInView(nowindex)
    }
  }, [inView, onInView, nowindex])
  // const [petpick, setPetpick] = useState([])
  // const petpick = []
  const [commentList, setCommentList] = useState([])
  const [isVisible, setIsVisible] = useState(false)

  const dispatch = useDispatch()
  const petpick = pet // 상태에서 petpick 데이터 가져오기
  //댓글리스트 불러올때 필요

  // const status = useSelector(selectPetpickStatus)
  // const error = useSelector(selectPetpickError)

  // const [petpickId, setPetpickId] = useState(0)

  useEffect(() => {}, [isVisible])

  useEffect(() => {
    dispatch(setNowPetpick(pet))
  }, [])

  const fetchComments = async () => {
    const commentList = petpick?.comments || [] // 펫픽 댓글 조회 API
    setCommentList(commentList)
  }

  useEffect(() => {
    if (petpick) {
      fetchComments()
    }
    // console.log(petpick?.comments)
  }, [petpick])

  //댓글 등록하고나서 필요
  const handleCommentAdded = () => {
    fetchComments() // 댓글 등록 후 댓글 리스트를 다시 가져옴
  }

  // 댓글이 삭제된경우
  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
    if (deleteId !== null) {
      const goRemoveComment = async () =>
        //id
        {
          try {
            //  await removeBoardComment(id) //댓글 삭제 api
            setDeleteId(null) // 삭제 후 deleteId 초기화
            fetchComments() // 삭제 후 댓글 목록 다시 가져오기
          } catch (e) {
            console.error(e)
          }
        }
      goRemoveComment(deleteId)
    }
  }, [deleteId])

  const handleDelete = (id) => {
    setDeleteId(id)
  }

  if (!petpick) {
    return <div>Loading...</div>
  }

  const handleVisible = () => {
    console.log("visible", isVisible)
    setIsVisible((prev) => !prev)
  }

  return (
    <div
      className=" z-50 mx-auto flex h-screen w-[1000px] snap-center flex-row justify-center py-[50px] sm:w-11/12"
      ref={(node) => {
        if (node) {
          if (ref && typeof ref === "object" && "current" in ref) {
            ref.current = node
          }
        }
        observerRef(node)
      }}
    >
      <PetpickVideo videoURL={petpick.video} />
      {isVisible ? (
        <div className="flex h-full min-w-[400px]  flex-col justify-between bg-gray-50 ">
          <div className=" flex-1">
            <Profile nickname={"SD"} image={"ddd"} />
            <hr className="my-1 border-gray-300" />
            <PetpickInfo
              title={petpick.title}
              content={"data.content"}
            ></PetpickInfo>
          </div>

          <ul className="flex-auto overflow-auto ">
            {commentList.length > 0 ? (
              commentList.map((comment, index) => (
                <li key={index}>
                  <Comment data={comment} onDelete={handleDelete} />
                </li>
              ))
            ) : (
              <li>댓글이 없습니다</li>
            )}
          </ul>
          <div className="flex flex-1 flex-col space-y-2.5">
            <PetpickIconContainer
              direct={"row"}
              toggleComment={handleVisible}
              petpickId={petpick.boardId}
              isFollowing={petpick.isFollowing}
              isLiking={petpick.isLiking}
            />
            <CommentInput
              boardId={petpick.boardId}
              onCommentAdded={handleCommentAdded}
            />
          </div>
        </div>
      ) : (
        <PetpickIconContainer
          direct={"col"}
          toggleComment={handleVisible}
          petpickId={petpick.boardId}
          isFollowing={petpick.isFollowing}
          isLiking={petpick.isLiking}
        />
      )}
    </div>
  )
})
PetpickComments.displayName = "PetpickComments"

export default PetpickComments
