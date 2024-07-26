import React from "react"
import {useNavigate} from "react-router-dom"

import Select from "assets/image/Select.png"

const SelectIcon = () => {
  const navigate = useNavigate()

  function goCommentPage() {
    navigate("/shorts/comments")
  }

  return (
    <>
      <button onClick={goCommentPage} className=" ">
        <img src={Select} alt="Siren Icon" />
      </button>
    </>
  )
}

export default SelectIcon
