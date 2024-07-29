import React, {useState} from "react"
import ReactPlayer from "react-player"

const ShortWrite = () => {
  const [videoUrl, setVideoUrl] = useState(null) // 동영상 URL 상태

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setVideoUrl(url)
    }
  }

  return (
    <main className="mt-[80px] flex h-screen flex-col items-center">
      <div className="my-8 flex items-center space-x-4">
        <div className="relative h-[700px] max-w-[500px] overflow-hidden rounded-lg object-contain">
          {videoUrl ? (
            <ReactPlayer
              url={videoUrl}
              controls={true}
              playing={true}
              width="100%"
              height="100%"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-200">
              <p className="text-gray-500">동영상을 업로드 해주세요.</p>
            </div>
          )}
        </div>
        <div className="mt-4">
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="cursor-pointer border border-gray-300 px-4 py-2"
          />
        </div>
      </div>
    </main>
  )
}

export default ShortWrite
