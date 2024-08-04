import React from "react"

const LikeIcon = ({isLiking, onClick, size}) => {
  const sizeClass =
    size === "small" ? "w-5 h-5" : size === "medium" ? "w-6 h-6" : "w-7 h-7"

  return (
    <>
      <button onClick={onClick}>
        <img
          src={isLiking ? "/icons/icon-like.svg" : "/icons/icon-unlike.svg"}
          alt="Heart Icon"
          className={sizeClass}
        />
      </button>
    </>
  )
}

export default LikeIcon
