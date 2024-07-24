import dummydata from "./dummydata"
// import Image from "./Image"
import ShareIcon from "./ShareIcon"
import HeartIcon from "./HeartIcon"
import SirenIcon from "./SirenIcon"
import CommentIcon from "./CommentIcon"
import Follow from "../../assets/image/Follow.png"
import React, {useState} from "react"

const Comment = ({data}) => {
  console.log(data)
  return (
    <>
      <div className="flex space-x-2.5 px-5 py-2.5">
        <div className="h-fit w-12 text-xl outline">
          <img src={`../../assets/image/Siren.png`} alt="profile" />
          {/* <Image imageName={Siren.png}></Image> */}
        </div>
        <div className="w-full">
          <div className="flex  h-7 items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="  text-sm outline">{data.nickname}</div>
              <div className="  text-sm outline">{data.regist_time}</div>
            </div>
            <ShareIcon></ShareIcon>
          </div>
          <div className=" h-fit w-full text-sm outline">{data.content}</div>
        </div>
      </div>
    </>
  )
}

const Profile = (data) => {
  return (
    <div className="mx-3 flex h-16 space-x-2.5 ">
      <div className="flex h-fit w-full items-center justify-between text-xl outline  ">
        <div className="flex items-center space-x-2.5">
          <div className="h-fit w-12 text-xl outline ">
            <img src={`../../assets/image/Siren.png`} alt="profile" />
            {/* <Image imageName={Siren.png}></Image> */}
          </div>
          <div className="text-sm outline">{data.nickname}닉네임</div>
        </div>
        <ShareIcon></ShareIcon>
      </div>
    </div>
  )
}

const Shorts = () => {
  return (
    <div className="flex space-y-2">
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
          className="w-full outline h-10 text-sm"
          placeholder="좋아요와 댓글을 남기려면 로그인하세요"
          value={inputComment}
          onChange={(e) => setInputComment(e.target.value)}
        />
        <button className="w-12 outline h-10" onClick={sendMsg}>
          댓글 쓰기
        </button>
      </div>
    </div>
  )
}

const ShortsInfo = ({data}) => {
  return (
    <div className=" mx-2 flex flex-1 w-full flex-col justify-between space-x-2.5 p-3 text-base  outline ">
      <div> {data.title}</div>
      <div className="text-sm"> {data.content}</div>
    </div>
  )
}

const ShortComments = () => {
  return (
    <>
      <div className="flex flex-col justify-between h-full ">
        <div className=" flex-1">
          <Profile data={dummydata[3]} />
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
