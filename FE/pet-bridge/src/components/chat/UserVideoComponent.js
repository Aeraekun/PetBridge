import React from "react"
import OpenViduVideoComponent from "./OvVideo"
import "./UserVideo.css"

// 함수형 컴포넌트로 변환된 UserVideoComponent
const UserVideoComponent = ({streamManager}) => {
  // 사용자의 닉네임을 가져오는 함수
  const getNicknameTag = () => {
    // streamManager의 연결 데이터에서 닉네임을 추출
    return JSON.parse(streamManager.stream.connection.data).clientData
  }

  return (
    <div>
      {streamManager ? (
        <div className="streamcomponent">
          {/* OpenViduVideoComponent를 사용하여 비디오 스트림 표시 */}
          <OpenViduVideoComponent streamManager={streamManager} />
          <div>
            {/* 사용자의 닉네임을 표시 */}
            <p>{getNicknameTag()}</p>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default UserVideoComponent
