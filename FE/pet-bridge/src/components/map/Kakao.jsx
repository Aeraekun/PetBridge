import React, {useEffect, useState} from "react"
import markerImg from "../../assets/image/marker.png"
import {getArticle} from "api/boards-api"

const {kakao} = window

function Kakao() {
  const [filteredMarkers, setFilteredMarkers] = useState([])

  useEffect(() => {
    getArticle()
      .then((response) => {
        // 유효한 위도(lat)와 경도(lon)가 있는 데이터 필터링
        const validData = response.filter((item) => item.lat && item.lon)

        // 마커 데이터 생성
        const markers = validData.map((item) => ({
          id: item.id,
          position: new kakao.maps.LatLng(
            parseFloat(item.lat),
            parseFloat(item.lon)
          ),
          content: `
            <div style="position: relative; padding:5px; border:5px solid #fcd5ce; border-radius:10px; background-color: white; display: flex;">
              <img src="${item.thumbnail}" alt="${item.title}" style="width: 50px; height: 50px; margin-right: 10px; object-fit: cover; border-radius: 5px;">
              <div>
                <p style="margin: 0; font-weight: bold;">${item.title}</p>
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
      const {position, content, image} = markerData

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
        yAnchor: 1.7,
        removable: false,
      })

      kakao.maps.event.addListener(marker, "click", function () {
        customOverlay.setMap(map)
      })
    })

    return () => {
      markers.forEach((marker) => marker.setMap(null)) // 마커 제거하는 정리 함수
    }
  }, [filteredMarkers]) // filteredMarkers 변경 시 마커 업데이트

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
