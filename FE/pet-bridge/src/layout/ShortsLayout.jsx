import {Outlet} from "react-router-dom"
import Navbar from "components/header/Navbar"
import ReactPlayer from "react-player"

const ShortsLayout = () => {
  return (
    <>
      <Navbar />
      <main className="mx-auto flex h-screen max-w-[1000px] flex-row justify-center sm:w-11/12">
        <div className="border-stroke border-1 my-8 flex h-fit w-full min-w-[1000px] flex-row rounded-lg border">
          <div className="max-h-[700px] max-w-[500px] flex-none overflow-hidden rounded-lg ">
            <ReactPlayer
              url="/shorts/video.mp4" // 여기에 로컬 MP4 파일 경로 입력
              controls={true}
              playing={true}
              width="100%"
              height="100%"
            />
          </div>
          <div className="max-h-[700px] min-w-[500px] flex-1 rounded-r-lg">
            <Outlet></Outlet>
          </div>
        </div>
      </main>
    </>
  )
}

export default ShortsLayout
