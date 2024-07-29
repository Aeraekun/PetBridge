import dummydata from "./dummydata"
import ShareIcon from "../common/ShareIcon"
import TagAnimal from "./TaggedAnimalItem"
import TagArticle from "./TaggedArticleItem"
import ProfileImage from "assets/image/profile.JPG"

import TagIcon from "../common/TagIcon"
import CommentIcon from "../common/CommentIcon"

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
        <ShareIcon></ShareIcon>
      </div>
    </div>
  )
}

const ShortsTagDetail = () => {
  return (
    <div className="relative flex flex-col justify-between">
      <div className=" flex h-full flex-col justify-start bg-gray-50 ">
        <div className=" ">
          <Profile data={dummydata[3]} />
          <hr className="my-1 border-gray-300" />
        </div>

        <TagAnimal data={dummydata[3]} />
        <TagArticle data={dummydata[3]} />
        <TagArticle data={dummydata[4]} />
      </div>
      <CommentIcon className="absolute bottom-10 right-0"></CommentIcon>
      <TagIcon data={dummydata[4]} />
    </div>
  )
}

export default ShortsTagDetail
