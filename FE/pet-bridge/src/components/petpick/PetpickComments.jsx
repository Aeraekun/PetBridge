// import Image from "./Image"
import OptionIcon from "../common/OptionIcon"
import ProfileImage from "assets/image/profile.JPG"
import Comment from "../common/Comment"
import React, {useEffect, useState} from "react"

import {useSelector} from "react-redux"
import {selectIsAuthenticated} from "features/user/users-slice"
import PetpickIconContainer from "components/petpick/PetpickIconContainer"
import PetpickVideo from "./PetpickVideo"
import Navbar from "components/header/Navbar"

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

const PetpickComments = ({data, onVisible}) => {
  // const [petpick, setPetpick] = useState(contextData)
  const petpick = data
  const [commentList, setCommentList] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  //댓글리스트 불러올때 필요

  const fetchComments = async () => {
    const commentList = petpick?.ListPetPickCommentResponseDto || [] // 펫픽 댓글 조회 API
    setCommentList(commentList)
    // console.log(commentList)
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

  useEffect(() => {
    console.log(petpick.ListPetPickCommentResponseDto)
  }, [])

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

  const toggleVisible = (newVisibility) => {
    setIsVisible(newVisibility)
    onVisible(newVisibility)
  }

  return (
    <>
      {isVisible}
      {isVisible && <Navbar />}
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
                toggleVisible={toggleVisible}
              />
              <CommentInput
                boardId={petpick.boardId}
                onCommentAdded={handleCommentAdded}
              />
            </div>
          </div>
        ) : (
          <PetpickIconContainer direct={"col"} />
        )}
      </div>
    </>
  )
}

export default PetpickComments
