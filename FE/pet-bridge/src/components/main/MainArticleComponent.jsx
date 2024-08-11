import React from "react"
import image from "../../assets/image/Mainslide.png" // 변경된 이미지 경로
import MainArticleBanner from "components/main/MainArticleBanner"

const MainArticleComponent = () => {
  return (
    <div style={{...styles.container, backgroundImage: `url(${image})`}}>
      <section className="text-black">
        <MainArticleBanner />
      </section>
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    color: "#fff",
    transition: "opacity 0.5s ease-in-out",
    opacity: 1,
  },
}

export default MainArticleComponent
