import {removePetPick} from "api/petpicks-api"
// 쇼츠 삭제하기
export const goDeletePetpick = async (petpickId) => {
  await removePetPick(petpickId)
}
const kakao = window
export const getMyLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude

        console.log("현재 위치:", lat, lng)

        let geocoder = new kakao.maps.services.Geocoder()

        let coord = new kakao.maps.LatLng(lat, lng)
        let callback = function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            console.log(result[0].road_address.address_name)
          }
        }
        geocoder.coord2Address(coord.getLng(), coord.getLat(), callback)
      },
      (error) => {
        console.error("Error occurred while getting location: ", error)
      }
    )
  } else {
    console.error("Geolocation is not supported by this browser.")
  }
}

// const getRegionCode = (regionName) => {
//   const regionCodes = {
//     서울특별시: "6110000",
//     부산광역시: "6260000",
//     대구광역시: "6270000",
//     인천광역시: "6280000",
//     광주광역시: "6290000",
//     대전광역시: "6300000",
//     울산광역시: "6310000",
//     세종특별자치시: "5690000",
//     경기도: "6410000",
//     강원도: "6420000",
//     충청북도: "6430000",
//     충청남도: "6440000",
//     전라북도: "6450000",
//     전라남도: "6460000",
//     경상북도: "6470000",
//     경상남도: "6480000",
//     제주특별자치도: "6500000",
//   }

//   return regionCodes[regionName] || ""
// }
