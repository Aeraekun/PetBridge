/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/media-has-caption */

import React, {useEffect} from "react"

const OpenViduVideoComponent = ({streamManager}) => {
  const videoRef = React.createRef()

  useEffect(() => {
    if (videoRef.current) {
      streamManager.addVideoElement(videoRef.current)
    }

    // Clean up the video element when the component unmounts
    return () => {
      if (videoRef.current) {
        streamManager.removeVideoElement(videoRef.current)
      }
    }
  }, [streamManager])

  return <video autoPlay ref={videoRef} />
}

export default OpenViduVideoComponent
