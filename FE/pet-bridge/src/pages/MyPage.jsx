import MyPageNavContainer from "components/my-page/MyPageNavContainer"
import {Outlet} from "react-router-dom"

const MyPage = () => {
  return (
    <section className="flex h-[600px] w-[1000px] grid-cols-10 place-content-center items-center rounded-lg border">
      <MyPageNavContainer />
      <div className="h-full grow border-l">
        <Outlet />
      </div>
    </section>
  )
}

export default MyPage
