import {useEffect, useState} from "react"
import markerImg from "../../assets/images/Marker.png" // 마커 이미지 import

const {kakao} = window

function Kakao() {
  const markersData = [
    {
      position: new kakao.maps.LatLng(36.355383, 127.298445),
      content: `
        <div style="position: relative; padding:5px; border:5px solid #fcd5ce; border-radius:10px; background-color: white;">
          <img src="https://cdn.imweb.me/thumbnail/20221027/1ea95c9ccc1c0.jpg" alt="산책 강아지 사진" style="width:auto; height:auto;">
          <p>[개] 믹스견</p>
          <p>2살 추정</p>
          <p>공원</p>
          <p>목줄을 차고 있었어요.</p>
          <button id="close-button-1" style="
            position: absolute; 
            top: 5px; 
            right: 5px; 
            background: #fff; 
            border: 1px solid #ddd; 
            border-radius: 3px; 
            cursor: pointer; 
            padding: 2px 5px;
          ">X</button>
        </div>
      `,
      image: markerImg,
    },
    {
      position: new kakao.maps.LatLng(36.36, 127.3),
      content: `
        <div style="position: relative; padding:5px; border:5px solid #fcd5ce; border-radius:10px; background-color: white;">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Pride_of_Pets_Dog_Show%2C_2011_%286271388774%29.jpg/1200px-Pride_of_Pets_Dog_Show%2C_2011_%286271388774%29.jpg" alt="다른 강아지 사진" style="width:auto; height:auto;">
          <p>[개] 시바견</p>
          <p>3살 추정</p>
          <p>공원</p>
          <p>목줄을 차고 있었어요.</p>
          <button id="close-button-2" style="
            position: absolute; 
            top: 5px; 
            right: 5px; 
            background: #fff; 
            border: 1px solid #ddd; 
            border-radius: 3px; 
            cursor: pointer; 
            padding: 2px 5px;
          ">X</button>
        </div>
      `,
      image: markerImg,
    },
    {
      position: new kakao.maps.LatLng(36.349067, 127.297488),
      content: `
        <div style="position: relative; padding:5px; border:5px solid #fcd5ce; border-radius:10px; background-color: white;">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/%ED%8F%AC%EB%A9%94%EB%9D%BC%EB%8B%88%EC%95%88_%EC%96%BC%EA%B5%B4_%ED%99%95%EB%8C%80_%EC%82%AC%EC%A7%84.jpg/220px-%ED%8F%AC%EB%A9%94%EB%9D%BC%EB%8B%88%EC%95%88_%EC%96%BC%EA%B5%B4_%ED%99%95%EB%8C%80_%EC%82%AC%EC%A7%84.jpg" alt="다른 강아지 사진" style="width:auto; height:auto;">
          <p>[개] 포메라니안</p>
          <p>1살 추정</p>
          <p>가게 앞</p>
          <p>귀여워요</p>
          <button id="close-button-3" style="
            position: absolute; 
            top: 5px; 
            right: 5px; 
            background: #fff; 
            border: 1px solid #ddd; 
            border-radius: 3px; 
            cursor: pointer; 
            padding: 2px 5px;
          ">X</button>
        </div>
      `,
      image: markerImg,
    },
  ]

  const [filteredMarkers, setFilteredMarkers] = useState(markersData)
  const [search, setSearch] = useState({
    title: "",
    age: "",
    location: "",
    feature: "",
  })

  useEffect(() => {
    const container = document.getElementById("map") // 지도 영역의 DOM 레퍼런스
    const defaultOptions = {
      center: new kakao.maps.LatLng(36.355383, 127.298445), // 기본 지도 중심좌표
      level: 3, // 기본 지도 확대 레벨
    }

    // 지도 객체 생성
    const map = new kakao.maps.Map(container, defaultOptions)

    // 지도 타입 컨트롤 생성 및 추가
    const mapTypeControl = new kakao.maps.MapTypeControl()
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT)

    // 줌 컨트롤 생성 및 추가
    const zoomControl = new kakao.maps.ZoomControl()
    map.addControl(zoomControl, kakao.maps.ControlPosition.TOPLEFT)

    // +, -키를 눌러서 지도 확대 및 축소
    map.setKeyboardShortcuts(true)

    // 현재 위치 받아오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude // 위도
        const lon = position.coords.longitude // 경도
        const currentPosition = new kakao.maps.LatLng(lat, lon)

        // 지도 중심을 현재 위치로 변경
        map.setCenter(currentPosition)
      })
    }

    // 마커 추가
    filteredMarkers.forEach((markerData, index) => {
      const {position, content, image} = markerData

      const imageSize = new kakao.maps.Size(50, 50) // 마커 이미지 크기
      const imageOption = {offset: new kakao.maps.Point(50, 50)} // 마커 이미지의 위치 조정

      const markerImage = new kakao.maps.MarkerImage(
        image,
        imageSize,
        imageOption
      )

      const marker = new kakao.maps.Marker({
        position,
        image: markerImage,
        clickable: true, // 마커 클릭 시 지도의 클릭 이벤트 발생 X
      })

      marker.setMap(map)

      const customOverlay = new kakao.maps.CustomOverlay({
        position,
        content,
        xAnchor: 0.5,
        yAnchor: 1.15,
        removable: false, // 커스텀 오버레이 자체에서 제거 기능을 없앰
      })

      kakao.maps.event.addListener(marker, "click", function () {
        customOverlay.setMap(map) // 커스텀 오버레이를 지도에 표시

        // 닫기 버튼 클릭 시 오버레이 제거
        const closeButton = document.getElementById(`close-button-${index + 1}`)
        if (closeButton) {
          closeButton.addEventListener("click", () => {
            customOverlay.setMap(null) // 커스텀 오버레이 제거
          })
        }
      })
    })
  }, [filteredMarkers])

  const handleSearchChange = (event) => {
    const {name, value} = event.target
    setSearch((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSearch = () => {
    const filtered = markersData.filter((marker) => {
      const {content} = marker
      const titleMatch = content
        .toLowerCase()
        .includes(search.title.toLowerCase())
      const ageMatch = content.toLowerCase().includes(search.age.toLowerCase())
      const locationMatch = content
        .toLowerCase()
        .includes(search.location.toLowerCase())
      const featureMatch = content
        .toLowerCase()
        .includes(search.feature.toLowerCase())
      return titleMatch && ageMatch && locationMatch && featureMatch
    })
    setFilteredMarkers(filtered)
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-center">
        <div className="w-80 rounded-md border p-4">
          <div className="flex flex-col">
            <input
              type="text"
              name="title"
              placeholder="제목"
              value={search.title}
              onChange={handleSearchChange}
              className="mb-2 rounded border p-2"
            />
            <input
              type="text"
              name="age"
              placeholder="나이"
              value={search.age}
              onChange={handleSearchChange}
              className="mb-2 rounded border p-2"
            />
            <input
              type="text"
              name="location"
              placeholder="발견 위치"
              value={search.location}
              onChange={handleSearchChange}
              className="mb-2 rounded border p-2"
            />
            <input
              type="text"
              name="feature"
              placeholder="특징"
              value={search.feature}
              onChange={handleSearchChange}
              className="mb-2 rounded border p-2"
            />
            <button
              onClick={handleSearch}
              className="cursor-pointer rounded-md border-none bg-mild p-2 text-black"
            >
              검색
            </button>
          </div>
        </div>
      </div>
      <div
        id="map"
        style={{
          width: "1000px", // 지도의 가로 크기
          height: "700px", // 지도의 세로 크기
        }}
      ></div>
    </div>
  )
}

export default Kakao
