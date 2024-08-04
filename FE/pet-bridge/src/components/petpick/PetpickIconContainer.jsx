import HeartIcon from "../common/LikeIcon"
import SirenIcon from "../common/SirenIcon"
import ShareIcon from "../common/ShareIcon"
import CommentIcon from "../common/CommentIcon"
import FollowIcon from "../common/FollowIcon"
import TagIcon from "../common/TagIcon"
import {useLocation, useNavigate} from "react-router-dom"
import {useEffect, useState} from "react"

const PetpickIconContainer = ({
  direct,
  toggleComment,
  petpickId,
  isFollowing,
  isLiking,
  toggleLike,
  toggleFollow,
}) => {
  const isVertical = direct === "col"
  const location = useLocation()
  const navigate = useNavigate()
  const [isFollow, setIsFollow] = useState(false)
  const [isLike, setIsLike] = useState(false)

  useEffect(() => {
    setIsFollow(isFollowing)
    setIsLike(isLiking)
  }, [])
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
  const handleLike = () => {
    setIsLike((prev) => !prev)
    toggleLike
  }
  const handleFollow = () => {
    setIsFollow((prev) => !prev)
    toggleFollow
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
