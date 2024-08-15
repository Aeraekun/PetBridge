import {Outlet} from "react-router-dom"

const PromotionPage = () => {
  return (
    <div className="mb-10 flex min-h-screen w-[400px] max-w-[1000px] flex-col space-y-3 sm:w-11/12 sm:min-w-[900px]">
      <Outlet />
    </div>
  )
}

export default PromotionPage
