import React, {useState} from "react"
import petImage from "../../assets/image/pet.png"

const MainBanner = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative inline-block h-[400px] w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={petImage}
        alt="Pet Banner"
        className={`size-full rounded-lg object-contain object-center transition-opacity duration-300 ease-in-out ${isHovered ? "opacity-70" : "opacity-100"}`}
      />
      {isHovered && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-70 text-center text-xl font-bold text-white">
          텍스트 테스트 텍스트 테스트
        </div>
      )}
    </div>
  )
}

export default MainBanner
