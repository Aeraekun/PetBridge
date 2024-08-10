import MyPageNavContainer from "components/my-page/MyPageNavContainer"
import {Outlet} from "react-router-dom"

const MyPage = () => {
  return (
    <section className="flex grid-cols-10 flex-col place-content-center items-center divide-y overflow-y-auto rounded-lg border md:h-[600px] md:flex-row">
      <MyPageNavContainer />
      <div className="h-full overflow-y-auto border-l transition-transform">
        <Outlet />
      </div>
    </section>
  )
}

export default MyPage
