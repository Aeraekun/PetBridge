import HeartIcon from "../common/HeartIcon"
import SirenIcon from "../common/SirenIcon"
import ShareIcon from "../common/ShareIcon"
import CommentIcon from "../common/CommentIcon"
import FollowIcon from "../common/FollowIcon"
import TagIcon from "../common/TagIcon"
import {useLocation, useNavigate, useParams} from "react-router-dom"

const PetpickIconContainer = ({direct, toggleVisible}) => {
  const isVertical = direct === "col"
  const {id} = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const goPetpickComment = () => {
    console.log(id)
    toggleVisible((prev) => !prev)
    // if (location.pathname !== `/petpick/${id}/comments`) {
    //   navigate(`/petpick/${id}/comments`)
    //   isVisible(true)
    // } else {
    //   navigate(`/petpick/${id}`)
    //   isVisible(false)
    // }
  }

  const goPetpickTagDetail = () => {
    if (location.pathname !== `/petpick/${id}/tag`) {
      navigate(`/petpick/${id}/tag`)
    } else {
      navigate(`/petpick/${id}`)
    }
  }
  return (
    <div
      className={`mx-2 mt-2 flex ${isVertical ? "flex-col space-y-2" : "space-x-2"}`}
    >
      <HeartIcon className="w-12" />
      <SirenIcon className="w-12" />
      <CommentIcon className="w-12" onClick={goPetpickComment} />
      <FollowIcon isFollowing={true} className="w-12" />
      <ShareIcon className="w-12" />
      <TagIcon className="w-12" onClick={goPetpickTagDetail} />
    </div>
  )
}
export default PetpickIconContainer
