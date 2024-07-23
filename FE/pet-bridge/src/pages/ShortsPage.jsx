// import {useEffect, useState} from "react"
import ReactPlayer from "react-player"

const ShortsPage = () => {
  return (
    <>
      <main className="h-svh flex flex-col items-center ">
        <div className="my-8  h-5/6 outline w-10/12">
          <div className="outline h-full">
            <div className="relative h-[500px] w-[360px]">
              <ReactPlayer
                url="/shorts/video.mp4" // 여기에 로컬 MP4 파일 경로 입력
                controls={true}
                playing={true}
                width="100%"
                height="100%"
              />
              <div className="absolute bottom-20 left-0 p-4 bg-black bg-opacity-50 text-white">
                여기에 텍스트 추가
              </div>
            </div>
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
