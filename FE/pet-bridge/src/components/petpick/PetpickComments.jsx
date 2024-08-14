// import Image from "./Image"
import Comment from "../common/Comment"
import React, {forwardRef, useEffect, useRef, useState} from "react"
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
    // console.log(newComment)

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
    <div className="flex h-16 flex-col justify-between space-x-2  pr-3">
      {isAuthenticated ? (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="mx-2 h-10 w-full rounded-md text-sm  outline outline-1 outline-stroke"
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
          <div className="mx-2 h-10 w-full content-center rounded-md  text-sm text-stroke outline outline-1 outline-stroke">
            좋아요와 댓글을 남기려면 로그인하세요{" "}
          </div>
        </div>
      )}
    </div>
  )
}

const PetpickInfo = ({title, content, registTime}) => {
  const [isFixedSize, setIsFixedSize] = useState(true)

  const [showReadMore, setShowReadMore] = useState(false)
  const contentRef = useRef(null)
  // console.log(isFixedSize)
  const handleToggleSize = () => {
    setIsFixedSize(!isFixedSize)
  }
  useEffect(() => {
    // 댓글이 지정된 높이를 초과할 때 "더보기" 버튼을 표시
    if (contentRef.current) {
      setShowReadMore(contentRef.current.scrollHeight > 64)
    }
  }, [])

  return (
    <div className=" flex w-full flex-1 flex-col justify-between space-y-1 p-3 text-lg">
      <div className="flex justify-between pr-2">
        <div className="font-semibold"> {title}</div>
        <div className="text-sm"> {registTime.split("T")[0]}</div>
      </div>
      <div className="flex flex-col ">
        <div
          ref={contentRef}
          className={`transition-height w-full pr-3 text-base  duration-300 ease-in-out ${isFixedSize ? "h-12 overflow-hidden" : "h-fit"}`}
        >
          {content}
        </div>
        {showReadMore && (
          <button
            className="mr-3 mt-1 flex justify-end rounded text-base text-stroke hover:text-black"
            onClick={handleToggleSize}
          >
            {isFixedSize ? "더보기" : "닫기"}
          </button>
        )}
      </div>
    </div>
  )
}

const PetpickComments = forwardRef(({pet, nowindex, onInView}, ref) => {
  const {ref: observerRef, inView} = useInView({
    threshold: 0.51, // Trigger when 20% of the item is visible
  })
  const currentUserId = useSelector(selectId)

  const isAuthenticated = useSelector(selectIsAuthenticated)
  // const [petpick, setPetpick] = useState([])
  // const petpick = []
  const [commentList, setCommentList] = useState([])
  const [articleList, setArticleList] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [isDetail, setIsDetail] = useState(false)
  const [petpickAnimalData, setPetpickAnimalData] = useState([])
  const [petpick, setPetpick] = useState(pet) // prop에서 petpick 데이터 가져오기
  const navigate = useNavigate()

  useEffect(() => {
    console.log(
      "comment isFollowing : ",
      pet.isFollowing,
      "  isLiking : ",
      pet.isLiking
    )
  }, [petpick])
  //댓글리스트 불러올때 필요

  // const status = useSelector(selectPetpickStatus)
  // const error = useSelector(selectPetpickError)

  // const [petpickId, setPetpickId] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (inView) {
      console.log("petpick", petpick) // 여기까진 바뀐걸 가져옴
      setIsPlaying(true) // 이 컴포넌트가 보이면 비디오 재생
      onInView(nowindex)
      setPetpick(pet)
    } else {
      setIsPlaying(false) // 이 컴포넌트가 보이지 않으면 비디오 일시 정지
    }
  }, [inView, nowindex])

  // useEffect(() => {
  // }, [inView])

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
    // console.log(isDetail, "isDetail")
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

  const goDetail = (article) => {
    const id = article.id
    let path = `/communities/details/${id}`
    navigate(path)
  }

  return (
    <div
      className=" z-50 mx-auto flex h-screen w-[1000px] snap-center flex-row justify-center pb-[100px] pt-[10px]"
      ref={(node) => {
        if (node) {
          if (ref && typeof ref === "object" && "current" in ref) {
            ref.current = node
          }
        }
        observerRef(node)
      }}
    >
      {/* <div className=`flex w-fit overflow-hidden rounded-3xl  {!isVisible && !isDetail && border}`> */}
      <div
        className={`flex w-full overflow-hidden rounded-2xl ${isVisible || isDetail ? "border" : ""}`}
      >
        <PetpickVideo
          title={petpick.title}
          content={petpick.content}
          videoURL={petpick.video}
          isPlaying={isPlaying}
        />
        {
          //태그 정보 페이지
          isDetail && (
            <>
              <div
                className={`duration-800 flex size-full h-full min-w-[300px]  max-w-[400px] flex-col justify-between transition-transform ease-in-out${
                  isDetail
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-full opacity-0"
                }`}
              >
                <div className=" flex h-full flex-col justify-start  ">
                  <div className="border-b px-2">
                    <Profile
                      nickname={petpick.userNickname}
                      image={petpick.userImage}
                      size={"small"}
                    />
                  </div>
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
                          <TaggedArticleItem
                            data={article}
                            onClick={goDetail}
                          />
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
          )
        }

        {
          //댓글창 켰을때
          isVisible && (
            <div className="flex size-full min-w-[300px] max-w-[400px] flex-col justify-between ">
              <div className="border-b px-2">
                <Profile
                  nickname={petpick.userNickname}
                  image={petpick.userImage}
                  size={"small"}
                />
              </div>
              <div className="border-b p-1">
                <PetpickInfo
                  title={petpick.title}
                  content={petpick.content}
                  registTime={petpick.registTime}
                ></PetpickInfo>
              </div>

              <ul className="custom-scrollbar flex grow flex-col overflow-auto border-b">
                {
                  //댓글 리스트
                  commentList.length > 0 ? (
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
                  )
                }
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
          )
        }
        {
          //아무것도 안켯을때
          !isVisible && !isDetail ? (
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
          )
        }
      </div>
    </div>
  )
})
PetpickComments.displayName = "PetpickComments"

export default PetpickComments
