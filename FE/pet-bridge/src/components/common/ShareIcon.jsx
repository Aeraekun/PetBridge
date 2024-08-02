import React from "react"
import {useNavigate} from "react-router-dom"

const SelectIcon = () => {
  const navigate = useNavigate()

  function goCommentPage() {
    navigate("/petpick/comments")
  }

  return (
    <>
      <button onClick={goCommentPage} className=" ">
        <img src="/icons/icon-share.svg" alt="more option" />
      </button>
    </>
  )
}

export default SelectIcon
