import React from "react"
import slideImage from "../../assets/image/Mainslide2.jpg" // 배경 이미지
import separateImage from "../../assets/image/pet.png" // 별도의 이미지
import {Link} from "react-router-dom" // Link 컴포넌트 임포트
import iconPawprint from "../../assets/icons/icon-pawprint.png" // 버튼 아이콘 이미지

const MainLostAndFoundComponent = () => {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-start overflow-hidden bg-cover bg-center bg-no-repeat pt-16 text-white"
      style={{backgroundImage: `url(${slideImage})`}}
    >
      <div className="flex w-full flex-col items-center">
        <div className="mx-auto mb-5 flex max-w-[1000px] flex-row items-center justify-center gap-[175px] text-center">
          <p className="mb-0 text-4xl font-bold text-black">
            실종동물, 그냥 지나치지 마시고 제보해주세요
          </p>
          <Link
            to="/lost-and-found"
            className="leading-12 inline-flex h-12 items-center rounded-lg border border-gray-300 bg-mild px-4 text-black no-underline"
          >
            <img
              src={iconPawprint}
              alt="Community Icon"
              className="mr-2 size-6"
            />
            실종 동물 지도 보기
          </Link>
        </div>
        <img
          src={separateImage}
          alt="CenterImage"
          className="h-[400px] w-[1000px] rounded-lg object-cover"
        />
      </div>
    </div>
  )
}

export default MainLostAndFoundComponent
