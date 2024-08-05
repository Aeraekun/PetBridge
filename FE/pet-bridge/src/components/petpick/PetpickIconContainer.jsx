import HeartIcon from "../common/LikeIcon"
import SirenIcon from "../common/SirenIcon"
import ShareIcon from "../common/ShareIcon"
import CommentIcon from "../common/CommentIcon"
import FollowIcon from "../common/FollowIcon"
import TagIcon from "../common/TagIcon"
import {useLocation, useNavigate} from "react-router-dom"
import {useEffect, useState} from "react"
import {
  deleteFollow,
  deletePetPickLike,
  registFollow,
  registPetPickLike,
} from "api/petpicks-api"

const PetpickIconContainer = ({
  direct,
  toggleComment,
  petpickId,
  isFollowing,
  isLiking,
}) => {
  const isVertical = direct === "col"
  const location = useLocation()
  const navigate = useNavigate()
  const [isFollow, setIsFollow] = useState(isFollowing)
  const [isLike, setIsLike] = useState(isLiking)

  useEffect(() => {
    console.log(isFollowing, " like", isLiking)
  }, [isFollow, isLike])
  const goPetpickTagDetail = () => {
    const currentPath = location.pathname
    const tagPath = `/petpick/${petpickId}/tag`
    const basePath = `/petpick`
    console.log(currentPath)
    if (currentPath === tagPath) {
      navigate(basePath)
    } else {
      navigate(tagPath)
    }
  }

  const handleLike = async () => {
    const newLikeState = !isLike
    setIsLike(newLikeState)
    try {
      if (newLikeState) {
        const res = await registPetPickLike(petpickId)
        console.log(res.data)
      } else {
        const res = await deletePetPickLike(petpickId)
        console.log(res.data)
      }
    } catch (e) {
      console.error(e)
      setIsLike(!newLikeState) // 실패 시 이전 상태로 되돌림
    }
  }

  const handleFollow = async () => {
    const newFollowState = !isFollow
    setIsFollow(newFollowState)
    try {
      if (newFollowState) {
        const res = await registFollow(petpickId)
        console.log(res.data)
      } else {
        const res = await deleteFollow(petpickId)
        console.log(res.data)
      }
    } catch (e) {
      console.error(e)
      setIsFollow(!newFollowState) // 실패 시 이전 상태로 되돌림
    }
  }

  return (
    <div
      className={`mx-2 mt-2 flex ${isVertical ? "flex-col items-center justify-end space-y-2 pb-6" : "space-x-2 "}`}
    >
      <HeartIcon
        isLiking={isLike}
        onClick={handleLike}
        size={""}
        className="w-12"
      />
      <SirenIcon className="w-12" />
      <CommentIcon className="w-12" onClick={toggleComment} />
      <FollowIcon
        isFollowing={isFollow}
        size={""}
        isIcon={true}
        onClick={handleFollow}
        className="w-12"
      />
      <ShareIcon className="w-12" size={""} />
      <TagIcon className="w-12" onClick={goPetpickTagDetail} />
    </div>
  )
}
export default PetpickIconContainer
