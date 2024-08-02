import React from "react"

const TagIcon = ({onClick}) => {
  const handleClick = () => {
    onClick()
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
