// import React, {useEffect, useState, useRef} from "react"
// import markerImg from "../../assets/image/marker.png"
// import {getArticle} from "../../api/boards-api"
// import ReactDOM from "react-dom/client" // ReactDOM import

// const {kakao} = window

// function Kakao() {
//   const [filteredMarkers, setFilteredMarkers] = useState([])
//   const mapRef = useRef(null)

//   useEffect(() => {
//     getArticle()
//       .then((response) => {
//         const articles = response.content || []
//         const lostArticles = articles.filter(
//           (item) => item.boardType === "LOST"
//         )

//         const markers = lostArticles.map((item) => ({
//           id: item.id,
//           position: new kakao.maps.LatLng(
//             parseFloat(item.lat),
//             parseFloat(item.lon)
//           ),
//           content: (
//             <div
//               style={{
//                 position: "relative",
//                 width: "max-content",
//                 padding: "10px",
//                 border: "2px solid #fcd5ce",
//                 borderRadius: "10px",
//                 backgroundColor: "white",
//                 textAlign: "center",
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//               }}
//             >
//               <img
//                 src={item.thumbnail}
//                 alt={item.title}
//                 style={{
//                   width: "150px",
//                   height: "150px",
//                   objectFit: "cover",
//                   borderRadius: "5px",
//                 }}
//               />
//               <p style={{margin: "10px 0 5px 0", fontWeight: "bold"}}>
//                 {item.title}
//               </p>
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <a
//                   href={`/communities/details/${item.id}`}
//                   style={{
//                     display: "inline-block",
//                     marginTop: "5px",
//                     color: "#fcd5ce",
//                     textDecoration: "none",
//                     border: "1px solid #fcd5ce",
//                     borderRadius: "3px",
//                     padding: "3px 8px",
//                     backgroundColor: "white",
//                   }}
//                 >
//                   자세히 보기
//                 </a>
//                 <button
//                   className="close-btn"
//                   style={{
//                     marginLeft: "10px",
//                     backgroundColor: "transparent",
//                     border: "none",
//                     fontSize: "20px",
//                     cursor: "pointer",
//                   }}
//                 >
//                   &times;
//                 </button>
//               </div>
//             </div>
//           ),
//           image: markerImg,
//         }))

//         setFilteredMarkers(markers)
//       })
//       .catch((error) => {
//         console.error("Failed to fetch data:", error)
//       })
//   }, [])

//   useEffect(() => {
//     const container = mapRef.current
//     const defaultOptions = {
//       center: new kakao.maps.LatLng(36.355383, 127.298445),
//       level: 3,
//     }

//     const map = new kakao.maps.Map(container, defaultOptions)

//     const mapTypeControl = new kakao.maps.MapTypeControl()
//     map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT)

//     const zoomControl = new kakao.maps.ZoomControl()
//     map.addControl(zoomControl, kakao.maps.ControlPosition.TOPLEFT)

//     map.setKeyboardShortcuts(true)

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const lat = position.coords.latitude
//         const lon = position.coords.longitude
//         const currentPosition = new kakao.maps.LatLng(lat, lon)
//         map.setCenter(currentPosition)
//       })
//     }

//     const markers = []
//     let currentOverlay = null // 현재 열려 있는 오버레이를 추적하기 위한 변수

//     filteredMarkers.forEach((markerData) => {
//       const {position, content, image} = markerData

//       const imageSize = new kakao.maps.Size(50, 50)
//       const imageOption = {offset: new kakao.maps.Point(25, 50)}

//       const markerImage = new kakao.maps.MarkerImage(
//         image,
//         imageSize,
//         imageOption
//       )

//       const marker = new kakao.maps.Marker({
//         position,
//         image: markerImage,
//         clickable: true,
//       })

//       marker.setMap(map)
//       markers.push(marker)

//       // DOM 요소로 변환된 content 사용
//       const overlayDiv = document.createElement("div")

//       const root = ReactDOM.createRoot(overlayDiv) // React 18 방식으로 root 생성
//       root.render(content) // JSX를 렌더링하여 DOM 요소로 변환

//       const customOverlay = new kakao.maps.CustomOverlay({
//         position,
//         content: overlayDiv, // 여기에서 DOM 요소 전달
//         xAnchor: 0.5,
//         yAnchor: 0,
//         removable: false,
//       })

//       kakao.maps.event.addListener(marker, "click", function () {
//         if (currentOverlay) {
//           currentOverlay.setMap(null)
//         }

//         if (currentOverlay !== customOverlay) {
//           customOverlay.setMap(map)
//           currentOverlay = customOverlay
//         } else {
//           currentOverlay = null
//         }

//         const closeButton = overlayDiv.querySelector(".close-btn")
//         if (closeButton) {
//           closeButton.onclick = () => {
//             customOverlay.setMap(null)
//             currentOverlay = null
//           }
//         }
//       })
//     })

//     return () => {
//       markers.forEach((marker) => marker.setMap(null))
//     }
//   }, [filteredMarkers])

