import React, {useState} from "react"
import {Link} from "react-router-dom"
import aiDog from "../../assets/image/ai-dog.jpg"
import aiCat from "../../assets/image/ai-cat.jpg"

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
              아이들의 안구 사진을 찍어서, 건강상태를 확인해보세요
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
              아이들의 피부 사진을 찍어서 건강상태를 확인해보세요
            </div>
          )}
        </Link>
      </div>
      <Link
        to="/ai"
        className="mt-4 inline-flex h-12 items-center justify-center rounded-md border border-stroke bg-mild px-3.5 py-2.5 text-black"
        style={{display: "inline-block"}}
      >
        AI 진단하기
      </Link>
    </div>
  )
}

export default MainAiBanner
