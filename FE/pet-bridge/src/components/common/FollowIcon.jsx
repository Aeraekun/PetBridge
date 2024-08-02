// import Follow from "icons/icon-follow.svg"

const FollowIcon = ({isFollowing, size}) => {
  const sizeClass =
    size === "small" ? "w-5 h-5" : size === "medium" ? "w-6 h-6" : "w-6 h-6"

  return (
    <button>
      {isFollowing ? (
        <img
          src="/icons/icon-follow-white.svg"
          alt="followwhiteIcon"
          className={sizeClass}
        />
      ) : (
        <img
          src="/icons/icon-follow.svg"
          alt="followwhiteIcon"
          className={sizeClass}
        />
      )}
    </button>
  )
}

export default FollowIcon
