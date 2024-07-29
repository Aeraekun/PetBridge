import DogImage from "../../assets/image/dog.png"
import FollowButton from "../common/FollowButton"
// import React, {useState} from "react"

const AnimalInfo = ({data}) => {
  console.log(data)
  return (
    <>
      <div className="flex flex-col space-y-1">
        <div className="text-base">{data.petname} </div>
        <div className="text-base">{data.kind_cd}</div>
      </div>
    </>
  )
}
const State = ({state}) => {
  return (
    <div className="flex h-8 items-center justify-center rounded border border-black bg-cyan-100">
      {state}
    </div>
  )
}

const TagAnimal = ({data}) => {
  return (
    <div className="flex justify-between p-3">
      <div className="flex space-x-3">
        <img
          src={DogImage}
          className="h-60 w-40 object-contain"
          alt="animalImage"
        />

        <AnimalInfo data={data}></AnimalInfo>
      </div>
      <div className="flex h-full flex-col justify-between">
        <State state={data.process_state} />

        <FollowButton ifFollowing={true} />
      </div>
    </div>
  )
}

export default TagAnimal
