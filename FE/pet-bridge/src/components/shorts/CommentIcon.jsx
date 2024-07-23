import React from "react"
import {useNavigate} from "react-router-dom"

import Comment from "../../assets/image/Comment.png"

const CommentIcon = () => {
  const navigate = useNavigate()

  function goCommentPage() {
    navigate("/shorts/comments", {replace: true})
  }

  return (
    <>
      <button onClick={goCommentPage}>
        <img src={Comment} alt="Siren Icon" />
      </button>
    </>
  )
}

export default CommentIcon
