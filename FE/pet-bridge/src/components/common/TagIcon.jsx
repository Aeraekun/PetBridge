import React from "react"

import {useLocation, useNavigate} from "react-router-dom"

const TagIcon = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = () => {
    if (location.pathname !== "/shorts/tag") {
      navigate("/shorts/tag")
    } else {
      navigate("/short")
    }
  }

  return (
    <>
      <button onClick={handleClick} className=" ">
        <img src="/icons/icon-tag.svg" alt="Tag Icon" />
      </button>
    </>
  )
}

export default TagIcon
