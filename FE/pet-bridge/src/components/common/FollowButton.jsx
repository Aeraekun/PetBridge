// import Follow from "icons/icon-follow.svg"
import FollowIcon from "./FollowIcon"
const FollowButton = ({isFollowing}) => {
  return (
    <>
      {!isFollowing ? (
        <div className="flex h-8 flex-row rounded border border-white bg-point p-1 font-semibold  text-white hover:bg-mild">
          <FollowIcon isFollowing={true} size={"medium"} />
          <div className="text-white">팔로잉</div>
        </div>
      ) : (
        <div className="flex h-8 flex-row rounded border border-black bg-mild p-1 font-bold hover:bg-point">
          <FollowIcon isFollowing={false} size={"medium"} /> 팔로우
        </div>
      )}
    </>
  )
}

export default FollowButton
