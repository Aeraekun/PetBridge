import {removePetPick} from "api/petpicks-api"
// 쇼츠 삭제하기
export const goDeletePetpick = async (petpickId) => {
  await removePetPick(petpickId)
}

const getRegionCode = (regionName) => {
  const regionCodes = {
    서울특별시: "6110000",
    부산광역시: "6260000",
    대구광역시: "6270000",
    인천광역시: "6280000",
    광주광역시: "6290000",
    대전광역시: "6300000",
    울산광역시: "6310000",
    세종특별자치시: "5690000",
    경기도: "6410000",
    강원도: "6420000",
    충청북도: "6430000",
    충청남도: "6440000",
    전라북도: "6450000",
    전라남도: "6460000",
    경상북도: "6470000",
    경상남도: "6480000",
    제주특별자치도: "6500000",
  }

  // Check if any region key is included in the regionName string
  for (const key of Object.keys(regionCodes)) {
    if (
      regionName.includes(
        key
          .replace("광역시", "")
          .replace("특별자치시", "")
          .replace("특별시", "")
      )
    ) {
      return regionCodes[key]
    }
  }
  return "" // Return an empty string if no match is found
}
export const getMyLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude

        console.log("현재 위치:", lat, lng)

        // Ensure the Kakao maps object is available
        if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
          let geocoder = new window.kakao.maps.services.Geocoder()
          let coord = new window.kakao.maps.LatLng(lat, lng)
          let callback = function (result, status) {
            if (status === window.kakao.maps.services.Status.OK) {
              let address = null

              // Check if road_address is available
              if (result[0].road_address) {
                address = result[0].road_address.address_name
              } else if (result[0].address) {
                // Fallback to general address if road_address is not available
                address = result[0].address.address_name
              }

              if (address) {
                console.log("Address:", address)
                console.log(address.split(" ")[0])
                console.log(
                  "Region Code:",
                  getRegionCode(address.split(" ")[0])
                )
                return getRegionCode(address.split(" ")[0])
              } else {
                console.error("No address information available.")
              }
            } else {
              console.error("Failed to reverse geocode coordinates.")
            }
          }

          geocoder.coord2Address(coord.getLng(), coord.getLat(), callback)
        } else {
          console.error("Kakao Maps API is not loaded correctly.")
        }
      },
      (error) => {
        console.error("Error occurred while getting location: ", error)
      }
    )
  } else {
    console.error("Geolocation is not supported by this browser.")
  }
  return null
}
