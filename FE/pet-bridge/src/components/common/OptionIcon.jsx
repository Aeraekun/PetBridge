import React from "react"
import openPopover from "./OpenPopover"

const SelectIcon = () => {
  const goMoreOption = () => {
    openPopover()
  }
  return (
    <>
      <button onClick={goMoreOption} className=" ">
        <img src="/icons/icon-option.svg" alt="more option" />
      </button>
    </>
  )
}

export default SelectIcon
