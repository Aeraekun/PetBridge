import React from "react"
import {useLocation, useNavigate} from "react-router-dom"

const CommentIcon = ({size}) => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleClick = () => {
    if (location.pathname !== "/short") {
      navigate("/short")
    } else {
      navigate("/shorts/comments")
    }
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
