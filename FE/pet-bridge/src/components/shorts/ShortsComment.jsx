import dummydata from "./dummydata"
// import Image from "./Image"
import OptionIcon from "../common/OptionIcon"
import HeartIcon from "../common/HeartIcon"
import SirenIcon from "../common/SirenIcon"
import ShareIcon from "../common/ShareIcon"
import CommentIcon from "../common/CommentIcon"
import ProfileImage from "assets/image/profile.JPG"
import FollowIcon from "../common/FollowIcon"
import TagIcon from "../common/TagIcon"
import React, {useState, useRef, useEffect} from "react"

const Comment = ({data}) => {
  const [isFixedSize, setIsFixedSize] = useState(true)
  // console.log(isFixedSize)
  const handleToggleSize = () => {
    setIsFixedSize(!isFixedSize)
  }

  const [showReadMore, setShowReadMore] = useState(false)
  const contentRef = useRef(null)

  useEffect(() => {
    console.log(contentRef.current.scrollHeight)
    // 댓글이 지정된 높이를 초과할 때 "더보기" 버튼을 표시
    if (contentRef.current) {
      setShowReadMore(contentRef.current.scrollHeight > 64)
    }
  }, [])

  return (
    <>
      <div className="flex space-x-2.5 px-5 py-2.5">
        <div className="mt-3 h-fit w-12  ">
          <img src={ProfileImage} alt="profile" />
          {/* <Image imageName={Siren.png}></Image> */}
        </div>
        <div className="w-full ">
          <div className="flex  h-7 items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="  text-sm  ">{data.nickname}</div>
              <div className="  text-xs  ">
                {data.regist_time.split("T")[0]}
              </div>
            </div>
            <OptionIcon></OptionIcon>
          </div>
          <div className="flex flex-col ">
            <div
              ref={contentRef}
              className={`transition-height w-full pr-3 text-sm  duration-300 ease-in-out ${isFixedSize ? "h-10 overflow-hidden" : "h-fit"}`}
            >
              {data.content}
            </div>
            {showReadMore && (
              <button
                className="text-stroke mr-3 mt-1 flex justify-end rounded text-sm hover:text-black"
                onClick={handleToggleSize}
              >
                {isFixedSize ? "더보기" : "닫기"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

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

const Shorts = () => {
  return (
    <div className="mx-2 mt-2 flex space-x-2">
      <HeartIcon className="w-12" />
      <SirenIcon className="w-12" />
      <CommentIcon className="w-12" />
      <FollowIcon isFollowing={true} /> <ShareIcon />
      <TagIcon data={dummydata[4]} />
    </div>
  )
}

const CommentInput = () => {
  const [inputComment, setInputComment] = useState("")
  const sendMsg = () => {
    console.log({inputComment})

    // const data = [
    //   {
    //     id: 2,
    //     user_id: 102,
    //     post_id: 202,
    //     animal_id: 302,
    //     title: "우리 강아지와 함께한 즐거운 시간",
    //     thumbnail: "img2.jpg",
    //     content: {inputComment},
    //     regist_time: "2024-07-24T09:15:00Z",
    //     nickname: "반려견행복",
    //     image: "img2.jpg",
    //   },
    // ]

    setInputComment("")
  }

  return (
    <div className="flex h-16 flex-col justify-between space-x-2.5 ">
      <div className="flex items-center space-x-2.5">
        <input
          type="text"
          className="outline-stroke mx-2 h-10 w-full rounded-md  text-sm outline outline-1"
          placeholder="좋아요와 댓글을 남기려면 로그인하세요"
          value={inputComment}
          onChange={(e) => setInputComment(e.target.value)}
        />
        <button className="h-10   w-12" onClick={sendMsg}>
          <img src="/icons/icon-send.svg" alt="sendIcon" />
        </button>
      </div>
    </div>
  )
}

const ShortsInfo = ({data}) => {
  return (
    <div className=" flex w-full flex-1 flex-col justify-between space-y-1 p-3 text-base    ">
      <div> {data.title}</div>
      <div className="text-sm"> {data.content}</div>
    </div>
  )
}

const ShortsComment = () => {
  return (
    <>
      <div className="flex h-full flex-col justify-between bg-gray-50  ">
        <div className=" flex-1">
          <Profile data={dummydata[3]} />
          <hr className="my-1 border-gray-300" />
          <ShortsInfo data={dummydata[4]}></ShortsInfo>
        </div>

        <ul className="flex-auto overflow-auto ">
          {dummydata.map((data, index) => (
            <li key={index}>
              <Comment data={data} />
            </li>
          ))}
        </ul>
        <div className="flex flex-1 flex-col space-y-2.5">
          <Shorts></Shorts>
          <CommentInput></CommentInput>
        </div>
      </div>
    </>
  )
}

export default ShortsComment
