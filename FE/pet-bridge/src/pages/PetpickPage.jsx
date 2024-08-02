// import {useEffect, useState} from "react"
import TagIcon from "../components/common/TagIcon"
import {useNavigate, useParams} from "react-router-dom"
import {useEffect} from "react"
import PetpickIconContainer from "components/petpick/PetpickIconContainer"
import PetpickVideo from "components/petpick/PetpickVideo"

// const PetpickInfo = ({data}) => {
//   return (
//     <div className=" flex  w-full flex-col space-y-1 p-3 text-base ">
//       <div> {data.title}</div>
//       <div className="text-sm"> {data.content}</div>
//     </div>
//   )
// }

const PetpickPage = ({data}) => {
  // const {data} = useOutletContext()
  const navigate = useNavigate()
  const {id} = useParams()
  const petpick = data
  // const goPetpickComment = () => {
  //   if (location.pathname !== `/petpick/${id}/comments`) {
  //     navigate(`/petpick/${id}/comments`)
  //   } else {
  //     navigate(`/petpick/${id}`)
  //   }
  // }
  useEffect(() => {
    console.log(petpick.ListPetPickCommentResponseDto)
  }, [])

  const goPetpickTagDetail = () => {
    if (location.pathname !== `/petpick/${id}/detail`) {
      navigate(`/petpick/${id}/tag`)
    } else {
      navigate(`/petpick/${id}`)
    }
  }

  return (
    <>
      petpickpage
      <main className="flex flex-col items-center">
        <div className=" my-8 flex items-end space-x-4 ">
          <div className=" relative h-[700px] max-w-[500px] overflow-hidden rounded-lg object-contain ">
            <PetpickVideo />
            <div className="absolute bottom-20 left-0 bg-black/50 text-white">
              {/* <PetpickInfo data={petpick} /> */}
              <div className="absolute right-0 top-0 bg-white/50 text-white">
                <TagIcon data={petpick} onClick={goPetpickTagDetail} />
              </div>
            </div>
          </div>

          <PetpickIconContainer direct={"col"} />
        </div>
      </main>
    </>
  )
}

export default PetpickPage

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
