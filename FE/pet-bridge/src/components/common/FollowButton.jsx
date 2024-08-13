// import Follow from "icons/icon-follow.svg"
import FollowIcon from "./FollowIcon"
const FollowButton = ({isFollowing, onClick}) => {
  return (
    <button onClick={onClick}>
      {isFollowing ? (
        <div className="m-0 flex h-8 flex-row items-center rounded border border-white bg-point  font-semibold  text-white hover:bg-mild">
          <FollowIcon isFollowing={true} size={"medium"} />
          <div className="text-white">팔로잉</div>
        </div>
      ) : (
        <div className="m-0 flex h-8 flex-row items-center rounded border border-black bg-mild font-bold hover:bg-point">
          <FollowIcon isFollowing={false} size={"medium"} /> 팔로우
        </div>
      )}
    </button>
  )
}

export default FollowButton
