import React from "react"
import PetpickIconContainer from "./PetpickIconContainer"
// import StateBadge from "components/common/StateBadge"

const AnimalInfo = ({animal}) => {
  return (
    <div className="flex flex-col space-y-1">
      <div className="text-lg font-semibold">{animal.name}</div>
      <div className="text-base text-gray-700">{animal.age} 년생</div>
      <div className="text-base text-gray-700">{animal.kindCd}</div>
    </div>
  )
}

const TaggedAnimalItem = ({animal, isFollowing, isLogin, onClick}) => {
  return (
    <div
      className="relative m-3 flex cursor-pointer rounded-lg border border-gray-200 bg-white p-4 transition-transform hover:scale-105 hover:shadow-md"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick()
        }
      }}
    >
      <div className="shrink-0">
        <img
          src={animal.filename}
          className="size-32 rounded-lg border border-gray-300 object-cover"
          alt="animalImage"
        />
      </div>
      <div className="ml-4 flex grow flex-col justify-between">
        <AnimalInfo animal={animal} />
        {/* <StateBadge state={animal.processState} /> */}
      </div>
      <div className="absolute right-2 bottom-2">
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
