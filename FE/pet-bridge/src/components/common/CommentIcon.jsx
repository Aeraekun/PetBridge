import React from "react"

const CommentIcon = ({size, onClick}) => {
  const handleClick = () => {
    onClick()
  }

  const sizeClass =
    size === "small" ? "w-5 h-5" : size === "medium" ? "w-6 h-6" : "w-6 h-6"

  return (
    <button onClick={handleClick}>
      <img
        src="/icons/icon-comment.svg"
        alt="Comment Icon"
        className={sizeClass}
      />
    </button>
  )
}

export default CommentIcon
