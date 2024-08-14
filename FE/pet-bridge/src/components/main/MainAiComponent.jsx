import React, {useState} from "react"
import image from "../../assets/image/Mainslide2.jpg" // 변경된 이미지 경로
import iconPawprint from "../../assets/icons/icon-pawprint.png" // 버튼 아이콘 이미지 경로
import ai from "../../assets/image/ai.jpg" // aiDog 이미지 경로
import {Link} from "react-router-dom" // Link 컴포넌트 임포트

const MainAiComponent = () => {
  const [isDogHovered, setIsDogHovered] = useState(false)

  return (
    <div
      className="flex h-screen flex-col items-center justify-start bg-cover bg-center bg-no-repeat pt-16 text-white transition-opacity duration-500"
      style={{backgroundImage: `url(${image})`}}
    >
      <div className="mx-auto mb-4 flex max-w-[1000px] items-center justify-center gap-44">
        <p className="mr-4 text-center text-4xl font-bold text-black">
          개? 고양이? AI로 당신의 취향에 맞춤형 추천
        </p>
        <Link
          to="/recommendation"
          className="inline-flex items-center rounded-lg border border-gray-300 bg-mild px-2 py-2.5 text-black no-underline"
        >
          <img
            src={iconPawprint}
            alt="Community Icon"
            className="mr-2 size-6"
          />
          집사 유형 테스트하기
        </Link>
      </div>
      <div className="mx-auto flex max-w-[1000px] flex-row justify-center">
        <Link
          to="/ai/eyes"
          className="relative h-[450px] w-[1000px] rounded-lg"
          onMouseEnter={() => setIsDogHovered(true)}
          onMouseLeave={() => setIsDogHovered(false)}
        >
          <img
            src={ai}
            alt="person"
            className={`size-full rounded-lg transition-opacity duration-300 ${
              isDogHovered ? "opacity-70" : "opacity-100"
            }`}
          />
          {isDogHovered && (
            <div className="absolute left-0 top-0 flex size-full flex-col items-center justify-center rounded-lg bg-black bg-opacity-70 text-center text-xl font-bold text-white">
              <div>[스마트 AI 집사 유형 테스트]</div> <br />
              <div className="text-left text-sm">
                나만 바라봐주는 사랑스런 강아지 <br />
                도도하지만 매력넘치는 고양이 <br />
                거기다 강아지도 고양이도 종 별로 천차만별.. <br />
                입양 하기 전부터 머리가 복잡하시죠? <br />
                이제는 고민 No! 견우와 직묘만의 특별한 AI가 추천해드려요! <br />
                간단한 질문 몇 가지에 대답해주시면 당신에게 맞는 종을
                추천해드립니다 <br />
              </div>
            </div>
          )}
        </Link>
      </div>
    </div>
  )
}

export default MainAiComponent
