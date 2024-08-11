import ReactPlayer from "react-player"

const PetpickVideo = ({videoURL, isPlaying}) => {
  const path = videoURL
  return (
    <div className="min-h-[600px] min-w-[200px] max-w-[400px] overflow-hidden rounded-2xl bg-black">
      <ReactPlayer
        url={path}
        controls={true}
        playing={isPlaying}
        width="100%"
        height="100%"
      />
    </div>
  )
}

export default PetpickVideo
