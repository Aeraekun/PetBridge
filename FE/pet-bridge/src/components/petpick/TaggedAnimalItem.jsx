import StateBadge from "components/common/StateBadge"
import DogImage from "../../assets/image/dog.png"
import PetpickIconContainer from "./PetpickIconContainer"
// import React, {useState} from "react"

const AnimalInfo = ({animal}) => {
  return (
    <>
      <div className="flex flex-col space-y-1">
        <div className="text-base">{animal.name} </div>
        <div className="text-base">{animal.age} 년생</div>
        <div className="text-base">{animal.kindCd}</div>
      </div>
    </>
  )
}

const TaggedAnimalItem = ({animal, isFollowing, isLogin}) => {
  return (
    <div className="flex justify-between p-3">
      <div className="flex space-x-3">
        <img
          src={DogImage}
          className="h-60 w-40 object-contain"
          alt="animalImage"
        />

        <AnimalInfo animal={animal}></AnimalInfo>
      </div>
      <div className="flex h-full flex-col justify-between">
        <StateBadge state={animal.processState} />

        <PetpickIconContainer
          isFollowButton={true}
          isFollowing={isFollowing}
          animalId={animal.id}
          isLogin={isLogin}
        />
      </div>
    </div>
  )
}

export default TaggedAnimalItem
