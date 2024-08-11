import React from "react"
import slideImage from "../../assets/image/Mainslide2.jpg" // 배경 이미지
import MainPetpickBanner from "components/main/MainPetpickBanner" // 배너 컴포넌트
import {Link} from "react-router-dom" // Link 컴포넌트 임포트
import iconPawprint from "../../assets/icons/icon-pawprint.png" // 아이콘 이미지

const MainPetpickComponent = () => {
  return (
    <div
      className="box-border flex h-screen flex-col items-center justify-start bg-cover bg-center bg-no-repeat pt-12 text-white"
      style={{backgroundImage: `url(${slideImage})`}}
    >
      <div className="mb-4 flex w-[1000px] items-center justify-between">
        <p className="mr-4 text-center text-4xl font-bold text-black">
          펫픽, 유기동물도 당신과 함께라면 행복해질 수 있어요
        </p>
        <Link
          to="/petpick"
          className="inline-flex h-12 items-center rounded-lg border border-gray-300 bg-mild px-4 text-black no-underline"
        >
          <img
            src={iconPawprint}
            alt="Community Icon"
            className="mr-2 size-6"
          />
          펫픽 더보기
        </Link>
      </div>
      <section className="flex h-[500px] w-[1000px] flex-col flex-wrap items-center justify-center bg-white">
        <MainPetpickBanner />
      </section>
    </div>
  )
}

export default MainPetpickComponent
