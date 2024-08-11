import React, {useState} from "react"
import image from "../../assets/image/Mainslide2.jpg" // 변경된 이미지 경로
import iconPawprint from "../../assets/icons/icon-pawprint.png" // 버튼 아이콘 이미지 경로
import aiDog from "../../assets/image/ai-dog.jpg" // aiDog 이미지 경로
import aiCat from "../../assets/image/ai-cat.jpg" // aiCat 이미지 경로
import {Link} from "react-router-dom" // Link 컴포넌트 임포트

const MainAiComponent = () => {
  const [isDogHovered, setIsDogHovered] = useState(false)
  const [isCatHovered, setIsCatHovered] = useState(false)

  return (
    <div
      className="flex h-screen flex-col items-center justify-start bg-cover bg-center bg-no-repeat pt-16 text-white transition-opacity duration-500"
      style={{backgroundImage: `url(${image})`}}
    >
      <div className="mx-auto mb-4 flex max-w-[1000px] items-center justify-center gap-[495px]">
        <p className="mr-4 text-center text-4xl font-bold text-black">
          견우와 직묘의 스마트 AI
        </p>
        <Link
          to="/ai"
          className="inline-flex items-center rounded-lg border border-gray-300 bg-mild px-5 py-2.5 text-black no-underline"
        >
          <img
            src={iconPawprint}
            alt="Community Icon"
            className="mr-2 size-6"
          />
          AI 진단하기
        </Link>
      </div>
      <div className="mx-auto flex max-w-[1000px] flex-row justify-center gap-5">
        <Link
          to="/ai/eyes"
          className="relative flex-1 rounded-lg"
          onMouseEnter={() => setIsDogHovered(true)}
          onMouseLeave={() => setIsDogHovered(false)}
        >
          <img
            src={aiDog}
            alt="AI Dog"
            className={`h-auto w-full rounded-lg transition-opacity duration-300 ${
              isDogHovered ? "opacity-70" : "opacity-100"
            }`}
          />
          {isDogHovered && (
            <div className="absolute left-0 top-0 flex size-full flex-col items-center justify-center rounded-lg bg-black bg-opacity-70 text-center text-xl font-bold text-white">
              <div>[스마트 AI 안구 건강진단]</div> <br />
              <div className="text-left text-sm">
                병원문만 들어서면 악마가 되는 아이들 <br />
                반려동물의 병원 스트레스 많이 걱정되시죠? <br />
                견우와 직묘의 스마트 AI 기술로 해결하세요! <br />
                스마트폰 하나면 충분합니다. <br />
                집에서 편하게 스트레스 받지 않고 안구질환을 검사해요 <br />
                우리아이 눈건강 미리 챙겨요!
              </div>
            </div>
          )}
        </Link>
        <Link
          to="/ai/skin"
          className="relative flex-1 rounded-lg"
          onMouseEnter={() => setIsCatHovered(true)}
          onMouseLeave={() => setIsCatHovered(false)}
        >
          <img
            src={aiCat}
            alt="AI Cat"
            className={`h-auto w-full rounded-lg transition-opacity duration-300 ${
              isCatHovered ? "opacity-70" : "opacity-100"
            }`}
          />
          {isCatHovered && (
            <div className="absolute left-0 top-0 flex size-full flex-col items-center justify-center rounded-lg bg-black bg-opacity-70 text-center text-xl font-bold text-white">
              <div>[스마트 AI 피부 건강진단]</div> <br />
              <div className="text-left text-sm">
                일하기도 바쁜 현대인의 삶, <br />
                반려동물 병원 검진은 제때 받고 있으신가요? <br />
                이제 AI로 피부질환을 미리미리 검사하세요. <br />
                스마트폰 하나면 준비 끝! <br />
                견우와 직묘의 스마트 AI 기술로 쉽고 빠르게~ <br />
                소중한 반려동물의 피부 건강을 지켜요
              </div>
            </div>
          )}
        </Link>
      </div>
    </div>
  )
}

export default MainAiComponent