//   return (
//     <div className="p-4">
//       <div
//         id="map"
//         ref={mapRef}
//         style={{
//           width: "1000px",
//           height: "700px",
//         }}
//       ></div>
//     </div>
//   )
// }

// export default Kakao

import React, {useEffect, useState} from "react"
import markerImg from "../../assets/image/marker.png"
import {getLostArticle} from "../../api/boards-api"
import {useNavigate} from "react-router-dom"

const {kakao} = window

const LostAnimalItem = ({data, onSelectArticle}) => {
  return (
    <div
      className="relative size-[100px] overflow-hidden  rounded-xl border border-stroke"
      onClick={onSelectArticle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onSelectArticle()
        }
      }}
    >
      <img
        src={data.thumbnail}
        alt="thumbnail"
        className="size-full snap-center object-cover "
      />
    </div>
  )
}

const LostAnimalMap = () => {
  const [filteredMarkers, setFilteredMarkers] = useState([])

  const [totalPages, setTotalPages] = useState(0)
  const pageSize = 4 // 페이지당 항목 수
  const [searchParams, setSearchParams] = useState({})
  const [currentPage, setCurrentPage] = useState(0)
  const [lostArticles, setLostArticles] = useState([])
  const [centerlat, setCenterlat] = useState(36.355383)
  const [centerlon, setCenterlon] = useState(127.298445)
  const [map, setMap] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    console.log(centerlat, centerlon)
    setSearchParams((prevParams) => ({
      ...prevParams,
      page: currentPage,
      size: pageSize,
      type: "LOST",
      lat: centerlat,
      lon: centerlon,
    }))
  }, [currentPage, centerlon])

  useEffect(() => {
    if (searchParams) {
      getLostArticle(searchParams)
        .then((response) => {
          setTotalPages(response.totalPages)
          setLostArticles(response.content || [])
          console.log(response.content)
        })
        .catch((error) => {
          console.error("Failed to fetch data:", error)
        })
    }
  }, [searchParams])

  useEffect(() => {
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
          </div>
        </div>
      `,
      image: markerImg,
    }))
    // console.log(markers)
    setFilteredMarkers(markers)
  }, [lostArticles])

  useEffect(() => {
    const container = document.getElementById("map")
    const defaultOptions = {
      center: new kakao.maps.LatLng(centerlat, centerlon),
      level: 3,
    }

    const mapInstance = new kakao.maps.Map(container, defaultOptions)
    const mapTypeControl = new kakao.maps.MapTypeControl()
    mapInstance.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT)

    const zoomControl = new kakao.maps.ZoomControl()
    mapInstance.addControl(zoomControl, kakao.maps.ControlPosition.TOPLEFT)

    mapInstance.setKeyboardShortcuts(true)
    setMap(mapInstance)
  }, [])

  useEffect(() => {
    const markers = []
    if (map && filteredMarkers.length > 0) {
      let currentOverlay = null

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
          yAnchor: 0,
          removable: false,
        })

        kakao.maps.event.addListener(marker, "click", function () {
          if (currentOverlay) {
            currentOverlay.setMap(null)
          }

          if (currentOverlay !== customOverlay) {
            customOverlay.setMap(map)
            currentOverlay = customOverlay
          } else {
            currentOverlay = null
          }
        })
      })
    }
    if (map) {
      kakao.maps.event.addListener(map, "dragend", function () {
        // 지도의 중심좌표를 얻어옵니다
        setCenterlat(map.getCenter().getLat())
        setCenterlon(map.getCenter().getLng())
      })
    }
    return () => {
      markers.forEach((marker) => marker.setMap(null))
    }
  }, [lostArticles, map, filteredMarkers])

  const goDetail = (articleId) => {
    console.log(articleId)

    let path = `/lost-and-found/details/${articleId}`
    navigate(path)
  }

  return (
    <div className="relative ">
      <div className="relative flex p-4 ">
        <div
          id="map"
          style={{
            width: "1000px",
            height: "700px",
          }}
        ></div>
      </div>

      <div className="absolute  right-[10px] top-[70px] z-50  flex h-[520px] w-[110px] flex-col items-center justify-between space-y-2  rounded-xl border bg-white p-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
        >
          <img src="/icons/icon_arrow_drop_up.svg" alt="up" />
        </button>
        <ul className="flex h-[480px] flex-col space-y-2  overflow-auto  ">
          {lostArticles ? (
            lostArticles.map((article) => (
              <li key={article.id}>
                <LostAnimalItem
                  data={article}
                  onSelectArticle={() => {
                    goDetail(article.id)
                  }}
                />
              </li>
            ))
          ) : (
            <div>등록된 게시글이 없습니다.</div>
          )}
        </ul>
        <button
          onClick={() => {
            console.log(totalPages)
            setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
          }}
          disabled={currentPage === totalPages}
        >
          <img src="/icons/icon_arrow_drop_down.svg" alt="up" />
        </button>
      </div>
    </div>
  )
}

export default LostAnimalMap
