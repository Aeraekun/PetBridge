import ReactPlayer from "react-player"

const PetpickVideo = ({videoURL}) => {
  console.log(videoURL)
  const path = videoURL
  return (
    <div className="min-h-[600px] min-w-[200px] max-w-[400px] bg-black">
      <ReactPlayer
        url={path}
        controls={true}
        playing={true}
        width="100%"
        height="100%"
      />
    </div>
  )
}

export default PetpickVideo
