import axios from "axios"
import axiosInstance from "./axios-instance"
const BASE_API_URL = process.env.REACT_APP_API_URL + "/animals"

export const getListAnimalByUserId = async (userId) => {
  try {
    const res = await axios.get(`${BASE_API_URL}/user/${userId}`)
    console.log("getListAnimalByUserId" + res)
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}

export const getDetailAnimal = async (id) => {
  try {
    const res = await axios.get(`${BASE_API_URL}/${id}`)
    console.log("getDetailAnimal" + res.data)
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}
export const getAnimalList = async (searchParams) => {
  try {
    const res = await axios.get(`${BASE_API_URL}`, {params: searchParams})
    console.log("getAnimalList" + res.data)
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}

/*동물 등록
{
    "userId": -1,
    "name": "흰둥이",
    "happenDt": 19990918,
    "kindCd": "[개] 시츄",
    "colorCd": "흰색",
    "age": "2023(년생)",
    "weight": "3(kg)",
    "noticeNo": null,
    "popfile": null,
    "processState": "보호중",
    "sexCd": "M",
    "neuterYn": "Y",
    "specialMark": "순함",
    "careAddr": "경상남도 거창군 남상면 수남로 1934-12",
    "noticeComment": "많관부"
    }
*/

//동물 등록
export const registAnimal = async (formData) => {
  try {
    const res = await axiosInstance.post(`/animals`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    console.log("registAnimal response:", res)
    return res.data
  } catch (error) {
    console.error("Error in registAnimal:", error)
    throw error // 호출한 쪽에서 에러를 처리할 수 있도록 합니다.
  }
}

//동물 수정
export const editAnimal = async (id, formData) => {
  try {
    const res = await axiosInstance.patch(`${BASE_API_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    console.log("editAnimal" + res)
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}

//동물 삭제
export const removeAnimal = async (id) => {
  try {
    const res = await axiosInstance.delete(`${BASE_API_URL}/${id}`)
    console.log("removeAnimal" + res)
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}

export const getShelterAnimalsAPI = async (searchParams) => {
  const params = {
    serviceKey:
      // "g5vQ++oXb4/6B8IvamxV9Vzg1V9U880MIrl02T7y3P9aAeVTHujkgA3wbTaMxcfyyJpmN8nNJBOmF/M21ApXlw==",
      "w2SoV2W8SJI41W31IkRtQyPg9X2RLZ0QXU0ZQAPtwQ5Fy8ubzMDUFzzCbm4NRbK+2EKs3Fc+g/3oiBW0ftcCDw==",
    pageNo: searchParams.pageNo,
    numOfRows: searchParams.numOfRows,
    _type: "json",
    ...searchParams,
  }

  const res = await axios.get(
    "http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic",
    {params: params}
  )

  return res
}

export const getSidoAPI = async () => {
  const params = {
    serviceKey:
      "w2SoV2W8SJI41W31IkRtQyPg9X2RLZ0QXU0ZQAPtwQ5Fy8ubzMDUFzzCbm4NRbK+2EKs3Fc+g/3oiBW0ftcCDw==",
    _type: "json",
    numOfRows: 100,
  }
  const res = await axios.get(
    `http://apis.data.go.kr/1543061/abandonmentPublicSrvc/sido`,
    {params: params}
  )
  return res
}

export const getSigunguAPI = async (selectedSido) => {
  const params = {
    serviceKey:
      "w2SoV2W8SJI41W31IkRtQyPg9X2RLZ0QXU0ZQAPtwQ5Fy8ubzMDUFzzCbm4NRbK+2EKs3Fc+g/3oiBW0ftcCDw==",
    _type: "json",
    upr_cd: selectedSido,
    numOfRows: 100,
  }
  const res = await axios.get(
    `http://apis.data.go.kr/1543061/abandonmentPublicSrvc/sigungu`,
    {params: params}
  )
  return res
}

export const getBreedAPI = async (selectedKindCd) => {
  console.log("se", selectedKindCd)
  const params = {
    serviceKey:
      "w2SoV2W8SJI41W31IkRtQyPg9X2RLZ0QXU0ZQAPtwQ5Fy8ubzMDUFzzCbm4NRbK+2EKs3Fc+g/3oiBW0ftcCDw==",
    _type: "json",
    up_kind_cd: selectedKindCd,
  }
  const res = await axios.get(
    `http://apis.data.go.kr/1543061/abandonmentPublicSrvc/kind`,
    {params: params}
  )
  return res
}
