import React, {useState} from "react"

const HeartIcon = () => {
  const [isFilled, setIsFilled] = useState(false)

  const handleClick = () => {
    setIsFilled(!isFilled)
  }

  return (
    <>
      <button onClick={handleClick}>
        <img
          src={isFilled ? "/icons/icon-like.svg" : "/icons/icon-unlike.svg"}
          alt="Heart Icon"
        />
      </button>
    </>
  )
}

export default HeartIcon
