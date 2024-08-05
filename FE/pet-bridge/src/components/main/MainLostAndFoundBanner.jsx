import React from "react"
import {Link} from "react-router-dom"
import lostandfoundImage from "../../assets/image/lostandfound.jpg"

const MainLostAndFoundBanner = () => {
  return (
    <>
      <p className="text-4xl font-bold">
        방금 지나친 동물, 누군가 찾고 있을 수 있어요
      </p>
      <div className="h-[450px] overflow-hidden p-4">
        <img
          src={lostandfoundImage}
          alt="Lost and Found"
          className="size-full object-cover"
        />
      </div>
      <Link
        to="/lost-and-found"
        className="inline-flex h-12 items-center justify-center rounded-md border border-stroke bg-mild px-3.5 py-4 text-black"
      >
        실종 동물 지도 보기
      </Link>
    </>
  )
}

export default MainLostAndFoundBanner
