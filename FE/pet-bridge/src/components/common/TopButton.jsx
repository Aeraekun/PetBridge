import React, {useState, useEffect} from "react"

const TopButton = () => {
  const [showButton, setShowButton] = useState(false)

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 500) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }

    window.addEventListener("scroll", handleShowButton)
    return () => {
      window.removeEventListener("scroll", handleShowButton)
    }
  }, [])

  return (
    showButton && (
      <div className="fixed bottom-5 right-5 z-10">
        <button
          id="top"
          onClick={scrollToTop}
          className="cursor-pointer rounded-full border border-gray-300 bg-black px-3 py-2 text-xs font-bold text-white outline-none hover:text-red-800"
        >
          Top
        </button>
      </div>
    )
  )
}

export default TopButton
