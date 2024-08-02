import HeartIcon from "../common/HeartIcon"
import SirenIcon from "../common/SirenIcon"
import ShareIcon from "../common/ShareIcon"
import CommentIcon from "../common/CommentIcon"
import FollowIcon from "../common/FollowIcon"
import TagIcon from "../common/TagIcon"
import {useLocation, useNavigate} from "react-router-dom"

const PetpickIconContainer = ({direct, toggleComment, petpickId}) => {
  const isVertical = direct === "col"
  const location = useLocation()
  const navigate = useNavigate()

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
  return (
    <div
      className={`mx-2 mt-2 flex ${isVertical ? "flex-col space-y-2" : "space-x-2"}`}
    >
      <HeartIcon className="w-12" />
      <SirenIcon className="w-12" />
      <CommentIcon className="w-12" onClick={toggleComment} />
      <FollowIcon isFollowing={true} className="w-12" />
      <ShareIcon className="w-12" />
      <TagIcon className="w-12" onClick={goPetpickTagDetail} />
    </div>
  )
}
export default PetpickIconContainer
