import React from "react"
import petImage from "../../assets/image/Mainbanner.png"

const MainBanner = () => {
  return (
    <>
      <div className="my-4 flex justify-center text-center text-4xl font-bold">
        <p>보호자와 입양자를 연결하는 든든한 오작교</p>
      </div>
      <div className="relative inline-block h-[400px] w-full overflow-hidden">
        <img
          src={petImage}
          alt="Pet Banner"
          className="size-full object-cover"
        />
      </div>
    </>
  )
}

export default MainBanner
