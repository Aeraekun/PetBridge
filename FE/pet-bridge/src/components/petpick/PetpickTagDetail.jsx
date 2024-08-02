import dummydata from "./dummydata"
import Button from "../common/Button"
import TagAnimal from "./TaggedAnimalItem"
import TagArticle from "./TaggedArticleItem"
import ProfileImage from "assets/image/profile.JPG"
import {useNavigate, useParams} from "react-router-dom"

import TagIcon from "../common/TagIcon"
import CommentIcon from "../common/CommentIcon"
import Profile from "components/common/Profile"
import PetpickVideo from "./PetpickVideo"
import Navbar from "components/header/Navbar"

const PetpickTagDetail = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const goWritePetpick = () => {
    let path = `/petpick/write`
    navigate(path)
  }

  const goPetpickTagDetail = () => {
    if (location.pathname !== `/petpick/${id}/detail`) {
      navigate(`/petpick/${id}/tag`)
    } else {
      navigate(`/petpick/${id}`)
    }
  }
  const goPetpickComment = () => {
    if (location.pathname !== `/petpick/${id}/comments`) {
      navigate(`/petpick/${id}/comments`)
    } else {
      navigate(`/petpick/${id}`)
    }
  }

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="mx-auto flex h-screen w-[1000px] flex-row justify-center sm:w-11/12">
        <PetpickVideo />

        <div className="relative flex flex-col justify-between">
          <div className=" flex h-full flex-col justify-start bg-gray-50 ">
            <div className=" ">
              <Profile nickname={ProfileImage} image={"ddd"} />
              <hr className="my-1 border-gray-300" />
            </div>
            <Button onClick={goWritePetpick}>새팻픽 </Button>

            <TagAnimal data={dummydata[3]} />
            <TagArticle data={dummydata[3]} />
            <TagArticle data={dummydata[4]} />
          </div>
          <CommentIcon
            className="absolute bottom-10 right-0"
            onClick={goPetpickComment}
          ></CommentIcon>
          <TagIcon data={dummydata[4]} onClick={goPetpickTagDetail} />
        </div>
      </div>
    </div>
  )
}

export default PetpickTagDetail
