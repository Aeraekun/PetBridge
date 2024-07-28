// import Follow from "icons/icon-follow.svg"

const FollowIcon = ({isFollowing}) => {
  return (
    <>
      {isFollowing ? (
        <img
          src="/icons/icon-follow.svg"
          alt="followIcon"
          className="size-8 pr-1"
        />
      ) : (
        <img
          src="/icons/icon-follow-white.svg"
          alt="followwhiteIcon"
          className="size-8 pr-1"
        />
      )}
    </>
  )
}

export default FollowIcon
