import {useEffect, useState} from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import markerImg from "../../assets/images/Marker.png" // 마커 이미지 import

const {kakao} = window

function Report() {
  const [position, setPosition] = useState(null) // 클릭한 위치의 좌표 상태
  const [title, setTitle] = useState("")
  const [species, setSpecies] = useState("") // 종 상태
  const [location, setLocation] = useState("")
  const [feature, setFeature] = useState("")
  const [files, setFiles] = useState([]) // 파일 상태
  const [selectedDate, setSelectedDate] = useState(new Date()) // 날짜 상태

  useEffect(() => {
    const container = document.getElementById("map") // 지도 영역의 DOM 레퍼런스
    const defaultCenter = new kakao.maps.LatLng(36.355383, 127.298445) // 기본 지도 중심좌표
    const options = {
      center: defaultCenter,
      level: 3, // 지도 확대 레벨
    }

    // 지도 객체 생성
    const map = new kakao.maps.Map(container, options)

    // 지도 타입 컨트롤 생성 및 추가
    const mapTypeControl = new kakao.maps.MapTypeControl()
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT)

    // 줌 컨트롤 생성 및 추가
    const zoomControl = new kakao.maps.ZoomControl()
    map.addControl(zoomControl, kakao.maps.ControlPosition.TOPLEFT)

    // +, -키를 눌러서 지도 확대 및 축소
    map.setKeyboardShortcuts(true)

    // 마커 이미지 크기 및 옵션 설정
    const imageSize = new kakao.maps.Size(50, 50) // 마커 이미지 크기
    const imageOption = {offset: new kakao.maps.Point(25, 50)} // 마커 이미지의 위치 조정

    // 마커 이미지 생성
    const markerImage = new kakao.maps.MarkerImage(
      markerImg,
      imageSize,
      imageOption
    )

    // 지도 중심좌표에 마커 생성
    const marker = new kakao.maps.Marker({
      position: map.getCenter(), // 지도 중심좌표에 마커를 생성
      image: markerImage, // 마커 이미지 설정
    })

    // 지도에 마커를 표시
    marker.setMap(map)

    // 현재 위치 받아오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude // 위도
        const lon = position.coords.longitude // 경도
        const currentPosition = new kakao.maps.LatLng(lat, lon)

        // 지도 중심을 현재 위치로 변경
        map.setCenter(currentPosition)
        marker.setPosition(currentPosition)
        setPosition(currentPosition)

        // 클릭한 위치의 위도와 경도 정보
        const message = "위도 : " + lat + " 경도 : " + lon

        // 결과를 표시할 div
        const resultDiv = document.getElementById("clickLatlng")
        if (resultDiv) {
          resultDiv.innerHTML = message
        }
      })
    }

    // 지도 클릭이벤트 등록
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      // 클릭한 위도, 경도 정보 가져오기
      const latlng = mouseEvent.latLng

      // 클릭한 위치로 마커 위치 옮기기
      marker.setPosition(latlng)
      setPosition(latlng)

      // 클릭한 위치의 위도와 경도 정보
      const message = "위도 : " + latlng.getLat() + " 경도 : " + latlng.getLng()

      // 결과를 표시할 div
      const resultDiv = document.getElementById("clickLatlng")
      if (resultDiv) {
        resultDiv.innerHTML = message
      }
    })
  }, [])

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files)
    const imageFiles = selectedFiles.filter((file) =>
      file.type.startsWith("image/")
    )
    setFiles((prevFiles) => [...prevFiles, ...imageFiles])
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!position) {
      alert("지도를 클릭하여 위치를 선택하세요.")
      return
    }

    const data = {
      title,
      species,
      location,
      feature,
      date: selectedDate,
      latitude: position.getLat(),
      longitude: position.getLng(),
    }

    // 데이터 콘솔 출력 (나중에 API로 전송)
    console.log("폼 데이터:", data)
    console.log("파일 데이터:", files)

    // 폼 데이터를 전송하는 코드 (주석 처리됨)
    /*
    const formData = new FormData();
    formData.append("title", title);
    formData.append("species", species);
    formData.append("location", location);
    formData.append("feature", feature);
    formData.append("date", selectedDate.toISOString());
    formData.append("latitude", position.getLat());
    formData.append("longitude", position.getLng());
    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    fetch("https://your-api-endpoint.com/submit", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("서버 응답:", data);
      })
      .catch((error) => {
        console.error("에러 발생:", error);
      });
    */

    // 제출 후 페이지 이동
    window.location.href = "http://localhost:3000/lost-and-found"
  }

  const handleCancel = () => {
    window.location.href = "http://localhost:3000/lost-and-found"
  }

  return (
    <div className="p-4">
      <div id="map" className="h-[350px] w-[1000px]"></div>
      <div
        id="clickLatlng"
        className="mt-4 rounded-md border border-[#D9D9D9] bg-white p-4 text-center text-lg font-bold"
      >
        {/* 클릭한 위치의 위도와 경도 */}
      </div>
      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            제목:
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="ml-2 rounded-md border border-[#D9D9D9] p-2"
          />
        </div>
        <div>
          <label htmlFor="species" className="block text-sm font-medium">
            종:
          </label>
          <select
            id="species"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            required
            className="ml-2 rounded-md border border-[#D9D9D9] p-2"
          >
            <option value="">종을 선택하세요</option>
            <option value="개">개</option>
            <option value="고양이">고양이</option>
            <option value="기타">기타</option>
          </select>
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium">
            발견 장소:
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="ml-2 rounded-md border border-[#D9D9D9] p-2"
          />
        </div>
        <div>
          <label htmlFor="feature" className="block text-sm font-medium">
            특징:
          </label>
          <textarea
            id="feature"
            value={feature}
            onChange={(e) => setFeature(e.target.value)}
            required
            className="ml-2 min-h-[100px] w-full rounded-md border border-[#D9D9D9] p-2"
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium">
            발견 날짜:
          </label>
          <DatePicker
            id="date"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy/MM/dd"
            className="ml-2 rounded-md border border-[#D9D9D9] p-2"
            placeholderText="날짜를 선택하세요"
          />
        </div>
        <div>
          <label htmlFor="files" className="block text-sm font-medium">
            사진:
          </label>
          <input
            id="files"
            type="file"
            onChange={handleFileChange}
            multiple
            accept="image/*"
            className="ml-2"
          />
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="relative size-[100px] overflow-hidden rounded border"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`upload-${index}`}
                className="size-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="cursor-pointer rounded-md border-none bg-mild p-2 text-black"
          >
            제출하기
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="cursor-pointer rounded-md border-none bg-gray-300 p-2 text-black"
          >
            취소하기
          </button>
        </div>
      </form>
    </div>
  )
}

export default Report
