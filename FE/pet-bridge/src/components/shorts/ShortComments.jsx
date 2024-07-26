import dummydata from "./dummydata"
// import Image from "./Image"
import ShareIcon from "./ShareIcon"
import HeartIcon from "./HeartIcon"
import SirenIcon from "./SirenIcon"
import CommentIcon from "./CommentIcon"
import Follow from "../../assets/image/Follow.png"
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
        <div className="h-fit w-12 mt-3  ">
          <img src={Follow} alt="profile" />
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
            <ShareIcon></ShareIcon>
          </div>
          <div className="flex flex-col ">
            <div
              ref={contentRef}
              className={`transition-height duration-300 ease-in-out text-sm  w-full pr-3 ${isFixedSize ? "h-10 overflow-hidden" : "h-fit"}`}
            >
              {data.content}
            </div>
            {showReadMore && (
              <button
                className="text-stroke rounded hover:text-black mr-3 mt-1 text-sm flex justify-end"
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
    <div className="mx-3  flex h-16 space-x-2.5 items-center ">
      <div className="flex h-fit w-full items-center justify-between text-xl    ">
        <div className="flex items-center space-x-2.5">
          <div className="h-fit w-12 text-xl   ">
            <img src={Follow} alt="profile" />
            {/* <Image imageName={Siren.png}></Image> */}
          </div>
          <div className="text-sm  ">{data.nickname}닉네임</div>
        </div>
        <ShareIcon></ShareIcon>
      </div>
    </div>
  )
}

const Shorts = () => {
  return (
    <div className="flex space-x-2 mx-2 mt-2">
      <HeartIcon className="w-12" />
      <SirenIcon className="w-12" />
      <CommentIcon className="w-12" />
      <img src={Follow} className="w-8" alt="Follow Icon" />
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
    <div className="flex flex-col justify-between h-16 space-x-2.5 ">
      <div className="flex items-center space-x-2.5">
        <input
          type="text"
          className="w-full outline outline-stroke outline-1 h-10  rounded-md text-sm mx-2"
          placeholder="좋아요와 댓글을 남기려면 로그인하세요"
          value={inputComment}
          onChange={(e) => setInputComment(e.target.value)}
        />
        <button className="w-12   h-10" onClick={sendMsg}>
          댓글 쓰기
        </button>
      </div>
    </div>
  )
}

const ShortsInfo = ({data}) => {
  return (
    <div className=" flex flex-1 w-full flex-col justify-between space-y-1 p-3 text-base    ">
      <div> {data.title}</div>
      <div className="text-sm"> {data.content}</div>
    </div>
  )
}

const ShortComments = () => {
  return (
    <>
      <div className="flex flex-col justify-between h-full bg-gray-50  ">
        <div className=" flex-1">
          <Profile data={dummydata[3]} />
          <hr className="border-gray-300 my-1" />
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

export default ShortComments
