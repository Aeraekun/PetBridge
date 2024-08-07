import HeartIcon from "../common/LikeIcon"
import SirenIcon from "../common/SirenIcon"
import ShareIcon from "../common/ShareIcon"
import CommentIcon from "../common/CommentIcon"
import FollowIcon from "../common/FollowIcon"
import TagIcon from "../common/TagIcon"
// import {useLocation, useNavigate} from "react-router-dom"
import {useEffect, useState} from "react"
import {
  deleteFollow,
  deletePetPickLike,
  registFollow,
  registPetPickLike,
} from "api/petpicks-api"
import FollowButton from "components/common/FollowButton"

const PetpickIconContainer = ({
  direct,
  toggleComment,
  petpickId,
  animalId,
  isFollowing,
  isLiking,
  isLogin,
  toggleDetail,
  isFollowButton,
}) => {
  const isVertical = direct === "col"
  // const location = useLocation()
  // const navigate = useNavigate()
  const [isFollow, setIsFollow] = useState(isFollowing)
  const [isLike, setIsLike] = useState(isLiking)

  useEffect(() => {
    // console.log("Id: ", petpickId, "  follow", isFollowing, " like", isLiking)
  }, [isFollow, isLike])
  // const goPetpickTagDetail = () => {
  //   const currentPath = location.pathname
  //   const tagPath = `/petpick/${petpickId}/tag`
  //   const basePath = `/petpick`
  //   console.log(currentPath)
  //   if (currentPath === tagPath) {
  //     navigate(basePath)
  //   } else {
  //     navigate(tagPath)
  //   }
  // }

  const handleLike = async () => {
    if (!isLogin) {
      alert("로그인 한 후 이용가능")
      return
    }

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
    if (!isLogin) {
      alert("로그인 한 후 이용가능")
      return
    }

    const newFollowState = !isFollow
    setIsFollow(newFollowState)
    try {
      if (newFollowState) {
        const res = await registFollow(animalId)
        console.log(res.data)
      } else {
        const res = await deleteFollow(animalId)
        console.log(res.data)
      }
    } catch (e) {
      console.error(e)
      setIsFollow(!newFollowState) // 실패 시 이전 상태로 되돌림
    }
  }

  const handleCopyUrl = () => {
    const url = window.location.href

    navigator.clipboard
      .writeText(url)
      .then(() => {
        setShowMessage(true)
        setTimeout(() => {
          setShowMessage(false)
        }, 1000) // 3초 후에 메시지를 숨깁니다.
      })
      .catch((err) => {
        console.error("URL 복사 실패: ", err)
      })
  }

  const [showMessage, setShowMessage] = useState(false)
  return (
    <>
      {isFollowButton ? (
        <FollowButton isFollowing={isFollow} onClick={handleFollow} />
      ) : (
        <div
          className={`relative mx-2 mt-2 flex ${isVertical ? "flex-col items-center justify-end space-y-2 pb-6" : "space-x-2 "}`}
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

          <ShareIcon className="w-12" size={""} onClick={handleCopyUrl} />

          {showMessage && (
            <div className="absolute bottom-4 left-1/2 w-64 -translate-x-1/2 rounded bg-gray-400 px-4 py-2 text-sm text-white opacity-80 shadow-lg transition-opacity duration-700">
              URL이 클립보드에 복사되었습니다!
            </div>
          )}
          <TagIcon className="w-12" onClick={toggleDetail} />
        </div>
      )}
    </>
  )
}
export default PetpickIconContainer
