// import Image from "./Image"
import OptionIcon from "../common/OptionIcon"
import ProfileImage from "assets/image/profile.JPG"
import Comment from "../common/Comment"
import React, {useEffect, useState} from "react"
import dummydata from "./dummydata"
import {useDispatch, useSelector} from "react-redux"
import {selectIsAuthenticated} from "features/user/users-slice"
import PetpickIconContainer from "components/petpick/PetpickIconContainer"
import PetpickVideo from "./PetpickVideo"
import {
  // fetchPetpickList,
  selectPetpickData,
  setNowPetpick,
  // selectPetpickStatus,
  // selectPetpickError,
} from "features/petpick/petpick-slice"

const Profile = (data) => {
  return (
    <div className="mx-3  flex h-16 items-center space-x-2.5 ">
      <div className="flex h-fit w-full items-center justify-between text-xl    ">
        <div className="flex items-center space-x-2.5">
          <div className="h-fit w-12 text-xl   ">
            <img src={ProfileImage} alt="profile" />
            {/* <Image imageName={Siren.png}></Image> */}
          </div>
          <div className="text-sm  ">{data.nickname}닉네임</div>
        </div>
        <OptionIcon></OptionIcon>
      </div>
    </div>
  )
}

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
            className="mx-2 h-10 w-full rounded-md text-sm  outline outline-1 outline-stroke"
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
          <div className="mx-2 h-10 w-full content-center rounded-md  text-sm text-stroke outline outline-1 outline-stroke">
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

const PetpickComments = () => {
  // const [petpick, setPetpick] = useState([])
  // const petpick = []
  const [commentList, setCommentList] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  //댓글리스트 불러올때 필요

  const dispatch = useDispatch()
  const petpick = useSelector(selectPetpickData) // 상태에서 petpick 데이터 가져오기
  // const status = useSelector(selectPetpickStatus)
  // const error = useSelector(selectPetpickError)

  // const [petpickId, setPetpickId] = useState(0)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    console.log("받아온정보", petpick)
  }, [isVisible])

  useEffect(() => {
    setIndex(index + 1)
    // setPetpickId(dummydata[index])
    dispatch(setNowPetpick(dummydata[index]))
  }, [])

  const fetchComments = async () => {
    const commentList = petpick?.comments || [] // 펫픽 댓글 조회 API
    setCommentList(commentList)
    console.log(commentList)
    // console.log("comment", petpick.ListPetPickCommentResponseDto)
  }

  // useEffect(() => {
  //   const storedPetpickData = localStorage.getItem("petpickData")
  //   if (storedPetpickData) {
  //     console.log("getItem")
  //     const parsedData = JSON.parse(storedPetpickData)
  //     setPetpick(parsedData)
  //   } else if (contextData) {
  //     console.log("setItem")
  //     localStorage.setItem("petpickData", JSON.stringify(contextData))
  //   }
  // }, [contextData])

  useEffect(() => {
    if (petpick) {
      fetchComments()
    }
    console.log(petpick?.ListPetPickCommentResponseDto)
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
    <>
      {/* {isVisible && <Navbar />} */}
      <div className="mx-auto flex h-screen w-[1000px] flex-row justify-center sm:w-11/12">
        <PetpickVideo />
        {isVisible ? (
          <div className="flex h-full min-w-[400px]  flex-col justify-between bg-gray-50 ">
            <div className=" flex-1">
              <Profile nickname={"dd"} image={"ddd"} />
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
          />
        )}
      </div>
    </>
  )
}

export default PetpickComments
