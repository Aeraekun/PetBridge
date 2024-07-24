import dummydata from "./dummydata"
// import Image from "./Image"
import ShareIcon from "./ShareIcon"

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

const ShortComments = () => {
  return (
    <>
      <Profile data={dummydata[3]} />
      <div className=" mx-2 flex h-fit w-full flex-col justify-between space-x-2.5 p-3 text-base  outline">
        <div> {dummydata[4].title}</div>
        <div className="text-sm"> {dummydata[4].content}</div>
      </div>
      <Comment data={dummydata[0]} />
      <Comment data={dummydata[1]} />
      <Comment data={dummydata[2]} />
    </>
  )
}

export default ShortComments
