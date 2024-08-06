import React from "react"

const SelectIcon = ({size, onClick}) => {
  const sizeClass =
    size === "small" ? "w-5 h-5" : size === "medium" ? "w-6 h-6" : "w-7 h-7"

  return (
    <>
      <button onClick={onClick} className=" ">
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
