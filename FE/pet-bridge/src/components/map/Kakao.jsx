import React, {useEffect, useState} from "react"
import markerImg from "../../assets/image/marker.png"
import {getArticle} from "../../api/boards-api"

const {kakao} = window

function Kakao() {
  const [filteredMarkers, setFilteredMarkers] = useState([])
  const [currentOverlayId, setCurrentOverlayId] = useState(null)

  useEffect(() => {
    getArticle()
      .then((response) => {
        console.log(response) // 전체 데이터 객체를 확인

        // response.content 배열에서 게시물 데이터에 접근
        const articles = response.content || []

        // "LOST" 타입만 필터링
        const lostArticles = articles.filter(
          (item) => item.boardType === "LOST"
        )

        // 마커 데이터 생성
        const markers = lostArticles.map((item) => ({
          id: item.id,
          position: new kakao.maps.LatLng(
            parseFloat(item.lat),
            parseFloat(item.lon)
          ),
          content: `
            <div style="position: relative; width: max-content; padding: 10px; border: 2px solid #fcd5ce; border-radius: 10px; background-color: white; text-align: center; display: flex; flex-direction: column; align-items: center;">
              <img src="${item.thumbnail}" alt="${item.title}" style="width: 150px; height: 150px; object-fit: cover; border-radius: 5px;">
              <p style="margin: 10px 0 5px 0; font-weight: bold;">${item.title}</p>
              <div style="display: flex; align-items: center; justify-content: center;">
                <a href="/communities/details/${item.id}" style="
                  display: inline-block;
                  margin-top: 5px;
                  color: #fcd5ce;
                  text-decoration: none;
                  border: 1px solid #fcd5ce;
                  border-radius: 3px;
                  padding: 3px 8px;
                  background-color: white;
                ">자세히 보기</a>
                <button class="close-btn" style="
                  margin-left: 10px;
                  background-color: transparent;
                  border: none;
                  font-size: 20px;
                  cursor: pointer;
                ">&times;</button>
              </div>
            </div>
          `,
          image: markerImg,
        }))

        setFilteredMarkers(markers)
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error)
      })
  }, [])

  useEffect(() => {
    const container = document.getElementById("map")
    const defaultOptions = {
      center: new kakao.maps.LatLng(36.355383, 127.298445),
      level: 3,
    }

    const map = new kakao.maps.Map(container, defaultOptions)

    const mapTypeControl = new kakao.maps.MapTypeControl()
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT)

    const zoomControl = new kakao.maps.ZoomControl()
    map.addControl(zoomControl, kakao.maps.ControlPosition.TOPLEFT)

    map.setKeyboardShortcuts(true)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        const currentPosition = new kakao.maps.LatLng(lat, lon)
        map.setCenter(currentPosition)
      })
    }

    const markers = []
    filteredMarkers.forEach((markerData) => {
      const {id, position, content, image} = markerData

      const imageSize = new kakao.maps.Size(50, 50)
      const imageOption = {offset: new kakao.maps.Point(25, 50)}

      const markerImage = new kakao.maps.MarkerImage(
        image,
        imageSize,
        imageOption
      )

      const marker = new kakao.maps.Marker({
        position,
        image: markerImage,
        clickable: true,
      })

      marker.setMap(map)
      markers.push(marker)

      const customOverlay = new kakao.maps.CustomOverlay({
        position,
        content,
        xAnchor: 0.5,
        yAnchor: 0,
        removable: false,
      })

      // 오버레이 ID를 관리하는 로직
      kakao.maps.event.addListener(marker, "click", function () {
        if (currentOverlayId === id) {
          customOverlay.setMap(null)
          setCurrentOverlayId(null)
        } else {
          if (currentOverlayId !== null) {
            const prevOverlay = markers.find(
              (m) => m.id === currentOverlayId
            ).overlay
            prevOverlay.setMap(null)
          }
          customOverlay.setMap(map)
          setCurrentOverlayId(id)
        }

        // 닫기 버튼 클릭 이벤트 핸들러
        const closeButton = customOverlay
          .getContent()
          .querySelector(".close-btn")
        if (closeButton) {
          closeButton.onclick = () => {
            customOverlay.setMap(null)
            setCurrentOverlayId(null)
          }
        }
      })

      markerData.overlay = customOverlay // 마커에 오버레이 참조 저장
    })

    return () => {
      markers.forEach((marker) => marker.setMap(null)) // 마커 제거하는 정리 함수
    }
  }, [filteredMarkers, currentOverlayId]) // filteredMarkers 또는 currentOverlayId 변경 시 마커 업데이트

  return (
    <div className="p-4">
      <div
        id="map"
        style={{
          width: "1000px",
          height: "700px",
        }}
      ></div>
    </div>
  )
}

export default Kakao
