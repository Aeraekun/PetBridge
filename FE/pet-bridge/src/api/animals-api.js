import axios from "axios"
import axiosInstance from "./axios-instance"
const BASE_API_URL = process.env.REACT_APP_API_URL + "/animals"
const SERVICE_KEY = process.env.REACT_APP_API_SERVICE_KEY
const BASE_PUB_API = process.env.REACT_APP_BASE_PUB_API

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
  console.log(process.env.BASE_PUB_API)
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
    const res = await axiosInstance.post(`${BASE_API_URL}/animals`, formData, {
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
  console.log(BASE_PUB_API)
  const params = {
    serviceKey: {SERVICE_KEY},
    pageNo: searchParams.pageNo,
    numOfRows: searchParams.numOfRows,
    _type: "json",
    ...searchParams,
  }

  const res = await axios.get(`${BASE_PUB_API}/abandonmentPublic`, {
    // const res = await axios.get(`${process.env.BASE_PUB_API}/abandonmentPublic`, {
    params: params,
  })
  return res
}

export const getSidoAPI = async () => {
  const params = {
    serviceKey: {SERVICE_KEY},
    _type: "json",
    numOfRows: 100,
  }
  const res = await axios.get(`${BASE_PUB_API}/sido`, {params: params})
  return res
}

export const getSigunguAPI = async (selectedSido) => {
  const params = {
    serviceKey: {SERVICE_KEY},
    _type: "json",
    upr_cd: selectedSido,
    numOfRows: 100,
  }
  const res = await axios.get(`${BASE_PUB_API}/sigungu`, {params: params})
  return res
}

export const getBreedAPI = async (selectedKindCd) => {
  const params = {
    serviceKey: {SERVICE_KEY},
    _type: "json",
    up_kind_cd: selectedKindCd,
  }
  const res = await axios.get(`${BASE_PUB_API}/kind`, {params: params})
  return res
}
