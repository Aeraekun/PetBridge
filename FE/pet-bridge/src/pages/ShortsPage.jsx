// import {useEffect, useState} from "react"
import ReactPlayer from "react-player"
import HeartIcon from "../components/common/HeartIcon"
import SirenIcon from "../components/common/SirenIcon"
import CommentIcon from "../components/common/CommentIcon"
import ShareIcon from "../components/common/ShareIcon"
import FollowIcon from "../components/common/FollowIcon"
import TagIcon from "../components/common/TagIcon"
import dummyData from "components/shorts/dummydata"

const ShortsInfo = ({data}) => {
  return (
    <div className=" flex  w-full flex-col space-y-1 p-3 text-base ">
      <div> {data.title}</div>
      <div className="text-sm"> {data.content}</div>
    </div>
  )
}

const ShortsPage = () => {
  return (
    <>
      <main className="mt-[80px] flex h-screen flex-col items-center">
        <div className=" my-8 flex items-end space-x-4 ">
          <div className=" relative h-[700px] max-w-[500px] overflow-hidden rounded-lg object-contain ">
            <ReactPlayer
              url="/shorts/cat.mp4" // 여기에 로컬 MP4 파일 경로 입력
              controls={true}
              playing={true}
              width="100%"
              height="100%"
            />
            <div className="absolute bottom-20 left-0 bg-black/50 text-white">
              <ShortsInfo data={dummyData[4]} />
              <div className="absolute right-0 top-0 bg-white/50 text-white">
                <TagIcon data={dummyData[4]} />
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <HeartIcon className="w-12" />
            <SirenIcon className="w-12" />
            <CommentIcon className="w-12" />
            <FollowIcon isFollowing={true} />
            <ShareIcon />
          </div>
        </div>
      </main>
    </>
  )
}

export default ShortsPage

// const ShortsPage = () => {
//   const [isWindow, setIsWindow] = useState < boolean > false
//   const [isPlaying, setIsPlaying] = useState < boolean > false

//   useEffect(() => {
//     setIsWindow(true)
//   }, [])

//   const handleBtn = () => {
//     setIsPlaying(!isPlaying)
//   }

//   return (
//     <>
//       <section>
//         <h2>React Player</h2>
//         <Button type="primary" onClick={handleBtn} style={{marginBottom: 20}}>
//           플레이
//         </Button>
//         {isWindow && (
//           <div className={styles.wrapper}>
//             <ReactPlayer
//               url="https://www.youtube.com/watch?v=pSUydWEqKwE"
//               muted
//               controls
//               playing={isPlaying}
//               width={"100%"}
//               height={"100%"}
//               className={styles.player}
//             />
//           </div>
//         )}
//       </section>
//     </>
//   )
// }

// export default ShortsPage
