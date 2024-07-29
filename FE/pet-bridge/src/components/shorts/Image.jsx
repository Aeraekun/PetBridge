import React from "react"

const Image = ({imageName}) => {
  return (
    <>
      {imageName}
      <img
        src={require(`../../assets/image/Comment.png`).default}
        alt="Imaasdge"
      />
    </>
  )
}

export default Image
