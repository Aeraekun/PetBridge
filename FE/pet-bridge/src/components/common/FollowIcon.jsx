// import Follow from "icons/icon-follow.svg"

const FollowIcon = ({isIcon, isFollowing, size, onClick}) => {
  const sizeClass =
    size === "small" ? "w-5 h-5" : size === "medium" ? "w-6 h-6" : "w-7 h-7"

  return (
    <button className="h-8" onClick={onClick}>
      {isIcon ? (
        isFollowing ? (
          <img
            src="/icons/icon-isFollowing.svg"
            alt="followwhiteIcon"
            className="size-7.5"
          />
        ) : (
          <img
            src="/icons/icon-follow.svg"
            alt="followwhiteIcon"
            className={`${sizeClass}`}
          />
        )
      ) : isFollowing ? (
        <img
          src="/icons/icon-isfollowing-white.svg"
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
