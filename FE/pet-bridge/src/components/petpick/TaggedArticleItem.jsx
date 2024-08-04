import DogImage from "../../assets/image/dog.png"

// import React, {useState} from "react"

const ArticleInfo = ({data}) => {
  return (
    <div className="flex w-full flex-col ">
      <div className="flex w-full justify-between space-x-2 p-1">
        <ArticleState state={data.processState}></ArticleState>
        <div className="text-sm">{data.registTime.split("T")[0]}</div>
      </div>

      <div className="text-base">{data.title}</div>
    </div>
  )
}
const ArticleState = ({state}) => {
  return (
    <div className="flex size-fit items-center justify-center rounded border border-black bg-cyan-100 px-1">
      {state}
    </div>
  )
}

const TaggedArticleItem = ({data}) => {
  return (
    <div className="flex h-24 w-full justify-between space-x-2 p-3">
      <div className="flex w-full space-x-3">
        <div className="flex flex-col justify-center">
          <img
            src={DogImage}
            className="w-16  object-cover"
            alt="animalImage"
          />
        </div>
        <ArticleInfo data={data} />
      </div>
    </div>
  )
}

export default TaggedArticleItem
