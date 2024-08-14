// import Follow from "icons/icon-follow.svg"
import FollowIcon from "./FollowIcon"
const FollowButton = ({isFollowing, onClick}) => {
  return (
    <button onClick={onClick}>
      {isFollowing ? (
        <div className="flex h-8 w-[78px]  flex-row items-center space-x-1 rounded border border-white bg-point p-0.5  font-semibold  text-white hover:bg-mild">
          <FollowIcon isFollowing={true} size={"medium"} />
          <div className="text-white">팔로잉</div>
        </div>
      ) : (
        <div className="flex h-8  w-[78px] flex-row items-center space-x-1 rounded border border-black bg-mild  p-0.5 font-bold hover:bg-point">
          <FollowIcon isFollowing={false} size={"medium"} />
          <div className="">팔로우</div>
        </div>
      )}
    </button>
  )
}

export default FollowButton
