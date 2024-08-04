import React from "react"
import {useNavigate} from "react-router-dom"

const SelectIcon = ({size}) => {
  const navigate = useNavigate()
  const sizeClass =
    size === "small" ? "w-5 h-5" : size === "medium" ? "w-6 h-6" : "w-7 h-7"

  function goCommentPage() {
    navigate("/petpick/comments")
  }

  return (
    <>
      <button onClick={goCommentPage} className=" ">
        <img
          src="/icons/icon-share.svg"
          alt="more option"
          className={sizeClass}
        />
      </button>
    </>
  )
}

export default SelectIcon
