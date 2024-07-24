import React from "react"

import {useLocation, useNavigate} from "react-router-dom"

import Comment from "../../assets/image/Comment.png"

const CommentIcon = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleClick = () => {
    if (location.pathname === "/short") {
      navigate("/shorts/comments")
    } else {
      navigate("/short")
    }
  }

  return (
    <>
      <button onClick={handleClick}>
        <img src={Comment} alt="Comment Icon" />
      </button>
    </>
  )
}

export default CommentIcon
