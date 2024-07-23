import React, {useState} from "react"
import Like from "../../assets/image/Like.png"
import Unlike from "../../assets/image/UnLike.png"

const HeartIcon = () => {
  const [isFilled, setIsFilled] = useState(false)

  const handleClick = () => {
    setIsFilled(!isFilled)
  }

  return (
    <>
      <button onClick={handleClick}>
        <img src={isFilled ? Like : Unlike} alt="Heart Icon" />
      </button>
    </>
  )
}

export default HeartIcon
