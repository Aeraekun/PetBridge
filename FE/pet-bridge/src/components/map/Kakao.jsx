import {useEffect} from "react"
import markerImg from "../../assets/images/marker.png" // 마커 이미지를 import

const {kakao} = window

function Kakao() {
  useEffect(() => {
    const container = document.getElementById("map") // 지도 영역의 DOM 레퍼런스
    const options = {
      center: new kakao.maps.LatLng(36.355383, 127.298445), // 지도 중심좌표(유성연수원)
      level: 3, // 지도 확대 레벨
    }

    // *다음줄의 주석을 지우면 에러가 발생함*
    const map = new kakao.maps.Map(container, options) // eslint-disable-line no-unused-vars

    // 마커가 표시될 위치
    const markerPosition = new kakao.maps.LatLng(36.355383, 127.298445)

    // 마커 이미지 정보
    const imageSrc = markerImg // import한 로컬 이미지 파일
    const imageSize = new kakao.maps.Size(32, 32) // 마커 이미지 크기
    const imageOption = {offset: new kakao.maps.Point(27, 69)} // 마커 이미지의 위치 조정

    // 마커 이미지 생성
    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    )

    // 마커 생성
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
      clickable: true, // 마커 클릭 시 지도의 클릭 이벤트 발생 X
    })

    // 마커를 지도 위에 표시
    marker.setMap(map)

    // 인포윈도우에 표시될 내용
    const iwContent = '<div style="padding:5px;">Hello World!</div>'
    const iwRemoveable = true

    // 인포윈도우 생성
    const infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable,
    })

    // 마커 클릭 이벤트 추가
    kakao.maps.event.addListener(marker, "click", function () {
      infowindow.open(map, marker) // 인포윈도우를 지도와 마커 위에 표시
    })
  }, [])

  return (
    <div
      id="map"
      style={{
        width: "1000px", // 지도의 가로 크기
        height: "700px", // 지도의 세로 크기
      }}
    ></div>
  )
}

export default Kakao
