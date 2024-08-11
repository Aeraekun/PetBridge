import React, {useState, useEffect} from "react"
import MainComponent from "../components/main/MainComponent"
import MainAnimalComponent from "../components/main/MainAnimalComponent"
import MainPetpickComponent from "../components/main/MainPetpickComponent"
import MainBoardComponent from "../components/main/MainBoardComponent"
import MainAiComponent from "../components/main/MainAiComponent"
import MainLostAndFoundComponent from "../components/main/MainLostAndFoundComponent"
import MainUccComponent from "../components/main/MainUccComponent"
import MainArticleComponent from "../components/main/MainArticleComponent"

const MainPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [animating, setAnimating] = useState(false)

  const components = [
    <MainComponent key="component1" />,
    <MainAnimalComponent key="component2" />,
    <MainPetpickComponent key="component3" />,
    <MainBoardComponent key="component4" />,
    <MainAiComponent key="component5" />,
    <MainLostAndFoundComponent key="component6" />,
    <MainUccComponent key="component7" />,
    <MainArticleComponent key="component8" />,
  ]

  const handleScroll = (e) => {
    if (animating) return

    if (e.deltaY > 0 && currentIndex < components.length - 1) {
      setAnimating(true)
      setCurrentIndex((prevIndex) => prevIndex + 1)
    } else if (e.deltaY < 0 && currentIndex > 0) {
      setAnimating(true)
      setCurrentIndex((prevIndex) => prevIndex - 1)
    }
  }

  const onAnimationEnd = () => {
    setAnimating(false)
  }

  useEffect(() => {
    window.addEventListener("wheel", handleScroll)
    return () => {
      window.removeEventListener("wheel", handleScroll)
    }
  }, [currentIndex, animating])

  return (
    <div className="absolute inset-x-0 bottom-0 top-20 overflow-hidden bg-gray-200">
      <div
        className="relative flex size-full flex-col transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateY(-${currentIndex * 100}%)`,
        }}
        onTransitionEnd={onAnimationEnd}
      >
        {components.map((component, index) => (
          <div key={index} className="size-full bg-gray-200">
            {component}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0" />
    </div>
  )
}

export default MainPage
