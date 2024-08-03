import ReactPlayer from "react-player"

const PetpickVideo = () => {
  return (
    <div className="min-w-[400px] max-w-[400px]">
      <ReactPlayer
        url="/petpicks/cat.mp4" // 여기에 로컬 MP4 파일 경로 입력
        controls={true}
        playing={true}
        width="100%"
        height="100%"
      />
    </div>
  )
}
export default PetpickVideo
