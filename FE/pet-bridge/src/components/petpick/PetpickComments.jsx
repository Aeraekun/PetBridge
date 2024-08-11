// import Image from "./Image"
import Comment from "../common/Comment"
import React, {forwardRef, useEffect, useState} from "react"
// import dummydata from "./dummydata"
import {useSelector} from "react-redux"
import {selectId, selectIsAuthenticated} from "features/user/users-slice"
import PetpickIconContainer from "components/petpick/PetpickIconContainer"
import PetpickVideo from "./PetpickVideo"

import {useInView} from "react-intersection-observer"
import Profile from "components/common/Profile"
import {
  getPetpickComments,
  registPetPickComment,
  removePetpickComments,
} from "api/petpicks-api"
import Button from "components/common/Button"
import {getDetailAnimal} from "api/animals-api"
import {useNavigate} from "react-router-dom"
import TagIcon from "components/common/TagIcon"
import TaggedAnimalItem from "./TaggedAnimalItem"
import TaggedArticleItem from "./TaggedArticleItem"

const CommentInput = ({petpickId, onCommentAdded}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const [inputComment, setInputComment] = useState("")

  const sendMsg = async () => {
    const newComment = {
      petPickId: petpickId,
      content: inputComment,
    }
    console.log(newComment)

    try {
      await registPetPickComment(newComment)
      setInputComment("")
      onCommentAdded() //댓글 작성하면 콜백함수 호출
    } catch (e) {
      console.error(e)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault() // 기본 동작 방지
      sendMsg()
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
            onKeyDown={handleKeyDown}
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

const PetpickInfo = ({title, content, registTime}) => {
  return (
    <div className=" flex w-full flex-1 flex-col justify-between space-y-1 p-3 text-base    ">
      <div> {title}</div>
      <div className="text-sm"> {registTime.split("T")[0]}</div>
      <div className="text-sm"> {content}</div>
    </div>
  )
}

const PetpickComments = forwardRef(({pet, nowindex, onInView}, ref) => {
  const {ref: observerRef, inView} = useInView({
    threshold: 0.51, // Trigger when 20% of the item is visible
  })
  const currentUserId = useSelector(selectId)

  const isAuthenticated = useSelector(selectIsAuthenticated)
  useEffect(() => {
    if (inView) {
      onInView(nowindex)
    }
  }, [inView, onInView, nowindex])
  // const [petpick, setPetpick] = useState([])
  // const petpick = []
  const [commentList, setCommentList] = useState([])
  const [articleList, setArticleList] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [isDetail, setIsDetail] = useState(false)
  const [petpickAnimalData, setPetpickAnimalData] = useState([])
  const petpick = pet // prop에서 petpick 데이터 가져오기
  const navigate = useNavigate()

  //댓글리스트 불러올때 필요

  // const status = useSelector(selectPetpickStatus)
  // const error = useSelector(selectPetpickError)

  // const [petpickId, setPetpickId] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (inView) {
      setIsPlaying(true) // 이 컴포넌트가 보이면 비디오 재생
      onInView(nowindex)
    } else {
      setIsPlaying(false) // 이 컴포넌트가 보이지 않으면 비디오 일시 정지
    }
  }, [inView, onInView, nowindex])

  useEffect(() => {
    const fetchAnimalDetail = async (animalId) => {
      const animaldata = await getDetailAnimal(animalId)
      if (animaldata) {
        setPetpickAnimalData(animaldata)
        setArticleList(animaldata.boards)
        console.log(articleList)
        console.log(animaldata.id)
      }
    }
    if (isDetail) {
      fetchAnimalDetail(petpick.animalId)
    }
    console.log(isDetail, "isDetail")
  }, [isDetail])

  const fetchComments = async () => {
    const commentList = await getPetpickComments(petpick.id, 0, 12)
    setCommentList(commentList)
    // console.log(currentUserId)
  }

  useEffect(() => {
    if (isVisible) {
      fetchComments()
      if (isDetail) {
        setIsVisible(false)
      } else {
        setIsDetail(false)
      }
    }
    if (isDetail) {
      setIsVisible(false)
    }
    // console.log(petpick?.comments)
  }, [isVisible, isDetail])

  //댓글 등록하고나서 필요
  const handleCommentAdded = () => {
    console.log("댓글 다시 받아옴")
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
            await removePetpickComments(deleteId) //댓글 삭제 api
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

  const goAnimalDetail = (animal) => {
    console.log(animal)
    const id = animal.desertionNo
    let path = `/shelter/details/${id}`
    navigate(path, {state: {animal}})
  }

  const handleVisible = () => {
    console.log("visible", isVisible)
    setIsVisible((prev) => !prev)
  }
  const handleDetail = () => {
    console.log("handleDetail", isDetail)
    setIsDetail((prev) => !prev)
  }
  const goWritePetpick = () => {
    let path = `/petpick/write`
    navigate(path)
  }
  const goDetail = (article) => {
    const id = article.id
    let path = `/communities/details/${id}`
    navigate(path)
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
      <PetpickVideo videoURL={petpick.video} isPlaying={isPlaying} />
      {isDetail && (
        <>
          <div className="flex h-full min-w-[400px]  flex-col justify-between bg-gray-50 ">
            <div className=" flex h-full flex-col justify-start bg-gray-50 ">
              <div className=" ">
                <Profile
                  nickname={petpick.userNickname}
                  image={petpick.userImage}
                />
                <hr className="my-1 border-gray-300" />
              </div>
              <Button onClick={goWritePetpick} text={"새팻픽만들기"}>
                {" "}
              </Button>
              <TaggedAnimalItem
                animal={petpickAnimalData}
                isFollowing={petpick.isFollowing}
                isLogin={isAuthenticated}
                onClick={goAnimalDetail}
              />
              관련 글
              <div className="overflow-auto">
                {articleList?.length > 0 ? (
                  articleList.map((article, index) => (
                    <li key={index}>
                      <TaggedArticleItem data={article} onClick={goDetail} />
                    </li>
                  ))
                ) : (
                  <li>게시글이 없습니다</li>
                )}
              </div>
            </div>
            <TagIcon data={petpick} onClick={handleDetail} />
          </div>
        </>
      )}
      {isVisible && (
        <div className="flex h-full min-w-[400px]  flex-col justify-between bg-gray-50 ">
          <div className=" ">
            <Profile
              nickname={petpick.userNickname}
              image={petpick.userImage}
            />
            <hr className="my-1 border-gray-300" />
            <PetpickInfo
              title={petpick.title}
              content={petpick.content}
              registTime={petpick.registTime}
            ></PetpickInfo>
          </div>

          <ul className="flex flex-auto flex-col-reverse overflow-auto">
            {commentList.length > 0 ? (
              commentList.map((comment, index) => (
                <li key={index}>
                  <Comment
                    data={comment}
                    onDelete={handleDelete}
                    currentUserId={currentUserId}
                  />
                </li>
              ))
            ) : (
              <li>댓글이 없습니다</li>
            )}
          </ul>
          <div className="flex  flex-col space-y-2.5">
            <PetpickIconContainer
              direct={"row"}
              toggleComment={handleVisible}
              toggleDetail={handleDetail}
              petpickId={petpick.boardId}
              isFollowing={petpick.isFollowing}
              isLiking={petpick.isLiking}
              isLogin={isAuthenticated}
              animalId={petpick.animalId}
            />
            <CommentInput
              petpickId={petpick.id}
              onCommentAdded={handleCommentAdded}
            />
          </div>
        </div>
      )}
      {!isVisible && !isDetail ? (
        <PetpickIconContainer
          direct={"col"}
          toggleComment={handleVisible}
          toggleDetail={handleDetail}
          petpickId={petpick.id}
          animalId={petpick.animalId}
          isFollowing={petpick.isFollowing}
          isLiking={petpick.isLiking}
          isLogin={isAuthenticated}
        />
      ) : (
        <></>
      )}
    </div>
  )
})
PetpickComments.displayName = "PetpickComments"

export default PetpickComments
