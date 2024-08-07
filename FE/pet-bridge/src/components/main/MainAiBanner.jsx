import React, {useState} from "react"
import {Link} from "react-router-dom"
import aiDog from "../../assets/image/ai-dog.jpg"
import aiCat from "../../assets/image/ai-cat.jpg"
import iconPawprint from "../../assets/icons/icon-pawprint.png"

const MainAiBanner = () => {
  const [isDogHovered, setIsDogHovered] = useState(false)
  const [isCatHovered, setIsCatHovered] = useState(false)

  return (
    <div style={{textAlign: "center"}}>
      <p className="mb-4 text-4xl font-bold">
        스트레스 0. 집에서 간편하게 AI로 아이들의 건강상태를 미리 확인해요
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "20px",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <Link
          to="/ai/eyes"
          style={{position: "relative", flex: 1, borderRadius: "10px"}}
          onMouseEnter={() => setIsDogHovered(true)}
          onMouseLeave={() => setIsDogHovered(false)}
        >
          <img
            src={aiDog}
            alt="AI Dog"
            style={{
              borderRadius: "10px",
              width: "100%",
              height: "auto",
              transition: "opacity 0.3s ease",
              opacity: isDogHovered ? 0.7 : 1,
            }}
          />
          {isDogHovered && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                color: "white",
                borderRadius: "10px",
                fontSize: "1.5rem",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
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
          style={{position: "relative", flex: 1, borderRadius: "10px"}}
          onMouseEnter={() => setIsCatHovered(true)}
          onMouseLeave={() => setIsCatHovered(false)}
        >
          <img
            src={aiCat}
            alt="AI Cat"
            style={{
              borderRadius: "10px",
              width: "100%",
              height: "auto",
              transition: "opacity 0.3s ease",
              opacity: isCatHovered ? 0.7 : 1,
            }}
          />
          {isCatHovered && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                color: "white",
                borderRadius: "10px",
                fontSize: "1.5rem",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
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
      <Link
        to="/ai"
        className="my-4 inline-flex h-12 items-center justify-center rounded-md border border-stroke bg-mild px-3.5 py-4 text-black"
      >
        <img
          src={iconPawprint}
          alt="Community Icon"
          className="mr-2 size-6" // 이미지 크기와 간격 조정
        />
        AI 진단하기
      </Link>
    </div>
  )
}

export default MainAiBanner
