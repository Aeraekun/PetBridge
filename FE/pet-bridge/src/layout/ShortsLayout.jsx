import {Outlet} from "react-router-dom"
import Navbar from "components/header/Navbar"
import ReactPlayer from "react-player"

const ShortsLayout = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-row mx-auto justify-center h-screen max-w-[1000px] sm:w-11/12">
        <div className="flex flex-row w-full h-5/6 my-8 ">
          <div className="flex-none max-h-[600px] max-w-[500px] ">
            <ReactPlayer
              url="/shorts/video.mp4" // 여기에 로컬 MP4 파일 경로 입력
              controls={true}
              playing={true}
              width="100%"
              height="600px"
            />
          </div>
          <div className="flex-1 outline outline-1 outline-stroke  min-w-[500px] max-h-[600px] rounded-r-lg">
            <Outlet></Outlet>
          </div>
        </div>
      </main>
    </>
  )
}

export default ShortsLayout
