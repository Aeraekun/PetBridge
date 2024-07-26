// import Follow from "icons/icon-follow.svg"
import FollowIcon from "./FollowIcon"
const FollowButton = ({ifFollowing}) => {
  return (
    <>
      {ifFollowing ? (
        <div className="flex h-8 flex-row rounded border border-white bg-blue-500 p-1  font-bold hover:bg-cyan-100">
          <FollowIcon isFollowing={true} />
          <div className="text-white">팔로잉</div>
        </div>
      ) : (
        <div className="flex h-8 flex-row rounded border border-black bg-cyan-100 p-1 font-bold hover:bg-blue-500">
          <FollowIcon isFollowing={false} /> 팔로우
        </div>
      )}
    </>
  )
}

export default FollowButton
