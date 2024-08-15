import MyPageNavContainer from "components/my-page/MyPageNavContainer"
import {Outlet} from "react-router-dom"

const MyPage = () => {
  return (
    <section className="my-10 flex grid-cols-10 flex-col place-content-center items-center overflow-y-auto rounded-lg border-none shadow-xl md:h-[600px] md:flex-row">
      <MyPageNavContainer />
      <div className="h-full overflow-y-auto transition-transform">
        <Outlet />
      </div>
    </section>
  )
}

export default MyPage
