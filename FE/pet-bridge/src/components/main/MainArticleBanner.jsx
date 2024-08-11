import React from "react"
import {Link} from "react-router-dom"
import logoImage from "../../assets/image/logo.png"
import iconPawprint from "../../assets/icons/icon-pawprint.png"

const MainArticleBanner = () => {
  return (
    <>
      <p className="mb-4 text-center text-4xl font-bold">
        모든 생명은 존중받을 가치가 있다.
      </p>
      <div className="flex items-center gap-8">
        <div className="relative size-[450px] overflow-hidden">
          <img
            src={logoImage}
            alt="Lost and Found"
            className="absolute inset-0 size-full object-contain"
          />
        </div>
        <div className="flex flex-1 flex-col justify-center text-center">
          <p className="mb-4 text-2xl">
            `All life deserves respect`
            <br />
            견우와직묘의 시작은 이 한 줄에서 출발했습니다. <br />
            종, 성별, 나이 등 그 어떤 것이라도 관계없이 <br />
            생명체라면 무조건 존중받아야 한다. <br />
            지금, 생명존중의 가치 실현에 동참해 주세요!
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/users/login"
              className="inline-flex h-12 items-center justify-center rounded-md border border-stroke bg-[#FECACA] px-3.5 py-4 text-black"
            >
              <img
                src={iconPawprint}
                alt="Community Icon"
                className="mr-2 size-6" // 이미지 크기와 간격 조정
              />
              로그인 하기
            </Link>
            <Link
              to="/users/sign-up"
              className="inline-flex h-12 items-center justify-center rounded-md border border-stroke bg-[#FECACA] px-3.5 py-4 text-black"
            >
              <img
                src={iconPawprint}
                alt="Community Icon"
                className="mr-2 size-6" // 이미지 크기와 간격 조정
              />
              회원가입 하기
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainArticleBanner
