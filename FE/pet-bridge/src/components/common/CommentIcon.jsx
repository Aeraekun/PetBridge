import React from "react"

import {useLocation, useNavigate} from "react-router-dom"

const CommentIcon = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleClick = () => {
    if (location.pathname !== "/short") {
      navigate("/short")
    } else {
      navigate("/shorts/comments")
    }
  }

  return (
    <>
      <button onClick={handleClick}>
        <img src="/icons/icon-comment.svg" alt="Comment Icon" />
      </button>
    </>
  )
}

export default CommentIcon
